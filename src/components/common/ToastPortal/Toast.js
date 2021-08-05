import React from "react";
import PropType from "prop-types";
import styled, { keyframes } from "styled-components";
import TOAST from "constants/toast";

const handleColorType = (color) => {
  switch (color) {
    case TOAST.MODE.SUCCESS:
      return "#83bd92";
    case TOAST.MODE.INFO:
      return "#8398bd";
    case TOAST.MODE.WARNING:
      return "#bda883";
    case TOAST.MODE.ERROR:
      return "#bd8383";
  }
};

const fadeIn = keyframes`
  from{
    opacity: 0;
  } to {
    opacity: 1;
  }
`;

const ToastItem = styled.div`
  background-color: ${({ mode }) => handleColorType(mode)};
  width: 350px;
  display: flex;
  min-height: 75px;
  position: relative;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  opacity: 1;
  padding: 15px;
  color: white;
  cursor: pointer;
  border-radius: 5px;
  box-sizing: border-box;
  box-shadow: 0px 0px 2px rgb(69, 69, 69);

  transition: 0.2s;
  animation: ${fadeIn} 0.75s;
  &:hover {
    transition: 0.2;
    transform: scale(0.95);
    box-shadow: 0px 0px 3px gray;
  }
`;

const Message = styled.div``;

const Toast = ({ mode, onClose, message }) => {
  return (
    <ToastItem mode={mode} onClick={onClose}>
      <Message>{message}</Message>
    </ToastItem>
  );
};

Toast.propTypes = {
  mode: PropType.string.isRequired,
  onClose: PropType.func,
  message: PropType.string.isRequired,
};

export default Toast;
