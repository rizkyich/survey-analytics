import React from 'react';
import { FormControlLabel, Checkbox, FormGroup } from '@mui/material';

interface PublishSurveyFormProps {
  isPublished: boolean;
  handlePublishChange: (checked: boolean) => void;
}

const PublishSurveyForm: React.FC<PublishSurveyFormProps> = ({ isPublished, handlePublishChange }) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handlePublishChange(e.target.checked);
  };

  return (
    <FormGroup>
      <FormControlLabel
        control={
          <Checkbox
            checked={isPublished}
            onChange={handleCheckboxChange}
            color="primary"
          />
        }
        label="Publish Survey"
      />
    </FormGroup>
  );
};

export default PublishSurveyForm;
