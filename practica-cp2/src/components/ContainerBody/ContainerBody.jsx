import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Body } from "../Body/Body";

export const ContainerBody = () => {
    const [data, setData] = useState({ bodies: [] });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                "https://api.le-systeme-solaire.net/rest/bodies"
            );
            if (!response.ok) {
                throw new Error("Error al cargar los datos");
            } else {
                const jsonData = await response.json();
                setData(jsonData);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    if (error) {
        return (
            <Box>
                <Typography>Ups!... An error has ocurred</Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ padding: 2 }}>
                <Typography variant="h4">Bodies</Typography>
                <Box sx={{ marginBottom: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                        Order By:
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
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
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Button variant="outlined">It's a planet</Button>
                        <Button variant="outlined">It's not a planet</Button>
                        <Button variant="outlined">Gravity</Button>
                        <Button variant="outlined">Diameter</Button>
                        <Button variant="outlined">Others</Button>
                    </Box>
                </Box>
            </Box>
            {loading ? (
                <Box>
                    <Typography>Loading...</Typography>
                </Box>
            ) : (
                <Box>
                    {data.bodies?.map((element) => {
                        const massValue = element.mass
                            ? element.mass.massValue
                            : "N/A";
                        return (
                            <Body
                                key={element.id}
                                id={element.id}
                                name={element.name}
                                density={element.density}
                                gravity={element.gravity}
                                mass={massValue}
                            ></Body>
                        );
                    })}
                </Box>
            )}
        </>
    );
};
