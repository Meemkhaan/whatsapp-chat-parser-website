import styled from 'styled-components';
import { t } from '../../i18n';
import type { IndexedMessage } from '../../types';

const Panel = styled.section`
  margin-bottom: 1rem;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.04);
  border-radius: 8px;

  @media (prefers-color-scheme: dark) {
    background: rgba(255, 255, 255, 0.06);
  }
`;

const Title = styled.h2`
  margin: 0 0 0.5rem 0;
  font-size: 0.9rem;
  font-weight: 600;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 280px;
  overflow-y: auto;
`;

const ResultItem = styled.button`
  display: block;
  width: 100%;
  margin: 0;
  padding: 0.5rem 0.5rem 0.5rem 0;
  text-align: left;
  background: none;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  cursor: pointer;
  font: inherit;
  color: inherit;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: rgba(0, 0, 0, 0.06);
  }

  @media (prefers-color-scheme: dark) {
    border-color: rgba(255, 255, 255, 0.1);

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }
  }
`;

const ResultAuthor = styled.span`
  font-weight: 600;
  font-size: 0.8rem;
  display: block;
  margin-bottom: 0.15rem;
`;

const ResultSnippet = styled.span`
  font-size: 0.85rem;
  opacity: 0.9;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ResultDate = styled.span`
  font-size: 0.75rem;
  opacity: 0.7;
  display: block;
  margin-top: 0.2rem;
`;

const SNIPPET_LENGTH = 80;

function snippet(text: string, maxLen: number): string {
  const t = text.replace(/\s+/g, ' ').trim();
  if (t.length <= maxLen) return t;
  return t.slice(0, maxLen) + '…';
}

interface SearchResultsPanelProps {
  results: IndexedMessage[];
  query: string;
  onSelectMessage: (message: IndexedMessage) => void;
}

function SearchResultsPanel({
  results,
  query,
  onSelectMessage,
}: SearchResultsPanelProps) {
  if (!results.length) return null;

  return (
    <Panel aria-label={t.searchResults}>
      <Title>
        {t.showingSearch(results.length, query)}
      </Title>
      <List>
        {results.map((message) => (
          <ResultItem
            key={message.index}
            type="button"
            onClick={() => onSelectMessage(message)}
            title={t.clickToShowInChat}
          >
            <ResultAuthor>{message.author || 'System'}</ResultAuthor>
            <ResultSnippet>{snippet(message.message, SNIPPET_LENGTH)}</ResultSnippet>
            <ResultDate>
              {new Intl.DateTimeFormat('default', {
                dateStyle: 'short',
                timeStyle: 'short',
              }).format(message.date)}
            </ResultDate>
          </ResultItem>
        ))}
      </List>
    </Panel>
  );
}

export default SearchResultsPanel;
