import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const observerRef = useRef(null);
  const frameRef = useRef(null);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 40, stiffness: 400, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  const outerSpringConfig = { damping: 30, stiffness: 250, mass: 0.8 };
  const outerX = useSpring(cursorX, outerSpringConfig);
  const outerY = useSpring(cursorY, outerSpringConfig);

  useEffect(() => {
    // Check if desktop on mount
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;
    
    document.body.classList.add('custom-cursor-active');

    const moveCursor = (e) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = requestAnimationFrame(() => {
        cursorX.set(e.clientX - 8);
        cursorY.set(e.clientY - 8);
        if (!isVisible) setIsVisible(true);
      });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);
    const handleHoverStart = () => setIsHovered(true);
    const handleHoverEnd = () => setIsHovered(false);

    window.addEventListener('mousemove', moveCursor, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Debounced interactive element listener
    let bindTimeout = null;
    const updateInteractiveListeners = () => {
      if (bindTimeout) clearTimeout(bindTimeout);
      bindTimeout = setTimeout(() => {
        const interactives = document.querySelectorAll('a, button, [role="button"], input, select, textarea, .interactive-hover');
        interactives.forEach((el) => {
          el.removeEventListener('mouseenter', handleHoverStart);
          el.removeEventListener('mouseleave', handleHoverEnd);
          el.addEventListener('mouseenter', handleHoverStart);
          el.addEventListener('mouseleave', handleHoverEnd);
        });
      }, 100);
    };

    updateInteractiveListeners();
    observerRef.current = new MutationObserver(updateInteractiveListeners);
    observerRef.current.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.body.classList.remove('custom-cursor-active');
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (observerRef.current) observerRef.current.disconnect();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (bindTimeout) clearTimeout(bindTimeout);
    };
  }, [isDesktop]);

  if (!isDesktop || !isVisible) return null;

  return (
    <>
      {/* Small dot center */}
      <motion.div
        className="fixed top-0 left-0 w-4 h-4 bg-brand-earth rounded-full pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          willChange: 'transform',
        }}
        animate={{
          scale: isHovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      {/* Outer soft ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 border border-brand-earth/30 rounded-full pointer-events-none z-[9999]"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-25%',
          translateY: '-25%',
          willChange: 'transform',
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          borderColor: isHovered ? 'rgba(235, 220, 185, 0.6)' : 'rgba(168, 124, 102, 0.3)',
          backgroundColor: isHovered ? 'rgba(168, 124, 102, 0.05)' : 'rgba(0,0,0,0)'
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      />
    </>
  );
};

export default React.memo(CustomCursor);
