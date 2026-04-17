import { ChangeHandler, RefCallBack } from "react-hook-form";

export default interface LabelledInputProps {
  name?: string;
  type?: "password" | "email" | "text";
  label: string;
  placeholder: string;
  disabled?: boolean;
  value?: string;
  required?: boolean;
  onChange?: ChangeHandler | ((e: React.ChangeEvent<HTMLInputElement>) => void);
  onFocus?: () => void;
  onBlur?: ChangeHandler | (() => void);
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onConfirm?: () => void;
  ref?: RefCallBack;
  className?: string;
}