import { TextField } from '@mui/material';

interface SurveyTitleFormProps {
  title: string;
  setTitle: (title: string) => void;
}

const SurveyTitleForm: React.FC<SurveyTitleFormProps> = ({ title, setTitle }) => {
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  return (
    <TextField
      label="Title"
      value={title}
      onChange={handleTitleChange}
      required
      fullWidth
      margin="normal"
    />
  );
};

export default SurveyTitleForm;
