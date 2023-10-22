import React, { useState } from "react";
import { Button, TextField, Container, Typography, Box, CircularProgress, Snackbar, Alert, Select, MenuItem } from "@mui/material";

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
      <Box key={index} display="flex" alignItems="center" mb={1}>
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


  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Portfolio Generator
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={error === "Name is required"}
            helperText={error === "Name is required" && error}
          />
        </Box>

        {/* Insert the Experience Rendering Here */}
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
        <Box mb={2}>
          <TextField
            fullWidth
            label="Experience"
            variant="outlined"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
          />
        </Box>

        {/* PROJECTS HERE */}
      {/* Render Projects */}
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

      {/* personal links */}
      {/* Render Social Media Links */}
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
<br></br>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          style={{ marginTop: "20px" }}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Portfolio"}
        </Button>
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
    </Container>
  );
};

export default PortfolioForm;
