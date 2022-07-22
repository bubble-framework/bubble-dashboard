import Button from './Button.js';

const ModalDialog = (props) => {
  const {
    message,
    continueText="Yes",
    cancelText="No",
    onContinue,
    onCancel,
  } = props;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      <div className="flex-col w-1/3 justify-center bg-white p-12 rounded-xl">
        <p className="text-lg text-zinc-600 mb-10">{message}</p>
        <div className="flex justify-end">
          <Button
            text={continueText}
            color="green"
            onButtonClick={onContinue}
          />
          <Button
            text={cancelText}
            color="red"
            onButtonClick={onCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalDialog;