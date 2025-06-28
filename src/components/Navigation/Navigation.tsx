import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.nav`
  background-color: #2a1a12;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1.5rem;
`;

const NavItem = styled.li`
  a {
    color: #d4a76a;
    text-decoration: none;
    font-weight: bold;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: all 0.2s;

    &:hover {
      background-color: #3a2a22;
      color: #f8d7a3;
    }

    &.active {
      background-color: #4a3a32;
      color: #ffd700;
    }
  }
`;

const Navigation: React.FC = () => {
  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <NavLink to="/" end>
            Home
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/create-character">Create Character</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/join-game">Join Game</NavLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Navigation;