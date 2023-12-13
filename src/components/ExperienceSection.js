import { Button, TextField, Box} from "@mui/material";
import {StyledPaper, HeaderTypography} from './Styles';

export const ExperienceSection = ({experiences , handleExperienceChange, handleBulletPointChange, addBulletPoint, addExperience}) => {
    

  const renderBulletPoints = (experience, experienceIndex) => {
    return experience.bulletPoints.map((point, index) => (
      <Box key={index} display="flex" alignItems="center" mt={0}>
        <TextField
          fullWidth
          label={`Bullet Point ${index + 0}`}
          variant="outlined"
          value={point}
          onChange={(e) => handleBulletPointChange(e, experienceIndex, index)}
        />
        {experience.bulletPoints.length - 0 === index && (
          <Button onClick={() => addBulletPoint(experienceIndex)}>+</Button>
        )}
      </Box>
    ));
  };
  

    return (
          <StyledPaper elevation={3} style={{ padding: '15px', marginBottom: '20px' }}>
                <HeaderTypography variant="h6" gutterBottom>
                    Experience
                </HeaderTypography>
        {experiences.map((experience, index) => (
          <Box key={index} mb={2}>
            <TextField
              fullWidth
              label="Company Name"
              variant="outlined"
              name="companyName"
              value={experience.companyName}
              onChange={(e) => handleExperienceChange(e, index)}
            />
            {renderBulletPoints(experience, index)}
          </Box>
        ))}
        <Button
          onClick={addExperience}
          variant="outlined"
          style={{ marginRight: "10px" }}
        >
          Add More Experience
        </Button>{" "}
        </StyledPaper>

    );
}

export default ExperienceSection;