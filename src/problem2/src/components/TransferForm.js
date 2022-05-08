import { Fragment } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useForm, Controller } from 'react-hook-form';

export default function AmountForm(props) {
    const { handleSubmit, control } = useForm();

    const onSubmit = data => {
        props.handler(data);
    };

    return (
        <Fragment>
            <Grid container component="form" onSubmit={handleSubmit(onSubmit)} spacing={3} mt={1}>
                <Grid item xs={12}>
                    <Controller
                        name="sendTo"
                        control={control}
                        defaultValue={props.data ? props.data.sendTo : ""}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                id="sendTo"
                                name="sendTo"
                                label="Recipient ETH Address"
                                value={value}
                                onChange={onChange}
                                onBlur={() => {
                                    if (props.verified && props.data.sendTo !== value) {
                                        props.setVerified(0);
                                    } else if (value.match(/^(0x)?[0-9a-f]{40}$/i)) {
                                        props.setVerified(1);
                                    }
                                }}
                                onFocus={() => props.setVerified(0)}
                                error={!!error}
                                helperText={error ? error.message : null}
                                fullWidth
                                variant="outlined"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment style={{ display: props.verified === 1 ? "flex" : "none" }} position="end">
                                            {
                                                props.verified === 1 ?
                                                    <Tooltip title="Valid ETH Address found on blockchain">
                                                        <IconButton>
                                                            <CheckCircleIcon color='primary' />
                                                        </IconButton>
                                                    </Tooltip>
                                                    : ""
                                            }
                                        </InputAdornment>
                                    )
                                }}

                            />
                        )}
                        rules={{ required: 'Recipient ETH Address required', pattern: { value: /^(0x)?[0-9a-f]{40}$/i, message: 'Enter a valid ETH address' } }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Controller
                        name="amount"
                        control={control}
                        defaultValue={props.data ? props.data.amount : ""}
                        render={({ field: { onChange, value }, fieldState: { error } }) => (
                            <TextField
                                id="amount"
                                name="amount"
                                label="Amount"
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
                            required: 'Amount to send is required',
                            min: { value: 0, message: 'Enter a valid amount to send' }
                        }}
                    />

                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        size="large"
                        style={{ color: 'white' }}
                    >Next</Button>
                </Grid>
            </Grid>
        </Fragment>
    );
}