import { createPortal } from 'react-dom';

const PopupDom = ({ children }) => {
  const el = document.getElementById('popupDom');
  return createPortal(children, el);
};

export default PopupDom;
