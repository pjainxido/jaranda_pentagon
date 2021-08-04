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
  top: ${(props)=> props.top}px;
  right: ${(props)=> props.right}px;
`;

const ID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const ToastPortal = forwardRef(({ autoClose = true, autoCloseTime = 2000, top = 10, right = 10 }, ref) => {
  // toastObject  = { id: "123", mode: "info", message: "hello world?" };
  const [toasts, setToasts] = useState([]);
  const [removing, setRemoving] = useState("");
  // const [portalId] = useState(`toast-portal-${ID()}`);

  const removeToast = (id) => {
    setToasts(toasts.filter((item) => item.id !== id));
  };

  useEffect(() => {
    if (removing) {
      setToasts((item) => item.filter((toast) => toast.id !== removing));
    }
  }, [removing]);

  useEffect(() => {
    if (autoClose && toasts.length) {
      const targetId = toasts[toasts.length - 1].id;
      setTimeout(() => {
        setRemoving(targetId);
      }, autoCloseTime);
    }
  }, [toasts]);

  useImperativeHandle(ref, () => ({
    addMessage(inputToast) {
      setToasts([...toasts, { ...inputToast, id: ID() }]);
    },
  }));

  return createPortal(
    <ToastContainer top={top} right={right}>
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
  top: PropTypes.number,
  right: PropTypes.number
};

ToastPortal.displayName = "ToastPortal"; //  Component definition is missing display name lint error 때문에 추가

export default ToastPortal;
