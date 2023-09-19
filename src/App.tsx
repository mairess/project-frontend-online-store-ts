import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import ShoppingCart from './pages/shoppingCart/ShoppingCart';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/shoppingCart" element={ <ShoppingCart /> } />
    </Routes>
  );
}

export default App;
