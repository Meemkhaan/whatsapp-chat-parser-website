import styled, { createGlobalStyle } from 'styled-components';

import { whatsappThemeColor } from './utils/colors';

const SkipLink = styled.a`
  position: absolute;
  top: -100px;
  left: 0.5rem;
  padding: 0.5rem 1rem;
  background: #333;
  color: white;
  z-index: 1000;
  transition: top 0.2s;

  &:focus {
    top: 0.5rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100%;
  position: relative;
`;

const Header = styled.header`
  padding: 10px;
  display: flex;
  align-items: center;

  > *:first-child {
    flex: 1 1 auto;
  }

  @media (max-width: 699px) {
    flex-direction: column;

    > * + * {
      margin-top: 0.5rem;
    }
  }

  @media (min-width: 700px) {
    > * + * {
      margin-left: 1rem;
    }
  }
`;

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    font-family: sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 
      'Segoe UI Symbol', 'Noto Color Emoji';
    box-sizing: border-box;
    
    @media (prefers-color-scheme: dark) {
      color-scheme: dark;
    }
  }

  body {
    margin: 0;
    color: #333;
  }

  a {
    text-decoration: none;
    color: ${whatsappThemeColor};
  }

  img,
  video,
  audio {
    max-width: 100%;
  }

  button {
    cursor: pointer;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  @media (prefers-color-scheme: dark) {
    body {
      background-color: #262d31;
      color: #ccc;
    }
  }

  @media print {
    video, audio, ${Header}, .menu-open-button {
      display: none !important;
    }
  }
`;

export { GlobalStyles, Container, Header, SkipLink };
