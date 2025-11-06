"use client";

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { gsap } from "gsap";
import { useTranslations } from "next-intl";

/* ================== Types ================== */
export interface CardSwapProps {
  width?: number | string; // default 680
  height?: number | string; // default 460
  cardDistance?: number; // X spacing
  verticalDistance?: number; // Y/Z spacing
  delay?: number; // autoplay ms
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
  leftTitle?: ReactNode; // override i18n default
  leftText?: ReactNode; // override i18n default
  className?: string;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

/* ================== Card ================== */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`absolute top-1/2 left-1/2 rounded-xl border-2 border-white/20 bg-black/70 overflow-hidden
        shadow-2xl [transform-style:preserve-3d] [will-change:transform] [backface-visibility:hidden]
        pointer-events-auto cursor-target text-[#f5f5f7]
        ${customClass ?? ""} ${rest.className ?? ""}`.trim()}
    />
  )
);
Card.displayName = "Card";

/* ================== Utils ================== */
type CardRef = React.RefObject<HTMLDivElement | null>;
interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (
  i: number,
  distX: number,
  distY: number,
  total: number
): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: "center center",
    zIndex: slot.zIndex,
    force3D: true,
  });

/* ================== Main ================== */
const CardSwap: React.FC<CardSwapProps> = (props) => {
  const {
    width = 680,
    height = 460,
    cardDistance = 60,
    verticalDistance = 70,
    delay = 5000,
    pauseOnHover = false,
    onCardClick,
    skewAmount = 6,
    easing = "elastic",
    children,
    leftTitle,
    leftText,
    className = "",
  } = props;

  // i18n 文案（HomePage.hero_texts）
  const t = useTranslations("Projects");
  const resolvedLeftTitle = leftTitle ?? (
    <span className="block text-2xl md:text-3xl xl:text-4xl font-semibold uppercase">
      {t("title")}
    </span>
  );
  const resolvedLeftText = leftText ?? (
    <span className="block text-base md:text-lg opacity-80">
      {t("content")}
    </span>
  );

  const config =
    easing === "elastic"
      ? {
          ease: "elastic.out(0.6, 0.9)" as gsap.EaseString,
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05,
        }
      : {
          ease: "power1.inOut" as gsap.EaseString,
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2,
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );

  const refs = useMemo<CardRef[]>(
    () => childArr.map(() => React.createRef<HTMLDivElement>() as CardRef),
    [childArr.length]
  );

  const order = useRef<number[]>(
    Array.from({ length: childArr.length }, (_, i) => i)
  );
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const total = refs.length;

    // 初始定位
    refs.forEach((r, i) => {
      if (r.current) {
        placeNow(
          r.current,
          makeSlot(i, cardDistance, verticalDistance, total),
          skewAmount
        );
      }
    });

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs[front].current!;
      const tl = gsap.timeline();
      tlRef.current = tl;

      // 顶卡下落
      tl.to(elFront, {
        y: "+=500",
        duration: config.durDrop,
        ease: config.ease,
      });

      // 其余卡前移
      tl.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((idx, i) => {
        const el = refs[idx].current!;
        const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
        tl.set(el, { zIndex: slot.zIndex }, "promote");
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease,
          },
          `promote+=${i * 0.15}`
        );
      });

      // 顶卡回队尾
      const backSlot = makeSlot(
        refs.length - 1,
        cardDistance,
        verticalDistance,
        refs.length
      );
      tl.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      tl.call(
        () => {
          gsap.set(elFront, { zIndex: backSlot.zIndex });
        },
        undefined,
        "return"
      );
      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease,
        },
        "return"
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    // 开始轮播
    swap();
    intervalRef.current = window.setInterval(swap, delay);

    // 悬停控制
    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
      const resume = () => {
        tlRef.current?.play();
        if (intervalRef.current === null) {
          intervalRef.current = window.setInterval(swap, delay);
        }
      };
      node.addEventListener("mouseenter", pause, { passive: true });
      node.addEventListener("mouseleave", resume, { passive: true });

      return () => {
        node.removeEventListener("mouseenter", pause);
        node.removeEventListener("mouseleave", resume);
        if (intervalRef.current !== null) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      };
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    refs,
    cardDistance,
    verticalDistance,
    delay,
    pauseOnHover,
    skewAmount,
    easing,
  ]);

  const rendered = childArr.map((child, i) =>
    isValidElement<CardProps>(child)
      ? cloneElement(child, {
          key: i,
          ref: refs[i],
          style: { width, height, ...(child.props.style ?? {}) },
          onClick: (e) => {
            child.props.onClick?.(e as React.MouseEvent<HTMLDivElement>);
            onCardClick?.(i);
          },
        } as CardProps & React.RefAttributes<HTMLDivElement>)
      : child
  );

  return (
    <div
      ref={container}
      className={[
        "relative grid w-full items-center gap-8 xl:grid-cols-[1fr_auto] h-[100vh] text-[#1d1d1f]",
        "max-w-7xl mx-auto px-4",
        className,
      ].join(" ")}
      style={{ touchAction: "pan-y" }}
    >
      {/* 左侧文案（i18n 或外部覆盖） */}
      <div className="select-none">
        {resolvedLeftTitle}
        <div className="mt-3">{resolvedLeftText}</div>
      </div>

      {/* 右侧卡片栈 */}
      <div
        className="
          relative justify-self-end
          [perspective:1000px] overflow-visible
          max-[768px]:scale-[0.85] max-[480px]:scale-[0.7]
          pointer-events-none
        "
        aria-label="Card stack"
      >
        <div className="relative overflow-visible" style={{ width, height }}>
          {rendered}
        </div>
      </div>
    </div>
  );
};

export default CardSwap;
