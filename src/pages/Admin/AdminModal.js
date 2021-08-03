import React from "react";
import Modal from "./modal/Modal";
import PropTypes from "prop-types";
import styled from "styled-components";

const ModalInputBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
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
  margin: 0 auto;
`;

const ModalBtn = styled.button`
  width: 80px;
  height: 40px;
  margin: 0 10px;
`;

function AdminModal({ handleModalClose, isShown }) {
  if (isShown) {
    return (
      <Modal>
        <ModalInputBox>
          <ModalInput>
            user_id:
            <input />
          </ModalInput>
          <ModalInput>
            name:
            <input />
          </ModalInput>
          <ModalInput>
            role:
            <input />
          </ModalInput>
          <ModalInput>
            address:
            <input />
          </ModalInput>
          <ModalInput>
            age:
            <input />
          </ModalInput>
          <ModalInput>
            credit_card:
            <input />
          </ModalInput>
          <ModalBtnBox>
            <ModalBtn onClick={handleModalClose}>Add User</ModalBtn>
            <ModalBtn onClick={handleModalClose}>Close</ModalBtn>
          </ModalBtnBox>
        </ModalInputBox>
      </Modal>
    );
  }
}

AdminModal.propTypes = {
  handleModalClose: PropTypes.func,
  isShown: PropTypes.bool,
};

export default AdminModal;
