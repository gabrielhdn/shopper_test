import styled from 'styled-components';

interface ContainerProps {
  errors: boolean;
}

export const Container = styled.div<ContainerProps>`
  width: 15rem;
  padding: 1rem;
  box-shadow: 0px 4px 7px 2px rgba(0, 0, 0, 0.2);
  border: ${({ errors }) => (errors ? '1px solid #A00B00' : 'none')};

  display: flex;
  flex-direction: column;

  p {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .errors {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    strong {
      margin: 0.5rem;
      color: #A00B00;
    }

    p {
      text-align: center;
    }
  }
`;
