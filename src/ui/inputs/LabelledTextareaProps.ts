export default interface LabelledTextareaProps {
  name: string;
  label: string;
  placeholder: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
