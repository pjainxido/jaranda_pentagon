import React, { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Toast from "./Toast";

const ToastContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 10px;
  right: 10px;
`;

const ID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const ToastPortal = forwardRef(({ autoClose = true, autoCloseTime = 2000 }, ref) => {
  // toastObject  = { id: "123", mode: "info", message: "hello world?" };
  const [toasts, setToasts] = useState([]);
  // const [portalId] = useState(`toast-portal-${ID()}`);

  const removeToast = (id) => {
    setToasts(toasts.filter((item) => item.id !== id));
  };

  useEffect(()=>{
    if(autoClose && toasts.length){
      const targetId = toasts[toasts.length-1].id;
      setTimeout(()=>{
        setToasts(toasts.filter(item=>item.id!==targetId));
      },autoCloseTime);
    }

  },[toasts])

  useImperativeHandle(ref, () => ({
    addMessage(inputToast) {
      setToasts([...toasts, { ...inputToast, id: ID() }]);
    },
  }));

  return createPortal(
    <ToastContainer>
      {toasts.map((item) => (
        <Toast
          key={item.id}
          mode={item.mode}
          message={item.message}
          onClose={() => removeToast(item.id)}
        />
      ))}
    </ToastContainer>,
    document.getElementById("modal-root")
  );
});

ToastPortal.propTypes = {
  autoClose: PropTypes.bool,
  autoCloseTime: PropTypes.number,
};

ToastPortal.displayName = "ToastPortal"; //  Component definition is missing display name lint error 때문에 추가

export default ToastPortal;
