import styled from "styled-components";
import theme from "styles/theme";

const Container = styled.div`
  margin-top: ${({ theme }) => theme.height.component};
  padding: 130px 0;
`;

const WiderContent = styled.div`
  margin: 96px 0 128px 0;
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
`;

const NarrowContent = styled.div`
  width: 500px;
  margin: 48px 0;
  padding: 0 15px;
  text-align: center;
  > input {
    width: 100%;
  }
  > button {
    width: 100%;
  }
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  > input {
    width: 73%;
  }
  > button {
    width: 25%;
  }
`;

const Title = styled.div`
  font-size: 24px;
  margin-bottom: 48px;
`;

const StyledButton = styled.button`
  ${theme.common.button}
  height: 45px;
  background-color: ${theme.colors.blue};
  color: #fff;
  font-size: 13px;
`;

const BasicInput = styled.input`
  ${theme.common.input}
  box-sizing: border-box;
  background-color: #fff;
  padding: 0 15px;
  height: 45px;
  margin-bottom: 16px;
`;

const LoginTheme = {
  Container,
  WiderContent,
  NarrowContent,
  ButtonWrap,
  Title,
  StyledButton,
  BasicInput,
};

export default LoginTheme;
