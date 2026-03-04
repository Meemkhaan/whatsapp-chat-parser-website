import { FilterMode } from '../../types';
import { t } from '../../i18n';
import * as S from '../Sidebar/style';

interface IFilterModeSelector {
  filterMode: FilterMode;
  setFilterMode: React.Dispatch<React.SetStateAction<FilterMode>>;
}

function FilterModeSelector({
  filterMode,
  setFilterMode,
}: IFilterModeSelector) {
  return (
    <S.Fieldset>
      <legend>{t.filterBy}</legend>
      {(['index', 'date'] as const).map(name => (
        <S.RadioField key={name}>
          <input
            id={name}
            type="radio"
            value={name}
            checked={filterMode === name}
            onChange={e => setFilterMode(e.target.value as FilterMode)}
          />
          <S.Label htmlFor={name}>{t[name]}</S.Label>
        </S.RadioField>
      ))}
    </S.Fieldset>
  );
}

export default FilterModeSelector;
