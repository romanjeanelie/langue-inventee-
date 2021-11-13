import { createGlobalStyle } from "styled-components";
import "./reset.css";

const size = {
  mobile: 768,
  tablet: 1024,
};

const device = {
  mobile: `(max-width: ${size.mobile}px)`,
  tablet: `(max-width: ${size.tablet}px)`,
};

const GlobalStyles = createGlobalStyle`
*,
*:after,
*:before {
  box-sizing: border-box;
}

html {
  font-size: 14px;
  line-height: 1;

}

body {
  font-family: 'Roboto', sans-serif;
  background-color: #26272C;
}


a {
  color: inherit;
  outline: none;
  text-decoration: none;
}

button {
  background: transparent;
  border: transparent;
  cursor: pointer;
}


`;

export { GlobalStyles, device, size };
