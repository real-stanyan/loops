"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export interface MenuToggleProps {
  openText?: string; // 默认 "Menu"
  closeText?: string; // 默认 "Close"
  menuButtonColor?: string; // 关闭时颜色
  openMenuButtonColor?: string; // 打开时颜色
  changeMenuColorOnOpen?: boolean; // 是否随开关变色
  className?: string;
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

const MenuToggle: React.FC<MenuToggleProps> = ({
  openText = "Menu",
  closeText = "Close",
  menuButtonColor = "#e9e9ef",
  openMenuButtonColor = "#000",
  changeMenuColorOnOpen = true,
  className,
  defaultOpen = false,
  onOpen,
  onClose,
}) => {
  const [open, setOpen] = useState(defaultOpen);
  const openRef = useRef(defaultOpen);

  // refs
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);

  // gsap handles
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  const [textLines, setTextLines] = useState<string[]>([openText, closeText]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (
        !btnRef.current ||
        !iconRef.current ||
        !plusHRef.current ||
        !plusVRef.current ||
        !textInnerRef.current
      )
        return;

      gsap.set(plusHRef.current, {
        transformOrigin: "50% 50%",
        rotate: open ? 45 : 0,
      });
      gsap.set(plusVRef.current, {
        transformOrigin: "50% 50%",
        rotate: open ? -45 : 90,
      });
      gsap.set(iconRef.current, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInnerRef.current, { yPercent: 0 });

      const color = changeMenuColorOnOpen
        ? open
          ? openMenuButtonColor
          : menuButtonColor
        : menuButtonColor;
      gsap.set(btnRef.current, { color });
    });
    return () => ctx.revert();
  }, [open, changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

  const animateIcon = useCallback((opening: boolean) => {
    const h = plusHRef.current,
      v = plusVRef.current,
      icon = iconRef.current;
    if (!h || !v || !icon) return;
    spinTweenRef.current?.kill();

    if (opening) {
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0)
        .to(icon, { rotate: 0, duration: 0.001 }, 0);
    }
  }, []);

  const animateText = useCallback(
    (opening: boolean) => {
      const inner = textInnerRef.current;
      if (!inner) return;
      textCycleAnimRef.current?.kill();

      const curr = opening ? openText : closeText;
      const next = opening ? closeText : openText;
      const cycles = 3;

      const seq: string[] = [curr];
      let last = curr;
      for (let i = 0; i < cycles; i++) {
        last = last === openText ? closeText : openText;
        seq.push(last);
      }
      if (last !== next) seq.push(next);
      seq.push(next);

      setTextLines(seq);
      gsap.set(inner, { yPercent: 0 });

      const lineCount = seq.length;
      const finalShift = ((lineCount - 1) / lineCount) * 100;

      textCycleAnimRef.current = gsap.to(inner, {
        yPercent: -finalShift,
        duration: 0.5 + lineCount * 0.07,
        ease: "power4.out",
      });
    },
    [openText, closeText]
  );

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = btnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();

      const target = changeMenuColorOnOpen
        ? opening
          ? openMenuButtonColor
          : menuButtonColor
        : menuButtonColor;

      colorTweenRef.current = gsap.to(btn, {
        color: target,
        delay: 0.18,
        duration: 0.3,
        ease: "power2.out",
      });
    },
    [changeMenuColorOnOpen, openMenuButtonColor, menuButtonColor]
  );

  const toggle = useCallback(() => {
    const next = !openRef.current;
    openRef.current = next;
    setOpen(next);

    if (next) onOpen?.();
    else onClose?.();

    animateIcon(next);
    animateText(next);
    animateColor(next);
  }, [animateIcon, animateText, animateColor, onOpen, onClose]);

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={toggle}
      aria-pressed={open}
      aria-label={open ? "Close menu" : "Open menu"}
      className={[
        "relative inline-flex items-center gap-[0.3rem] bg-transparent border-0 cursor-pointer font-medium leading-none",
        className || "",
      ].join(" ")}
      style={{ WebkitTapHighlightColor: "transparent" }}
    >
      {/* 滚动文字 */}
      <span
        className="relative inline-block h-[1em] overflow-hidden whitespace-nowrap w-[var(--sm-toggle-width,auto)] min-w-[var(--sm-toggle-width,auto)]"
        aria-hidden="true"
      >
        <span ref={textInnerRef} className="flex flex-col leading-none">
          {textLines.map((l, i) => (
            <span className="block h-[1em] leading-none" key={i}>
              {l}
            </span>
          ))}
        </span>
      </span>

      {/* 加号图标 */}
      <span
        ref={iconRef}
        className="relative w-[14px] h-[14px] shrink-0 inline-flex items-center justify-center"
        aria-hidden="true"
      >
        <span
          ref={plusHRef}
          className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2"
        />
        <span
          ref={plusVRef}
          className="absolute left-1/2 top-1/2 w-full h-[2px] bg-current rounded-[2px] -translate-x-1/2 -translate-y-1/2"
        />
      </span>
    </button>
  );
};

export default MenuToggle;
