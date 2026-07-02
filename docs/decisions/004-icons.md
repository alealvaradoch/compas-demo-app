# 004 - Icons

## Objetivo

Definir un sistema de íconos consistente para toda la aplicación.

Los íconos deben mejorar la comprensión de la interfaz, facilitar el escaneo visual y reforzar la jerarquía de la información sin convertirse en elementos decorativos.

---

# Librería principal

Utilizar:

`@phosphor-icons/react`

No mezclar múltiples librerías de íconos salvo una excepción documentada.

---

# Filosofía

Los íconos deben sentirse:

* Modernos
* Premium
* Limpios
* Simples
* Consistentes
* Altamente legibles

El objetivo es complementar el contenido, no reemplazarlo.

---

# Estilo

Utilizar principalmente:

```txt
weight="regular"
```

Para acciones principales o estados activos:

```txt
weight="bold"
```

Para elementos secundarios o metadata:

```txt
weight="light"
```

Evitar mezclar distintos pesos dentro del mismo contexto visual.

---

# Tamaños

| Token | Tamaño | Uso                               |
| ----- | -----: | --------------------------------- |
| xs    |   14px | Metadata, badges                  |
| sm    |   16px | Inputs, listas compactas          |
| md    |   20px | Botones, navegación, acciones     |
| lg    |   24px | Cards, headers                    |
| xl    |   28px | Empty states, acciones destacadas |

---

# Color

Por defecto, los íconos deben heredar el color del texto.

Utilizar el color primario únicamente para:

* Navegación activa
* Botones principales
* Acciones destacadas
* Indicadores importantes

Utilizar colores semánticos únicamente para:

* Success
* Warning
* Error
* Information

No utilizar íconos decorativos con múltiples colores.

---

# Uso recomendado

## Navegación

* 20px
* Peso Regular
* Estado activo con color primario

---

## Botones

* 18px o 20px
* Peso Regular

---

## Inputs

* 16px
* Peso Light o Regular

---

## Cards

* 20px o 24px
* Peso Regular

---

## Empty States

* 28px
* Peso Light

---

## Tablas

* 16px
* Peso Regular

---

## Modales

* 20px
* Peso Regular

---

## FAB

* 24px
* Peso Bold

---

# Reglas

* Todo ícono debe tener un propósito funcional.
* No utilizar íconos únicamente como decoración.
* Mantener el mismo ícono para representar la misma acción en toda la aplicación.
* Siempre priorizar texto + ícono sobre ícono únicamente cuando la acción pueda generar ambigüedad.
* Mantener consistencia de tamaño dentro de un mismo contexto.

---

# Accesibilidad

Cuando un botón solo contenga un ícono, siempre incluir un nombre accesible.

Ejemplo:

```jsx
<IconButton aria-label="Abrir configuración">
    <Gear />
</IconButton>
```

---

# Íconos base sugeridos

## Dashboard

* SquaresFour
* ChartBar
* TrendUp

## Clientes

* Users
* User
* UserPlus

## Agenda

* Calendar
* Clock
* ClipboardText

## Cobros

* Wallet
* CreditCard
* Receipt
* CurrencyDollar

## Reportes

* ChartPie
* ChartLine
* FileText

## Configuración

* Gear
* Sliders

## Acciones

* Plus
* MagnifyingGlass
* Funnel
* DotsThree
* PencilSimple
* Trash
* Check
* X
* CaretRight
* CaretDown

## Estados

* CheckCircle
* Warning
* XCircle
* Info

---

# Referencias

Las referencias específicas y componentes que utilicen íconos deberán documentarse en:

`docs/design-assets/`

Este documento define únicamente las reglas generales del sistema de íconos.
