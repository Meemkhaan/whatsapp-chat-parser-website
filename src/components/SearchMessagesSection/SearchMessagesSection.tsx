import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import {
  searchQueryAtom,
  datesAtom,
  globalFilterModeAtom,
} from '../../stores/filters';
import { messagesDateBoundsAtom } from '../../stores/global';
import { getISODateString } from '../../utils/utils';
import { t } from '../../i18n';
import * as S from '../Sidebar/style';

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0);
}

function endOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999);
}

function SearchMessagesSection() {
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);
  const [dates, setDates] = useAtom(datesAtom);
  const setGlobalFilterMode = useSetAtom(globalFilterModeAtom);
  const messagesDateBounds = useAtomValue(messagesDateBoundsAtom);

  const minDate = getISODateString(messagesDateBounds.start);
  const maxDate = getISODateString(messagesDateBounds.end);
  const isSingleDay =
    getISODateString(dates.start) === getISODateString(dates.end);
  const selectedDateValue = isSingleDay
    ? getISODateString(dates.start)
    : '';

  const handleJumpToDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!value) return;
    const d = new Date(value + 'T12:00:00');
    if (Number.isNaN(d.getTime())) return;
    setDates({
      start: startOfDay(d),
      end: endOfDay(d),
    });
    setGlobalFilterMode('date');
  };

  return (
    <S.Fieldset>
      <legend>{t.searchMessagesTitle}</legend>
      <S.Field>
        <S.Label htmlFor="search-messages">{t.searchLabel}</S.Label>
        <S.Input
          id="search-messages"
          type="search"
          placeholder={t.searchPlaceholder}
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          aria-label={t.searchPlaceholder}
        />
      </S.Field>
      <S.Field>
        <S.Label htmlFor="jump-to-date">{t.jumpToDate}</S.Label>
        <S.Input
          id="jump-to-date"
          type="date"
          min={minDate}
          max={maxDate}
          value={selectedDateValue}
          onChange={handleJumpToDate}
          aria-label={t.jumpToDate}
          title={t.pickDatePlaceholder}
        />
      </S.Field>
    </S.Fieldset>
  );
}

export default SearchMessagesSection;
