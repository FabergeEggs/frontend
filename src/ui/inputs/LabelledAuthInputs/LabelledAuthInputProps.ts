export default interface LabelledAuthInputProps {
  type?: "password" | "email" | "text";
  label: string;
  placeholder: string;
  required?: boolean;
}