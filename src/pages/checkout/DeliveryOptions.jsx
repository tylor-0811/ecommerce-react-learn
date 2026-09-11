import { convertMillisecondsToCorrectDate, formatPriceCents } from '../../util/util.js';

function DeliveryOptions({ deliveryOptions, priceCents, cartItem }) {
    return (
        <div className="delivery-options">
            <div className="delivery-options-title">
                Choose a delivery option:
            </div>
            {
                deliveryOptions.length > 0 && deliveryOptions.map(deliveryOption => {
                    let priceString = 'FREE Shipping';
                    const { estimatedDeliveryTimeMs } = deliveryOption;

                    {
                        (priceCents > 0) &&
                            (priceString = `${formatPriceCents(deliveryOption.priceCents)} - Shipping`)

                    }

                    return (
                        <div className="delivery-option" key={deliveryOption.id}>
                            <input type="radio"
                                checked={deliveryOption.id === cartItem.deliveryOptionId}
                                className="delivery-option-input"
                                name={`delivery-option-${cartItem.product.id}`} />
                            <div>
                                <div className="delivery-option-date">
                                    {
                                        convertMillisecondsToCorrectDate(estimatedDeliveryTimeMs)
                                    }
                                </div>
                                <div className="delivery-option-price">
                                    {priceString}
                                </div>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}


export default DeliveryOptions;