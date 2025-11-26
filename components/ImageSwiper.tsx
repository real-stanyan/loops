"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

// 模拟数据
const SLIDES = [
  { id: 1, src: "/homepage/ImageSwiper_1.webp", alt: "Product 1" },
  { id: 2, src: "/homepage/ImageSwiper_2.webp", alt: "Product 2" },
  { id: 3, src: "/homepage/ImageSwiper_3.webp", alt: "Product 3" },
  { id: 4, src: "/homepage/ImageSwiper_1.webp", alt: "Product 1" },
  { id: 5, src: "/homepage/ImageSwiper_2.webp", alt: "Product 2" },
  { id: 6, src: "/homepage/ImageSwiper_3.webp", alt: "Product 3" },
];

const ImageSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [visibleItems, setVisibleItems] = useState(1);

  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    const handleResize = () => {
      // 768px 断点：>= 768 显示3个，< 768 显示1个
      if (window.innerWidth >= 768) {
        setVisibleItems(3);
      } else {
        setVisibleItems(1);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = SLIDES.length - visibleItems;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => {
      if (prev >= maxIndex) return 0;
      return prev + 1;
    });
  }, [maxIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev <= 0) return maxIndex;
      return prev - 1;
    });
  };

  const goToSlide = (index: number) => {
    if (index > maxIndex) {
      setCurrentIndex(maxIndex);
    } else {
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [isHovered, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsHovered(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="w-full py-10 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out will-change-transform"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`,
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {SLIDES.map((slide) => (
            <div
              key={slide.id}
              // -----------------------------------------------------------
              // 【关键修改】：这里使用了 aspect-[1140/1120]
              //  这会强制容器比例与你的原图 (1140x1120) 完全一致
              //  避免了使用 4/3 或 1/1 造成的轻微裁剪或留白
              // -----------------------------------------------------------
              className="flex-shrink-0 relative w-full md:w-1/3 aspect-[1140/1120]"
            >
              <div className="relative w-full h-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  // 依然使用 cover，但在上面的 aspect 约束下，它实际上是 full contain
                  className="object-cover"
                  draggable={false}
                  // -------------------------------------------------------
                  // 【性能优化】：
                  //  移动端 (max-width: 768px): 图片宽度 = 100vw (全屏宽)
                  //  桌面端: 图片宽度 = 33vw (屏幕宽度的 1/3)
                  // -------------------------------------------------------
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-3 mt-8">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            // 如果你在桌面端不希望显示“无法点击”的多余圆点，可以在这里加判断
            // 但为了保持设计一致性，这里保留了所有圆点
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index
                ? "bg-[#cc2b2b] scale-110"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSwiper;
