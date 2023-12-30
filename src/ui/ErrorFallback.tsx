import styled from 'styled-components';
import Heading from './Heading';
import GlobalStyles from '../styles/GlobalStyles';
import Button from './Button';

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 3rem;
  flex: 0 1 60rem;
  text-align: center;

  & h1 {
    margin-bottom: 1rem;
  }

  & p {
    font-family: 'Sono';
    margin-bottom: 1.25rem;
    color: var(--color-grey-500);
  }
`;

type ErrorFallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps) {
  return (
    <>
      <GlobalStyles />

      <StyledErrorFallback>
        <Box>
          <Heading as="h1">Something went wrong... 😵</Heading>
          <p>{error.message}</p>
          <Button size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}
