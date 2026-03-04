import { t } from '../../i18n';

function Credits() {
  return (
    <div>
      <small>
        {t.madeBy}{' '}
        <a href="https://lorisbettazza.com">Loris Bettazza</a>
        <br />
        <a href="https://github.com/Pustur/whatsapp-chat-parser-website">
          {t.sourceCode}
        </a>
      </small>
    </div>
  );
}

export default Credits;
