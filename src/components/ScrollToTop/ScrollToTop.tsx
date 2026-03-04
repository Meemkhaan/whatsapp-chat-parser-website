import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { whatsappThemeColor } from '../../utils/colors';
import { t } from '../../i18n';

const Button = styled.button`
  position: fixed;
  right: 1rem;
  bottom: 5rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: ${whatsappThemeColor};
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  opacity: 0.9;
  transition: opacity 0.2s, transform 0.2s;
  z-index: 50;
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 1;
    transform: scale(1.05);
  }

  @media (min-width: 700px) {
    right: 2rem;
    bottom: 6rem;
  }
`;

const SCROLL_THRESHOLD = 400;

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <Button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label={t.scrollToTop}
      title={t.scrollToTop}
    >
      ↑
    </Button>
  );
}

export default ScrollToTop;
