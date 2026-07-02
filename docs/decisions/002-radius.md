# 002 - Radius

## Objetivo

Mantener un lenguaje visual consistente mediante un sistema reducido de radios.

Los radios deben transmitir una apariencia moderna, premium y amigable sin sentirse excesivamente redondeados.

---

## Filosofía

* Bordes suaves.
* Consistencia en toda la aplicación.
* Evitar mezclar muchos radios distintos.
* Los componentes similares deben compartir el mismo radio.

---

## Escala

| Token |  Radio | Uso                                  |
| ----- | -----: | ------------------------------------ |
| xs    |    6px | Badges, chips pequeños               |
| sm    |    8px | Inputs compactos, botones pequeños   |
| md    |   12px | Inputs, botones, dropdowns           |
| lg    |   16px | Cards, modales pequeños              |
| xl    |   20px | Cards principales                    |
| 2xl   |   24px | Bottom navigation, paneles flotantes |
| full  | 9999px | Pills, avatars, FAB                  |

---

## Uso recomendado

### Botones

12px

### Inputs

12px

### Search bars

9999px

### Cards

16px

### Cards principales

20px

### Dropdowns

16px

### Bottom Navigation

24px

### Floating Action Button

9999px

### Modales

20px

### Tooltips

12px

### Badges

9999px

### Chips

9999px

### Toasts

16px

---

## Reglas

* Utilizar siempre los tokens definidos.
* No introducir radios arbitrarios.
* Mantener el mismo radio entre componentes equivalentes.
* Priorizar radios grandes para superficies y radios pequeños para controles.

---

## Excepciones

Solo crear un radio nuevo cuando exista una necesidad visual clara y se documente en este archivo.
