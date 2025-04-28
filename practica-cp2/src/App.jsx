import {Banner} from './components/Banner/Banner';
import {SortAndFilter} from './components/SortAndFilter/SortAndFilter';
import { ContainerBody } from './components/ContainerBody/ContainerBody';
import { RoutesNav } from './Router/RoutesNav';

function App() {
  
  return (
    <>  
      <Banner></Banner>
      <SortAndFilter></SortAndFilter>
      <RoutesNav></RoutesNav>
    </>

  )
}

export default App
