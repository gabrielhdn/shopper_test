import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  width: 100vw;
  background-color: #FFF;
  overflow-x: hidden;

  header {
    display: flex;
    align-items: center;

    background-color: #1E2044;
    padding: .5rem 0 .5rem 2rem;

    img {
      width: 14rem;
    }
  }

  .instructions {
    padding-bottom: 2rem;
    max-width: 70%;
    margin: 0 auto;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      margin-top: 3rem;
      margin-bottom: 2.8rem;
      font-size: 1.5rem;
      color: #26AB77;
      text-align: center;
    }

    p {
      text-align: center;
    }

    p:first-of-type {
      margin-bottom: 1rem;
    }
  }

  .response {
    margin-inline: auto;
    width: 70%;
    padding-top: 2rem;
    padding-bottom: 2rem;
    text-align: center;
    font-size: 1.1rem;
  }

  .buttons {
    margin-inline: auto;
    margin-top: 3rem;
    margin-bottom: 3rem;
    width: 70%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;

    .action-buttons {
      display: flex;
      gap: 2rem;
      align-items: center;
    }
  }

  input {
    display: none;
  }
`;

export const ProductsContainer = styled.div`
  margin: 0 auto;
  padding-top: 2rem;
  padding-bottom: 4rem;
  width: 90%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 5rem;
`;
