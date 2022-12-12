interface ButtonProps {
  children: any;
  variant?: string;
  size?: string;
  className?: string;
  id?: string;
  type?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

export const Button: React.FunctionComponent<ButtonProps> = (props) => {
  return <button>Test</button>;
};
