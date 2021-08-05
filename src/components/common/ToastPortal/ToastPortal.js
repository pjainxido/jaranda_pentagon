import React, { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Toast from "./Toast";
import MODALROOT from "constants/modalRoot";
import TOAST from "constants/toast";

const ToastContainer = styled.div`
  position: fixed;
  ${({ position }) => handleContainerPosition(position)}
`;

const handleContainerPosition = (position) => {
  switch (position) {
    case TOAST.POSITION.TOP_LEFT:
      return "top: 1em;left: 1em;";
    case TOAST.POSITION.TOP_CENTER:
      return "top: 1em;left: 50%; transform: translateX(-50%);";
    case TOAST.POSITION.TOP_RIGHT:
      return "top: 1em;right: 1em;";
    case TOAST.POSITION.BOT_LEFT:
      return "bottom: 1em;left: 1em;";
    case TOAST.POSITION.BOT_CENTER:
      return "bottom: 1em;left: 50%; transform: translateX(-50%)";
    case TOAST.POSITION.BOT_RIGHT:
      return "bottom: 1em;right: 1em;";
  }
};

const ID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const ToastPortal = forwardRef(
  ({ autoClose = true, autoCloseTime = 2000, position = "top-left" }, ref) => {
    // toastObject  = { id: "123", mode: "info", message: "hello world?" };
    const [toasts, setToasts] = useState([]);
    const [removing, setRemoving] = useState("");

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
      <ToastContainer position={position}>
        {toasts.map((item) => (
          <Toast
            key={item.id}
            mode={item.mode}
            message={item.message}
            onClose={() => removeToast(item.id)}
          />
        ))}
      </ToastContainer>,
      document.getElementById(MODALROOT)
    );
  }
);

ToastPortal.propTypes = {
  autoClose: PropTypes.bool,
  autoCloseTime: PropTypes.number,
  position: PropTypes.string,
};

ToastPortal.displayName = "ToastPortal"; //  Component definition is missing display name lint error 때문에 추가

export default ToastPortal;
