import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import {Body} from "../Body/Body";

export const ContainerBody = () => {
    
    const [data, setData] = useState({ bodies: [] });  
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setLoading(true);
        try{
            const response = await fetch("https://api.le-systeme-solaire.net/rest/bodies");
            if(!response.ok) {
                throw new Error("Error al cargar los datos")
            }
            else{
                const jsonData = await response.json();
                setData(jsonData);
                
            }
        } catch(err){
            setError(err)
        } finally{
            setLoading(false)
        }
    }

    if(loading) {
        return (
            <Box>
                <Typography>Loading...</Typography>
            </Box>
        )
    }

    if(error) {
        return (
            <Box>
                <Typography>Ups!... An error has ocurred</Typography>
            </Box>
        )
    }

    return(
        <Box>
            {data.bodies?.map((element) => {
                const massValue = element.mass ? element.mass.massValue : "N/A";
                return(
                    <Body key = {element.id}
                    id={element.id}
                    name = {element.name}
                        density = {element.density}
                        gravity={element.gravity}
                        mass = {massValue}>
                            
                    </Body>
                )
            })}
                
        </Box>
    )
    
}