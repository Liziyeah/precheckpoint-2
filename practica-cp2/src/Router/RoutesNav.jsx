import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ContainerBody } from '../components/ContainerBody/ContainerBody';
import { BodyDetails } from '../components/BodyDetails/BodyDetails';

export const RoutesNav = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path = "/" element = {<ContainerBody/>}/>
                <Route path="/cuerpo/:id" element={<BodyDetails/>} />
                {/* <Route path = 'a donde se dirige, en este caso se usa useParams' element = 'la pagina del componente'></Route> */}
            </Routes>
        </BrowserRouter>
    )
}