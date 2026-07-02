# Asset: Login Card

## Categoría
Form / Login

## Fuente
Uiverse

## Link original
[(https://uiverse.io/Praashoo7/short-horse-99)

## Stack detectado
React + styled-components

## Decisión
No implementar directamente porque usa `styled-components`.

Este asset se usará solo como referencia visual/interacción.

## Qué me gusta
- Card centrada.
- Hover con elevación.
- Sombra física.
- Formulario simple.

## Adaptación requerida
- Convertir a React + Tailwind.
- Usar glass effect.
- Usar radius del sistema.
- Usar botón primario del sistema.
- Usar `type="password"` para el campo de contraseña.
- Combinar con Aurora Login Background.
- Usar la tipografía global definida en `docs/design-system.md`.
- No copiar fuentes ni estilos tipográficos del asset original.

## Código original
```jsx
import React from 'react';
import styled from 'styled-components';

const Form = () => {
  return (
    <StyledWrapper>
      <form className="form">
        <p className="heading">Login</p>
        <input className="input" placeholder="Username" type="text" />
        <input className="input" placeholder="Password" type="text" /> 
        <button className="btn">Submit</button>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: white;
    padding: 2.5em;
    border-radius: 25px;
    transition: .4s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.4) 1px 2px 2px;
  }

  .form:hover {
    transform: translateX(-0.5em) translateY(-0.5em);
    border: 1px solid #171717;
    box-shadow: 10px 10px 0px #666666;
  }

  .heading {
    color: black;
    padding-bottom: 2em;
    text-align: center;
    font-weight: bold;
  }

  .input {
    border-radius: 5px;
    border: 1px solid whitesmoke;
    background-color: whitesmoke;
    outline: none;
    padding: 0.7em;
    transition: .4s ease-in-out;
  }

  .input:hover {
    box-shadow: 6px 6px 0px #969696,
               -3px -3px 10px #ffffff;
  }

  .input:focus {
    background: #ffffff;
    box-shadow: inset 2px 5px 10px rgba(0,0,0,0.3);
  }

  .form .btn {
    margin-top: 2em;
    align-self: center;
    padding: 0.7em;
    padding-left: 1em;
    padding-right: 1em;
    border-radius: 10px;
    border: none;
    color: black;
    transition: .4s ease-in-out;
    box-shadow: rgba(0, 0, 0, 0.4) 1px 1px 1px;
  }

  .form .btn:hover {
    box-shadow: 6px 6px 0px #969696,
               -3px -3px 10px #ffffff;
    transform: translateX(-0.5em) translateY(-0.5em);
  }

  .form .btn:active {
    transition: .2s;
    transform: translateX(0em) translateY(0em);
    box-shadow: none;
  }`;

export default Form;

