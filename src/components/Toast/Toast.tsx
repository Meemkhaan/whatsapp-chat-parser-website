import { useEffect } from 'react';
import { useAtom } from 'jotai';
import styled from 'styled-components';
import { toastMessageAtom } from '../../stores/toast';
import { setErrorHandler, defaultErrorHandler } from '../../errorNotifier';

const ToastContainer = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 4rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.75rem 1.25rem;
  background: #333;
  color: white;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 100;
  max-width: 90vw;
  opacity: ${p => (p.$visible ? 1 : 0)};
  pointer-events: ${p => (p.$visible ? 'auto' : 'none')};
  transition: opacity 0.2s ease;

  @media (min-width: 700px) {
    bottom: 5rem;
  }
`;

function Toast() {
  const [message, setMessage] = useAtom(toastMessageAtom);

  useEffect(() => {
    setErrorHandler((msg: string) => setMessage(msg));
    return () => setErrorHandler(defaultErrorHandler);
  }, [setMessage]);

  useEffect(() => {
    if (!message) return;
    const id = setTimeout(() => setMessage(null), 5000);
    return () => clearTimeout(id);
  }, [message, setMessage]);

  if (!message) return null;

  return (
    <ToastContainer $visible={!!message} role="alert">
      {message}
    </ToastContainer>
  );
}

export default Toast;
