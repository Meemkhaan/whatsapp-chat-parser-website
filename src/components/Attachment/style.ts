import styled from 'styled-components';

import { normalizeInput, standardButton } from '../../utils/styles';

const Button = styled.button`
  ${normalizeInput}
  ${standardButton}
`;

const Error = styled.div`
  font-size: 0.9rem;
  color: #c00;

  @media (prefers-color-scheme: dark) {
    color: #f66;
  }
`;

const Loading = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const PlayOverlay = styled.span`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 3rem;
  pointer-events: none;
`;

const MediaThumb = styled.div`
  cursor: pointer;
  display: inline-block;
  max-width: 100%;
  border-radius: 8px;
  overflow: hidden;
  position: relative;

  img,
  video {
    max-width: 100%;
    max-height: 70vh;
    display: block;
    vertical-align: middle;
  }

  video {
    max-height: 200px;
  }
`;

const AudioWrap = styled.div`
  min-width: 240px;
  max-width: 100%;

  audio {
    width: 100%;
    height: 32px;
  }
`;

export { Button, Error, Loading, MediaThumb, PlayOverlay, AudioWrap };
