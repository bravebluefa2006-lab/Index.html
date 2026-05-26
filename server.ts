import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import AdmZip from 'adm-zip';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client strictly using @google/genai guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Orders DB setup
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}
const ORDERS_FILE = path.join(DATA_DIR, 'orders_db.json');
if (!fs.existsSync(ORDERS_FILE)) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify([]));
}

// Mail SMTP Transport configuration & transactional mail sender helper
const getTransporter = () => {
  const host = process.env.EMAIL_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.EMAIL_PORT || '587');
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    console.warn('⚠️ [Mail Alert] EMAIL_USER or EMAIL_PASS variables are not configured in your Secrets. Mails will run in sandbox print simulation mode.');
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass,
    },
  });
};

const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  try {
    const transporter = getTransporter();
    const from = process.env.EMAIL_FROM || '"Arzhaar Brhave Perfumes" <bluefa2266@gmail.com>';

    if (transporter) {
      const info = await transporter.sendMail({
        from,
        to,
        subject,
        text,
        html,
      });
      console.log(`✉️ Scent newsletter/receipt successfully dispatched to ${to}! Message ID: ${info.messageId}`);
      return { success: true, messageId: info.messageId };
    } else {
      console.log('\n======================================================');
      console.log(`📬 [EMAIL SIMULATION DEV-LOG: ${new Date().toLocaleTimeString()}]`);
      console.log(`From: ${from}`);
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Body:\n${text}`);
      console.log('======================================================\n');
      return { success: true, simulated: true };
    }
  } catch (error: any) {
    console.error('❌ Mail dispatch failed:', error);
    return { success: false, error: error.message };
  }
};

// 1. API: Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// 1b. API: Download Project Source Code ZIP
app.get('/api/download-zip', async (req, res) => {
  try {
    let zipInstance: any;
    if (typeof AdmZip === 'function') {
      zipInstance = new (AdmZip as any)();
    } else if (AdmZip && typeof (AdmZip as any).default === 'function') {
      zipInstance = new (AdmZip as any).default();
    } else {
      try {
        const module = await import('adm-zip');
        const AdmZipConstructor = module.default || module;
        zipInstance = new (AdmZipConstructor as any)();
      } catch (err: any) {
        throw new Error('AdmZip constructor failed to materialize: ' + err.message);
      }
    }

    const zip = zipInstance;
    const rootDir = process.cwd();

    const addPath = (relPath: string) => {
      const fullPath = path.join(rootDir, relPath);
      if (!fs.existsSync(fullPath)) return;
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        zip.addLocalFolder(fullPath, relPath);
      } else {
        zip.addLocalFile(fullPath);
      }
    };

    const targetItems = [
      'src',
      'data',
      'index.html',
      'package.json',
      'server.ts',
      'tsconfig.json',
      'vite.config.ts',
      'metadata.json',
      '.env.example',
      '.gitignore'
    ];

    targetItems.forEach(item => {
      try {
        addPath(item);
      } catch (err) {
        console.warn(`Could not add ${item} to ZIP:`, err);
      }
    });

    const buffer = zip.toBuffer();

    res.setHeader('Content-Type', 'application/zip');
    res.setHeader('Content-Disposition', 'attachment; filename=arzhaar-perfumes-source.zip');
    res.send(buffer);
  } catch (error: any) {
    console.error('ZIP generation error:', error);
    res.status(500).json({ error: 'Failed to generate source ZIP.', details: error.message });
  }
});

// 2. API: Scent Consultant AI Chat Bot
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400).json({ error: 'Message field is required.' });
      return;
    }

    const systemInstruction = `You are the exclusive, high-society signature fragrance consultant for "Arzhaar Brhave Perfumes", an ultra-luxurious modern scent boutique located in Orangi Town, Karachi, Pakistan.
Tagline: "Discover Your Signature Scent | Premium Perfumes in Karachi".
Store Details & Coordinates:
- Location: Orangi Town, Karachi, Pakistan.
- Contact Phone: +92 314 7155873 (Always offer this for custom blending orders)
- Contact Email: bluefa2266@gmail.com
- Timings: Monday to Saturday: 2:00 PM to 11:00 PM (Sunday is closed for custom olfactory blending).

Commercial Policies:
- Delivery: Direct safe COD (Cash on Delivery) courier to anywhere in Pakistan (Karachi, Lahore, Islamabad, etc.).
- Delivery Pricing: Flat Rs. 250 standard, or completely FREE on orders above Rs. 8,000, or when coupon code "FREESHIP" is applied.
- Special Promos: Use "KARACHI10" for 10% off store-wide, or "BRHAVEGOLD" for 20% off launch celebration.
- Scent Longevity: Karachi weather is hot & humid, so our formulations use heavy 30-40% oily "Extrait de Parfum" concentrations that easily last 12-24+ hours on skin!

Brand Personality:
- Welcoming, highly elegant, prestigious, yet warm and humble. Speak like a professional eastern fragrance maestro.
- You can mix English and polite Urdu expressions (like "Assalam-o-Alaikum", "Shukriya", "Khushamdeed", "Ma Sha Allah", "In Sha Allah", "JazakAllah") to feel authentically premium Pakistani.
- Provide expert recommendations based on top, heart, and base notes. For deep winter or royal presence, suggest "Oud Al Karachi" (Musk & Gold saffron oudh) or "Khamrah Divine" (Sweet gourmand amber dates). For summer refresh, mention "Mint Emerald".

Be helpful, answer questions from the user accurately based on this information, and guide them politely to register VIP accounts or proceed to check out when they are ready. Keep answers concise, beautiful, and deeply engaging.`;

    // Process history into correct format if needed
    // We will query the Gemini API with system instructions
    const prompt = message;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: [
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    });

    const reply = response.text || "I apologize, my olfactory gears are realigning. Could you ask once more, premium customer?";
    res.json({ reply });

  } catch (error: any) {
    console.error('Gemini API route error:', error);
    res.status(500).json({ 
      error: 'Olfactory response formulation failed.', 
      details: error.message || error 
    });
  }
});

// 3. API: Register Order & Notify Email (Direct notification to bluefa2266@gmail.com and customer)
app.post('/api/orders', async (req, res) => {
  try {
    const orderObj = req.body;
    if (!orderObj || !orderObj.orderNumber) {
      res.status(400).json({ error: 'Valid order object is required.' });
      return;
    }

    // Save order in JSON orders database
    const fileContent = fs.readFileSync(ORDERS_FILE, 'utf-8');
    const orders = JSON.parse(fileContent);
    orders.unshift(orderObj);
    fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));

    // Formulate purchase notification receipt log
    const itemsFormatted = orderObj.items.map((it: any) => 
      `- ${it.product.name} (${it.selectedSize} combined) - Rs. ${it.price.toLocaleString()} (x${it.quantity})`
    ).join('\n');

    const emailLog = `
=============================================================================
📬 NEW ARZHAAR BRHAVE ORDER DISPATCH REPORT
-----------------------------------------------------------------------------
Timestamp: ${new Date().toISOString()}
Target Seller Email Inbox: bluefa2266@gmail.com
Buyer Session Email: ${req.body.customerEmail || 'Not Logged In'}

ORDER SUMMARY DETAILS:
- Order Number: ${orderObj.orderNumber}
- Tracking ID: ${orderObj.trackingNumber}
- Date Placed: ${orderObj.date}
- Settle Channel: ${orderObj.paymentMethod}

PATRON CUSTOMER PROFILE:
- Name: ${orderObj.shippingAddress?.fullName}
- Phone Mobile: ${orderObj.shippingAddress?.phone}
- City: ${orderObj.shippingAddress?.city}
- Delivery Address: ${orderObj.shippingAddress?.address}
- Special Notes: ${orderObj.shippingAddress?.optionalInstructions || 'None'}

FRAGRANCES ORDERED:
${itemsFormatted}

AMOUNTS SUMMARY:
- Subtotal: Rs. ${orderObj.subtotal.toLocaleString()}
- Delivery Charges: Rs. ${orderObj.deliveryCharges.toLocaleString()}
- Applied Discount: Rs. ${orderObj.discount.toLocaleString()}
- Grand Total: Rs. ${orderObj.total.toLocaleString()}
=============================================================================
`;

    console.log(emailLog);

    // email 1 of 2: Dispatch report directly to you (Owner: bluefa2266@gmail.com)
    await sendEmail(
      'bluefa2266@gmail.com',
      `📬 [NEW ORDER] ${orderObj.orderNumber} Placed by ${orderObj.shippingAddress?.fullName || 'VIP Customer'} (Rs. ${orderObj.total.toLocaleString()})`,
      emailLog
    );

    // email 2 of 2: Transaction confirmation receipt to Buyer customer email (if logged in or supplied)
    const customerTarget = req.body.customerEmail || '';
    if (customerTarget && customerTarget.trim() !== '') {
      const customerSubject = `🛍️ Verified Invoice: Your Arzhaar Brhave Order ${orderObj.orderNumber} Registered`;
      const customerWelcomeText = `Dear ${orderObj.shippingAddress?.fullName || 'VIP Patron'},

Assalam-o-Alaikum!

Thank you for choosing ARZHAAR BRHAVE PERFUMERS! We are honored to confirm that your order ${orderObj.orderNumber} has been received and registered.

Our fragrance artisans are currently handcrafting and sealing your luxury formulation in Karachi.

Your Order Tracker Details:
- Order Reference: ${orderObj.orderNumber}
- Tracker Tracking ID: ${orderObj.trackingNumber}
- Settle Channel: ${orderObj.paymentMethod}
- Total Amount: Rs. ${orderObj.total.toLocaleString()}

Our Logistics Delivery coordinates:
- Recipient: ${orderObj.shippingAddress?.fullName}
- Mobile Phone No: ${orderObj.shippingAddress?.phone}
- Shipping Address: ${orderObj.shippingAddress?.address}, ${orderObj.shippingAddress?.city}

If you have chosen Cash on Delivery (COD), please prepare Rs. ${orderObj.total.toLocaleString()} upon contact courier coordination.

For any live tracking or bespoke recipe changes, contact us directly via WhatsApp at +92 314 7155873.

With fragrant respects,
Scent Maestro & Alchemist
ARZHAAR BRHAVE PERFUMERS
Orangi Town, Karachi, Pakistan`;

      const customerWelcomeHtml = `
         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fafafa;">
           <div style="text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 15px; margin-bottom: 20px;">
             <h1 style="color: #050505; font-size: 24px; margin: 0; font-family: Georgia, serif; font-weight: bold; letter-spacing: 1.5px;">ARZHAAR BRHAVE</h1>
             <p style="color: #D4AF37; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0; font-weight: bold;">Signature Perfumers • Orangi Town, Karachi</p>
           </div>
           
           <h2 style="color: #050505; font-size: 17px; line-height: 1.4; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">Order Tracker Summary: ${orderObj.orderNumber}</h2>
           
           <p style="color: #333333; line-height: 1.6; font-size: 14px;">
             Assalam-o-Alaikum, <strong>${orderObj.shippingAddress?.fullName || 'VIP Patron'}</strong>!<br/>
             Your exclusive purchase has been registered securely. Our fragrance artisans are preparing your premium sealed bottle in Karachi!
           </p>

           <div style="background-color: #ffffff; border: 1px solid #eeeeee; padding: 15px; margin: 20px 0; border-radius: 6px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
             <h3 style="margin-top: 0; font-size: 12px; text-transform: uppercase; color: #888888; letter-spacing: 1px;">Invoice Records</h3>
             <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #444444;">
               <tr>
                 <td style="padding: 5px 0; font-weight: bold; width: 140px;">Order ID:</td>
                 <td style="padding: 5px 0;">${orderObj.orderNumber}</td>
               </tr>
               <tr>
                 <td style="padding: 5px 0; font-weight: bold;">Tracking ID:</td>
                 <td style="padding: 5px 0; color: #D4AF37; font-family: monospace;">${orderObj.trackingNumber}</td>
               </tr>
               <tr>
                 <td style="padding: 5px 0; font-weight: bold;">Settle Channel:</td>
                 <td style="padding: 5px 0;">${orderObj.paymentMethod}</td>
               </tr>
               <tr>
                 <td style="padding: 5px 0; font-weight: bold;">Registered Date:</td>
                 <td style="padding: 5px 0;">${orderObj.date}</td>
               </tr>
               <tr style="border-top: 1px solid #f0f0f0;">
                 <td style="padding: 8px 0 0 0; font-weight: bold; font-size: 14px;">Total Billing:</td>
                 <td style="padding: 8px 0 0 0; font-size: 15px; font-weight: bold; color: #050505;">Rs. ${orderObj.total.toLocaleString()}</td>
               </tr>
             </table>
           </div>

           <div style="background-color: #fdfdfd; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; border-radius: 4px;">
             <h3 style="margin-top: 0; font-size: 12px; text-transform: uppercase; color: #888888; letter-spacing: 1px;">Shipment Delivery Destination</h3>
             <p style="margin: 0; font-size: 13px; color: #555555; line-height: 1.5;">
               <strong>Recipient Name:</strong> ${orderObj.shippingAddress?.fullName}<br/>
               <strong>Mobile Phone No:</strong> ${orderObj.shippingAddress?.phone}<br/>
               <strong>Terminal Station:</strong> ${orderObj.shippingAddress?.address}, ${orderObj.shippingAddress?.city}
             </p>
           </div>

           <h3 style="color: #050505; font-size: 13px; margin-top: 25px; border-bottom: 2px solid #D4AF37; padding-bottom: 5px; text-transform: uppercase; letter-spacing: 1px;">Fragrance Box Inventory</h3>
           <div style="font-size: 13px; color: #555555; margin-bottom: 25px;">
             ${orderObj.items.map((it: any) => `
               <div style="padding: 10px 0; border-bottom: 1px dashed #e5e5e5;">
                 <div style="font-weight: bold; color: #050505;">• ${it.product.name} (${it.selectedSize})</div>
                 <div style="color: #666666; font-size: 12px; margin-top: 2px; display: flex; justify-content: space-between;">
                   <span>Quantity: ${it.quantity} @ Rs. ${it.price.toLocaleString()} each</span>
                 </div>
               </div>
             `).join('')}
             
             <div style="margin-top: 15px; text-align: right; font-size: 13px; color: #666666;">
               Subtotal: Rs. ${orderObj.subtotal.toLocaleString()}<br/>
               Delivery Charges: ${orderObj.deliveryCharges > 0 ? `Rs. ${orderObj.deliveryCharges.toLocaleString()}` : 'FREE'}<br/>
               ${orderObj.discount > 0 ? `Promotional Discount: -Rs. ${orderObj.discount.toLocaleString()}<br/>` : ''}
               <strong style="font-size: 15px; color: #050505;">Grand Total Billing: Rs. ${orderObj.total.toLocaleString()}</strong>
             </div>
           </div>

           <p style="color: #888888; font-size: 11px; margin-top: 40px; border-top: 1px solid #eeeeee; padding-top: 15px; text-align: center; line-height: 1.5;">
             For active shipment updates or to adjust formula oil ratios (EDP concentration), coordinate via WhatsApp: +92 314 7155873.<br/>
             © ${new Date().getFullYear()} ARZHAAR BRHAVE.
           </p>
         </div>
      `;

      await sendEmail(customerTarget, customerSubject, customerWelcomeText, customerWelcomeHtml);
    }

    res.json({ 
      success: true, 
      message: 'Order registered securely. Instant transactional dispatch notifications completed.', 
      orderNumber: orderObj.orderNumber,
      receivers: ['bluefa2266@gmail.com', customerTarget].filter(Boolean)
    });

  } catch (error: any) {
    console.error('Order registering route error:', error);
    res.status(500).json({ error: 'Order registration failed.', details: error.message });
  }
});

// 4. API: Register VIP Account & Email Welcome Notification
app.post('/api/register', async (req, res) => {
  try {
    const { email, name, phone, address, city } = req.body;
    if (!email) {
      res.status(400).json({ error: 'Valid email is required.' });
      return;
    }

    const welcomeSubject = '✨ Welcome to Arzhaar Brhave Perfumers VIP Sanctuary!';
    const welcomeText = `Dear ${name || 'Patron'},

Assalam-o-Alaikum!

Thank you for registering a VIP Signature Account with ARZHAAR BRHAVE PERFUMERS, Pakistan's ultra-premium olfactory design boutique in Karachi.

Your registered elite profile details:
- Name: ${name}
- Registered Email Address: ${email}
- Contact Phone: ${phone || 'N/A'}
- Primary Delivery Location: ${address}, ${city}

As a signed club member, you now unlock:
1. 10% OFF on your very next checkout order using the promo code: KARACHI10
2. Bespoke customized scent counseling with our standard signature AI Fragrance Consultant.
3. Priority track dispatcher alerts for Orangi Town premium fragrance drops.

Explore our collection, design your bespoke perfume recipes, and feel free to reach out to us at +92 314 7155873 at any time!

Warm, fragrant regards,
Scent Maestro & Alchemist
ARZHAAR BRHAVE PERFUMERS
Orangi Town, Karachi, Pakistan
Hotline Support: +92 314 7155873
Email Desk: bluefa2266@gmail.com`;

    const welcomeHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; background-color: #fafafa;">
        <div style="text-align: center; border-bottom: 2px solid #D4AF37; padding-bottom: 15px; margin-bottom: 20px;">
          <h1 style="color: #050505; font-size: 24px; margin: 0; font-family: Georgia, serif; font-weight: bold; letter-spacing: 1.5px;">ARZHAAR BRHAVE</h1>
          <p style="color: #D4AF37; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; margin: 5px 0 0 0; font-weight: bold;">Signature Perfumers • Orangi Town, Karachi</p>
        </div>
        
        <h2 style="color: #050505; font-size: 18px; line-height: 1.4; border-bottom: 1px solid #eeeeee; padding-bottom: 10px;">Assalam-o-Alaikum, ${name || 'Valued Patron'}!</h2>
        
        <p style="color: #333333; line-height: 1.6; font-size: 14px;">
          Thank you for registering a <strong>VIP Signature Account</strong> with <strong>Arzhaar Brhave Perfumers</strong>, Karachi's ultra-exclusive olfactory sanctuary.
        </p>

        <div style="background-color: #ffffff; border-left: 4px solid #D4AF37; padding: 15px; margin: 20px 0; border-radius: 4px; box-shadow: 0 1px 3px rgba(0,0,0,0.05);">
          <h3 style="margin-top: 0; font-size: 13px; text-transform: uppercase; color: #888888; letter-spacing: 1px;">Registered Member Profile</h3>
          <table style="width: 100%; border-collapse: collapse; font-size: 13px; color: #444444;">
            <tr>
              <td style="padding: 4px 0; font-weight: bold; width: 120px;">Name:</td>
              <td style="padding: 4px 0;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Email:</td>
              <td style="padding: 4px 0; color: #D4AF37; text-decoration: none;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold;">Mobile Phone:</td>
              <td style="padding: 4px 0;">${phone || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 4px 0; font-weight: bold; vertical-align: top;">Delivery Station:</td>
              <td style="padding: 4px 0; line-height: 1.4;">${address}, ${city}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #f7eed7; border: 1px dashed #D4AF37; padding: 15px; margin: 20px 0; border-radius: 6px; text-align: center;">
          <p style="margin: 0 0 8px 0; font-size: 14px; font-weight: bold; color: #050505;">🎁 SPECIAL EXCLUSIVE NEW MEMBER GIFT</p>
          <p style="margin: 0; font-size: 12px; color: #555555;">Use the luxury launch checkout coupon code below to unlock 10% Off immediately:</p>
          <div style="font-family: monospace; font-size: 17px; font-weight: bold; background: white; padding: 6px 15px; border-radius: 4px; border: 1px solid #D4AF37; display: inline-block; margin-top: 10px; color: #050505; letter-spacing: 1px;">
            KARACHI10
          </div>
        </div>

        <h3 style="color: #050505; font-size: 14px; margin-top: 25px;">Your VIP Benefits Stack:</h3>
        <ul style="color: #555555; padding-left: 20px; font-size: 13px; line-height: 1.6;">
          <li><strong>Bespoke Blended Orders:</strong> Contact our maestro direct at +92 314 7155873 for specialized longevity formulas (30-40% oily concentration).</li>
          <li><strong>Interactive AI Scent Therapist:</strong> Full, continuous access to recommend notes matching Karachi's climates.</li>
          <li><strong>Auto-Track Dispatch:</strong> Saved addresses for rapid checkout.</li>
        </ul>

        <p style="color: #888888; font-size: 11px; margin-top: 40px; border-top: 1px solid #eeeeee; padding-top: 15px; text-align: center; line-height: 1.5;">
          For custom design olfactory requests, please dial +92 314 7155873.<br/>
          MAESTRO HEADQUARTERS: Orangi Town, Karachi, Pakistan.<br/>
          © ${new Date().getFullYear()} ARZHAAR BRHAVE.
        </p>
      </div>
    `;

    // Dispatch welcome email asynchronously
    await sendEmail(email, welcomeSubject, welcomeText, welcomeHtml);

    res.json({ success: true, message: 'VIP member welcome notification completed.' });

  } catch (error: any) {
    console.error('Registration email log error:', error);
    res.status(500).json({ error: 'Failed to process welcome notification email.', details: error.message });
  }
});

// Configure Vite middleware / Static client folder serving
async function bootstrapApp() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`================================================================`);
    console.log(`🛍️ Arzhaar Brhave Perfumes Server running on http://localhost:${PORT}`);
    console.log(`📌 Host: 0.0.0.0 | Port Environment: ${PORT}`);
    console.log(`🤖 AI Chat Route: POST /api/chat`);
    console.log(`📦 Order Dispatch Route: POST /api/orders`);
    console.log(`================================================================`);
  });
}

bootstrapApp();
