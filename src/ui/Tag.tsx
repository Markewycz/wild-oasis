import styled from 'styled-components';

const Tag = styled.span<StyledTag>`
  width: fit-content;
  text-transform: uppercase;
  font-size: 0.688rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: 100px;

  /* Make these dynamic, based on the received prop */
  color: var(--color-${props => props.type}-700);
  background-color: var(--color-${props => props.type}-100);
`;

type StyledTag = {
  type: string;
};

export default Tag;
