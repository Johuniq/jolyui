"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, RefreshCw, Copy, Check } from "lucide-react"

interface CheckmarkProps {
  size?: number
  strokeWidth?: number
  color?: string
  className?: string
}

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: {
        delay: i * 0.2,
        type: "spring",
        duration: 1.5,
        bounce: 0.2,
        ease: "easeInOut",
      },
      opacity: { delay: i * 0.2, duration: 0.2 },
    },
  }),
}

export function Checkmark({ size = 100, strokeWidth = 2, color = "currentColor", className = "" }: CheckmarkProps) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      initial="hidden"
      animate="visible"
      className={className}
    >
      <title>Animated Checkmark</title>
      <motion.circle
        cx="50"
        cy="50"
        r="40"
        stroke={color}
        variants={draw}
        custom={0}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          fill: "transparent",
        }}
      />
      <motion.path
        d="M30 50L45 65L70 35"
        stroke={color}
        variants={draw}
        custom={1}
        style={{
          strokeWidth,
          strokeLinecap: "round",
          strokeLinejoin: "round",
          fill: "transparent",
        }}
      />
    </motion.svg>
  )
}

export default function CurrencyTransfer() {
  const [copied, setCopied] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isResetting, setIsResetting] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText("Transaction ID: TRX-28974651")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleReset = () => {
    setIsResetting(true)
    setTimeout(() => {
      setIsResetting(false)
      setShowDetails(false)
    }, 1000)
  }

  return (
    <Card
      className="w-full max-w-sm mx-auto p-6 min-h-[300px] flex flex-col justify-center bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 backdrop-blur-xs relative overflow-hidden"
    >
      {/* Background pulse effect */}
      <motion.div
        className="absolute inset-0 bg-emerald-500/5 rounded-xl"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <CardContent className="space-y-4 flex flex-col items-center justify-center relative z-10">
        <AnimatePresence mode="wait">
          {!isResetting ? (
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
                scale: {
                  type: "spring",
                  damping: 15,
                  stiffness: 200,
                },
              }}
            >
              <div className="relative">
                <motion.div
                  className="absolute inset-0 blur-xl bg-emerald-500/10 dark:bg-emerald-500/20 rounded-full"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.2,
                    opacity: 0.8,
                    transition: { duration: 0.3 },
                  }}
                />
                <Checkmark
                  size={80}
                  strokeWidth={4}
                  color="rgb(16 185 129)"
                  className="relative z-10 dark:drop-shadow-[0_0_10px_rgba(0,0,0,0.1)]"
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, rotate: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              <RefreshCw size={80} className="text-emerald-500" />
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="space-y-2 text-center w-full"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
        >
          <motion.h2
            className="text-lg text-zinc-900 dark:text-zinc-100 tracking-tighter font-semibold uppercase"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.4 }}
            whileHover={{
              scale: 1.05,
              transition: { duration: 0.2 },
            }}
          >
            Transfer Successful
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1.2,
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1],
              }}
            >
              <motion.div
                className="flex-1 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-xl p-3 border border-zinc-200/50 dark:border-zinc-700/50 backdrop-blur-md"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                  transition: { duration: 0.2 },
                }}
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
              >
                <div className="flex flex-col items-start gap-2">
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <motion.svg
                        className="w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={isHovering ? { y: [-1, 1, -1] } : {}}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <title>From</title>
                        <path d="M12 19V5M5 12l7-7 7 7" />
                      </motion.svg>
                      From
                    </span>
                    <div className="flex items-center gap-2.5 group transition-all">
                      <motion.span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-700 shadow-lg border border-zinc-300 dark:border-zinc-600 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                        whileHover={{
                          scale: 1.15,
                          rotate: [0, -5, 5, 0],
                          transition: { duration: 0.5 },
                        }}
                      >
                        $
                      </motion.span>
                      <motion.span
                        className="font-medium text-zinc-900 dark:text-zinc-100 tracking-tight"
                        whileHover={{
                          color: "#10b981",
                          transition: { duration: 0.2 },
                        }}
                      >
                        500.00 USD
                      </motion.span>
                    </div>
                  </div>
                  <motion.div
                    className="w-full h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"
                    animate={
                      isHovering
                        ? {
                            scaleX: [1, 1.1, 1],
                            opacity: [0.5, 1, 0.5],
                          }
                        : {}
                    }
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  />
                  <div className="space-y-1.5">
                    <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                      <motion.svg
                        className="w-3 h-3"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        animate={isHovering ? { y: [1, -1, 1] } : {}}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <title>To</title>
                        <path d="M12 5v14M5 12l7 7 7-7" />
                      </motion.svg>
                      To
                    </span>
                    <div className="flex items-center gap-2.5 group transition-all">
                      <motion.span
                        className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-700 shadow-lg border border-zinc-300 dark:border-zinc-600 text-sm font-medium text-zinc-900 dark:text-zinc-100"
                        whileHover={{
                          scale: 1.15,
                          rotate: [0, 5, -5, 0],
                          transition: { duration: 0.5 },
                        }}
                      >
                        €
                      </motion.span>
                      <motion.span
                        className="font-medium text-zinc-900 dark:text-zinc-100 tracking-tight"
                        whileHover={{
                          color: "#10b981",
                          transition: { duration: 0.2 },
                        }}
                      >
                        460.00 EUR
                      </motion.span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <motion.div
            className="w-full text-xs text-zinc-500 dark:text-zinc-400 mt-2 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.4 }}
            whileHover={{
              scale: 1.05,
              color: "rgb(16 185 129)",
              transition: { duration: 0.2 },
            }}
          >
            Exchange Rate: 1 USD = 0.92 EUR
          </motion.div>

          <AnimatePresence>
            {showDetails && (
              <motion.div
                className="mt-4 p-3 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200/50 dark:border-zinc-700/50"
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-xs text-zinc-700 dark:text-zinc-300 space-y-2">
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span className="text-zinc-900 dark:text-zinc-100">April 24, 2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fee:</span>
                    <span className="text-zinc-900 dark:text-zinc-100">2.50 USD</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Transaction ID:</span>
                    <div className="flex items-center gap-1">
                      <span className="text-zinc-900 dark:text-zinc-100">TRX-28974651</span>
                      <motion.button
                        onClick={handleCopy}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-zinc-500 dark:text-zinc-400 hover:text-emerald-500"
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="pt-4 flex justify-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                onClick={handleReset}
              >
                <RefreshCw size={14} className="mr-2" />
                New Transfer
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="sm"
                className="bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                onClick={() => setShowDetails(!showDetails)}
              >
                {showDetails ? "Hide Details" : "View Details"}
                <motion.div animate={{ rotate: showDetails ? 90 : 0 }} transition={{ duration: 0.2 }} className="ml-2">
                  <ArrowRight size={14} />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}