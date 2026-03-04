import { useEffect } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import { showError } from './utils/utils';
import { rawFileAtom, messagesAtom } from './stores/global';
import Dropzone from './components/Dropzone/Dropzone';
import MessageViewer from './components/MessageViewer/MessageViewer';
import Sidebar from './components/Sidebar/Sidebar';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import * as S from './style';
import { t } from './i18n';

import exampleChat from './assets/whatsapp-chat-parser-example.zip';

function App() {
  const messages = useAtomValue(messagesAtom);
  const setRawFile = useSetAtom(rawFileAtom);

  const processFile = (file: File) => {
    if (!file) return;

    const reader = new FileReader();

    reader.addEventListener('loadend', e => {
      if (e.target) {
        setRawFile(e.target.result);
      }
    });

    if (/^application\/(?:x-)?zip(?:-compressed)?$/.test(file.type)) {
      reader.readAsArrayBuffer(file);
    } else if (file.type === 'text/plain') {
      reader.readAsText(file);
    } else {
      showError(`File type ${file.type} not supported`);
    }
  };

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) =>
      document.documentElement.classList.toggle('ctrl-down', e.ctrlKey);

    document.addEventListener('keydown', keyHandler);
    document.addEventListener('keyup', keyHandler);

    return () => {
      document.removeEventListener('keydown', keyHandler);
      document.removeEventListener('keyup', keyHandler);
    };
  }, []);

  const hasMessages = Array.isArray(messages) && messages.length > 0;

  return (
    <>
      <S.GlobalStyles />
      <S.SkipLink href="#main-content">{t.skipToMessages}</S.SkipLink>
      <S.Container>
        <S.Header>
          <Dropzone onFileUpload={processFile} id="dropzone" />
          <span>{t.or}</span>
          <a href={exampleChat} download>
            {t.downloadExample}
          </a>
        </S.Header>
        <MessageViewer />
        {hasMessages && <Sidebar />}
        {hasMessages && <ScrollToTop />}
      </S.Container>
    </>
  );
}

export default App;
