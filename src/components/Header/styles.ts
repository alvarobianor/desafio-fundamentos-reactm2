/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
import styled from 'styled-components';

interface ContainerProps {
  size?: 'small' | 'large';
  focus?: 'list' | 'import';
}

interface Leftt {
  focus: string;
}

export const Container = styled.div<ContainerProps>`
  background: #5636d3;
  padding: 30px 0;

  header {
    width: 1120px;
    margin: 0 auto;
    padding: ${({ size }) => (size === 'small' ? '0 20px ' : '0 20px 150px')};
    display: flex;
    align-items: center;
    justify-content: space-between;

    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      a {
        color: #fff;
        text-decoration: none;
        font-size: 16px;
        transition: opacity 0.2s;

        & + a {
          margin-left: 32px;
        }

        &:hover {
          opacity: 0.6;
        }
        div {
          display: flex;
          align-items: center;
        }
      }
    }
  }
`;

export const LinkText = styled.div<Leftt>`
  position: absolute;
  width: 73px;
  height: 2px;
  top: 69px;
  left: ${props => {
    if (props.focus === 'list') return;
    if (props.focus === 'import') {
      return '1160px';
    }
    return;
  }};

  /* Orange */

  background: #ff872c;
`;
