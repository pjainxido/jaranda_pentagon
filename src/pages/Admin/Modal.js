import React, { useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import { createUser } from "api/user";

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
  width: 380px;
  background-color: white;
  border-radius: 10px;
  padding: 10px 20px;
  > form {
    margin: 0 auto;
    width: 80%;
  }
`;

const ModalInput = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  input {
    height: 30px;
  }
`;

const ModalBtnBox = styled.div`
  padding: 0 30px;
`;

const ModalBtn = styled.button`
  width: 80px;
  height: 40px;
  margin: 0 10px;
`;

function Modal({ setIsShown }) {
  const [inputs, setInputs] = useState({
    userId: "",
    name: "",
    role: "",
    address: "",
    age: "",
    creditCard: "",
    password: "",
  });

  const { userId, name, role, address, age, creditCard, password } = inputs;

  const handleModalClose = () => setIsShown(false);

  const handleAdduser = () => {
    createUser({ ...inputs });
    setIsShown(false);
    return;
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    console.log("hi");
  };

  return ReactDOM.createPortal(
    <ModalStyle>
      <ModalInputBox>
        <form onSubmit={handleAddUserSubmit}>
          <ModalInput>
            user_id:
            <input name="userId" value={userId} onChange={handleSearchChange} />
          </ModalInput>
          <ModalInput>
            password:
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleSearchChange}
            />
          </ModalInput>
          <ModalInput>
            name:
            <input name="name" value={name} onChange={handleSearchChange} />
          </ModalInput>
          <ModalInput>
            role:
            <input name="role" value={role} onChange={handleSearchChange} />
          </ModalInput>
          <ModalInput>
            address:
            <input
              name="address"
              value={address}
              onChange={handleSearchChange}
            />
          </ModalInput>
          <ModalInput>
            age:
            <input name="age" value={age} onChange={handleSearchChange} />
          </ModalInput>
          <ModalInput>
            credit_card:
            <input
              name="creditCard"
              value={creditCard}
              onChange={handleSearchChange}
            />
          </ModalInput>
          <ModalBtnBox>
            <ModalBtn onClick={handleAdduser}>Add User</ModalBtn>
            <ModalBtn onClick={handleModalClose}>Close</ModalBtn>
          </ModalBtnBox>
        </form>
      </ModalInputBox>
    </ModalStyle>,
    document.getElementById("modal-root")
  );
}

Modal.propTypes = {
  setIsShown: PropTypes.func,
};

export default Modal;
