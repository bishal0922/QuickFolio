import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box, CircularProgress, Snackbar, Alert, Select, MenuItem, Paper } from "@mui/material";
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
    padding: theme.spacing(4),
    borderRadius: '8px',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: '#ffffff',  // Pure white to contrast against the softer background
    padding: theme.spacing(2),
    marginBottom: theme.spacing(3),
    boxShadow: '0 2px 4px 0 rgba(0, 0, 0, .08)'  // Minimal shadow for a subtle lift effect
}));

const HeaderTypography = styled(Typography)(({ theme }) => ({
    color: '#333',  // Dark grey for headers
    marginBottom: theme.spacing(2),
    fontWeight: '500'
}));

const StyledButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#667eea',  // Soft blue for call-to-action buttons
    color: 'white',
    '&:hover': {
        backgroundColor: '#5a6fcf'  // A slightly darker blue for hover
    }
}));

const PortfolioForm = () => {
    
  const [formData, setFormData] = useState({
    name: "",
    experiences: [
      {
        companyName: "",
        bulletPoints: [""],
      },
    ],
    projects: [
        {
            title: "",
            description: ""
        }
    ],
    personalLinks: [
        {
            platform: "",
            link: ""
        }
    ],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const socialMediaOptions = [
    { value: 'facebook', label: 'Facebook' },
    { value: 'twitter', label: 'Twitter' },
    { value: 'linkedin', label: 'LinkedIn' },
    { value: 'github', label: 'Github' },
    { value: 'instagram', label: 'Instagram' },
    // ... Add more platforms as needed
];


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validate = () => {
    if (!formData.name) {
      setError("Name is required");
      return false;
    }
    // Add more validations as required.
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      // Here, simulate a delay for the generation process
      await new Promise((res) => setTimeout(res, 2000));

      console.log("Generated Portfolio:", formData); // This is where actual generation logic goes.

      setSuccess(true);
    } catch (err) {
      setError("An error occurred while generating the portfolio.");
    } finally {
      setLoading(false);
    }
  };

/*
  EXPERIENCE START
*/
  const handleExperienceChange = (e, index) => {
    const experiences = [...formData.experiences];
    experiences[index].companyName = e.target.value;
    setFormData((prev) => ({ ...prev, experiences }));
  };
  const handleBulletPointChange = (e, experienceIndex, bulletIndex) => {
    const experiences = [...formData.experiences];
    experiences[experienceIndex].bulletPoints[bulletIndex] = e.target.value;
    setFormData((prev) => ({ ...prev, experiences }));
  };
  const addBulletPoint = (experienceIndex) => {
    const experiences = [...formData.experiences];
    experiences[experienceIndex].bulletPoints.push("");
    setFormData((prev) => ({ ...prev, experiences }));
  };
  const addExperience = () => {
    setFormData((prev) => ({
      ...prev,
      experiences: [
        ...prev.experiences,
        { companyName: "", bulletPoints: [""] },
      ],
    }));
  };

  const renderBulletPoints = (experience, experienceIndex) => {
    return experience.bulletPoints.map((point, index) => (
        <Box key={index} display="flex" alignItems="center" mt={1}>
        <TextField
          fullWidth
          label={`Bullet Point ${index + 1}`}
          variant="outlined"
          value={point}
          onChange={(e) => handleBulletPointChange(e, experienceIndex, index)}
        />
        {experience.bulletPoints.length - 1 === index && (
          <Button onClick={() => addBulletPoint(experienceIndex)}>+</Button>
        )}
      </Box>
    ));
  };

/*
EXPERIENCE ENDS
*/

/*
PROJECT STARTS
*/
const handleProjectChange = (e, index, field) => {
    const projects = [...formData.projects];
    projects[index][field] = e.target.value;
    setFormData(prev => ({ ...prev, projects }));
};

const addProject = () => {
    setFormData(prev => ({
        ...prev, 
        projects: [...prev.projects, { title: '', description: '' }]
    }));
};
/*
PROJECT ENDS
*/


/*
PERSONAL LINKS START
*/
const handleLinkChange = (e, index, field) => {
    const personalLinks = [...formData.personalLinks];
    personalLinks[index][field] = e.target.value;
    setFormData(prev => ({ ...prev, personalLinks }));
};
const addLink = () => {
    setFormData(prev => ({
        ...prev, 
        personalLinks: [...prev.personalLinks, { platform: '', link: '' }]
    }));
};


/*
PERSONAL LINKS ENDS 
*/

const handleGenerateClick = (e) => {
    // For now, let's just log the data to the console
    console.log("wassup foo");
    e.preventDefault();  // Prevent form submission

    setLoading(true);

    // Simulating a delay for generating. 
    // Later on, this can be replaced with actual generation logic.
    setTimeout(() => {
        const jsonData = JSON.stringify(formData, null, 2);
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);

        // Opens in new tab
        window.open(url, '_blank');
        
        setLoading(false);
        setSuccess(true);  // Show success snackbar
    }, 1000);  // 2 seconds delay, adjust as needed
};

const handleKeyDown = (e) => {
    // Check if the "Enter" key was pressed
    if (e.key === 'Enter') {
        e.preventDefault();
    }
};



  return (
    <StyledContainer>
      <Typography variant="h4" gutterBottom>
        Portfolio Generator
      </Typography>
      <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </Box>


        {/* Insert the Experience Rendering Here */}
         <StyledPaper elevation={3} style={{ padding: '15px', marginBottom: '20px' }}>
                <HeaderTypography variant="h6" gutterBottom>
                    Experience
                </HeaderTypography>
        {formData.experiences.map((experience, index) => (
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


 

        {/* PROJECTS HERE */}
      {/* Render Projects */}
      <StyledPaper elevation={3} style={{ padding: '15px', marginBottom: '20px' }}>
                <HeaderTypography variant="h6" gutterBottom>
                    Projects
                </HeaderTypography>
{formData.projects.map((project, index) => (
    <Box key={index} mb={2}>
        <TextField
            fullWidth
            label="Project Title"
            variant="outlined"
            name="projectTitle"
            value={project.title}
            onChange={(e) => handleProjectChange(e, index, 'title')}
        />
        <Box mt={2}>
            <TextField
                fullWidth
                label="Project Description"
                variant="outlined"
                name="projectDescription"
                value={project.description}
                onChange={(e) => handleProjectChange(e, index, 'description')}
                multiline
                rows={4}
            />
        </Box>
    </Box>
))}

<Button onClick={addProject} variant="outlined" style={{ marginRight: '10px' }}>
    Add Another Project
</Button>
</StyledPaper>


      {/* personal links */}
      {/* Render Social Media Links */}
        <StyledPaper elevation={3} style={{ padding: '15px', marginBottom: '20px' }}>
                <HeaderTypography variant="h6" gutterBottom>
                    Personal Links
                </HeaderTypography>
{formData.personalLinks.map((link, index) => (
    <Box key={index} mb={2} display="flex" alignItems="center" justifyContent="space-between">
        <Select
            variant="outlined"
            value={link.platform}
            onChange={(e) => handleLinkChange(e, index, 'platform')}
            style={{ width: '40%', marginRight: '10px' }}
        >
            {socialMediaOptions.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </Select>

        <TextField
            fullWidth
            label="Link"
            variant="outlined"
            name="link"
            value={link.link}
            onChange={(e) => handleLinkChange(e, index, 'link')}
            style={{ width: '55%' }}
        />
    </Box>
))}

<Button onClick={addLink} variant="outlined">
    Add Another Link
</Button>
</StyledPaper>

<br></br>

        <StyledButton
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: "20px" }}
          onClick={handleGenerateClick}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Portfolio"}
        </StyledButton>
      </form>
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={() => setSuccess(false)}
      >
        <Alert
          onClose={() => setSuccess(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Portfolio generated successfully!
        </Alert>
      </Snackbar>
    </StyledContainer>

  );
};

export default PortfolioForm;
