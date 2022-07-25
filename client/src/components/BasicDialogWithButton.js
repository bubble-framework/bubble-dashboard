import Button from './Button.js';

const BasicDialogWithButton = (props) => {
  const {
    message,
    buttonText,
    buttonColor,
    handleButtonClick
  } = props;

  return (
    <div className="relative container mx-auto rounded-lg border-4 border-indigo-300 p-10 grow mt-9">
      <div className="flex-col">
        <p className="mb-6">{message}</p>
        <div className="flex justify-center">
          <Button
            text={buttonText}
            color={buttonColor}
            onButtonClick={handleButtonClick}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicDialogWithButton;