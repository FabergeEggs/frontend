export default interface TextareaProps {
  name: string;
  id: string;
  placeholder: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}
