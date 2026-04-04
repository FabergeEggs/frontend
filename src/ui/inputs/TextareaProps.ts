import { ChangeHandler, RefCallBack } from "react-hook-form";

export default interface TextareaProps {
  name?: string;
  id: string;
  placeholder: string;
  required?: boolean;
  onChange?: ChangeHandler | ((e: React.ChangeEvent<HTMLTextAreaElement>) => void);
  onFocus?: () => void;
  onBlur?: ChangeHandler | (() => void);
  ref?: RefCallBack;
}
