import React from 'react';
import Nav from 'components/Nav/Nav';
import loginTheme from 'styles/loginTheme';
import PropTypes from 'prop-types';
import UserCreate from 'components/UserCreate';

const SignUp = (props) => {
  return (
    <>
      <Nav />
      <Container>
        <UserCreate setIsShown={true} props={props} />
      </Container>
    </>
  );
};

SignUp.propTypes = {
  props: PropTypes.any,
};

const { Container } = loginTheme;

export default SignUp;
