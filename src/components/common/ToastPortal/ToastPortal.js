import React, { forwardRef, useEffect, useState, useImperativeHandle } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Toast from "./Toast";

const ToastContainer = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
`;

const ID = () => {
  return "_" + Math.random().toString(36).substr(2, 9);
};

const ToastPortal = forwardRef(({ autoClose = false, autoCloseTime = 2000 }, ref) => {
  const [toasts, setToasts] = useState([{ id: "123", mode: "info", message: "hello world?" }]);
  const [loaded, setLoaded] = useState(false);
  const [portalId] = useState(`toast-portal-${ID()}`);

  useEffect(() => {
    const div = document.createElement("div");
    div.id = portalId;
    div.style = "position: fixed; top: 10px; right: 10px";
    document.getElementsByTagName("body")[0].prepend(div); //body의 첫번째 element에 해당 div element 적용
    setLoaded(true);
    return () => document.getElementsByTagName("body")[0].removeChild(div);
  }, [portalId]);

  const removeToast = (id) => {
    setToasts(toasts.filter((item) => item.id !== id));
  };

  useImperativeHandle(ref, () => ({
    addMessage(toast) {
      setToasts([...toasts, { ...toast, id: ID() }]);
    },
  }));

  return loaded ? (
    ReactDOM.createPortal(
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
      document.getElementById(portalId)
    )
  ) : (
    <></>
  );
});

ToastPortal.propTypes = {
  autoClose: PropTypes.bool,
  autoCloseTime: PropTypes.number,
};

ToastPortal.displayName = "ToastPortal"; //  Component definition is missing display name lint error 때문에 추가

export default ToastPortal;
