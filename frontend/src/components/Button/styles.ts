import styled from 'styled-components';

export const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  background: none;
  background-color: #26AB77;
  color: white;
  outline: none;
  border: none;
  border-radius: 5px;
  padding: 5px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;

  &:disabled {
    background-color: #CCC;
    color: #666;
    cursor: default;

    &:hover {
      background-color: #CCC;
    }
  }

  &:hover {
    background-color: #30CD8E;
  }
`;
