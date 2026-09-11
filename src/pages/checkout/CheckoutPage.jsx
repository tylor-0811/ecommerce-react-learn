import axios from 'axios';
import CheckoutHeader from './CheckoutHeader.jsx';
import OrderSummary from './OrderSummary.jsx';
import PaymentSummary from './PaymentSummary.jsx';
import { useState, useEffect } from 'react';

import './checkout-header.css';
import './CheckoutPage.css';

function CheckoutPage({ cartTotalQuantity, cart }) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);

    useEffect(() => {
        const getCheckoutData = async () => {
            const deliveryOptionsResponse = await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            const paymentSummaryResponse = await axios.get('/api/payment-summary');

            setDeliveryOptions(deliveryOptionsResponse.data);
            setPaymentSummary(paymentSummaryResponse.data);
        };

        getCheckoutData();
    }, []);

    return (
        <>
            <title>Checkout</title>

            <CheckoutHeader cartTotalQuantity={cartTotalQuantity} />

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    {deliveryOptions.length > 0 && <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />}
                    {paymentSummary && <PaymentSummary paymentSummary={paymentSummary} />}
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;