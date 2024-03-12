import styled from 'styled-components';

type StyledButtonIconProps = {
  onClick: () => void;
};

const ButtonIcon = styled.button<StyledButtonIconProps>`
  background: none;
  border: none;
  padding: 0.375rem;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 1.375rem;
    height: 1.375rem;
    color: var(--color-brand-600);
  }
`;

export default ButtonIcon;
