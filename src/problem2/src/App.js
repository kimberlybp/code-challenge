import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Form from './components/Checkout.js';
import './App.css';

const THEME = createTheme({
    typography: {
        fontFamily: "'Poppins', sans-serif"
    },
    palette: {
        primary: {
            main: '#1AB5BF',
            contrastText: "#2B3334"
        }
    }
});

function App() {
    return (
        <ThemeProvider theme={THEME}>
            <CssBaseline />
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Form />}></Route>
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
