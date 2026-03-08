import React, { useMemo, useEffect, useCallback, useRef } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { Virtuoso, type VirtuosoHandle } from 'react-virtuoso';

import Message from '../Message/Message';
import SearchResultsPanel from '../SearchResultsPanel/SearchResultsPanel';
import * as S from './style';
import { t } from '../../i18n';
import {
  activeUserAtom,
  messagesAtom,
  participantsAtom,
} from '../../stores/global';

import { authorColors } from '../../utils/colors';
import {
  datesAtom,
  globalFilterModeAtom,
  limitsAtom,
  searchQueryAtom,
  scrollToMessageIndexAtom,
} from '../../stores/filters';
import {
  filterMessagesByDate,
  filterMessagesBySearch,
  getISODateString,
} from '../../utils/utils';

function MessageViewer() {
  const limits = useAtomValue(limitsAtom);
  const [activeUser, setActiveUser] = useAtom(activeUserAtom);
  const participants = useAtomValue(participantsAtom);
  const messages = useAtomValue(messagesAtom);
  const filterMode = useAtomValue(globalFilterModeAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const scrollToMessageIndex = useAtomValue(scrollToMessageIndexAtom);
  const setScrollToMessageIndex = useSetAtom(scrollToMessageIndexAtom);
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const virtuosoRef = useRef<VirtuosoHandle>(null);
  const { start: startDate, end: endDate } = useAtomValue(datesAtom);
  const endDatePlusOne = new Date(endDate);
  endDatePlusOne.setDate(endDatePlusOne.getDate() + 1);
  const colorMap: Record<string, string> = useMemo(
    () =>
      participants.reduce(
        (obj, participant, i) => ({
          ...obj,
          [participant]: authorColors[i % authorColors.length],
        }),
        {},
      ),
    [participants],
  );

  const rangeFiltered =
    filterMode === 'index'
      ? messages.slice(limits.low - 1, limits.high)
      : filterMessagesByDate(messages, startDate, endDatePlusOne);

  const renderedMessages = filterMessagesBySearch(rangeFiltered, searchQuery);
  const isLimited = rangeFiltered.length !== messages.length;
  const isSearchActive = searchQuery.trim().length > 0;

  const itemContent = useCallback(
    (index: number) => {
      const message = renderedMessages[index];
      const prevMessage = renderedMessages[index - 1];
      return (
        <Message
          key={message.index}
          message={message}
          color={colorMap[message.author || '']}
          isActiveUser={activeUser === message.author}
          sameAuthorAsPrevious={
            !!prevMessage && prevMessage.author === message.author
          }
          searchQuery={isSearchActive ? searchQuery : undefined}
        />
      );
    },
    [
      renderedMessages,
      colorMap,
      activeUser,
      isSearchActive,
      searchQuery,
    ],
  );

  // Restore or set "who I am" (persist to localStorage)
  useEffect(() => {
    if (!participants.length) return;
    const stored = localStorage.getItem('chatViewerActiveUser');
    if (stored && participants.includes(stored)) {
      setActiveUser(stored);
    } else {
      setActiveUser(participants[0] || '');
    }
  }, [setActiveUser, participants]);

  useEffect(() => {
    if (activeUser && participants.includes(activeUser)) {
      localStorage.setItem('chatViewerActiveUser', activeUser);
    }
  }, [activeUser, participants]);

  // When user clicks a search result: scroll to that message in the full conversation
  useEffect(() => {
    if (scrollToMessageIndex == null) return;
    const position = rangeFiltered.findIndex(
      (m) => m.index === scrollToMessageIndex,
    );
    if (position < 0) {
      setScrollToMessageIndex(null);
      return;
    }
    const id = requestAnimationFrame(() => {
      virtuosoRef.current?.scrollToIndex({
        index: position,
        behavior: 'smooth',
      });
      setScrollToMessageIndex(null);
    });
    return () => cancelAnimationFrame(id);
  }, [
    scrollToMessageIndex,
    rangeFiltered,
    setScrollToMessageIndex,
  ]);

  const handleSearchResultSelect = useCallback(
    (message: { index: number }) => {
      setScrollToMessageIndex(message.index);
      setSearchQuery('');
    },
    [setScrollToMessageIndex, setSearchQuery],
  );

  return (
    <S.Container id="main-content" tabIndex={-1}>
      {messages.length > 0 && isSearchActive && (
        <SearchResultsPanel
          results={renderedMessages}
          query={searchQuery}
          onSelectMessage={handleSearchResultSelect}
        />
      )}
      {messages.length > 0 && (
        <S.P>
          <S.Info>
            {isSearchActive && (
              <span>
                {renderedMessages.length} messages matching "{searchQuery}"
              </span>
            )}
            {!isSearchActive && isLimited && filterMode === 'index' && (
              <span>
                Showing messages {limits.low} to{' '}
                {Math.min(limits.high, messages.length)} (
                {rangeFiltered.length} out of {messages.length})
              </span>
            )}
            {!isSearchActive && isLimited && filterMode === 'date' && (
              <span>
                Showing messages from {getISODateString(startDate)} to{' '}
                {getISODateString(endDate)}
              </span>
            )}
            {!isSearchActive && !isLimited && (
              <span>{t.showingAll(messages.length)}</span>
            )}
          </S.Info>
        </S.P>
      )}

      <S.List as="div">
        <Virtuoso
          ref={virtuosoRef}
          useWindowScroll
          totalCount={renderedMessages.length}
          itemContent={itemContent}
        />
      </S.List>
    </S.Container>
  );
}

export default React.memo(MessageViewer);
