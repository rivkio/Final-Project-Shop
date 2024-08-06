import { FC, useState } from 'react';
import useCart from '../../hooks/useCart';
import dialogs from '../../ui/dialogs';
import './AddToCartButton.scss';
import { AddToCartButtonProps, IVariant } from '../../@types/productType';

const AddToCartButton: FC<AddToCartButtonProps> = ({ productId, variants, productName, image, disabled }) => {
    const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(variants[0] || null);
    const { addToCart } = useCart();

    const handleAddToCart = async () => {
        if (selectedVariant) {
            console.log("Adding product to cart:", selectedVariant);
            try {
                await addToCart(productId, selectedVariant._id, 1, selectedVariant.size, selectedVariant.price);
                dialogs.success(
                    "Product Added",
                    `<div style="display: flex; align-items: center;">
                        <img src="${image.url}" alt="${productName}" style="width: 50px; height: 50px; object-fit: cover; margin-right: 10px;" />
                        <div>
                            <p>${productName} has been added to your cart.</p>
                        </div>
                    </div>`
                );
            } catch (error) {
                console.error("Failed to add product to cart:", error);
            }
        } else {
            console.error("No variant selected");
        }
    };

    return (
        <div className="add-to-cart-container">
            <p className={selectedVariant.quantity > 0 ? '' : 'out-of-stock'}>
            {selectedVariant.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </p>
            <div className="price-container" style={{ marginBottom: '20px', marginTop: '15px' }}>
                <span className="original-price" style={{ marginRight: '10px' }}>
                    ${(selectedVariant?.price * 1.2).toFixed(2)}
                </span>
                <span className="discounted-price">
                    ${selectedVariant?.price.toFixed(2)}
                </span>
            </div>
            <div className="size-buttons-container">
                {variants.map(variant => (
                    <button
                        key={variant._id}
                        className={`size-button ${selectedVariant && selectedVariant._id === variant._id ? 'selected' : ''}`}
                        onClick={() => setSelectedVariant(variant)}
                    >
                        {variant.size}
                    </button>
                ))}
            </div>
            <button 
            className="add-to-cart-button" 
            onClick={handleAddToCart} 
                disabled={selectedVariant.quantity === 0}>
                Add to Cart
            </button>
        </div>
    );
};

export default AddToCartButton;


