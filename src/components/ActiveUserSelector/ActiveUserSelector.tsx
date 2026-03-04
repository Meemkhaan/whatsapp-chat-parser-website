import type { SetStateAction } from 'jotai';

import { t } from '../../i18n';
import * as S from '../Sidebar/style';

interface IActiveUserSelector {
  participants: string[];
  activeUser: string;
  setActiveUser: (activeUser: SetStateAction<string>) => void;
}

function ActiveUserSelector({
  participants,
  activeUser,
  setActiveUser,
}: IActiveUserSelector) {
  return (
    <S.Field>
      <S.Label htmlFor="active-user">{t.whoAreYou}</S.Label>
      <S.Select
        id="active-user"
        disabled={!participants.length}
        value={activeUser}
        onChange={e => {
          setActiveUser(e.target.value);
        }}
        title={t.whoAreYouTitle}
      >
        <option value="" disabled>
          {participants.length ? t.chooseYourName : t.loadChatFirst}
        </option>
        {participants.map(participant => (
          <option key={participant} value={participant}>
            {participant}
          </option>
        ))}
      </S.Select>
      {participants.length > 0 && (
        <S.InputDescription style={{ marginTop: '0.25rem' }}>
          {t.yourMessagesHint}
        </S.InputDescription>
      )}
    </S.Field>
  );
}

export default ActiveUserSelector;
