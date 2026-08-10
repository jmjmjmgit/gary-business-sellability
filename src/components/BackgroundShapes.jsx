import React, { useEffect, useRef } from 'react';

export const BackgroundShapes = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Dark liquid shape objects
    const shapes = [
      { x: width * 0.2, y: height * 0.3, radius: 280, vx: 0.4, vy: 0.3, color: 'rgba(15, 32, 67, 0.85)' },
      { x: width * 0.8, y: height * 0.7, radius: 340, vx: -0.3, vy: -0.4, color: 'rgba(42, 187, 210, 0.35)' },
      { x: width * 0.5, y: height * 0.8, radius: 260, vx: 0.5, vy: -0.2, color: 'rgba(28, 17, 48, 0.9)' },
      { x: width * 0.7, y: height * 0.2, radius: 300, vx: -0.2, vy: 0.5, color: 'rgba(12, 54, 76, 0.75)' },
      { x: width * 0.3, y: height * 0.6, radius: 220, vx: 0.3, vy: -0.5, color: 'rgba(24, 49, 83, 0.8)' }
    ];

    let time = 0;

    const render = () => {
      time += 0.008;

      // Dark background canvas fill
      ctx.fillStyle = '#07090E';
      ctx.fillRect(0, 0, width, height);

      // Render dark morphing abstract shapes with radial gradients
      shapes.forEach((shape, index) => {
        // Move shape
        shape.x += shape.vx + Math.sin(time + index) * 0.5;
        shape.y += shape.vy + Math.cos(time + index * 1.5) * 0.5;

        // Bounce off canvas boundaries
        if (shape.x - shape.radius < -100 || shape.x + shape.radius > width + 100) shape.vx *= -1;
        if (shape.y - shape.radius < -100 || shape.y + shape.radius > height + 100) shape.vy *= -1;

        // Dynamic pulsing radius
        const currentRadius = shape.radius + Math.sin(time * 2 + index) * 25;

        const gradient = ctx.createRadialGradient(
          shape.x,
          shape.y,
          0,
          shape.x,
          shape.y,
          currentRadius
        );

        gradient.addColorStop(0, shape.color);
        gradient.addColorStop(0.6, shape.color.replace(/[\d\.]+\)$/, '0.4)'));
        gradient.addColorStop(1, 'rgba(7, 9, 14, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(shape.x, shape.y, currentRadius, 0, Math.PI * 2);
        ctx.fill();
      });

      // Ambient liquid grid noise texture overlay
      ctx.fillStyle = 'rgba(255, 255, 255, 0.015)';
      for (let i = 0; i < width; i += 40) {
        ctx.fillRect(i, 0, 1, height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="canvas-bg" />;
};
