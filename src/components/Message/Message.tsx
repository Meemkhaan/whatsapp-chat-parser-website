import React, { Suspense } from 'react';
import Linkify from 'react-linkify';

import Attachment from '../Attachment/Attachment';
import Poll from '../Poll/Poll';
import * as S from './style';
import { IndexedMessage } from '../../types';
import { parsePollMessage } from '../../utils/poll-parser';
import { t } from '../../i18n';

function Link(
  decoratedHref: string,
  decoratedText: string,
  key: number,
): React.ReactNode | undefined {
  return (
    <a key={key} target="_blank" rel="noopener noreferrer" href={decoratedHref}>
      {decoratedText}
    </a>
  );
}

function highlightMatches(text: string, query: string): React.ReactNode {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === query.trim().toLowerCase() ? (
      <mark key={i}>{part}</mark>
    ) : (
      part
    ),
  );
}

interface IMessage {
  message: IndexedMessage;
  color: string;
  isActiveUser: boolean;
  sameAuthorAsPrevious: boolean;
  searchQuery?: string;
}

function Message({
  message,
  color,
  isActiveUser,
  sameAuthorAsPrevious,
  searchQuery,
}: IMessage) {
  const isSystem = !message.author;
  const dateTime = message.date.toISOString().slice(0, 19).replace('T', ' ');
  const pollData = parsePollMessage(message.message);
  const textContent =
    searchQuery && !message.attachment && pollData === null
      ? highlightMatches(message.message, searchQuery)
      : message.message;
  let messageComponent = (
    <Linkify componentDecorator={Link}>
      <S.Message>{textContent}</S.Message>
    </Linkify>
  );

  if (message.attachment) {
    messageComponent = (
      <Suspense fallback={t.loadingAttachment(message.attachment.fileName)}>
        <Attachment fileName={message.attachment.fileName} />
      </Suspense>
    );
  } else if (pollData !== null) {
    messageComponent = <Poll pollData={pollData} />;
  }

  return (
    <S.Item
      $isSystem={isSystem}
      $isActiveUser={isActiveUser}
      $sameAuthorAsPrevious={sameAuthorAsPrevious}
    >
      <S.Bubble $isSystem={isSystem} $isActiveUser={isActiveUser}>
        <S.Index $isSystem={isSystem} $isActiveUser={isActiveUser}>
          {(message.index + 1).toLocaleString('de-CH')}
        </S.Index>
        <S.Wrapper>
          {!isSystem && !sameAuthorAsPrevious && (
            <S.Author color={color}>{message.author}</S.Author>
          )}
          {messageComponent}
        </S.Wrapper>
        {!isSystem && (
          <S.DateRow>
            <S.Date dateTime={dateTime}>
              {new Intl.DateTimeFormat('default', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
              }).format(message.date)}
            </S.Date>
          </S.DateRow>
        )}
      </S.Bubble>
    </S.Item>
  );
}

export default Message;
