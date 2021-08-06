import React from 'react';
import loginTheme from 'styles/loginTheme';
import PropTypes from 'prop-types';
import UserCreate from 'components/UserCreate';

const SignUp = (props) => {
  return (
    <>
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
