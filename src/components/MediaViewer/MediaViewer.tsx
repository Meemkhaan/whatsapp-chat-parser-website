import { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { zIndex } from '../../utils/z-index';
import { t } from '../../i18n';

const Overlay = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: ${zIndex.mediaViewer};
  display: ${p => (p.$open ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Content = styled.div`
  max-width: 95vw;
  max-height: 95vh;
  cursor: default;

  img,
  video {
    max-width: 95vw;
    max-height: 95vh;
    object-fit: contain;
  }

  video {
    background: #000;
  }
`;

const CloseHint = styled.p`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.7);
`;

interface IMediaViewer {
  open: boolean;
  onClose: () => void;
  type: 'image' | 'video';
  src: string;
  title?: string;
  mimeType?: string;
}

function MediaViewer({ open, onClose, type, src, title, mimeType }: IMediaViewer) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const stopPropagation = (e: React.MouseEvent) => e.stopPropagation();

  if (!open) return null;

  return (
    <Overlay
      $open={open}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={t.closeMediaViewer}
    >
      <Content ref={contentRef} onClick={stopPropagation}>
        {type === 'image' && (
          <img
            src={src}
            alt={title || t.chatImage}
            title={title}
          />
        )}
        {type === 'video' && (
          <video controls autoPlay title={title || t.chatVideo}>
            <source src={src} type={mimeType || 'video/mp4'} />
          </video>
        )}
      </Content>
      <CloseHint>{t.closeMediaViewer}</CloseHint>
    </Overlay>
  );
}

export default MediaViewer;
