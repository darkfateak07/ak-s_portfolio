import React, { useRef, useEffect, useState } from 'react';

const ScrollAnimationWrapper = ({
  children,
  direction = 'up',
  delay = 0,
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay]);

  const getTransformClass = () => {
    if (isVisible) return 'translate-x-0 translate-y-0 opacity-100';
    
    switch (direction) {
      case 'left':
        return '-translate-x-20 opacity-0';
      case 'right':
        return 'translate-x-20 opacity-0';
      case 'down':
        return 'translate-y-20 opacity-0';
      default:
        return 'translate-y-20 opacity-0';
    }
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${getTransformClass()} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollAnimationWrapper;