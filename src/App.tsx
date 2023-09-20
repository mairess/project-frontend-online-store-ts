import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import ShoppingCart from './pages/shoppingCart/ShoppingCart';
import DetailsProduct from './pages/details/DetailsProduct';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/shoppingCart" element={ <ShoppingCart /> } />
      <Route path="/details/:id" element={ <DetailsProduct /> } />
    </Routes>
  );
}

export default App;
