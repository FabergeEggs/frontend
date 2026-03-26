export default interface InputProps {
  name: string;
  type?: "password" | "email" | "text";
  id: string;
  placeholder: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
