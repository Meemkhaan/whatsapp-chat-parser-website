import { useEffect, useState, useCallback } from 'react';
import { useAtomValue } from 'jotai';

import { extractedFileAtom } from '../../stores/global';
import { getMimeType } from '../../utils/utils';
import { t } from '../../i18n';
import MediaViewer from '../MediaViewer/MediaViewer';

import * as S from './style';

interface IAttachment {
  fileName: string;
}

function Attachment({ fileName }: IAttachment) {
  const extractedFile = useAtomValue(extractedFileAtom);
  const [attachment, setAttachment] = useState<null | string>(null);
  const [error, setError] = useState<null | Error>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewerOpen, setViewerOpen] = useState(false);
  const mimeType = getMimeType(fileName) || '';

  const loadAttachment = useCallback(() => {
    if (!extractedFile || typeof extractedFile === 'string') return;

    const file = extractedFile.files[fileName];

    if (!file) {
      setError(new Error(`Can't find "${fileName}" in archive`));
      return;
    }
    if (mimeType) {
      setIsLoading(true);
      file.async('base64').then(data => {
        setAttachment(data);
        setIsLoading(false);
      });
      return;
    }

    const sizeLimit = 250 * 1024 * 1024; // 250 MB
    // @ts-expect-error _data is not typed
    // eslint-disable-next-line no-underscore-dangle
    const uncompressedSize = file?._data?.uncompressedSize ?? -1;

    if (uncompressedSize > 0 && uncompressedSize < sizeLimit) {
      setIsLoading(true);
      file.async('blob').then(blob => {
        setAttachment(URL.createObjectURL(blob));
        setIsLoading(false);
      });
      return;
    }

    setError(new Error(`Can't load "${fileName}" as it exceeds 250MB`));
  }, [extractedFile, fileName, mimeType]);

  useEffect(() => {
    if (
      mimeType.startsWith('image/') ||
      mimeType.startsWith('audio/') ||
      mimeType.startsWith('video/')
    ) {
      loadAttachment();
    }
  }, [loadAttachment, mimeType]);

  if (error) return <S.Error>{error.message}</S.Error>;
  if (!attachment) {
    return (
      <div>
        {isLoading ? (
          <S.Loading>{t.loadingAttachment(fileName)}</S.Loading>
        ) : (
          <S.Button type="button" onClick={loadAttachment}>
            Load {fileName}
          </S.Button>
        )}
      </div>
    );
  }

  const dataSrc =
    attachment.startsWith('data:') || attachment.startsWith('blob:')
      ? attachment
      : `data:${mimeType};base64,${attachment}`;

  if (mimeType.startsWith('image/')) {
    return (
      <>
        <S.MediaThumb
          role="button"
          tabIndex={0}
          onClick={() => setViewerOpen(true)}
          onKeyDown={e => e.key === 'Enter' && setViewerOpen(true)}
          aria-label={t.chatImage}
        >
          <img
            src={dataSrc}
            title={fileName}
            alt={fileName || t.chatImage}
          />
        </S.MediaThumb>
        <MediaViewer
          open={viewerOpen}
          onClose={() => setViewerOpen(false)}
          type="image"
          src={dataSrc}
          title={fileName}
        />
      </>
    );
  }

  if (mimeType.startsWith('video/')) {
    return (
      <>
        <S.MediaThumb
          role="button"
          tabIndex={0}
          onClick={() => setViewerOpen(true)}
          onKeyDown={e => e.key === 'Enter' && setViewerOpen(true)}
          aria-label={t.chatVideo}
        >
          <video title={fileName} preload="metadata">
            <source src={dataSrc} type={mimeType} />
          </video>
          <S.PlayOverlay aria-hidden>▶</S.PlayOverlay>
        </S.MediaThumb>
        <MediaViewer
          open={viewerOpen}
          onClose={() => setViewerOpen(false)}
          type="video"
          src={dataSrc}
          title={fileName}
          mimeType={mimeType}
        />
      </>
    );
  }

  if (mimeType.startsWith('audio/')) {
    return (
      <S.AudioWrap>
        <audio
          controls
          src={dataSrc}
          title={fileName}
          preload="metadata"
          aria-label={fileName || t.chatAudio}
        />
      </S.AudioWrap>
    );
  }

  return (
    <a href={attachment} download={fileName}>
      {fileName}
    </a>
  );
}

export default Attachment;
