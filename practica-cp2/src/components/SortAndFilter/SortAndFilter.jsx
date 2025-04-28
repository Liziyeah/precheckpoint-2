import React from 'react';
import { Button, Typography, Box } from '@mui/material';

export const SortAndFilter = () => {
    return (
        <Box sx={{ padding: 2 }}>
            <Typography variant="h4">
                Bodies
            </Typography>
            <Box sx={{ marginBottom: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                    Order By:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="contained">Mass</Button>
                    <Button variant="contained">Density</Button>
                    <Button variant="contained">Gravity</Button>
                    <Button variant="contained">Diameter</Button>
                    <Button variant="contained">Others</Button>
                </Box>
            </Box>
            <Box>
                <Typography variant="subtitle1" gutterBottom>
                    Filter By:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button variant="outlined">Mass</Button>
                    <Button variant="outlined">Density</Button>
                    <Button variant="outlined">Gravity</Button>
                    <Button variant="outlined">Diameter</Button>
                    <Button variant="outlined">Others</Button>
                </Box>
            </Box>
        </Box>
    );
};

