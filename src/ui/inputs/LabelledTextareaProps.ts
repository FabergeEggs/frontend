import { ChangeHandler, RefCallBack } from "react-hook-form";

export default interface LabelledTextareaProps {
  name?: string;
  label: string;
  placeholder: string;
  disabled?: boolean;
  value?: string;
  required?: boolean;
  onChange?: ChangeHandler | ((e: React.ChangeEvent<HTMLTextAreaElement>) => void);
  onFocus?: () => void;
  onBlur?: ChangeHandler | (() => void);
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onConfirm?: () => void;
  ref?: RefCallBack;
  height?: number;
}
