import { Button, Container, Typography, Paper } from "@mui/material";
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


export {StyledContainer, StyledPaper, HeaderTypography, StyledButton};
