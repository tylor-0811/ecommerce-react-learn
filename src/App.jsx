import HomePage from './pages/HomePage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';

import { Routes, Route } from 'react-router';

function App() {
  return(
    <Routes>
      <Route 
        index element={<HomePage />} />
      <Route 
        path="/checkout" element={<CheckoutPage />} />
    </Routes>
  );
}

export default App