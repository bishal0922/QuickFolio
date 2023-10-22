
import './App.css';
import PortfolioForm from './components/PortfolioForm';
import { CssBaseline, Container, Typography, Box, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // This is the default color, change as needed
    },
    secondary: {
      main: '#ff4081', // This is the default color, change as needed
    },
  },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="md">
                <Box mt={8} mb={4}>
                    <Typography variant="h2" align="center" gutterBottom>
                        Welcome to Quickfolio!
                    </Typography>
                    <Typography variant="h6" align="center" color="textSecondary" paragraph>
                        Create a W portfolio in minutes by filling out the form below. typeshit
                    </Typography>
                </Box>
                <Paper elevation={3}>
                    <Box p={4}>
                        <PortfolioForm />
                    </Box>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}

export default App;
