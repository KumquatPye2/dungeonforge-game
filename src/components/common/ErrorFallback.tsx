import React from 'react';
import styled from 'styled-components';
import Button from './Button';

const ErrorContainer = styled.div`
  padding: 2rem;
  background-color: #2a0a0a;
  border: 1px solid #5a0a0a;
  border-radius: 4px;
  color: #ffaaaa;
  text-align: center;
`;

const ErrorTitle = styled.h2`
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <ErrorContainer role="alert">
      <ErrorTitle>Something went wrong</ErrorTitle>
      <pre>{error.message}</pre>
      <Button onClick={resetErrorBoundary}>Try again</Button>
    </ErrorContainer>
  );
};

export default ErrorFallback;