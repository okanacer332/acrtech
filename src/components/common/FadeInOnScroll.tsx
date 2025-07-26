// src/components/common/FadeInOnScroll.tsx
'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Box } from '@mui/material';

interface FadeInOnScrollProps {
  children: React.ReactNode;
  delay?: number; // Animasyon gecikmesi (milisaniye cinsinden)
  duration?: number; // Animasyon süresi (milisaniye cinsinden)
  threshold?: number; // Elementin ne kadarının görünür olması gerektiği (yüzde olarak)
}

const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({
  children,
  delay = 0,
  duration = 800,
  threshold = 0.1, // Elementin %10'u görünür olduğunda tetikle
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Element viewport'a girdiğinde görünür olarak işaretle
          if (entry.isIntersecting) {
            setIsVisible(true);
            // İsteğe bağlı: Görünür olduktan sonra gözlemlemeyi durdurarak kaynak tasarrufu yapabiliriz
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: threshold,
        // rootMargin: '0px 0px -50px 0px', // İsteğe bağlı: Elementin ne zaman görünür kabul edileceğini ayarlayın
      }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    // Temizleme: Bileşen kaldırıldığında gözlemciyi kapat
    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
      observer.disconnect();
    };
  }, [threshold]); // threshold değiştiğinde efekti yeniden çalıştır

  return (
    <Box
      ref={domRef}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity ${duration}ms ease-out ${delay}ms, transform ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </Box>
  );
};

export default FadeInOnScroll;