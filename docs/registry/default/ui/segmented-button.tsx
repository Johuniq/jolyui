"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface SegmentedButtonItem {
  id: string;
  label?: string | null;
  isLogo?: boolean;
}

interface SegmentedButtonProps {
  buttons: SegmentedButtonItem[];
  defaultActive?: string;
  onChange?: (activeId: string) => void;
  className?: string;
}

export default function SegmentedButton({
  buttons,
  defaultActive,
  onChange,
  className = "",
}: SegmentedButtonProps) {
  const [activeButton, setActiveButton] = useState(
    defaultActive || buttons[0]?.id || "",
  );
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoverStyle, setHoverStyle] = useState({ left: 0, width: 0 });
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeIndex = buttons.findIndex((btn) => btn.id === activeButton);
    const activeElement = buttonRefs.current[activeIndex];

    if (activeElement) {
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
      });
    }
  }, [activeButton, buttons]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = buttonRefs.current[hoveredIndex];
      if (hoveredElement) {
        setHoverStyle({
          left: hoveredElement.offsetLeft,
          width: hoveredElement.offsetWidth,
        });
      }
    } else {
      if (containerRef.current) {
        setHoverStyle({
          left: 0,
          width: containerRef.current.offsetWidth,
        });
      }
    }
  }, [hoveredIndex]);

  useEffect(() => {
    if (containerRef.current) {
      setHoverStyle({
        left: 0,
        width: containerRef.current.offsetWidth,
      });
    }
  }, []);

  const handleButtonClick = (buttonId: string) => {
    setActiveButton(buttonId);
    onChange?.(buttonId);
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-center justify-start rounded-full ${className}`}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <motion.div
        className="absolute top-0 h-7 rounded-full bg-black/10 dark:bg-white/15"
        animate={{
          left: hoverStyle.left,
          width: hoverStyle.width,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />

      <motion.div
        className="absolute top-0 h-7 rounded-[999px] bg-gradient-to-b from-[#A8A8A8] to-[#D3D3D3] px-2.5 py-1 shadow-[inset_0_1px_0_0_rgba(0,0,0,0.15),inset_0_-1px_0_0_rgba(255,255,255,0.30),inset_0_0_0_1px_rgba(0,0,0,0.10),inset_0_-6px_10.5px_0_rgba(0,0,0,0.08)] dark:from-[#D3D3D3] dark:to-[#A8A8A8] dark:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.30),inset_0_-1px_0_0_rgba(255,255,255,0.60),inset_0_0_0_1px_rgba(255,255,255,0.30),inset_0_-6px_10.5px_0_rgba(255,255,255,0.13)]"
        animate={{
          left: indicatorStyle.left,
          width: indicatorStyle.width,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />

      {buttons.map((button, index) => (
        <button
          key={button.id}
          ref={(el) => {
            buttonRefs.current[index] = el;
          }}
          onClick={() => handleButtonClick(button.id)}
          onMouseEnter={() => setHoveredIndex(index)}
          className="relative z-10 flex items-center justify-center gap-2 rounded-full px-2 py-1 transition-colors"
        >
          {button.isLogo ? (
            <div className="flex h-5 items-center justify-center">
              <svg
                width="19"
                height="20"
                viewBox="0 0 19 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`transition-all ${
                  activeButton === button.id
                    ? "[filter:drop-shadow(0px_1px_0px_rgba(255,255,255,0.65))] [&_path]:fill-black dark:[&_path]:fill-black/80"
                    : "[&_path]:fill-neutral-50/80 dark:[&_path]:fill-neutral-50/80"
                }`}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.2851 7.03125H15.7382C15.8084 7.03125 15.8774 7.03612 15.9449 7.04554L11.296 11.6945C11.2863 11.6258 11.2812 11.5557 11.2812 11.4844V7.03125H9.5V11.4844C9.5 13.2879 10.9621 14.75 12.7656 14.75H17.2188V12.9688H12.7656C12.6943 12.9688 12.6242 12.9638 12.5556 12.954L17.2073 8.30221C17.2173 8.3719 17.2225 8.44315 17.2225 8.51562V12.9688H19.0038V8.51562C19.0038 6.71207 17.5417 5.25 15.7382 5.25H11.2851V7.03125ZM0 6.4375V6.44231L6.08623 14.1927C6.81766 15.1242 8.31376 14.6069 8.31376 13.4226V6.4375H6.53251V11.8769L2.26105 6.4375H0Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.2851 7.03125H15.7382C15.8084 7.03125 15.8774 7.03612 15.9449 7.04554L11.296 11.6945C11.2863 11.6258 11.2812 11.5557 11.2812 11.4844V7.03125H9.5V11.4844C9.5 13.2879 10.9621 14.75 12.7656 14.75H17.2188V12.9688H12.7656C12.6943 12.9688 12.6242 12.9638 12.5556 12.954L17.2073 8.30221C17.2173 8.3719 17.2225 8.44315 17.2225 8.51562V12.9688H19.0038V8.51562C19.0038 6.71207 17.5417 5.25 15.7382 5.25H11.2851V7.03125ZM0 6.4375V6.44231L6.08623 14.1927C6.81766 15.1242 8.31376 14.6069 8.31376 13.4226V6.4375H6.53251V11.8769L2.26105 6.4375H0Z"
                />
              </svg>
            </div>
          ) : (
            <span
              className={`text-center font-normal font-sans text-sm leading-tight transition-colors ${
                activeButton === button.id
                  ? "text-black [text-shadow:_0px_1px_0px_rgb(255_255_255_/_0.65)] dark:text-black/80"
                  : "text-black-50/80 dark:text-neutral-50/80"
              }`}
            >
              {button.label}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
