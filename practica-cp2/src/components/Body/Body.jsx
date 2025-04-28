import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Body = ({ id, name, density, gravity, mass }) => {

    let navigate = useNavigate();

    return (
        <Card sx={{ maxWidth: 400, margin: '20px auto', padding: '10px', bgcolor: '#5c6bc0', color: 'white' }}>
            <CardContent>
                <Typography variant="h5" component="div" gutterBottom>
                    {name}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Density:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">{density} kg/m³</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Gravity:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">{gravity} m/s²</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1" color="text.secondary">
                            Mass:
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body1">{mass} kg</Typography>
                    </Grid>
                </Grid>
                <Button onClick={() => {navigate(`/cuerpo/${id}`)}} sx = {{color: 'white'}}>Ver mas</Button>
            </CardContent>
        </Card>
    );
};
