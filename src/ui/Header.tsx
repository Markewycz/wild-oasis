import styled from 'styled-components';
import HeaderMenu from './HeaderMenu';
import UserAvatar from '../features/authentication/UserAvatar';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 0.75rem 3rem;
  border: 1px solid var(--color-grey-100);
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: flex-end;
`;

export default function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}
