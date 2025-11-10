"use client";

import Link from "next/link";
// import { toast } from "sonner";
import { useEffect } from "react";

import { toast as sonnerToast } from "sonner";
import { ArrowRightBroken } from "./icons/arrow-right-broken";

/** A fully custom toast that still maintains the animations and interactions. */
function Toast(props: ToastProps) {
  const { title, description, id } = props;

  return (
    <Link
      href="https://arca.directory/?utm_source=jolyui.com&utm_medium=toast"
      target="_blank"
      className="block"
      tabIndex={0}
      aria-label={`${title} - ${description}`}
    >
      <div
        className="group flex rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-black/10 dark:border-white/10 w-full md:max-w-[320px] items-center p-2 hover:border-black/20 dark:hover:border-white/20 hover:shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_2px_8px_rgba(255,255,255,0.05)] transition-all relative"
        style={{
          animation: "slideIn 0.3s ease-out forwards",
        }}
      >
        <img
          src="/arca-directory.svg"
          alt="Arca Directory"
          className="w-12 h-12 mr-3 flex-shrink-0"
        />
        <div className="flex-1">
          <p className="text-sm font-medium tracking-tighter text-zinc-900 dark:text-white">
            {title}
          </p>
          <p className="text-xs tracking-tighter text-zinc-700 dark:text-zinc-300">
            {description}
          </p>
        </div>
        <ArrowRightBroken className="w-4 h-4 -rotate-90 group-hover:-rotate-45 transition-transform duration-300" />

        {/* Close button that appears on hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            sonnerToast.dismiss(id);
          }}
          className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700"
          aria-label="Close toast"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-zinc-500 dark:text-zinc-400"
          >
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
        </button>
      </div>
      <style jsx>{`
        @keyframes slideIn {
          0% {
            transform: translateY(100%);
            opacity: 0;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </Link>
  );
}

function toast(toast: Omit<ToastProps, "id"> & { duration?: number }) {
  return sonnerToast.custom(
    (id) => (
      <Toast id={id} title={toast.title} description={toast.description} />
    ),
    { duration: toast.duration || 4000 } // Default is 4000ms if not specified
  );
}

interface ToastProps {
  id: string | number;
  title: string;
  description: string;
}

export const EventToaster = () => {
  useEffect(() => {
    // Add a 1-second delay before showing the toast
    const timeoutId = setTimeout(() => {
      toast({
        title: "Arca.directory",
        description:
          "Find the best tools for entrepreneurs, developers, and designers.",
        duration: 6000, // Reduced to 2 seconds (from default 4 seconds)
      });
    }, 1000);

    // Clean up the timeout if the component unmounts
    return () => clearTimeout(timeoutId);
  }, []);

  return null;
};

export default EventToaster;
