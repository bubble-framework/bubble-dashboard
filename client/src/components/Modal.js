import ModalDialog from './ModalDialog.js';

const Modal = () => {
  return (
    <div className="bg-zinc-300 w-screen h-screen absolute inset-0 flex justify-center items-center z-50">
      <ModalDialog />
    </div>
  );
}

export default Modal;
