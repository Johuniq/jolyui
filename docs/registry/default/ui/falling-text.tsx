"use client";
import Matter from "matter-js";
import { useCallback, useEffect, useRef, useState } from "react";

export interface FallingTextProps {
  /** The text content to display and animate */
  text: string;
  /** Words to highlight with special styling */
  highlightWords?: string[];
  /** When to trigger the falling animation */
  trigger?: "auto" | "scroll" | "click" | "hover";
  /** Background color for the physics canvas */
  backgroundColor?: string;
  /** Show physics wireframes for debugging */
  wireframes?: boolean;
  /** Gravity strength (default: 1) */
  gravity?: number;
  /** Mouse interaction stiffness (0-1, default: 0.2) */
  mouseConstraintStiffness?: number;
  /** Font size for the text */
  fontSize?: string;
  /** Custom className for the container */
  className?: string;
  /** Callback when animation starts */
  onAnimationStart?: () => void;
  /** Callback when animation ends (all bodies settled) */
  onAnimationEnd?: () => void;
  /** Physics properties for word bodies */
  physicsOptions?: {
    restitution?: number; // Bounciness (0-1)
    frictionAir?: number; // Air resistance
    friction?: number; // Surface friction
    density?: number; // Mass density
  };
  /** Initial velocity range for words */
  initialVelocity?: {
    x?: number; // Horizontal velocity range
    y?: number; // Vertical velocity range
    angular?: number; // Angular velocity range
  };
  /** Custom highlight styles */
  highlightClassName?: string;
  /** Word spacing in pixels */
  wordSpacing?: number;
  /** Minimum container height */
  minHeight?: string;
  /** Enable/disable mouse interactions */
  enableMouseInteraction?: boolean;
  /** Reset trigger - increment to reset animation */
  resetKey?: number;
}

const FallingText: React.FC<FallingTextProps> = ({
  text,
  highlightWords = [],
  trigger = "auto",
  backgroundColor = "transparent",
  wireframes = false,
  gravity = 1,
  mouseConstraintStiffness = 0.2,
  fontSize = "1rem",
  className = "",
  onAnimationStart,
  onAnimationEnd,
  physicsOptions = {},
  initialVelocity = {},
  highlightClassName = "text-cyan-500 font-bold",
  wordSpacing = 2,
  minHeight = "300px",
  enableMouseInteraction = true,
  resetKey = 0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const canvasContainerRef = useRef<HTMLDivElement | null>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  const [effectStarted, setEffectStarted] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Merge default physics options with user-provided ones
  const mergedPhysicsOptions = {
    restitution: 0.8,
    frictionAir: 0.01,
    friction: 0.2,
    density: 0.001,
    ...physicsOptions,
  };

  const mergedInitialVelocity = {
    x: 5,
    y: 0,
    angular: 0.05,
    ...initialVelocity,
  };

  // Cleanup function
  const cleanup = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (runnerRef.current && engineRef.current) {
      Matter.Runner.stop(runnerRef.current);
      runnerRef.current = null;
    }

    if (renderRef.current) {
      Matter.Render.stop(renderRef.current);
      if (renderRef.current.canvas && canvasContainerRef.current) {
        try {
          canvasContainerRef.current.removeChild(renderRef.current.canvas);
        } catch (_e) {
          // Canvas might already be removed
        }
      }
      renderRef.current = null;
    }

    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
      engineRef.current = null;
    }

    hasStartedRef.current = false;
  }, []);

  // Reset animation when resetKey changes
  useEffect(() => {
    if (resetKey > 0) {
      cleanup();
      setEffectStarted(false);
      setIsReady(false);
      // Trigger re-initialization
      setTimeout(() => setIsReady(true), 50);
    }
  }, [resetKey, cleanup]);

  // Initialize text spans
  useEffect(() => {
    if (!textRef.current || !text) return;

    const words = text.split(" ").filter((word) => word.length > 0);

    const newHTML = words
      .map((word) => {
        const isHighlighted = highlightWords.some((hw) =>
          word.toLowerCase().startsWith(hw.toLowerCase()),
        );
        return `<span
          class="inline-block select-none transition-colors duration-200 ${
            isHighlighted ? highlightClassName : ""
          }"
          style="margin: 0 ${wordSpacing}px;"
        >
          ${word}
        </span>`;
      })
      .join(" ");

    textRef.current.innerHTML = newHTML;
    setIsReady(true);
  }, [text, highlightWords, highlightClassName, wordSpacing]);

  // Handle trigger mechanisms
  useEffect(() => {
    if (trigger === "auto") {
      setEffectStarted(true);
      return;
    }

    if (trigger === "scroll" && containerRef.current) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) {
            setEffectStarted(true);
            observer.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      observer.observe(containerRef.current);
      return () => observer.disconnect();
    }
  }, [trigger]);

  // Main physics effect
  useEffect(() => {
    if (!effectStarted || !isReady || hasStartedRef.current) return;

    const {
      Engine,
      Render,
      World,
      Bodies,
      Runner,
      Mouse,
      MouseConstraint,
      Body,
    } = Matter;

    if (
      !containerRef.current ||
      !canvasContainerRef.current ||
      !textRef.current
    )
      return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) {
      console.warn("FallingText: Container has invalid dimensions");
      return;
    }

    hasStartedRef.current = true;
    onAnimationStart?.();

    // Create engine
    const engine = Engine.create();
    engine.world.gravity.y = gravity;
    engineRef.current = engine;

    // Create renderer
    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });
    renderRef.current = render;

    // Create boundaries
    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: "transparent" },
    };

    const floor = Bodies.rectangle(
      width / 2,
      height + 25,
      width,
      50,
      boundaryOptions,
    );
    const leftWall = Bodies.rectangle(
      -25,
      height / 2,
      50,
      height,
      boundaryOptions,
    );
    const rightWall = Bodies.rectangle(
      width + 25,
      height / 2,
      50,
      height,
      boundaryOptions,
    );
    const ceiling = Bodies.rectangle(
      width / 2,
      -25,
      width,
      50,
      boundaryOptions,
    );

    // Create word bodies
    const wordSpans = textRef.current.querySelectorAll("span");
    const wordBodies = Array.from(wordSpans).map((elem) => {
      const rect = elem.getBoundingClientRect();
      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: "transparent" },
        ...mergedPhysicsOptions,
      });

      // Set initial velocities
      Body.setVelocity(body, {
        x: (Math.random() - 0.5) * mergedInitialVelocity.x,
        y: (Math.random() - 0.5) * mergedInitialVelocity.y,
      });
      Body.setAngularVelocity(
        body,
        (Math.random() - 0.5) * mergedInitialVelocity.angular,
      );

      return { elem: elem as HTMLElement, body };
    });

    // Position elements initially
    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = "absolute";
      elem.style.left = `${body.position.x}px`;
      elem.style.top = `${body.position.y}px`;
      elem.style.transform = "translate(-50%, -50%)";
      elem.style.willChange = "transform";
    });

    // Add mouse interaction
    let mouseConstraint: Matter.MouseConstraint | null = null;
    if (enableMouseInteraction) {
      const mouse = Mouse.create(containerRef.current);
      mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: mouseConstraintStiffness,
          render: { visible: false },
        },
      });
      render.mouse = mouse;
    }

    // Add all bodies to world
    const bodiesToAdd = [
      floor,
      leftWall,
      rightWall,
      ceiling,
      ...wordBodies.map((wb) => wb.body),
    ];
    if (mouseConstraint) {
      bodiesToAdd.push(mouseConstraint as any);
    }
    World.add(engine.world, bodiesToAdd);

    // Create runner
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);
    Render.run(render);

    // Update loop
    let settledCount = 0;
    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        elem.style.left = `${x}px`;
        elem.style.top = `${y}px`;
        elem.style.transform = `translate(-50%, -50%) rotate(${body.angle}rad)`;
      });

      // Check if bodies have settled
      const allSettled = wordBodies.every(({ body }) => {
        const speed = Math.abs(body.velocity.x) + Math.abs(body.velocity.y);
        return speed < 0.1;
      });

      if (allSettled) {
        settledCount++;
        if (settledCount > 60) {
          // Settled for 1 second at 60fps
          onAnimationEnd?.();
          return;
        }
      } else {
        settledCount = 0;
      }

      animationFrameRef.current = requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return cleanup;
  }, [
    effectStarted,
    isReady,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
    mergedPhysicsOptions,
    mergedInitialVelocity,
    enableMouseInteraction,
    cleanup,
    onAnimationStart,
    onAnimationEnd,
  ]);

  const handleTrigger = useCallback(() => {
    if (!effectStarted && (trigger === "click" || trigger === "hover")) {
      setEffectStarted(true);
    }
  }, [effectStarted, trigger]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: This is a decorative visual effect that responds to mouse events for aesthetic purposes
    <div
      ref={containerRef}
      className={`relative z-[1] w-full overflow-hidden pt-8 text-center ${className}`}
      style={{ minHeight }}
      onClick={trigger === "click" ? handleTrigger : undefined}
      onMouseEnter={trigger === "hover" ? handleTrigger : undefined}
      role="presentation"
      aria-label={
        trigger !== "auto" ? "Click or hover to animate text" : undefined
      }
    >
      <div
        ref={textRef}
        className="pointer-events-none inline-block"
        style={{
          fontSize,
          lineHeight: 1.4,
        }}
        aria-live="polite"
      />

      <div
        className="pointer-events-none absolute inset-0"
        ref={canvasContainerRef}
        aria-hidden="true"
      />
    </div>
  );
};

export default FallingText;
