import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { CircularProgress, Box, Typography } from '@mui/material';

export const BodyDetails = () => {
    
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [elementData, setElementData] = useState(null);

    useEffect(() => {
        fetchDetails()
    }, [])

    const fetchDetails = async () => {
        setLoading(true);
        try{
            const response = await fetch(`https://api.le-systeme-solaire.net/rest/bodies/${id}`);

            if(!response.ok) {
                throw new Error('No se pudieron cargar los datos')
            }{
                const detailElement = await response.json();
                setElementData(detailElement);
            }
        } catch(error){
            console.error("Error fetching body details:", error);
        } finally {
            setLoading(false);
        }

    }

    if(loading) {
        return(
            <CircularProgress color="secondary">
                Cargando info
            </CircularProgress>
        )
    }
    if (!elementData) return <Typography>No se encontró el cuerpo celeste</Typography>;
    return(
        <Box>
                <Typography variant='h2'> Nombre: {elementData.name}</Typography>
                <Typography> Descripcion: {elementData.description}</Typography>
        </Box>
    )
}