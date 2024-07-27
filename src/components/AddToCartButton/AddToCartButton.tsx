import React from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import cart from '../../services/cart';
import './AddToCartButton.scss';
import { useCart } from '../../hooks/useCart';
import dialogs from '../../ui/dialogs';

const AddToCartButton: React.FC<{ productId: string, productName: string, price: number, image: string, size: string, onAdd: () => void; disabled: boolean; }> = ({ productId, productName, price, image, size, onAdd, disabled }) => {
    const { fetchCart } = useCart();
    const handleAddToCart = async () => {

        if (disabled) return; // Prevent adding to cart if disabled

        try {
            await cart.addProductToCart(productId, 1, size); // לדוגמה, ניתן לשנות בהתאם לצורך
            dialogs.showPopup(
                'Product Added',
                `<div style="display: flex; align-items: center;">
                    <img src="${image}" alt="${productName}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;" />
                    <div>
                        <p>${productName} has been added to your cart.</p>
                        <p>Size: $${size}</p>
                        <p>Price: $${price.toFixed(2)}</p>
                    </div>
                </div>`
            );
            fetchCart();
            onAdd();

        } catch (error) {
            console.error('Failed to add product to cart.', error);
        }
    };

    return (
        <button 
        onClick={handleAddToCart} 
            className={`add-to-cart-button ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
            >
            <FiShoppingCart size={24} />
            Add to cart
        </button>
    );
};

export default AddToCartButton;