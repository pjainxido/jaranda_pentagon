import React, { useState, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

import { createUser, checkUserByUserId } from "api/user/index";
import AddressApi from "components/AddressApi/AddressApi";
import { CreditCardPopup } from "components/CreditCardPopup";
import ToastPortal from "components/common/ToastPortal";
import TOAST from "constants/toast";

import styled from "styled-components";
import theme from "styles/theme";
import loginTheme from "styles/loginTheme";

// eslint-disable-next-line react/prop-types
const UserCreate = ({ props, setIsShown, isAdmin = false }) => {
  const toastRef = useRef();
  const [inputs, setInputs] = useState({
    id: "",
    idConfirm: false,
    pw: "",
    pwConfirm: "",
    name: "",
    age: "",
    role: "parent",
    address: "",
    addressDetail: "",
    isDaumPost: false,
    cardNumber: "",
    effectiveDate: "",
    cvc: "",
  });

  const [isCreditClick, setIsCreditClick] = useState(false);

  const [cautions, setCautions] = useState({
    pwShow: false,
    pwConfirmShow: false,
    pwCheck: false,
    pwConfirmCheck: false,
  });

  const onChange = (e) => {
    let { value, name } = e.target;

    if (name == "id" || name == "pw" || name == "pwConfirm") {
      value = value.replace(/[ㄱ-힣~!@#$%^&*()_+|<>?:{}= ]/g, "");
    }
    if (name == "age") {
      value = value.replace(/[^0-9]/g, "");
    }

    pwValidation(e);

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const addToast = (mode, message) => {
    toastRef.current.addMessage({ mode, message });
  };

  const pwValidation = (e) => {
    let { value, name } = e.target;

    if (name == "pw") {
      const regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/;
      let pwValid = regExp.test(value);

      setCautions({
        ...cautions,
        pwShow: true,
        pwCheck: pwValid,
      });
    }

    if (name == "pwConfirm") {
      var pwConfirmValid = inputs.pw == value;

      setCautions({
        ...cautions,
        pwConfirmShow: true,
        pwConfirmCheck: pwConfirmValid,
      });
    }
  };

  const checkSameId = async () => {
    if (inputs.id.trim() !== "") {
      var checked = await checkUserByUserId(inputs.id);
      if (checked) {
        addToast(TOAST.MODE.INFO, "작성한 아이디로 가입할 수 있습니다");
        setInputs({
          ...inputs,
          idConfirm: true,
        });
      } else {
        addToast(TOAST.MODE.ERROR, "중복된 아이디입니다");
      }
    } else {
      addToast(TOAST.MODE.ERROR, "아이디를 입력하세요");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = validation();

    let reg = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\ '\"\\(\=]/gi;
    let cardNumber = inputs.cardNumber;
    let effectiveDate = inputs.effectiveDate;
    if (reg.test(inputs.cardNumber)) {
      cardNumber = inputs.cardNumber.replace(reg, "");
    }
    if (reg.test(inputs.effectiveDate)) {
      effectiveDate = inputs.effectiveDate.replace(reg, "");
    }

    if (valid) {
      let newUser = {
        userId: inputs.id,
        role: inputs.role,
        password: inputs.pw,
        name: inputs.name,
        age: Number(inputs.age),
        address: inputs.address + inputs.addressDetail,
        creditCard: {
          cardNumber: cardNumber,
          expirtyDate: effectiveDate,
          cvc: inputs.cvc,
        },
      };

      await createUser(newUser)
        .then(() => {
          if (isAdmin) {
            setIsShown(false);
          } else {
            addToast(TOAST.MODE.SUCCESS, "성공적으로 회원 가입하셨습니다!! 🎊");
            props.history.replace("/");
          }
        })
        .catch((error) => {
          if (!isAdmin) {
            console.error("creating user Error: ", error);
            addToast(TOAST.MODE.ERROR, "회원 가입 시 에러가 발생하였습니다 😥");
            window.location.reload();
          }
        });
    }
  };

  const validation = () => {
    if (inputs.id == "") {
      addToast(TOAST.MODE.ERROR, "Id를 입력하세요");
      return false;
    }
    if (inputs.idConfirm === false) {
      addToast(TOAST.MODE.ERROR, "아이디 중복확인을 해주세요");
      return false;
    }
    if (inputs.pw == "" || inputs.pw == undefined) {
      addToast(TOAST.MODE.ERROR, "비밀번호를 입력하세요");
      return false;
    }
    if (!cautions.pwCheck) {
      addToast(TOAST.MODE.ERROR, "비밀번호를 양식에 맞게 입력하세요");
      return false;
    }
    if (!cautions.pwConfirmCheck) {
      addToast(TOAST.MODE.ERROR, "비밀번호를 확인하세요");
      return false;
    }
    if (inputs.address == "" || inputs.addressDetail == "") {
      addToast(TOAST.MODE.ERROR, "주소 및 상세주소를 입력하세요");
      return false;
    }
    if (
      inputs.cardNumber == "" ||
      inputs.effectiveDate == "" ||
      inputs.cvc == ""
    ) {
      addToast(TOAST.MODE.ERROR, "신용카드 정보를 입력하세요");
      return false;
    }
    return true;
  };

  const handlePostModal = () => {
    setInputs({ ...inputs, isDaumPost: true });
  };

  return (
    <WiderContent>
      <NarrowContent>
        {!isAdmin && (
          <Title>
            10초 만에 가입하고<br></br>선생님 정보를 받아보세요
          </Title>
        )}
        <ButtonWrap>
          <StyledInput
            placeholder="아이디"
            name="id"
            value={inputs.id}
            onChange={onChange}
          ></StyledInput>
          <StyledButton onClick={checkSameId}>아이디 중복확인</StyledButton>
        </ButtonWrap>
        <StyledInput
          placeholder="비밀번호"
          name="pw"
          type="password"
          value={inputs.pw}
          onChange={onChange}
          show={cautions.pwShow}
        ></StyledInput>
        {cautions.pwShow &&
          (cautions.pwCheck ? (
            <Alert isAlert={cautions.pwCheck}>
              비밀번호 양식에 맞게 입력하였습니다
            </Alert>
          ) : (
            <Alert isAlert={cautions.pwCheck}>
              영문 및 숫자 포함 8 ~ 10자 작성해주세요
            </Alert>
          ))}
        <StyledInput
          placeholder="비밀번호 확인"
          name="pwConfirm"
          type="password"
          value={inputs.pwConfirm}
          onChange={onChange}
          show={cautions.pwConfirmShow}
        ></StyledInput>
        {cautions.pwConfirmShow &&
          (cautions.pwConfirmCheck ? (
            <Alert isAlert={cautions.pwConfirmCheck}>
              비밀번호가 일치합니다
            </Alert>
          ) : (
            <Alert isAlert={cautions.pwConfirmCheck}>
              비밀번호가 일치하지 않습니다
            </Alert>
          ))}
        <StyledInput
          placeholder="이름"
          name="name"
          value={inputs.name}
          onChange={onChange}
        ></StyledInput>
        <StyledInput
          placeholder="나이"
          name="age"
          value={inputs.age}
          onChange={onChange}
        ></StyledInput>
        {isAdmin && (
          <RoleSelect name="role" onChange={onChange} value={inputs.role}>
            <option value="parent">부모님</option>
            <option value="teacher">선생님</option>
          </RoleSelect>
        )}
        <ButtonWrap>
          <StyledInput
            readOnly
            placeholder="주소"
            value={inputs.address}
          ></StyledInput>
          <StyledButton onClick={handlePostModal}>주소 검색</StyledButton>
          {inputs.isDaumPost && (
            <AddressApi inputs={inputs} setInputs={setInputs} />
          )}
        </ButtonWrap>
        <StyledInput
          placeholder="상세 주소"
          name="addressDetail"
          value={inputs.addressDetail}
          onChange={onChange}
        ></StyledInput>
        <ButtonWrap>
          <StyledInput
            readOnly
            placeholder="카드 번호"
            name="cardNumber"
            value={inputs.cardNumber}
          ></StyledInput>
          <StyledButton onClick={() => setIsCreditClick(true)}>
            신용카드 입력
          </StyledButton>
        </ButtonWrap>
        <ButtonWrap>
          <StyledInput
            readOnly
            placeholder="유효 기간"
            name="effectiveDate"
            value={inputs.effectiveDate}
            style={{ marginRight: 10 }}
          ></StyledInput>
          <StyledInput
            readOnly
            placeholder="CVC 번호"
            name="cvc"
            value={inputs.cvc}
          ></StyledInput>
        </ButtonWrap>
        <form onSubmit={handleSubmit}>
          <StyledButton type="submit" style={{ width: "100%" }}>
            {isAdmin ? "계정생성" : "회원가입"}
          </StyledButton>
        </form>
      </NarrowContent>
      {isCreditClick &&
        createPortal(
          <CreditCardPopup
            onClose={() => setIsCreditClick(false)}
            saveCardInfo={setInputs}
          />,
          document.getElementById("user-modal-root")
        )}
      <div id="user-modal-root"></div>
      <ToastPortal ref={toastRef} position={TOAST.POSITION.TOP_CENTER} />
    </WiderContent>
  );
};

const {
  WiderContent,
  NarrowContent,
  ButtonWrap,
  Title,
  StyledButton,
  BasicInput,
} = loginTheme;

const StyledInput = styled(BasicInput)`
  margin-bottom: ${(prop) => (prop.show ? "5px" : "15px")};
  :focus {
    color: ${({ theme }) => theme.colors.blue};
    background-color: rgba(0, 133, 253, 0.1);
    border: 0.5px solid ${({ theme }) => theme.colors.blue};
  }
`;

const RoleSelect = styled.select`
  width: 100%;
  margin-bottom: 16px;
  height: 45px;
  padding: 0 15px;
`;

const Alert = styled.div`
  font-size: 14px;
  color: ${(prop) =>
    prop.isAlert
      ? ({ theme }) => theme.colors.green
      : ({ theme }) => theme.colors.red};
  text-align: left;
  padding-bottom: 15px;
`;

UserCreate.propTypes = {
  props: PropTypes.any,
  history: PropTypes.any,
  isAdmin: PropTypes.bool,
};

export default UserCreate;
