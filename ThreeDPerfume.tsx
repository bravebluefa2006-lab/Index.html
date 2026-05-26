import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, RefreshCw, Eye, Award, Sliders, Type, Flame } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export const ThreeDPerfume: React.FC = () => {
  const { addToast } = useShop();

  // Customization States
  const [liquidColor, setLiquidColor] = useState('#D4AF37'); // Gold, Amber, Rose, etc.
  const [bottleMaterial, setBottleMaterial] = useState<'Crystal Crystal' | 'Frosted Obsidian' | 'Midnight Amber' | 'Emerald Jade'>('Crystal Crystal');
  const [capMaterial, setCapMaterial] = useState<'Imperial Gold' | 'Silver Chrome' | 'Royal Burgundy' | 'Rose Gold'>('Imperial Gold');
  const [customEngraving, setCustomEngraving] = useState('');
  const [spraying, setSpraying] = useState(false);

  // 3D Angles as refs to avoid React update overhead and recursive limits
  const yawRef = useRef(0.4);
  const pitchRef = useRef(0.1);

  // Dragging states
  const isDragging = useRef(false);
  const previousMousePosition = useRef({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);

  // Sound simulation (Synthesized AudioContext or nice feedback alerts)
  const playScentSound = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Spray hiss sound simulation with white noise
      const bufferSize = ctx.sampleRate * 0.4; // 0.4 second spray
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 1200;
      
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
      
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
    } catch (e) {
      // AudioContext fails gracefully inside safe iframe triggers
    }
  };

  const handleSpray = () => {
    setSpraying(true);
    playScentSound();
    addToast(
      customEngraving 
        ? `Spritz! Emitting your custom '${customEngraving}' personalized bottle scent!`
        : "Spritz! Emitting fresh luxury notes (Amber, Rose, Oud) into your surrounding space!",
      "success"
    );

    // Add immediate particles popping from bottle top (Y is around nozzle height)
    const nozzleX = 200;
    const nozzleY = 90;
    for (let i = 0; i < 30; i++) {
      particles.current.push({
        x: nozzleX,
        y: nozzleY,
        vx: (Math.random() - 0.5) * 8 + (Math.sin(yawRef.current) * 3),
        vy: -Math.random() * 6 - 3,
        size: Math.random() * 5 + 3,
        alpha: 0.9,
        color: liquidColor
      });
    }

    setTimeout(() => {
      setSpraying(false);
    }, 450);
  };

  // Reset Customizations
  const handleReset = () => {
    setLiquidColor('#D4AF37');
    setBottleMaterial('Crystal Crystal');
    setCapMaterial('Imperial Gold');
    setCustomEngraving('');
    yawRef.current = 0.4;
    pitchRef.current = 0.1;
    addToast("Perfume customizer settings restored to Royal Amber.", "info");
  };

  // Dragging event handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousMousePosition.current.x;
    const deltaY = e.clientY - previousMousePosition.current.y;

    yawRef.current += deltaX * 0.01;
    pitchRef.current = Math.min(Math.max(pitchRef.current + deltaY * 0.01, -0.6), 0.6);

    previousMousePosition.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
  };

  // Touch triggers for mobile clients
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 0) return;
    isDragging.current = true;
    previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || e.touches.length === 0) return;
    const deltaX = e.touches[0].clientX - previousMousePosition.current.x;
    const deltaY = e.touches[0].clientY - previousMousePosition.current.y;

    yawRef.current += deltaX * 0.012;
    pitchRef.current = Math.min(Math.max(pitchRef.current + deltaY * 0.012, -0.6), 0.6);

    previousMousePosition.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  // Core 3D Projection Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Define Center Point
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 20;

      // Draw floor shadow
      ctx.beginPath();
      ctx.ellipse(cx, cy + 90, 75, 18, 0, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
      ctx.filter = 'blur(8px)';
      ctx.fill();
      ctx.filter = 'none';

      // Perspective projection helper function
      const project = (x3d: number, y3d: number, z3d: number) => {
        // Rotate around Y axis (Yaw)
        const cosY = Math.cos(yawRef.current);
        const sinY = Math.sin(yawRef.current);
        let rX = x3d * cosY - z3d * sinY;
        let rZ = x3d * sinY + z3d * cosY;

        // Rotate around X axis (Pitch)
        const cosX = Math.cos(pitchRef.current);
        const sinX = Math.sin(pitchRef.current);
        let rY = y3d * cosX - rZ * sinX;
        rZ = y3d * sinX + rZ * cosX;

        // Perspective factor
        const d = 360;
        const scale = d / (d + rZ);
        return {
          x: cx + rX * scale,
          y: cy + rY * scale,
          depth: rZ
        };
      };

      // 3D Glass Bottle Geometry definition
      const draw3DBox = (
        width: number, 
        height: number, 
        depth: number, 
        yOffset: number, 
        fillColor: string, 
        borderColor: string, 
        isGlass: boolean = false,
        liquidLevelPercent: number = 0
      ) => {
        // 8 Vertices of standard 3D Box
        const hw = width / 2;
        const hh = height / 2;
        const hd = depth / 2;

        const vertices = [
          project(-hw, -hh + yOffset, -hd), // T-FL
          project(hw, -hh + yOffset, -hd),  // T-FR
          project(hw, -hh + yOffset, hd),   // T-BR
          project(-hw, -hh + yOffset, hd),  // T-BL
          project(-hw, hh + yOffset, -hd),  // B-FL
          project(hw, hh + yOffset, -hd),   // B-FR
          project(hw, hh + yOffset, hd),    // B-BR
          project(-hw, hh + yOffset, hd)     // B-BL
        ];

        // Core 6 Faces of the 3D Box
        const faces = [
          { indices: [0, 1, 5, 4], label: 'front', avgD: (vertices[0].depth + vertices[1].depth + vertices[5].depth + vertices[4].depth) / 4 },
          { indices: [1, 2, 6, 5], label: 'right', avgD: (vertices[1].depth + vertices[2].depth + vertices[6].depth + vertices[5].depth) / 4 },
          { indices: [2, 3, 7, 6], label: 'back', avgD: (vertices[2].depth + vertices[3].depth + vertices[7].depth + vertices[6].depth) / 4 },
          { indices: [3, 0, 4, 7], label: 'left', avgD: (vertices[3].depth + vertices[0].depth + vertices[4].depth + vertices[7].depth) / 4 },
          { indices: [3, 2, 1, 0], label: 'top', avgD: (vertices[3].depth + vertices[2].depth + vertices[1].depth + vertices[0].depth) / 4 },
          { indices: [4, 5, 6, 7], label: 'bottom', avgD: (vertices[4].depth + vertices[5].depth + vertices[6].depth + vertices[7].depth) / 4 }
        ];

        // Sort faces by depth (painters algorithm) to render from back to front
        faces.sort((a, b) => b.avgD - a.avgD);

        faces.forEach(face => {
          const path = face.indices.map(idx => vertices[idx]);

          ctx.beginPath();
          ctx.moveTo(path[0].x, path[0].y);
          for (let i = 1; i < path.length; i++) {
            ctx.lineTo(path[i].x, path[i].y);
          }
          ctx.closePath();

          // Fill of Face (Transparent Luxurious Crystal effect)
          if (isGlass) {
            if (face.label === 'front' || face.label === 'top' || face.label === 'right') {
              const grad = ctx.createLinearGradient(path[0].x, path[0].y, path[2].x, path[2].y);
              if (bottleMaterial === 'Crystal Crystal') {
                grad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
                grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.1)');
                grad.addColorStop(1, 'rgba(220, 220, 255, 0.35)');
              } else if (bottleMaterial === 'Frosted Obsidian') {
                grad.addColorStop(0, 'rgba(15, 15, 15, 0.85)');
                grad.addColorStop(0.5, 'rgba(40, 40, 40, 0.65)');
                grad.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
              } else if (bottleMaterial === 'Midnight Amber') {
                grad.addColorStop(0, 'rgba(100, 50, 10, 0.7)');
                grad.addColorStop(0.5, 'rgba(183, 110, 121, 0.4)');
                grad.addColorStop(1, 'rgba(30, 10, 0, 0.85)');
              } else {
                // Emerald Jade
                grad.addColorStop(0, 'rgba(2, 48, 32, 0.75)');
                grad.addColorStop(0.5, 'rgba(46, 139, 87, 0.45)');
                grad.addColorStop(1, 'rgba(1, 20, 10, 0.85)');
              }
              ctx.fillStyle = grad;
            } else {
              ctx.fillStyle = bottleMaterial === 'Frosted Obsidian' ? 'rgba(5, 5, 5, 0.6)' : 'rgba(255, 255, 255, 0.05)';
            }
          } else {
            ctx.fillStyle = fillColor;
          }
          ctx.fill();

          // Liquid rendering (inside the glass container)
          if (isGlass && liquidLevelPercent > 0 && face.label !== 'top' && face.label !== 'bottom') {
            // Overlay liquid drawing based on Level
            ctx.save();
            ctx.beginPath();
            ctx.moveTo(path[0].x, path[0].y);
            for (let i = 1; i < path.length; i++) {
              ctx.lineTo(path[i].x, path[i].y);
            }
            ctx.closePath();
            ctx.clip(); // Limit liquid to inside this face path

            // Horizontal liquid band
            const lowestY = Math.max(...path.map(p => p.y));
            const highestY = Math.min(...path.map(p => p.y));
            const levelY = lowestY - (lowestY - highestY) * liquidLevelPercent;

            ctx.beginPath();
            ctx.rect(cx - 100, levelY, 200, 200); // Draw liquid block
            
            // Generate glowing liquid gradient
            const liquidGrad = ctx.createLinearGradient(cx - width/2, cy, cx + width/2, cy);
            liquidGrad.addColorStop(0, liquidColor + 'b0'); // Transparency
            liquidGrad.addColorStop(0.5, liquidColor + 'e5');
            liquidGrad.addColorStop(1, liquidColor + '70');

            ctx.fillStyle = liquidGrad;
            ctx.fill();
            ctx.restore();
          }

          // Frame outlines
          ctx.strokeStyle = borderColor;
          ctx.lineWidth = isGlass ? 1.5 : 1.2;
          ctx.stroke();

          // Render front bottle label (Dynamic Engraving typed by the user!)
          if (isGlass && face.label === 'front') {
            // Label box in center
            const xCenter = (path[0].x + path[1].x + path[2].x + path[3].x) / 4;
            const yCenter = (path[0].y + path[1].y + path[2].y + path[3].y) / 4;

            // Draw clean miniature white/gold card logo paper
            ctx.beginPath();
            // Shrink coordinates for clean spacing
            const lw = width * 0.58;
            const lh = height * 0.42;

            ctx.fillStyle = '#0a0a0a';
            ctx.strokeStyle = '#D4AF37';
            ctx.lineWidth = 1;
            
            // Draw luxury badge outline
            ctx.beginPath();
            ctx.rect(xCenter - lw/2, yCenter - lh/2 + 5, lw, lh);
            ctx.fill();
            ctx.stroke();

            // Gold brand label text
            ctx.fillStyle = '#D4AF37';
            ctx.font = 'bold 9px serif';
            ctx.textAlign = 'center';
            ctx.fillText('ARZHAAR BRHAVE', xCenter, yCenter - lh/2 + 20);

            ctx.fillStyle = '#ffffff';
            ctx.font = 'normal 7px monospace';
            ctx.fillText('EXTRAIT DE PARFUM', xCenter, yCenter - lh/2 + 28);

            // Engraving message matching custom label field
            ctx.fillStyle = '#B76E79';
            ctx.font = 'bold italic 8px serif';
            const displayEngrave = customEngraving.trim() ? `"${customEngraving}"` : 'VIP EXCLUSIVE';
            ctx.fillText(displayEngrave, xCenter, yCenter + lh/2 - 12);

            // Tiny border coordinates lines
            ctx.beginPath();
            ctx.moveTo(xCenter - 15, yCenter + 2);
            ctx.lineTo(xCenter + 15, yCenter + 2);
            ctx.strokeStyle = 'rgba(212, 175, 55, 0.4)';
            ctx.stroke();
          }
        });
      };

      // RENDER ORDER: Back-to-front depth coordinates
      
      // 1. Draw Gold Straw (Dip tube) through center
      const strawTop = project(0, -22, 0);
      const strawBottom = project(0, 68, 0);
      ctx.beginPath();
      ctx.moveTo(strawTop.x, strawTop.y);
      ctx.lineTo(strawBottom.x, strawBottom.y);
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.65)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // 2. Main Glass Bottle Container (Width: 92, Height: 104, Depth: 55, Y-offset: 25)
      draw3DBox(92, 104, 55, 25, 'rgba(255, 255, 255, 0.25)', 'rgba(212, 175, 55, 0.4)', true, 0.75);

      // 3. Draw Scent Cap Neck collar
      let capColors = { fill: '#D4AF37', border: '#ffeaa7' };
      if (capMaterial === 'Silver Chrome') capColors = { fill: '#dfe6e9', border: '#ffffff' };
      if (capMaterial === 'Royal Burgundy') capColors = { fill: '#4a0404', border: '#8b0000' };
      if (capMaterial === 'Rose Gold') capColors = { fill: '#B76E79', border: '#ffeaa7' };

      // Neck Cylinder (Width: 26, Height: 10)
      draw3DBox(26, 12, 26, -34, capColors.fill, capColors.border, false, 0);

      // 4. Main Atomizer Spray Cap head (Width: 46, Height: 30)
      draw3DBox(44, 28, 44, -54, capColors.fill, capColors.border, false, 0);

      // 5. Draw interactive fluid spray particles list
      particles.current.forEach((p, index) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.15; // Gravity
        p.alpha -= 0.02; // Fading
        p.size *= 0.98; // Shrinking

        if (p.alpha <= 0 || p.y > canvas.height) {
          particles.current.splice(index, 1);
          return;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        
        // Atomizer mist glow
        const radial = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        radial.addColorStop(0, p.color + 'aa');
        radial.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = radial;
        ctx.fill();
        ctx.restore();
      });

      // Nozzle hole visualization during spin rotation
      const nozzleProj = project(0, -96, 21);
      ctx.beginPath();
      ctx.arc(nozzleProj.x, nozzleProj.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // Auto-rotate slight swing angle if not being dragged currently (slow idle motion)
      if (!isDragging.current) {
        yawRef.current += 0.004;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [liquidColor, bottleMaterial, capMaterial, customEngraving]);

  return (
    <section className="bg-neutral-950 border-t border-b border-[#D4AF37]/20 py-16 overflow-hidden relative">
      
      {/* Decorative luxury corners */}
      <div className="absolute top-4 left-4 w-12 h-12 border-t border-l border-[#D4AF37]/45 pointer-events-none"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-[#D4AF37]/45 pointer-events-none"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-[#D4AF37]/45 pointer-events-none"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-b border-r border-[#D4AF37]/45 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Layout Headings */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-gold hover:text-white transition-colors flex items-center justify-center gap-1.5 leading-none">
            <Award className="w-4 h-4 text-gold" />
            <span>OLFACTORY 3D VIRTUAL LAB</span>
          </span>
          <h2 className="text-3xl md:text-5xl font-serif text-white font-black tracking-wide">
            Arzhaar Scent Studio 3D
          </h2>
          <p className="text-xs text-neutral-400 font-sans max-w-lg mx-auto leading-relaxed">
            Configure your bespoke luxury perfume bottle. Drag to rotate in full <strong className="text-gold">3D space</strong>, customize the liquid extract blend, and engrave your custom noble tag!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-charcoal/40 border border-neutral-900 rounded-3xl p-6 sm:p-10 relative overflow-hidden backdrop-blur shadow-3xl">
          
          {/* Left Column: Interactive 3D Canvas Box - span 6 */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="relative bg-gradient-to-b from-[#0b0b0d] to-[#040405] border border-neutral-850/80 rounded-2xl w-full max-w-[420px] aspect-square flex items-center justify-center cursor-all-scroll group shadow-inner">
              
              {/* Help notification */}
              <div className="absolute top-3 right-3 bg-neutral-950/80 border border-neutral-800 text-[9px] font-mono rounded-full px-2.5 py-1 text-neutral-400 flex items-center gap-1 z-10">
                <Eye className="w-3.5 h-3.5 text-gold animate-pulse" />
                <span>Drag to Rotate Bottle 3D</span>
              </div>

              {/* Core Projection Canvas */}
              <canvas
                ref={canvasRef}
                width={400}
                height={400}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUpOrLeave}
                onMouseLeave={handleMouseUpOrLeave}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUpOrLeave}
                className="w-full h-full object-contain filter drop-shadow-[0_20px_50px_rgba(212,175,55,0.15)]"
              />

              {/* Glowing spray animation trigger overlay */}
              {spraying && (
                <div className="absolute inset-0 pointer-events-none bg-gold/5 flex items-center justify-center animate-pulse">
                  <div className="text-[10px] font-mono tracking-widest text-[#D4AF37] border border-[#D4AF37]/50 rounded px-3 py-1 bg-black/60 uppercase">
                    💥 Scent Atomized!
                  </div>
                </div>
              )}
            </div>

            {/* Quick action triggers */}
            <div className="flex gap-4 mt-6 w-full max-w-[420px]">
              <button
                onClick={handleSpray}
                className="flex-1 bg-gold-gradient text-neutral-950 font-sans font-bold py-3.5 px-4 rounded-xl uppercase text-xs tracking-wider flex items-center justify-center gap-2 hover:opacity-90 active:scale-97 cursor-pointer shadow-xl border border-gold/45"
              >
                <Flame className="w-4.5 h-4.5 animate-pulse" />
                <span>Spray Scent spritz</span>
              </button>

              <button
                onClick={handleReset}
                className="border border-neutral-800 bg-neutral-950 hover:bg-neutral-900 text-neutral-400 hover:text-white px-4 rounded-xl transition-all flex items-center justify-center cursor-pointer"
                title="Reset to Amber default"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Customizer parameters form - span 6 */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Scent Custom Label input */}
            <div className="space-y-2">
              <h4 className="font-serif font-bold text-white text-base tracking-wide flex items-center gap-2 border-b border-neutral-900 pb-2.5">
                <Type className="w-4.5 h-4.5 text-gold-dark" />
                <span>Engrave Custom Noble Tag Label</span>
              </h4>
              <p className="text-[11px] text-neutral-400 font-sans leading-normal">
                Personalize your perfume flask with a custom tag! Renders dynamically in a gold calligraphy shield.
              </p>
              <input
                type="text"
                maxLength={18}
                value={customEngraving}
                onChange={e => setCustomEngraving(e.target.value.toUpperCase())}
                placeholder="e.g. ADEEL OWAIS / BRIDE SUTRA"
                className="w-full bg-[#0d0d0f] border border-neutral-800 focus:border-gold/50 rounded-xl px-4 py-3 text-xs font-mono text-gold uppercase placeholder-neutral-700 tracking-wider focus:outline-none transition-colors"
              />
            </div>

            {/* Scent Liquid selection */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-white text-base tracking-wide flex items-center gap-2 border-b border-neutral-900 pb-2.5">
                <Sliders className="w-4.5 h-4.5 text-gold-dark" />
                <span>Aroma Concentrate Formula Blends</span>
              </h4>
              <p className="text-[11px] text-neutral-400 font-sans">
                Choose the liquid extract base formula, defining the oil density and top note tone:
              </p>

              <div className="grid grid-cols-2 gap-3 text-left">
                {[
                  { name: 'Oud Al-Karachi', desc: 'Resinous black raw woody oudh', color: '#D4AF37' },
                  { name: 'Gourmand Rose', desc: 'Amber vanilla sweet sugar syrup', color: '#B76E79' },
                  { name: 'Khamrah Divine', desc: 'Sweet golden premium date liqueur', color: '#c0392b' },
                  { name: 'Mint Emerald', desc: 'Ice moss marine summer splash', color: '#2ecc71' },
                  { name: 'Sapphire Musk', desc: 'Cool mountain patchouli wood extract', color: '#2980b9' }
                ].map((blend, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setLiquidColor(blend.color);
                      addToast(`Selected ${blend.name} liquid extract blend!`, "success");
                    }}
                    className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      liquidColor === blend.color 
                        ? 'bg-burgundy/15 border-[#D4AF37] shadow' 
                        : 'bg-[#0d0d0f] border-neutral-850 hover:border-neutral-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border border-neutral-800" style={{ backgroundColor: blend.color }}></span>
                      <span className="text-xs font-serif font-bold text-neutral-200">{blend.name}</span>
                    </div>
                    <p className="text-[9px] text-neutral-400 leading-normal mt-1.5">{blend.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Extra Premium selections */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Bottle Material Flask */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide block">Bottle Glass Texture</label>
                <select
                  value={bottleMaterial}
                  onChange={e => {
                    setBottleMaterial(e.target.value as any);
                    addToast(`Refining bottle texture to ${e.target.value}!`, "info");
                  }}
                  className="w-full bg-[#0d0d0f] border border-neutral-850 focus:border-gold/45 rounded-xl px-3.5 py-3 text-xs text-neutral-300 focus:outline-none focus:ring-0 cursor-pointer"
                >
                  <option value="Crystal Crystal">🌟 Transparent High-End Crystal</option>
                  <option value="Frosted Obsidian">🖤 Deep Frosted Sleek Obsidian</option>
                  <option value="Midnight Amber">🪵 Heavy Red-Maroon Royal Amber</option>
                  <option value="Emerald Jade">🍃 Traditional Green Mint Jade</option>
                </select>
              </div>

              {/* Cap Atomizer Material */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wide block">Cylinder Atomizer Cap</label>
                <select
                  value={capMaterial}
                  onChange={e => {
                    setCapMaterial(e.target.value as any);
                    addToast(`Atomizer cap material set to ${e.target.value}!`, "info");
                  }}
                  className="w-full bg-[#0d0d0f] border border-neutral-850 focus:border-gold/45 rounded-xl px-3.5 py-3 text-xs text-neutral-300 focus:outline-none focus:ring-0 cursor-pointer"
                >
                  <option value="Imperial Gold">👑 Royal Gold Enamel</option>
                  <option value="Silver Chrome">💿 Polished Mirror Chrome</option>
                  <option value="Royal Burgundy">🍷 Heavy Velvet Burgundy</option>
                  <option value="Rose Gold">🌸 Exquisite Satin Rose Gold</option>
                </select>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
