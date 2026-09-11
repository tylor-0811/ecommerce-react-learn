import { useState, useEffect } from 'react';
import axios from 'axios';

import HomePage from './pages/home/HomePage.jsx';
import CheckoutPage from './pages/checkout/CheckoutPage.jsx';
import OrdersPage from './pages/orders/OrdersPage.jsx';
import TrackingPage from './pages/TrackingPage.jsx';

import { Routes, Route } from 'react-router';

function getTotalCartItemsQuantity(cart) {
    let totalQuantity = 0;
    cart.forEach(cartItem => totalQuantity += cartItem.quantity);
    return totalQuantity;
}

function App() {
  const [ cart, setCart ] = useState([]);

  useEffect(() => {
    //get cart from backend
    const getCartData = async () => {
      const response = await axios.get('/api/cart-items?expand=product');
       setCart(response.data);
    };

    getCartData();
  }, []);

  const totalQuantity = getTotalCartItemsQuantity(cart);

  return(
    <Routes>
      <Route 
        index
        element={<HomePage cartTotalQuantity={totalQuantity} />} />

      <Route 
        path='/checkout'
        element={<CheckoutPage cartTotalQuantity={totalQuantity} cart={cart} />} />

      <Route
        path='/orders' element={<OrdersPage cartTotalQuantity={totalQuantity} />} />

      <Route
        path='/tracking' element={<TrackingPage />} />
    </Routes>
  );
}

export default App