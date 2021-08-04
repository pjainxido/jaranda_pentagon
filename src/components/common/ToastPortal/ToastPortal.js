import React, { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Toast from "./Toast";

const ToastContainer = styled.div`
  position: fixed;
  ${({ position }) => handleContainerPosition(position)}
`;

const handleContainerPosition = (position) => {
  switch (position) {
    case "top-left":
      return "top: 1em;left: 1em;";
    case "top-center":
      return "top: 1em;left: 50%; transform: translateX(-50%);";
    case "top-right":
      return "top: 1em;right: 1em;";
    case "bottom-left":
      return "bottom: 1em;left: 1em;";
    case "bottom-center":
      return "bottom: 1em;left: 50%; transform: translateX(-50%)";
    case "bottom-right":
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
      document.getElementById("modal-root")
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
