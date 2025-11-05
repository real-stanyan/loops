"use client";

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { gsap } from "gsap";
import { IoMdCloseCircle } from "react-icons/io";

// ====== Types ======
type IconType = React.ComponentType<{ className?: string; size?: number }>;

export type SimpleNav = {
  icon?: IconType;
  name: string;
  link: string;
  ariaLabel?: string;
};

export type NavGroup = {
  groupName: string;
  items: SimpleNav[];
};

export type NavEntry = SimpleNav | NavGroup;

interface HeaderNavPEProps {
  position?: "left" | "right";
  navs?: NavEntry[];
  colors?: string[];
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  accentColor?: string;
  changeMenuColorOnOpen?: boolean;
  className?: string;
  lockScrollOnOpen?: boolean;
}

// type guard
const isGroup = (e: NavEntry): e is NavGroup =>
  (e as NavGroup).groupName !== undefined;

// ====== Component ======
const HeaderNavPE: React.FC<HeaderNavPEProps> = ({
  position = "right",
  navs = [],
  colors = ["#ff6b3580", "#ff6b35"],
  menuButtonColor = "#f5f5f7",
  openMenuButtonColor = "#1d1d1f",
  accentColor = "#ff6b35",
  changeMenuColorOnOpen = true,
  className,
  lockScrollOnOpen = true,
}) => {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const busyRef = useRef(false);

  // portal refs
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);

  // toggle (text only)
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(["Menu", "Close"]);

  // anim refs
  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => setMounted(true), []);

  useLayoutEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll(".sm-prelayer")
        ) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const off = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: off });
      gsap.set(textInner, { yPercent: 0 });

      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [mounted, menuButtonColor, position]);

  // open timeline
  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    closeTweenRef.current?.kill();
    closeTweenRef.current = null;

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel")
    ) as HTMLElement[];

    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, "xPercent")),
    }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });

    const tl = gsap.timeline({ paused: true });

    // prelayers
    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    // panel
    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime
    );

    // items
    if (itemEls.length) {
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        panelInsertTime + panelDuration * 0.15
      );
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;

    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();

    const off = position === "left" ? -100 : 100;
    closeTweenRef.current = gsap.to(all, {
      xPercent: off,
      duration: 0.32,
      ease: "power3.in",
      overwrite: "auto",
      onComplete: () => {
        const itemEls = Array.from(
          panel.querySelectorAll(".sm-panel-itemLabel")
        ) as HTMLElement[];
        if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();
      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.set(btn, { color: menuButtonColor });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
  );

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;

    textCycleAnimRef.current?.kill();

    const currentLabel = opening ? "Menu" : "Close";
    theLabelCycle: {
      const targetLabel = opening ? "Close" : "Menu";
      const cycles = 3;
      const seq: string[] = [currentLabel];
      let last = currentLabel;
      for (let i = 0; i < cycles; i++) {
        last = last === "Menu" ? "Close" : "Menu";
        seq.push(last);
      }
      if (last !== targetLabel) seq.push(targetLabel);
      seq.push(targetLabel);
      setTextLines(seq);

      gsap.set(inner, { yPercent: 0 });
      const lineCount = seq.length;
      const finalShift = ((lineCount - 1) / lineCount) * 100;
      textCycleAnimRef.current = gsap.to(inner, {
        yPercent: -finalShift,
        duration: 0.5 + lineCount * 0.07,
        ease: "power4.out",
      });
    }
  }, []);

  const openMenu = useCallback(() => {
    if (openRef.current) return;
    openRef.current = true;
    setOpen(true);
    playOpen();
    animateColor(true);
    animateText(true);
  }, [playOpen, animateColor, animateText]);

  const closeMenu = useCallback(() => {
    if (!openRef.current) return;
    openRef.current = false;
    setOpen(false);
    playClose();
    animateColor(false);
    animateText(false);
  }, [playClose, animateColor, animateText]);

  const toggleMenu = useCallback(() => {
    if (openRef.current) closeMenu();
    else openMenu();
  }, [openMenu, closeMenu]);

  // Esc close
  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeMenu();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, closeMenu]);

  // lock scroll
  useEffect(() => {
    if (!lockScrollOnOpen || !open) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [open, lockScrollOnOpen]);

  return (
    <div
      className={`sm-scope relative z-40 ${className || ""} lg:hidden`}
      data-position={position}
    >
      {/* Toggle（仅文字） */}
      <button
        ref={toggleBtnRef}
        type="button"
        onClick={toggleMenu}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="sm-toggle flex items-center bg-transparent border-0 cursor-pointer font-medium leading-none"
      >
        <span className="inline-block h-[1em] overflow-hidden whitespace-nowrap">
          <span ref={textInnerRef} className="flex flex-col leading-none">
            {textLines.map((l, i) => (
              <span key={i} className="block h-[1em] leading-none">
                {l}
              </span>
            ))}
          </span>
        </span>
      </button>

      {/* Portal */}
      {mounted &&
        createPortal(
          <div
            className="fixed inset-0 z-[9999] pointer-events-none"
            style={
              accentColor
                ? ({
                    ["--sm-accent" as any]: accentColor,
                  } as React.CSSProperties)
                : undefined
            }
          >
            {/* overlay */}
            {open && (
              <button
                aria-label="Close menu overlay"
                onClick={closeMenu}
                className="absolute inset-0 bg-black/40 pointer-events-auto"
              />
            )}

            {/* prelayers */}
            <div
              ref={preLayersRef}
              className={`absolute top-0 ${
                position === "left" ? "left-0" : "right-0"
              } bottom-0 pointer-events-none`}
              style={{ width: "clamp(260px, 38vw, 420px)" }}
              aria-hidden="true"
            >
              {(colors?.slice(0, 4) ?? ["#1e1e22", "#35353c"])
                .filter(
                  (_, i, a) =>
                    !(a.length >= 3 && i === Math.floor(a.length / 2))
                )
                .map((c, i) => (
                  <div
                    key={i}
                    className="sm-prelayer absolute top-0 right-0 h-full w-full"
                    style={{ background: c }}
                  />
                ))}
            </div>

            {/* panel */}
            <aside
              ref={panelRef}
              onClick={(e) => e.stopPropagation()}
              className={`absolute top-0 ${
                position === "left" ? "left-0" : "right-0"
              } w-[90vw] h-full bg-[#f5f5f7] text-[#1d1d1f] flex flex-col p-[6em_2em_2em_2em] overflow-y-auto shadow-2xl pointer-events-auto`}
              style={{
                WebkitBackdropFilter: "blur(12px)",
                backdropFilter: "blur(12px)",
              }}
              aria-hidden={!open}
            >
              {/* Close */}
              <button
                onClick={closeMenu}
                aria-label="Close menu"
                className="absolute top-4 right-4 text-[#1d1d1f]/70 hover:text-[#1d1d1f] focus-visible:outline text-xl
                  focus-visible:outline-offset-2 focus-visible:outline-black/40 flex justify-center items-center gap-1"
              >
                Close <IoMdCloseCircle size={28} />
              </button>

              {/* Nav rendering */}
              <nav className="flex flex-col gap-6">
                {navs.map((entry, idx) =>
                  isGroup(entry) ? (
                    <section key={`g-${idx}`} className="flex flex-col gap-3">
                      <h3 className="m-0 text-2xl font-semibold uppercase tracking-wide">
                        {entry.groupName}
                      </h3>
                      <ul className="list-none m-0 p-0 flex flex-col gap-4">
                        {entry.items.map((it, j) => {
                          const Icon = it.icon;
                          return (
                            <li
                              key={`${entry.groupName}-${j}`}
                              className="relative overflow-hidden leading-none"
                            >
                              <a
                                className="group flex items-center gap-3 no-underline pr-[1.4em]"
                                href={it.link || "#"}
                                aria-label={it.ariaLabel || it.name}
                                onClick={closeMenu}
                              >
                                {Icon && (
                                  <Icon className="text-3xl text-[var(--decoration)]" />
                                )}
                                <span
                                  className={`
                                sm-panel-itemLabel inline-block will-change-transform [transform-origin:50%_100%] text-base font-semibold uppercase 
                                 text-[#1d1d1f] group-hover:text-[var(--sm-accent,#ff6b35)]
                                  `}
                                >
                                  {it.name}
                                </span>
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </section>
                  ) : (
                    <div
                      key={`s-${idx}`}
                      className="relative overflow-hidden leading-none"
                    >
                      <a
                        className="group flex items-center gap-3 no-underline pr-[1.4em]"
                        href={entry.link || "#"}
                        aria-label={
                          (entry as SimpleNav).ariaLabel ||
                          (entry as SimpleNav).name
                        }
                        onClick={closeMenu}
                      >
                        {entry.icon && (
                          <entry.icon className="text-[1.5rem] text-[var(--decoration)]" />
                        )}
                        <span
                          className={`
                        sm-panel-itemLabel inline-block will-change-transform [transform-origin:50%_100%] text-3xl font-semibold uppercase tracking-[-0.025em]
                         text-[#1d1d1f] group-hover:text-[var(--sm-accent,#ff6b35)]
                          `}
                        >
                          {(entry as SimpleNav).name}
                        </span>
                      </a>
                    </div>
                  )
                )}
              </nav>
            </aside>
          </div>,
          document.body
        )}
    </div>
  );
};

export default HeaderNavPE;
