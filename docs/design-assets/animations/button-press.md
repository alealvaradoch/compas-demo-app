# Asset: Noise Button Press

## Categoría
Animation / Button

## Fuente
Aceternity UI

## Link original
(https://ui.aceternity.com/components/noise-background)

## Stack detectado
React + Tailwind CSS + Motion

## Uso en la app
Animación premium para botones principales destacados.

Uso recomendado:
- Login CTA
- Crear demo
- Nuevo cliente
- Registrar pago

No usar en todos los botones secundarios.

## Qué me gusta
- Se siente premium.
- Tiene feedback táctil con `active:scale-98`.
- El fondo animado da más presencia sin ser demasiado agresivo.
- Funciona bien para CTA principal.

## Dependencias

```bash
npm i motion clsx tailwind-merge
```

## Util requerido

```txt
src/lib/utils.js
```

```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
```

## Adaptación requerida
- Convertir de TypeScript a JavaScript.
- Usar colores del sistema.
- Usar radius `full`.
- Mantener el efecto solo para botones destacados.
- Respetar `prefers-reduced-motion`.
- Revisar si la imagen externa `noise.webp` debe copiarse localmente.

## Props disponibles

| Prop | Tipo | Default | Uso |
|---|---|---|---|
| children | React.ReactNode | — | Contenido interno |
| className | string | — | Clases del contenido |
| containerClassName | string | — | Clases del contenedor |
| gradientColors | string[] | pink/blue/yellow | Colores del gradiente |
| noiseIntensity | number | 0.2 | Intensidad del ruido |
| speed | number | 0.1 | Velocidad del movimiento |
| backdropBlur | boolean | false | Blur del contenedor |
| animating | boolean | true | Activa/desactiva animación |

## Código original
```jsx
"use client";;
import { cn } from "@/lib/utils";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useRef } from "react";

// Helper component for gradient layers
function GradientLayer({
  springX,
  springY,
  gradientColor,
  opacity,
  multiplier
}) {
  const x = useTransform(springX, (val) => val * multiplier);
  const y = useTransform(springY, (val) => val * multiplier);
  const background = useMotionTemplate`radial-gradient(circle at ${x}px ${y}px, ${gradientColor} 0%, transparent 50%)`;

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        opacity,
        background,
      }} />
  );
}

export const NoiseBackground = ({
  children,
  className,
  containerClassName,

  gradientColors = [
    "rgb(255, 100, 150)",
    "rgb(100, 150, 255)",
    "rgb(255, 200, 100)",
  ],

  noiseIntensity = 0.2,
  speed = 0.1,
  backdropBlur = false,
  animating = true
}) => {
  const containerRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Use spring animation for smooth movement
  const springX = useSpring(x, { stiffness: 100, damping: 30 });
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  // Transform for top gradient strip
  const topGradientX = useTransform(springX, (val) => val * 0.1 - 50);

  const velocityRef = useRef({ x: 0, y: 0 });
  const lastDirectionChangeRef = useRef(0);

  // Initialize position to center
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    x.set(centerX);
    y.set(centerY);
  }, [x, y]);

  // Generate random velocity
  const generateRandomVelocityRef = useRef(() => {
    const angle = Math.random() * Math.PI * 2;
    const magnitude = speed * (0.5 + Math.random() * 0.5); // Random speed between 0.5x and 1x
    return {
      x: Math.cos(angle) * magnitude,
      y: Math.sin(angle) * magnitude,
    };
  });

  // Update generateRandomVelocity when speed changes
  useEffect(() => {
    generateRandomVelocityRef.current = () => {
      const angle = Math.random() * Math.PI * 2;
      const magnitude = speed * (0.5 + Math.random() * 0.5);
      return {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude,
      };
    };
    velocityRef.current = generateRandomVelocityRef.current();
  }, [speed]);

  // Animate using motion/react's useAnimationFrame
  useAnimationFrame((time) => {
    if (!animating || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const maxX = rect.width;
    const maxY = rect.height;

    // Change direction randomly every 1.5-3 seconds
    if (time - lastDirectionChangeRef.current > 1500 + Math.random() * 1500) {
      velocityRef.current = generateRandomVelocityRef.current();
      lastDirectionChangeRef.current = time;
    }

    // Update position based on velocity (deltaTime is ~16ms per frame at 60fps)
    const deltaTime = 16; // Approximate frame time
    const currentX = x.get();
    const currentY = y.get();

    let newX = currentX + velocityRef.current.x * deltaTime;
    let newY = currentY + velocityRef.current.y * deltaTime;

    // When hitting edges, generate a completely new random direction
    // This ensures truly random movement in all 360 degrees, not just horizontal/vertical
    const padding = 20; // Keep some distance from edges

    if (
      newX < padding ||
      newX > maxX - padding ||
      newY < padding ||
      newY > maxY - padding
    ) {
      // Generate completely random direction (full 360 degrees)
      const angle = Math.random() * Math.PI * 2;
      const magnitude = speed * (0.5 + Math.random() * 0.5);
      velocityRef.current = {
        x: Math.cos(angle) * magnitude,
        y: Math.sin(angle) * magnitude,
      };
      // Reset timer to allow immediate new direction
      lastDirectionChangeRef.current = time;
      // Clamp position to stay within bounds
      newX = Math.max(padding, Math.min(maxX - padding, newX));
      newY = Math.max(padding, Math.min(maxY - padding, newY));
    }

    x.set(newX);
    y.set(newY);
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "group relative overflow-hidden rounded-2xl bg-neutral-200 p-2 backdrop-blur-sm dark:bg-neutral-800",
        "shadow-[0px_0.5px_1px_0px_var(--color-neutral-400)_inset,0px_1px_0px_0px_var(--color-neutral-100)]",
        "dark:shadow-[0px_1px_0px_0px_var(--color-neutral-950)_inset,0px_1px_0px_0px_var(--color-neutral-800)]",
        backdropBlur &&
          "after:absolute after:inset-0 after:h-full after:w-full after:backdrop-blur-lg after:content-['']",
        containerClassName
      )}
      style={
        {
          "--noise-opacity": noiseIntensity
        }
      }>
      {/* Moving gradient layers */}
      <GradientLayer
        springX={springX}
        springY={springY}
        gradientColor={gradientColors[0]}
        opacity={0.4}
        multiplier={1} />
      <GradientLayer
        springX={springX}
        springY={springY}
        gradientColor={gradientColors[1]}
        opacity={0.3}
        multiplier={0.7} />
      <GradientLayer
        springX={springX}
        springY={springY}
        gradientColor={gradientColors[2] || gradientColors[0]}
        opacity={0.25}
        multiplier={1.2} />
      {/* Top gradient strip */}
      <motion.div
        className="absolute inset-x-0 top-0 h-1 rounded-t-2xl opacity-80 blur-sm"
        style={{
          background: `linear-gradient(to right, ${gradientColors.join(", ")})`,
          x: animating ? topGradientX : 0,
        }} />
      {/* Static Noise Pattern */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="https://assets.aceternity.com/noise.webp"
          alt=""
          className="h-full w-full object-cover opacity-[var(--noise-opacity)]"
          style={{ mixBlendMode: "overlay" }} />
      </div>
      {/* Content */}
      <div className={cn("relative z-10", className)}>{children}</div>
    </div>
  );
};
```

## Demo original
```jsx
import { cn } from "@/lib/utils";
import { NoiseBackground } from "@/components/ui/noise-background";

export function NoiseBackgroundDemoSecond() {
  return (
    <div className="mx-auto max-w-sm">
      <NoiseBackground
        gradientColors={[
          "rgb(255, 100, 150)",
          "rgb(100, 150, 255)",
          "rgb(255, 200, 100)",
        ]}>
        <Card>
          <img
            src="https://assets.aceternity.com/blog/how-to-create-a-bento-grid.png"
            alt="Task Complete"
            className="h-60 w-full rounded-lg object-cover" />
          <div className="px-4 py-2">
            <h3
              className="text-left text-lg font-semibold text-balance text-neutral-800 dark:text-neutral-200">
              How to create a bento grid with Tailwind
            </h3>
            <p className="mt-2 text-left text-sm text-neutral-600 dark:text-neutral-400">
              Learn how to create a bento grid with Tailwind CSS, Next.js and
              Framer Motion.
            </p>
          </div>
        </Card>
      </NoiseBackground>
    </div>
  );
}

const Card = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "flex h-full min-h-80 flex-col overflow-hidden rounded-lg bg-white text-center dark:bg-neutral-800",
        className
      )}>
      {children}
    </div>
  );
};
```

## Estado
Pendiente de adaptar.