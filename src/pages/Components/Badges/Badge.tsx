import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';

export const Budget = (props) => (
    <Card
        sx={{ height: '100%' }}
        {...props}
    >
        <CardContent sx={{ padding: '30px 12px' }}>
            <Grid
                container
                spacing={3}
                sx={{ justifyContent: 'space-between' }}
            >
                <Grid item>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="overline"
                    >
                        Total Order Value
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h4"
                    >
                        $24k
                    </Typography>
                </Grid>
                <Grid item>
                    <Avatar
                        sx={{
                            backgroundColor: 'error.main',
                            height: 56,
                            width: 56
                        }}
                    >
                        <MoneyIcon />
                    </Avatar>
                </Grid>
            </Grid>

        </CardContent>
    </Card>
);
