import { Fragment } from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export default function Review(props) {
    return (
        <Fragment>
            <Typography variant="h6" align="center" gutterBottom>
                Review Transaction
            </Typography>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <Typography variant="body2">From</Typography>
                    <Typography variant="h6" m={0}>Your Account</Typography>
                    <Typography variant="body1" m={0}>
                        0xBC206cCa73bc14a99F5e5c1fB4C01587c5e42E6F
                    </Typography>
                    <Typography variant="body2">Current balance 0.9755 ETH</Typography>
                </Grid>
                <Grid item xs={12} my={3}>
                    <Typography variant="body2">To</Typography>
                    <Typography variant="h6" m={0}>Recipient Account</Typography>
                    <Typography variant="body1" m={0}>{props.data ? props.data.sendTo : ""}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Transfer Amount
                    </Typography>
                    <Typography fontWeight={500} gutterBottom>{props.data ? props.data.amount : ""} ETH</Typography>
                </Grid>
            </Grid>
        </Fragment>
    );
}