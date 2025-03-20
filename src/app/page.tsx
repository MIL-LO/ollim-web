'use client';

import styled from 'styled-components';

export default function Home() {
    return (
        <Main>
            <Title>Ollim Web - Development</Title>
            <Description>
                Welcome to Ollim Web development environment. This environment is set up with Next.js, TypeScript, PWA, Styled-components, and Recoil!
            </Description>
        </Main>
    );
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.2rem;
  text-align: center;
  max-width: 600px;
`;
