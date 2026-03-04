import { useRef, useEffect, useState, useCallback, startTransition } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import Credits from '../Credits/Credits';
import FilterModeSelector from '../FilterModeSelector/FilterModeSelector';
import FilterMessageLimitsForm from '../FilterMessageLimitsForm/FilterMessageLimitsForm';
import FilterMessageDatesForm from '../FilterMessageDatesForm/FilterMessageDatesForm';
import ActiveUserSelector from '../ActiveUserSelector/ActiveUserSelector';
import SearchMessagesSection from '../SearchMessagesSection/SearchMessagesSection';

import * as S from './style';
import { t } from '../../i18n';
import {
  activeUserAtom,
  isAnonymousAtom,
  isMenuOpenAtom,
  messagesDateBoundsAtom,
  participantsAtom,
} from '../../stores/global';
import {
  datesAtom,
  globalFilterModeAtom,
  limitsAtom,
  searchQueryAtom,
} from '../../stores/filters';
import { FilterMode } from '../../types';
import {
  filterMessagesByDate,
  filterMessagesBySearch,
} from '../../utils/utils';
import type { IndexedMessage } from '../../types';
import { messagesAtom } from '../../stores/global';

function Sidebar() {
  const [isMenuOpen, setIsMenuOpen] = useAtom(isMenuOpenAtom);
  const [isAnonymous, setIsAnonymous] = useAtom(isAnonymousAtom);
  const [filterMode, setFilterMode] = useState<FilterMode>('index');
  const setGlobalFilterMode = useSetAtom(globalFilterModeAtom);
  const [limits, setLimits] = useAtom(limitsAtom);
  const setDates = useSetAtom(datesAtom);
  const messagesDateBounds = useAtomValue(messagesDateBoundsAtom);
  const participants = useAtomValue(participantsAtom);
  const [activeUser, setActiveUser] = useAtom(activeUserAtom);
  const setSearchQuery = useSetAtom(searchQueryAtom);
  const searchQuery = useAtomValue(searchQueryAtom);
  const appliedFilterMode = useAtomValue(globalFilterModeAtom);
  const appliedDates = useAtomValue(datesAtom);
  const messages = useAtomValue(messagesAtom) as IndexedMessage[];

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);
  const exportListRef = useRef<IndexedMessage[]>([]);

  const endDatePlusOne = new Date(appliedDates.end);
  endDatePlusOne.setDate(endDatePlusOne.getDate() + 1);
  const rangeFiltered =
    appliedFilterMode === 'index'
      ? messages.slice(limits.low - 1, limits.high)
      : filterMessagesByDate(messages, appliedDates.start, endDatePlusOne);
  const toExport = filterMessagesBySearch(rangeFiltered, searchQuery);
  exportListRef.current = toExport;

  const handleClearFilters = useCallback(() => {
    setLimits({ low: 1, high: 999_999 });
    setGlobalFilterMode('index');
    setDates(messagesDateBounds);
    setSearchQuery('');
  }, [
    setLimits,
    setGlobalFilterMode,
    setDates,
    messagesDateBounds,
    setSearchQuery,
  ]);

  const handleExportVisible = useCallback(() => {
    const list = exportListRef.current;
    const text = list
      .map(
        m => `[${m.date.toISOString()}] ${m.author || 'System'}: ${m.message}`,
      )
      .join('\n');
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `chat-export-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  }, []);

  const setMessageLimits = (e: React.FormEvent<HTMLFormElement>) => {
    const entries = Object.fromEntries(new FormData(e.currentTarget));

    e.preventDefault();
    setLimits({
      low: parseInt(entries.lowerLimit as string, 10),
      high: parseInt(entries.upperLimit as string, 10),
    });
    setGlobalFilterMode('index');
  };

  const setMessagesByDate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDates({
      start: e.currentTarget.startDate.valueAsDate,
      end: e.currentTarget.endDate.valueAsDate,
    });
    setGlobalFilterMode('date');
  };

  useEffect(() => {
    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };

    document.addEventListener('keydown', keyDownHandler);
    return () => document.removeEventListener('keydown', keyDownHandler);
  }, [setIsMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) closeButtonRef.current?.focus();
    else openButtonRef.current?.focus();
  }, [isMenuOpen]);

  // Focus trap when sidebar is open
  useEffect(() => {
    if (!isMenuOpen || !sidebarRef.current) return;
    const el = sidebarRef.current;
    const focusables = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    };
    el.addEventListener('keydown', onKeyDown);
    return () => el.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      <S.MenuOpenButton
        className="menu-open-button"
        type="button"
        onClick={() => setIsMenuOpen(true)}
        ref={openButtonRef}
        aria-label={t.openMenu}
        aria-expanded={isMenuOpen}
      >
        {t.openMenu}
      </S.MenuOpenButton>
      <S.Overlay
        type="button"
        $isActive={isMenuOpen}
        onClick={() => setIsMenuOpen(false)}
        tabIndex={-1}
        aria-label={t.closeMenuAria}
      />
      <S.Sidebar $isOpen={isMenuOpen} ref={sidebarRef}>
        <S.MenuCloseButton
          type="button"
          onClick={() => setIsMenuOpen(false)}
          ref={closeButtonRef}
          aria-label={t.closeMenu}
        >
          {t.closeMenu}
        </S.MenuCloseButton>
        <S.SidebarContainer>
          <S.SidebarChildren>
            <ActiveUserSelector
              participants={participants}
              activeUser={activeUser}
              setActiveUser={setActiveUser}
            />
            <SearchMessagesSection />
            <FilterModeSelector
              filterMode={filterMode}
              setFilterMode={setFilterMode}
            />
            {filterMode === 'index' && (
              <FilterMessageLimitsForm
                limits={limits}
                setMessageLimits={setMessageLimits}
              />
            )}
            {filterMode === 'date' && (
              <FilterMessageDatesForm
                messagesDateBounds={messagesDateBounds}
                setMessagesByDate={setMessagesByDate}
              />
            )}
            <S.Field>
              <S.Submit
                type="button"
                value={t.clearFilters}
                onClick={handleClearFilters}
              />
            </S.Field>
            <S.Field>
              <S.Submit
                type="button"
                value={t.exportVisible}
                onClick={handleExportVisible}
              />
            </S.Field>
            <S.Field>
              <S.Label htmlFor="is-anonymous">{t.anonymizeUsers}</S.Label>
              <S.ToggleCheckbox
                id="is-anonymous"
                type="checkbox"
                checked={isAnonymous}
                onChange={() =>
                  startTransition(() => setIsAnonymous(bool => !bool))
                }
              />
            </S.Field>
          </S.SidebarChildren>
          <Credits />
        </S.SidebarContainer>
      </S.Sidebar>
    </>
  );
}

export default Sidebar;
