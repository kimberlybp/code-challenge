import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import otpImage from '../assets/password.png';
import authSuccess from '../assets/success.png';
import { useForm, Controller } from 'react-hook-form';

export default function OTPForm(props) {
    const { handleSubmit, control } = useForm();

    const onSubmit = data => {
        props.handler();
    };

    return (
        <Fragment>
            <Typography variant="h6" align="center">
                OTP Authentication
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                {props.authenticated === 1 ? 'Successfully authenticated' : ' We have sent you a One Time Password via SMS'}
            </Typography>
            <Grid container
                component="form"
                alignItems="center"
                justifyContent="center"
                onSubmit={handleSubmit(onSubmit)}
                spacing={3}
                maxWidth="sm">
                <img src={props.authenticated === 1 ? authSuccess : otpImage}
                    alt="OTP Icon" style={{ width: '50%', marginTop: '50px' }} />
                {props.authenticated === 1 ? "" :
                    <Grid item xs={12}>
                        <Controller
                            name="otp"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <TextField
                                    id="otp"
                                    name="otp"
                                    label="OTP"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                    fullWidth
                                    variant="outlined"
                                    type="number"
                                />
                            )}
                            rules={{
                                required: 'OTP is required',
                                maxLength: { value: 4, message: 'OTP should only be 4 digits' },
                                minLength: { value: 4, message: 'OTP should have 4 digits' }
                            }}
                        />

                    </Grid>
                }
                <Grid item xs={12}>
                    {props.authenticated === 1 ?
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                            style={{ color: 'white' }}
                            onClick={() => props.handler()}>Next</Button> :
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            size="large"
                            style={{ color: 'white' }}>Verify</Button>}
                </Grid>
            </Grid>
        </Fragment>
    );
}