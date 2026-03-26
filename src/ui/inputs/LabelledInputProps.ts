export default interface LabelledInputProps {
  name: string;
  type?: "password" | "email" | "text";
  label: string;
  placeholder: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
