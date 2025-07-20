import { ButtonProps } from "../app/types";

const Button = ({ type, htmlType = "button", label, onClick }: ButtonProps) => {
  let classButton: string;

  if (type === "blueButton") {
    classButton =
      "bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer";
  } else if (type === "redButton") {
    classButton =
      "bg-red-500 text-white font-bold py-2 px-4 rounded cursor-pointer";
  } else if (type === "shortButton") {
    classButton =
      "bg-gray-200 text-black font-bold py-1 px-2 rounded cursor-pointer";
  } else {
    classButton =
      "bg-gray-300 text-black font-bold py-2 px-4 rounded cursor-pointer";
  }

  return (
    <button type={htmlType} className={classButton} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
