import { useState, Fragment } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import TransferForm from './TransferForm';
import OTPForm from './OTPForm';
import Review from './Review';
import logo from '../assets/logo.svg';
import image from '../assets/success.png';
import { wait } from '@testing-library/user-event/dist/utils';

const steps = ['Send To', 'OTP Auth', 'Review Transaction'];

export default function Checkout() {
    const [activeStep, setActiveStep] = useState(0);
    const [sendData, setSendData] = useState('');
    const [verified, setVerified] = useState(0);
    const [authenticated, setAuthenticated] = useState(0);
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleNext = () => {
        setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        setActiveStep(activeStep - 1);
    };

    const handleValidatedSendData = (data) => {
        setSendData(data);
        handleNext();
    }

    const handleOTP = async () => {
        handleToggle();
        await wait(2000);
        setAuthenticated(1);
        handleNext();
        handleClose();
    }

    const handleTransfer = async () => {
        handleToggle();
        await wait(2000);
        handleNext();
        handleClose();
    }

    function getStepContent(step) {
        switch (step) {
            case 0:
                return <TransferForm data={sendData} verified={verified} setVerified={setVerified} handler={handleValidatedSendData} />;
            case 1:
                return <OTPForm handler={handleOTP} authenticated={authenticated} />;
            case 2:
                return <Review data={sendData} />;
            default:
                throw new Error('Unknown step');
        }
    }

    return (
        <div>
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <AppBar
                position="absolute"
                elevation={0}
                sx={{
                    position: 'relative',
                    borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
                style={{ backgroundColor: 'white', boxShadow: 'none' }}>
                <Toolbar>
                    <img className='logo' src={logo} alt="Fancy form logo" />
                </Toolbar>
            </AppBar>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 3, md: 5 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        Transfer ETH
                    </Typography>
                    <Fragment>
                        {activeStep === steps.length ? (
                            <Fragment>
                                <Typography component="h1" variant="h5" align="center">
                                    Transferred successfully!
                                </Typography>
                                <Grid container
                                    component="form"
                                    alignItems="center"
                                    justifyContent="center"
                                    spacing={3}
                                    maxWidth="sm">
                                    <img src={image} alt="OTP Icon" style={{ width: '25%', marginTop: '50px' }} />
                                    <Grid item xs={12}>
                                        <Button
                                            onClick={() => document.location.reload()}
                                            fullWidth
                                            variant="contained"
                                            sx={{ mt: 3, mb: 2 }}
                                            size="large"
                                            style={{ color: 'white' }}
                                        >Transfer Again</Button>
                                    </Grid>
                                </Grid>
                            </Fragment>
                        ) : (
                            <Fragment>
                                {getStepContent(activeStep)}
                                <Box sx={{ display: 'flex', justifyContent: activeStep === 2 ? 'flex-end' : ' flex-start' }}>
                                    {activeStep !== 0 && (
                                        <Button size="large" onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                                            Back
                                        </Button>
                                    )}
                                    {activeStep === 2 ?
                                        <Button
                                            variant="contained"
                                            onClick={handleTransfer}
                                            sx={{ mt: 3, ml: 1 }}
                                            style={{ color: 'white' }}
                                        >
                                            Confirm
                                        </Button> : ""}
                                </Box>
                            </Fragment>)}
                    </Fragment>
                </Paper>
            </Container>
        </div>
    );
}