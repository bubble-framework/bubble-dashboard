const Button = ({ text, color, onButtonClick }) => (
  <button
    type="button"  
    className={`rounded-full px-5 py-2 mx-1 text-white font-bold bg-${color}-500 hover:bg-${color}-700`}
    onClick={onButtonClick}
  >
    {text}
  </button>
);

export default Button;
