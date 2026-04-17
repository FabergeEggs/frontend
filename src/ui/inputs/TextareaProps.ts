import { ChangeHandler, RefCallBack } from "react-hook-form";

export default interface TextareaProps {
  name?: string;
  id: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: ChangeHandler | ((e: React.ChangeEvent<HTMLTextAreaElement>) => void);
  onFocus?: () => void;
  onBlur?: ChangeHandler | (() => void);
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onConfirm?: () => void;
  ref?: RefCallBack;
  height?: number;
  
}
