"use client";

import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

const EMOJIS = [
  {
    id: "very-sad",
    label: "Terrible",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <path d="M9 9h.01" />
        <path d="M15 9h.01" />
        <path d="M9 13v2" stroke="#3b82f6" />
        <path d="M15 13v2" stroke="#3b82f6" />
      </svg>
    ),
  },
  {
    id: "sad",
    label: "Bad",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    id: "neutral",
    label: "Okay",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 13s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" />
        <line x1="15" y1="9" x2="15.01" y2="9" />
      </svg>
    ),
  },
  {
    id: "happy",
    label: "Amazing",
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 13s1.5 2 4 2 4-2 4-2" />
        <path
          d="M9 9l.5 1.5l1.5 .5l-1.5 .5l-.5 1.5l-.5-1.5l-1.5-.5l1.5-.5z"
          fill="#f97316"
          stroke="none"
        />
        <path
          d="M15 9l.5 1.5l1.5 .5l-1.5 .5l-.5 1.5l-.5-1.5l-1.5-.5l1.5-.5z"
          fill="#f97316"
          stroke="none"
        />
      </svg>
    ),
  },
];

interface FeedbackWidgetProps {
  onSubmit?: (data: { rating: string; feedback: string }) => void;
  onClose?: () => void;
  className?: string;
  /** Text shown in the collapsed state */
  label?: string;
  /** Placeholder for the textarea */
  placeholder?: string;
}

export function FeedbackWidget({
  onSubmit,
  onClose,
  className,
  label = "Was this helpful?",
  placeholder = "Your feedback...",
}: FeedbackWidgetProps) {
  const [value, setValue] = React.useState<string>("");
  const [feedback, setFeedback] = React.useState("");
  const [isPreview, setIsPreview] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const isExpanded = value !== "";
  const containerRef = React.useRef<HTMLDivElement>(null);

  const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30,
    mass: 1,
  } as const;

  const handleValueChange = (val: string) => {
    if (val === "" || val === value) {
      setValue("");
      setIsPreview(false);
      onClose?.();
    } else {
      setValue(val);
      // Auto-focus the textarea after expansion
      setTimeout(() => {
        containerRef.current?.querySelector("textarea")?.focus();
      }, 100);
    }
  };

  const handleSend = async () => {
    if (!feedback.trim()) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.({ rating: value, feedback });
      setValue("");
      setFeedback("");
      setIsPreview(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("flex items-center justify-center p-4", className)}>
      <motion.div
        ref={containerRef}
        layout
        transition={springTransition}
        initial={false}
        className={cn(
          "overflow-hidden border border-white/10 bg-zinc-950 text-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.8)]",
          isExpanded ? "w-full max-w-[420px] rounded-[28px]" : "rounded-full",
        )}
      >
        <motion.div
          layout="position"
          className="px-4 py-2 md:px-5 md:py-2.5"
          transition={springTransition}
        >
          <div className="flex items-center justify-between gap-6">
            <motion.span
              layout="position"
              transition={springTransition}
              className="ml-2 cursor-default select-none whitespace-nowrap font-medium text-[14px] text-zinc-400"
            >
              {label}
            </motion.span>

            <ToggleGroup.Root
              type="single"
              value={value}
              onValueChange={handleValueChange}
              className="flex items-center gap-1.5"
            >
              {EMOJIS.map((emoji) => (
                <ToggleGroup.Item key={emoji.id} value={emoji.id} asChild>
                  <button
                    title={emoji.label}
                    className={cn(
                      "relative rounded-full p-2 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-500",
                      value === emoji.id
                        ? "text-white"
                        : "text-zinc-500 hover:bg-white/5 hover:text-zinc-300",
                    )}
                  >
                    <motion.div
                      layout="position"
                      transition={springTransition}
                      className="relative z-10 flex h-5 w-5 scale-110 items-center justify-center transition-transform active:scale-90"
                    >
                      {emoji.icon}
                    </motion.div>
                    {value === emoji.id && (
                      <motion.div
                        layoutId="active-bg"
                        className="absolute inset-0 rounded-full bg-blue-600"
                        transition={springTransition}
                      />
                    )}
                  </button>
                </ToggleGroup.Item>
              ))}
            </ToggleGroup.Root>
          </div>

          <AnimatePresence mode="popLayout" initial={false}>
            {isExpanded && (
              <motion.div
                initial={{
                  height: 0,
                  opacity: 0,
                  scale: 0.98,
                  filter: "blur(4px)",
                }}
                animate={{
                  height: "auto",
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                exit={{
                  height: 0,
                  opacity: 0,
                  scale: 0.98,
                  filter: "blur(4px)",
                  transition: {
                    height: { duration: 0.3, ease: [0.32, 0, 0.67, 0] },
                    opacity: { duration: 0.15 },
                    scale: { duration: 0.2 },
                    filter: { duration: 0.2 },
                  },
                }}
                transition={{
                  height: { ...springTransition, bounce: 0 },
                  opacity: { duration: 0.25 },
                  scale: { ...springTransition, damping: 25 },
                  filter: { duration: 0.3 },
                }}
                className="overflow-hidden"
              >
                <div className="px-1 pt-6 pb-2">
                  <div className="mb-2.5 flex items-center justify-between">
                    <span className="select-none font-bold text-[10px] text-zinc-500 uppercase tracking-[0.1em]">
                      {isPreview ? "Preview" : "Feedback"}
                    </span>
                    <button
                      onClick={() => setIsPreview(!isPreview)}
                      className="rounded-md bg-white/5 px-2 py-0.5 font-semibold text-[11px] text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
                    >
                      {isPreview ? "Edit" : "Preview"}
                    </button>
                  </div>

                  <div className="group/textarea relative">
                    <AnimatePresence mode="wait">
                      {isPreview ? (
                        <motion.div
                          key="preview"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          className="prose prose-invert prose-sm scrollbar-none h-[140px] w-full max-w-none overflow-y-auto rounded-2xl border border-white/5 bg-zinc-900/50 p-4 text-[14px] text-zinc-300 leading-relaxed"
                        >
                          <ReactMarkdown>
                            {feedback || "*Nothing to preview...*"}
                          </ReactMarkdown>
                        </motion.div>
                      ) : (
                        <motion.textarea
                          key="editor"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -5 }}
                          autoFocus
                          placeholder={placeholder}
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          className="scrollbar-none h-[140px] w-full resize-none rounded-2xl border border-white/5 bg-zinc-900/50 p-4 text-[14px] text-zinc-200 leading-relaxed transition-all placeholder:text-zinc-600 focus:border-white/20 focus:outline-none"
                        />
                      )}
                    </AnimatePresence>

                    {!isPreview && (
                      <div className="pointer-events-none absolute right-4 bottom-3 flex select-none items-center gap-1.5 opacity-40 transition-opacity group-focus-within/textarea:opacity-80">
                        <span className="font-bold text-[10px] text-zinc-500 tracking-tight">
                          M↓
                        </span>
                        <span className="font-bold text-[10px] text-zinc-500 tracking-tight">
                          supported
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.1, ...springTransition }}
                  className="mt-3 flex items-center justify-between border-white/5 border-t pt-4"
                >
                  <p className="font-medium text-[11px] text-zinc-500">
                    We appreciate your input.
                  </p>
                  <button
                    onClick={handleSend}
                    disabled={!feedback.trim() || isSubmitting}
                    className="relative rounded-xl bg-white px-6 py-2 font-bold text-[13px] text-black transition-all hover:bg-zinc-200 active:scale-95 disabled:pointer-events-none disabled:opacity-30 disabled:grayscale"
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Number.POSITIVE_INFINITY,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="h-4 w-4 rounded-full border-2 border-black/20 border-t-black"
                      />
                    ) : (
                      "Send Feedback"
                    )}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
