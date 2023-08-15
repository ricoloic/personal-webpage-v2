import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Roboto', sans-serif;
    height: 100vh;
    letter-spacing: 1px;
    font-weight: 400;
    color: ${({ theme }) => theme.black};
  }

  h1,h2,h3,h4,h5,h6 {
    user-select: none;
  }

  label {
    display: block;
  }

  #root {
    height: 100%;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  a:active {
    cursor: grab;
  }

  * {
    box-sizing: border-box;
  }

  .no-move {
    overflow: hidden !important;
    width: 100% !important;
  }

  .no-move * {
    user-select: text;
  }

  iframe {
    display: none;
  }

  [role="button"], svg {
    user-select: none;
    -moz-user-select: none;
    -moz-user-focus: ignore;
  }
  
  canvas {
    user-select: none;
    -moz-user-select: none;
    -moz-user-focus: ignore;
  }
`;
