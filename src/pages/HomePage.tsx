import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Button from '@components/common/Button';

const HeroSection = styled.section`
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
    url('/images/dnd-background.jpg') no-repeat center center;
  background-size: cover;
  border-radius: 8px;
  margin-bottom: 3rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #d4a76a;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #f0f0f0;
  margin-bottom: 2rem;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <HeroSection>
        <Title>DungeonForge Online</Title>
        <Subtitle>
          A virtual tabletop for Dungeons & Dragons 5th Edition. Play with friends from anywhere in
          the world.
        </Subtitle>
        <ButtonGroup>
          <Button onClick={() => navigate('/create-character')}>Create Character</Button>
          <Button variant="secondary" onClick={() => navigate('/join-game')}>
            Join Game
          </Button>
        </ButtonGroup>
      </HeroSection>
    </>
  );
};

export default HomePage;