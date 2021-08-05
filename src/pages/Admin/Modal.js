import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import UserCreate from "components/UserCreate";

const Modal = ({ setIsShown, handleModalClose }) => {
  return ReactDOM.createPortal(
    <ModalStyle>
      <ModalInputBox>
        <ModalInput>
          <ModalBtnBox>
            <ModalBtn onClick={handleModalClose}>X</ModalBtn>
          </ModalBtnBox>
          <UserCreate setIsShown={setIsShown} />
        </ModalInput>
      </ModalInputBox>
    </ModalStyle>,
    document.getElementById("modal-root")
  );
};

Modal.propTypes = {
  setIsShown: PropTypes.func,
};

const ModalStyle = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid grey;
`;

const ModalInputBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
`;

const ModalInput = styled.div`
  display: flex;
  flex-direction: column;
`;

const ModalBtnBox = styled.div`
  text-align: right;
`;

const ModalBtn = styled.button`
  width: 60px;
  height: 40px;
  color: rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 3px;
  background: none;
`;

export default Modal;
