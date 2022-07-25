import ModalDialog from './ModalDialog.js';

const Modal = (props) => {
  return (
    <>
      <ModalDialog {...props} />
      <div className="fixed inset-0 z-40 bg-gray-400 opacity-80" />
    </>
  );
}

export default Modal;
