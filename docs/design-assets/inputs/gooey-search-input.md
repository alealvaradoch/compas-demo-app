# Asset: Gooey Search Input

## Categoría
Input / Search Input

## Fuente
Aceternity UI

## Link original
https://ui.aceternity.com/components/gooey-input

---

## Stack detectado

- React
- Tailwind CSS
- Motion

---

## Dependencias

```bash
npm i motion clsx tailwind-merge
```

---

## Uso en la app

Search input destacado para pantallas con listas o filtros importantes.

Uso recomendado:

- Clientes
- Agenda / Servicios
- Cobros
- Reportes

No utilizar como input estándar de formularios.

---

## Qué me gusta

- Expande el input de forma fluida.
- Se siente moderno y premium.
- Aprovecha mejor el espacio en móvil.
- La interacción ayuda a destacar la búsqueda sin ocupar espacio permanente.

---

## Riesgos

- Puede sentirse demasiado llamativo si se usa en muchas pantallas.
- El estilo original es oscuro y debe adaptarse al tema claro.
- Debe respetar `prefers-reduced-motion`.
- No debe sustituir todos los campos de búsqueda.

---

## Adaptación requerida

- Adaptar a tema claro.
- Aplicar glass effect del proyecto.
- Utilizar los tokens definidos en `001-color-palette.md`.
- Utilizar radius `full`.
- Sustituir el icono SVG por Phosphor Icons.
- Reducir el bounce si resulta excesivo.
- Mantener compatibilidad móvil.
- Seguir las reglas definidas en `003-motion.md`.

---

## Archivo sugerido

```txt
src/components/ui/GooeyInput.jsx
```

---

## Props disponibles

| Prop | Tipo | Default | Uso |
|------|------|---------|-----|
| placeholder | string | `"Type to search..."` | Placeholder |
| className | string | — | Clases del contenedor |
| classNames | object | — | Clases internas del componente |
| collapsedWidth | number | `115` | Ancho cerrado |
| expandedWidth | number | `200` | Ancho abierto |
| expandedOffset | number | `50` | Desplazamiento al expandirse |
| gooeyBlur | number | `5` | Intensidad del efecto gooey |
| value | string | — | Valor controlado |
| defaultValue | string | `""` | Valor inicial |
| onValueChange | function | — | Callback al cambiar el texto |
| onOpenChange | function | — | Callback al abrir/cerrar |
| disabled | boolean | `false` | Deshabilita el componente |

---

## Código original

```jsx
"use client";;
import { useState, useRef, useEffect, useId, useMemo, useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

function GooeyFilter({
  filterId,
  blur
}) {
  return (
    <svg className="absolute hidden h-0 w-0" aria-hidden>
      <defs>
        <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} result="blur" />
          <feColorMatrix
            in="blur"
            type="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10"
            result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop" />
        </filter>
      </defs>
    </svg>
  );
}

function SearchIcon({
  layoutId
}) {
  return (
    <motion.svg
      layoutId={layoutId}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      className="size-4 shrink-0">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </motion.svg>
  );
}

const transition = {
  duration: 0.4,
  type: "spring",
  bounce: 0.25,
};

const iconBubbleVariants = {
  collapsed: { scale: 0, opacity: 0 },
  expanded: { scale: 1, opacity: 1 },
};

export function GooeyInput({
  placeholder = "Type to search...",
  className,
  classNames,
  collapsedWidth = 115,
  expandedWidth = 200,
  expandedOffset = 50,
  gooeyBlur = 5,
  value: valueProp,
  defaultValue = "",
  onValueChange,
  onOpenChange,
  disabled = false
}) {
  const reactId = useId();
  const safeId = reactId.replace(/:/g, "");
  const filterId = `gooey-filter-${safeId}`;
  const iconLayoutId = `gooey-input-icon-${safeId}`;
  const inputLayoutId = `gooey-input-field-${safeId}`;

  const inputRef = useRef(null);
  const prevExpandedRef = useRef(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const isControlled = valueProp !== undefined;
  const searchText = isControlled ? valueProp : uncontrolledValue;

  const setSearchText = useCallback((next) => {
    if (!isControlled) {
      setUncontrolledValue(next);
    }
    onValueChange?.(next);
  }, [isControlled, onValueChange]);

  const setExpanded = useCallback((next) => {
    setIsExpanded(next);
    onOpenChange?.(next);
  }, [onOpenChange]);

  useEffect(() => {
    if (isExpanded) {
      inputRef.current?.focus();
    } else if (prevExpandedRef.current) {
      setSearchText("");
    }
    prevExpandedRef.current = isExpanded;
  }, [isExpanded, setSearchText]);

  const buttonVariants = useMemo(() => ({
    collapsed: { width: collapsedWidth, marginLeft: 0 },
    expanded: { width: expandedWidth, marginLeft: expandedOffset },
  }), [collapsedWidth, expandedWidth, expandedOffset]);

  const handleExpand = useCallback(() => {
    if (!disabled) setExpanded(true);
  }, [disabled, setExpanded]);

  const handleChange = useCallback((e) => {
    setSearchText(e.target.value);
  }, [setSearchText]);

  const handleBlur = useCallback(() => {
    if (!searchText) setExpanded(false);
  }, [searchText, setExpanded]);

  const surfaceClass =
    "bg-foreground text-background shadow-sm ring-1 ring-border/60";

  return (
    <div
      className={cn("relative flex items-center justify-center", className, classNames?.root)}>
      <GooeyFilter filterId={filterId} blur={gooeyBlur} />
      <div
        className={cn("relative flex h-10 items-center justify-center", classNames?.filterWrap)}
        style={{ filter: `url(#${filterId})` }}>
        <motion.div
          className={cn("flex h-10 items-center justify-center", classNames?.buttonRow)}
          variants={buttonVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          transition={transition}>
          <button
            type="button"
            disabled={disabled}
            onClick={handleExpand}
            className={cn(
              "flex h-10 w-full cursor-pointer items-center justify-center gap-2 rounded-full px-4 text-sm font-medium outline-none transition-[color,box-shadow] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
              surfaceClass,
              classNames?.trigger
            )}>
            {!isExpanded ? (
              <SearchIcon layoutId={iconLayoutId} />
            ) : null}
            <motion.input
              layoutId={inputLayoutId}
              ref={inputRef}
              type="search"
              enterKeyHint="search"
              autoComplete="off"
              value={searchText}
              onChange={handleChange}
              onBlur={handleBlur}
              disabled={disabled || !isExpanded}
              placeholder={placeholder}
              className={cn(
                "h-full min-w-0 flex-1 bg-transparent text-sm text-background outline-none",
                isExpanded
                  ? "placeholder:text-background/50 dark:placeholder:text-background/45"
                  : "pointer-events-none placeholder:text-background/80 dark:placeholder:text-background/70",
                classNames?.input
              )} />
          </button>
        </motion.div>

        <motion.div
          className={cn(
            "absolute top-1/2 left-0 flex size-10 -translate-y-1/2 items-center justify-center",
            classNames?.bubble
          )}
          variants={iconBubbleVariants}
          initial="collapsed"
          animate={isExpanded ? "expanded" : "collapsed"}
          transition={transition}>
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-full",
              surfaceClass,
              classNames?.bubbleSurface
            )}>
            <SearchIcon layoutId={iconLayoutId} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

```

---

## Estado

Pendiente de adaptar.