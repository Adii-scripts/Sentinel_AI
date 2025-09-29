import { useEffect, useRef } from 'react';

export const useStarfield = (canvasId) => {
  const animationFrameRef = useRef();
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const starsRef = useRef([]);

  useEffect(() => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = width;
      canvas.height = height;
    };

    // Initialize canvas
    setCanvasSize();

    // Create stars
    const createStars = () => {
      const stars = [];
      for (let i = 0; i < 300; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          velocityX: (Math.random() - 0.5) * 0.5,
          velocityY: (Math.random() - 0.5) * 0.5,
          parallaxFactor: Math.random() * 0.3 + 0.1,
        });
      }
      starsRef.current = stars;
    };

    // Handle window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      setCanvasSize();
      createStars();
    };

    // Handle mouse movement
    const handleMouseMove = (event) => {
      mousePositionRef.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mousePositionRef.current;
      const centerX = width / 2;
      const centerY = height / 2;

      starsRef.current.forEach((star) => {
        // Calculate distance from mouse for parallax effect
        const mouseDistanceX = (mouse.x - centerX) * star.parallaxFactor;
        const mouseDistanceY = (mouse.y - centerY) * star.parallaxFactor;

        // Update star position with subtle movement and mouse parallax
        star.x += star.velocityX - mouseDistanceX * 0.0001;
        star.y += star.velocityY - mouseDistanceY * 0.0001;

        // Wrap around screen edges
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;

        // Twinkle effect
        star.opacity += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));

        // Draw star
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${star.opacity})`; // Blue-300 with opacity
        ctx.fill();

        // Add subtle glow for larger stars
        if (star.radius > 1.5) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(147, 197, 253, ${star.opacity * 0.1})`;
          ctx.fill();
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    createStars();
    animate();

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [canvasId]);

  return null;
};