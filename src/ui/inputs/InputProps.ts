export default interface InputProps {
  type?: "password" | "email" | "text";
  id: string;
  placeholder: string;
  required?: boolean;
}
