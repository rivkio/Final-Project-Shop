import { FC, useState } from 'react';
import useCart from '../../hooks/useCart';
import dialogs from '../../ui/dialogs';
import './AddToCartButton.scss';
import { AddToCartButtonProps, IVariant } from '../../@types/productType';

const AddToCartButton: FC<AddToCartButtonProps> = ({ productId, variants, productName, image }) => {
    const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(variants[0] || null);
    const { addToCart } = useCart();

    const handleAddToCart = async () => {
        if (selectedVariant) {
            console.log("Adding product to cart:", selectedVariant);
            try {
                await addToCart(productId, selectedVariant._id, 1, selectedVariant.size, selectedVariant.price);
                dialogs.success("Product Added", `${productName}Product added to cart`);
            } catch (error) {
                console.error("Failed to add product to cart:", error);
            }
        } else {
            console.error("No variant selected");
        }
    };

    return (
        <div className="add-to-cart-container">
            <p> {selectedVariant.quantity > 0 ? 'In Stock' : 'Out of Stock'}</p>

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

                <div className="price-container">
                    <span className="original-price" style={{ marginRight: '10px' }}>
                        ${(selectedVariant.price * 1.2).toFixed(2)}
                    </span>
                    <div className="discounted-price">
                        ${selectedVariant.price.toFixed(2)}
                    </div>

                </div>

            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart} disabled={!selectedVariant}>
                Add to Cart
            </button>
        </div>
    );
};

export default AddToCartButton;




// const AddToCartButton: React.FC<{ productId, productName: string, price: number, image: string, size: string, onAdd: () => void; disabled: boolean; }> = ({ productId, productName, price, image, size, onAdd, disabled }) => {
//     const { fetchCart } = useCart();


    // return (
    //     <button 
    //     onClick={handleAddToCart} 
    //         className={`add-to-cart-button ${disabled ? 'disabled' : ''}`}
    //         disabled={disabled}
    //         >
    //         <FiShoppingCart size={24} />
    //         Add to cart
    //     </button>
    // );



