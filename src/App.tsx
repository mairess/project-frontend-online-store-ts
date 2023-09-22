import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home';
import ShoppingCart from './pages/shoppingCart/ShoppingCart';
import DetailsProduct from './pages/details/DetailsProduct';
import Checkout from './pages/Checkout';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/shoppingCart" element={ <ShoppingCart /> } />
      <Route path="/details/:id" element={ <DetailsProduct /> } />
      <Route path="/checkout" element={ <Checkout /> } />
    </Routes>
  );
}

export default App;
