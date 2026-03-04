import { useAtom } from 'jotai';
import { searchQueryAtom } from '../../stores/filters';
import { t } from '../../i18n';
import * as S from '../Sidebar/style';

function SearchInput() {
  const [query, setQuery] = useAtom(searchQueryAtom);

  return (
    <S.Field>
      <S.Label htmlFor="search-messages">{t.searchLabel}</S.Label>
      <S.Input
        id="search-messages"
        type="search"
        placeholder={t.searchPlaceholder}
        value={query}
        onChange={e => setQuery(e.target.value)}
        aria-label={t.searchPlaceholder}
      />
    </S.Field>
  );
}

export default SearchInput;
