# Asset: Aurora Login Background

## Categoría
Background / Login Page

## Fuente
Aceternity UI

## Link original
https://ui.aceternity.com/components/aurora-background

## Stack detectado
React + Tailwind CSS v4 + Motion

## Uso en la app
Background especial para la pantalla de login.

No usar en:
- Dashboard
- Clientes
- Agenda
- Cobros
- Reportes
- Configuración

## Qué me gusta
- Da una primera impresión premium.
- Funciona bien para una pantalla de entrada.
- La animación es lenta y sutil.
- No compite directamente con información operativa.

## Dependencias

```bash
npm i motion clsx tailwind-merge
```

## Util requerido

Crear archivo:

```txt
src/lib/utils.js
```

Código:

```js
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
```

Nota:
El ejemplo original usa `lib/utils.ts`, pero este proyecto usa JavaScript, por eso debe adaptarse a `src/lib/utils.js`.

## Configuración Tailwind CSS v4

Agregar en el CSS global:

```css
@import "tailwindcss";

@theme inline {
  --animate-aurora: aurora 60s linear infinite;

  @keyframes aurora {
    from {
      background-position:
        50% 50%,
        50% 50%;
    }
    to {
      background-position:
        350% 50%,
        350% 50%;
    }
  }
}
```

## Archivos sugeridos

```txt
src/components/ui/AuroraBackground.jsx
src/pages/LoginPage.jsx
```

## Props disponibles

| Prop | Tipo | Default | Uso |
|---|---|---|---|
| children | ReactNode | N/A | Contenido dentro del background |
| className | string | N/A | Clases adicionales |
| showRadialGradient | boolean | true | Activa/desactiva el radial gradient |
| ...props | object | N/A | Props adicionales del div |

## Adaptación requerida
- Convertir el componente de TypeScript a JavaScript.
- Adaptar colores al tema claro del proyecto.
- Mantener el efecto sutil.
- Validar contraste del login card encima del background.
- Respetar `prefers-reduced-motion`.
- No usar como background operativo de la app.

## Código original
```jsx
"use client";;
import { cn } from "@/lib/utils";
import React from "react";

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-zinc-50 text-slate-950 dark:bg-zinc-900",
          className
        )}
        {...props}>
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#3b82f6_10%,#a5b4fc_15%,#93c5fd_20%,#ddd6fe_25%,#60a5fa_30%)",

              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",

              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

              "--blue-300": "#93c5fd",
              "--blue-400": "#60a5fa",
              "--blue-500": "#3b82f6",
              "--indigo-300": "#a5b4fc",
              "--violet-200": "#ddd6fe",
              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent"
            }
          }>
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-50 blur-[10px] invert filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--indigo-300)_15%,var(--blue-300)_20%,var(--violet-200)_25%,var(--blue-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora)]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}></div>
        </div>
        {children}
      </div>
    </main>
  );
};
```


## Demo original

```jsx
"use client";

import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "../ui/aurora-background";

export function AuroraBackgroundDemo() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4">
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Background lights are cool you know.
        </div>
        <div
          className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
          And this, is chemical burn.
        </div>
        <button
          className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
          Debug now
        </button>
      </motion.div>
    </AuroraBackground>
  );
}
```

## Estado
Pendiente de adaptar.