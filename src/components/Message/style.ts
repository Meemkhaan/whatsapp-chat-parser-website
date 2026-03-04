import styled, { css } from 'styled-components';

import { overflowBreakWord, messageBaseStyle } from '../../utils/styles';
import {
  systemBackgroundColor,
  systemDarkBackgroundColor,
  activeUserBackgroundColor,
  activeUserDarkBackgroundColor,
} from '../../utils/colors';

const Item = styled.li<{
  $isSystem: boolean;
  $isActiveUser: boolean;
  $sameAuthorAsPrevious: boolean;
}>`
  margin-top: 1rem;
  margin-left: auto;
  margin-right: auto;
  ${props =>
    props.$isSystem &&
    css`
      text-align: center;
    `}
  ${props =>
    props.$isActiveUser &&
    css`
      text-align: right;
    `}
  ${props =>
    props.$sameAuthorAsPrevious &&
    css`
      margin-top: 0.25rem;
    `}

  a {
    color: #68bbe4;
    text-decoration: underline;
  }
`;

const Index = styled.div<{ $isSystem: boolean; $isActiveUser: boolean }>`
  position: absolute;
  font-size: 10px;
  padding-inline: 7px;
  border-radius: 99px;
  border: 1px solid rgba(0, 0, 0, 0.15);
  top: -0.5em;
  right: -0.5em;
  background-color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  ${props =>
    props.$isSystem &&
    css`
      background-color: ${systemBackgroundColor};
    `}
  ${props =>
    props.$isActiveUser &&
    css`
      background-color: ${activeUserBackgroundColor};
    `}

  .ctrl-down & {
    opacity: 1;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #262d31;
    border-color: rgba(255, 255, 255, 0.1);
    color: #f1f1f2;
    ${props =>
      props.$isSystem &&
      css`
        background-color: ${systemDarkBackgroundColor};
      `}
    ${props =>
      props.$isActiveUser &&
      css`
        background-color: ${activeUserDarkBackgroundColor};
      `}
  }
`;

const Bubble = styled.div<{ $isSystem: boolean; $isActiveUser: boolean }>`
  ${messageBaseStyle}

  display: inline-flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  background-color: white;
  max-width: 65%;
  ${props =>
    props.$isSystem &&
    css`
      background-color: ${systemBackgroundColor};
    `}
  ${props =>
    props.$isActiveUser &&
    css`
      text-align: left;
      background-color: ${activeUserBackgroundColor};
    `}

  @media (max-width: 699px) {
    max-width: 85%;
  }

  @media (min-width: 700px) {
    max-width: 65%;
  }

  @media (prefers-color-scheme: dark) {
    background-color: #262d31;
    color: #f1f1f2;
    ${props =>
      props.$isSystem &&
      css`
        background-color: ${systemDarkBackgroundColor};
        color: #fad964;
      `}
    ${props =>
      props.$isActiveUser &&
      css`
        background-color: ${activeUserDarkBackgroundColor};
      `}
  }

  &:hover {
    ${Index} {
      opacity: 1;
    }
  }
`;

const Wrapper = styled.div`
  flex: 1 1 auto;
`;

const Author = styled.div`
  margin-bottom: 0.25rem;
  font-weight: bold;
  font-size: 75%;
  color: ${props => props.color};
`;

const Message = styled.div`
  ${overflowBreakWord}

  white-space: pre-wrap;

  mark {
    background: rgba(255, 235, 59, 0.6);
    border-radius: 2px;
    padding: 0 2px;
  }

  @media (prefers-color-scheme: dark) {
    mark {
      background: rgba(255, 193, 7, 0.5);
    }
  }
`;

const DateRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.15rem;
  min-height: 1em;
`;

const Date = styled.time`
  white-space: nowrap;
  font-size: 11px;
  opacity: 0.7;
  align-self: flex-end;
`;

export { Item, Bubble, Index, Wrapper, Author, Message, DateRow, Date };
