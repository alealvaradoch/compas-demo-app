# 003 - Motion

## Objetivo

Las animaciones deben hacer que la aplicación se sienta fluida, moderna y nativa.

El usuario nunca debe esperar una animación; simplemente debe percibir continuidad entre acciones.

---

# Filosofía

El motion debe comunicar:

* Fluidez
* Rapidez
* Calidad
* Naturalidad

Nunca debe sentirse:

* Lento
* Exagerado
* Infantil
* Distractor

Si una animación llama más la atención que el contenido, probablemente es demasiado fuerte.

---

# Librería

Toda la aplicación utilizará:

* Framer Motion

No mezclar múltiples librerías de animación.

---

# Principios

## Todo cambio debe sentirse continuo.

Evitar cambios instantáneos cuando exista una mejor transición.

## El contenido debe aparecer naturalmente.

Evitar elementos que simplemente "aparezcan" sin contexto.

## La interacción debe tener respuesta inmediata.

Todo elemento interactivo debe responder visualmente al usuario.

## La velocidad transmite calidad.

Las animaciones deben ser rápidas.

---

# Transiciones entre pantallas

Utilizar:

* Fade
* Slide muy sutil
* Shared element transitions cuando tenga sentido

No utilizar:

* Zoom exagerado
* Rotaciones
* Bounce

---

# Cards

Al aparecer:

* Fade In
* Elevación ligera
* Desplazamiento vertical muy pequeño

Hover:

* Elevación suave
* Escala mínima

Click:

* Feedback inmediato

---

# Botones

Hover:

* Cambio suave de color
* Elevación ligera

Active:

* Compresión muy pequeña
* Duración corta

Nunca utilizar rebotes.

---

# Inputs

Focus:

* Cambio de borde
* Cambio de sombra
* Focus Ring

Nunca animar tamaño.

---

# Modales

Abrir:

* Fade
* Scale muy pequeño

Cerrar:

* Fade

Backdrop:

* Blur suave
* Fade

---

# Bottom Navigation

Cambio de pestaña:

* Indicador animado
* Icono activo con transición suave
* Cambio de color progresivo

Nunca cambiar instantáneamente.

---

# Dropdowns

Abrir:

* Fade
* Desplazamiento vertical pequeño

Cerrar:

* Fade

---

# Toasts

Entrada:

* Slide
* Fade

Salida:

* Fade

---

# Listas

Agregar elemento:

* Fade
* Slide pequeño

Eliminar:

* Fade

Reordenar:

* Movimiento natural

---

# Loading

Utilizar:

* Skeletons
* Shimmer
* Progress cuando exista duración conocida

Evitar spinners largos.

---

# Scroll

El scroll debe sentirse completamente nativo.

Evitar efectos innecesarios.

---

# Microinteracciones

Toda acción importante debe tener feedback visual.

Ejemplos:

* Hover
* Active
* Focus
* Cambio de estado
* Confirmación
* Error
* Success

---

# Accesibilidad

Respetar la preferencia del sistema:

prefers-reduced-motion

Reducir animaciones cuando el usuario lo solicite.

---

# Reglas

* Menos animaciones, mejor.
* Priorizar fluidez sobre espectacularidad.
* Mantener consistencia en toda la aplicación.
* No inventar nuevas animaciones para componentes similares.
* Cada animación debe tener un propósito funcional.

---

# Motion assets

Las animaciones concretas se documentan en:

`docs/design-assets/animations/`

Este documento define las reglas generales.  
Los archivos en `design-assets/animations/` contienen ejemplos reales, código y referencias específicas.

Si existe conflicto, seguir este orden:

1. Este documento
2. `docs/design-assets/animations/`
3. Código externo original