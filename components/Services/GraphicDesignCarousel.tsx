"use client";

import React, { useEffect, useState, useRef, useMemo, type JSX } from "react";
import {
  motion,
  spring,
  useMotionValue,
  useTransform,
  type PanInfo,
  type Transition,
} from "motion/react";

export interface CarouselItem {
  title: string;
  id: number;
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  /** round 被写死为 false，传与不传都无效 */
  round?: boolean;
}

const DEFAULT_ITEMS: CarouselItem[] = [
  { title: "Branding (Logo, Business Card etc.)", id: 1 },
  { title: "Social Media Graphics", id: 2 },
  { title: "Capability Statements", id: 3 },
  { title: "Email Newsletter & EDM Design", id: 4 },
  { title: "Photo Editing & Retouching", id: 5 },
  { title: "Presentation & Pitch Deck", id: 6 },
  { title: "Signage Design", id: 7 },
  { title: "Motion Graphics", id: 8 },
  { title: "App UI & UX Design", id: 9 },
  { title: "Web Banners", id: 10 },
  { title: "Merchandise Design", id: 11 },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS: Transition = {
  type: spring,
  stiffness: 300,
  damping: 30,
};

export default function GraphicDesignCarousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
}: CarouselProps): JSX.Element {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  // --- 将 items 每 4 个分为一组（每组 = 一屏 = 一个 slide div）
  const groups = useMemo(() => {
    const g: CarouselItem[][] = [];
    for (let i = 0; i < items.length; i += 4) g.push(items.slice(i, i + 4));
    // 至少有一组，避免空数组导致计算问题
    return g.length ? g : [[]];
  }, [items]);

  const carouselGroups = loop ? [...groups, groups[0]] : groups;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pauseOnHover || !containerRef.current) return;
    const el = containerRef.current;
    const enter = () => setIsHovered(true);
    const leave = () => setIsHovered(false);
    el.addEventListener("mouseenter", enter);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mouseenter", enter);
      el.removeEventListener("mouseleave", leave);
    };
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || (pauseOnHover && isHovered)) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === groups.length - 1 && loop) return prev + 1; // 到克隆组
        if (prev === carouselGroups.length - 1) return loop ? 0 : prev;
        return prev + 1;
      });
    }, autoplayDelay);
    return () => clearInterval(timer);
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    groups.length,
    carouselGroups.length,
    pauseOnHover,
  ]);

  const effectiveTransition: Transition = isResetting
    ? { duration: 0 }
    : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselGroups.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === groups.length - 1) {
        setCurrentIndex(currentIndex + 1); // 去克隆组
      } else {
        setCurrentIndex((prev) =>
          Math.min(prev + 1, carouselGroups.length - 1)
        );
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(groups.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselGroups.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden p-4 rounded-[24px]"
      style={{ width: `${baseWidth}px` }}
    >
      <h1 className="font-mono font-black pb-4 text-2xl text-center">
        Design & Dev
      </h1>

      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${
            currentIndex * trackItemOffset + itemWidth / 2
          }px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselGroups.map((group, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const rotateY = useTransform(x, range, [90, 0, -90], {
            clamp: false,
          });

          return (
            <motion.div
              key={index}
              className={`
                relative shrink-0 flex flex-col bg-[var(--foreground)]
                border border-[#222] rounded-[12px] overflow-hidden
                text-[var(--background)]
              `}
              style={{ width: itemWidth, height: "100%", rotateY }}
              transition={effectiveTransition}
            >
              {/* 每个 slide 内放 4 个卡片 */}
              <div className="flex flex-col gap-3 p-4">
                {group.map((item) => (
                  <div
                    key={item.id}
                    className={`
                      flex items-center justify-start h-24 rounded-lg border border-[#2a2a2a] px-3
                      hover:bg-black hover:text-white duration-200 transition-colors ease-in-out
                      `}
                  >
                    <div className="font-black text-sm leading-tight">
                      {item.title}
                    </div>
                  </div>
                ))}
                {/* 不足 4 个时，占位保持对齐 */}
                {Array.from({ length: Math.max(0, 4 - group.length) }).map(
                  (_, i) => (
                    <div
                      key={`ph-${i}`}
                      className="h-24 rounded-lg border border-transparent"
                    />
                  )
                )}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* 圆点跟随“组”而不是 item */}
      <div className="flex w-full justify-center">
        <div className="mt-4 flex w-[100px] justify-between px-8">
          {groups.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % groups.length === index
                  ? "bg-[#fff]"
                  : "bg-[rgba(255,255,255,0.4)]"
              }`}
              animate={{
                scale: currentIndex % groups.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
