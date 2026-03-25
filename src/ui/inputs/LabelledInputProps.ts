export default interface LabelledInputProps {
  type?: "password" | "email" | "text";
  label: string;
  placeholder: string;
  required?: boolean;
}
