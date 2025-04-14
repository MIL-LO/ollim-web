'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

// BottomNavigation 컴포넌트의 props 타입 정의
interface BottomNavigationItem {
  id: string;
  label: string;
  icon: string;
  primary?: boolean;
}

interface BottomNavigationProps {
  items: BottomNavigationItem[];
  activeItem: string;
}

// 네비게이션 컨테이너 스타일
const NavContainer = styled.nav`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #ffffff;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 70px;
  max-width: 768px;
  margin: 0 auto;
  z-index: 100;
`;

// 네비게이션 항목 스타일
const NavItem = styled.div<{ active: boolean; primary?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${(props) => (props.active ? '#007bff' : '#6c757d')};
  font-size: 0.75rem;
  padding: 8px;
  position: relative;
  cursor: pointer;

  ${(props) =>
    props.primary &&
    `
    margin-top: -20px;
    background-color: #007bff;
    color: white;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  `}
`;

// 아이콘 스타일
const Icon = styled.img<{ primary?: boolean }>`
  width: ${(props) => (props.primary ? '28px' : '24px')};
  height: ${(props) => (props.primary ? '28px' : '24px')};
  margin-bottom: 4px;
`;

// 라벨 스타일
const Label = styled.span<{ primary?: boolean }>`
  font-size: ${(props) => (props.primary ? '0.7rem' : '0.65rem')};
  font-weight: ${(props) => (props.primary ? '500' : '400')};
  display: ${(props) => (props.primary ? 'none' : 'block')};
`;

const BottomNavigation: React.FC<BottomNavigationProps> = ({ items, activeItem }) => {
  return (
    <NavContainer>
      {items.map((item) => (
        <Link href={item.id} key={item.id} passHref style={{ textDecoration: 'none' }}>
          <NavItem active={activeItem === item.id} primary={item.primary}>
            <Icon src={item.icon} alt={item.label} primary={item.primary} />
            <Label primary={item.primary}>{item.label}</Label>
          </NavItem>
        </Link>
      ))}
    </NavContainer>
  );
};

export default BottomNavigation;
