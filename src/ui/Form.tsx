import styled, { css } from 'styled-components';

type StyledFormProps = {
  type?: string;
};

const Form = styled.form<StyledFormProps>`
  ${props =>
    props.type === 'regular' &&
    css`
      padding: 1.5rem 2.5rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);
    `}

  ${props =>
    props.type === 'modal' &&
    css`
      width: 50rem;
    `}
    
  overflow: hidden;
  font-size: 0.875rem;
`;

Form.defaultProps = {
  type: 'regular',
};
export default Form;
