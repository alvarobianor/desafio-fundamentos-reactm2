/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { Container, LinkText } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
  // focus?: 'list';
}

interface Focus {
  focus?: 'list' | 'import';
}

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  const [focus, setFocus] = useState<Focus>(
    (): Focus => {
      const value = localStorage.getItem('@goFinance: page');
      if (!value) return { focus: 'list' };
      return { focus: value } as Focus;
    },
  );

  // useEffect(() => {
  //   localStorage.setItem('@goFinance: page', focus.focus as string);
  // }, [focus]);

  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <Link
            onClick={() => {
              localStorage.setItem('@goFinance: page', 'list');
              setFocus({ focus: 'list' });
            }}
            to="/"
          >
            <div>Listagem</div>
          </Link>
          <Link
            onClick={() => {
              localStorage.setItem('@goFinance: page', 'import');
              setFocus({ focus: 'import' });
            }}
            to="/import"
          >
            <div>import</div>
          </Link>

          <LinkText focus={focus.focus as string} />
        </nav>
      </header>
    </Container>
  );
};

export default Header;
