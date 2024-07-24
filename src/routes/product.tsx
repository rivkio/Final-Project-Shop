import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById } from '../services/products';
import { IProduct } from '../@types/productType';
import './product.scss';
import AddToCartButton from '../components/AddToCartButton/AddToCartButton';
import { Accordion } from 'flowbite-react';
import cart from '../services/cart';

const Product = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<IProduct>();
    const [selectedSize, setSelectedSize] = useState<string>(''); // מידה ברירת מחדל ריקה
    const navigate = useNavigate();

    useEffect(() => {
        getProductById(id || "")
            .then(res => {
                setProduct(res.data);
                setSelectedSize(res.data.sizes[0]); // להגדיר את המידה הראשונה כמידה ברירת מחדל
            })
            .catch(err => console.log(err));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    const originalPrice = Math.ceil(product.price * 1.2 / 10) * 10;

    const handleAddToCartAndRedirect = async () => {
        try {
            await cart.addProductToCart(product._id, 1, selectedSize);
            navigate('/cart');
        } catch (error) {
            console.error('Failed to add product to cart.', error);
        }
    };

    return (
        <div className="product-page">
            <div className="product-image-container">
                <img className="product-image" src={product.image.url} alt={product.alt} />
                <div className="additional-images">
                    <img src={product.image.url} alt={product.alt} className="additional-image" />
                    <img src={product.image.url} alt={product.alt} className="additional-image" />
                    <img src={product.image.url} alt={product.alt} className="additional-image" />
                </div>
            </div>
            <div className="product-details">
                <h1 className="product-title">{product.productName}</h1>
                <h2 className="product-subtitle">{product.subtitle}</h2>
                <h3 className="product-description">{product.productDescription}</h3>

                <div className="product-price-container">
                    <span className="price-label">Original Price:</span>
                    <span className="original-price">${originalPrice.toFixed(2)}</span>
                </div>
                <div className="product-price-container">
                    <span className="price-label">Discounted Price:</span>
                    <span className="discounted-price">${product.price.toFixed(2)}</span>
                </div>

                <div className="size-buttons-container">
                    {product.sizes.map((size) => (
                        <button
                            key={size}
                            className={`size-button ${selectedSize === size ? 'selected' : ''}`}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>

                <div className="buttons-container">
                    <AddToCartButton
                        productId={product._id}
                        productName={product.productName}
                        size={selectedSize}
                        price={product.price}
                        image={product.image.url || ""}
                        onAdd={() => console.log("Product added to cart")}
                    />
                    <button className="consult-expert-button" onClick={handleAddToCartAndRedirect}>Buy Now</button>
                </div>
                <Accordion>
                    <Accordion.Panel>
                        <Accordion.Title>Description</Accordion.Title>
                        <Accordion.Content>
                            <p>{product.productDescription}</p>
                        </Accordion.Content>
                    </Accordion.Panel>
                    <Accordion.Panel>
                        <Accordion.Title>Shipping Info</Accordion.Title>
                        <Accordion.Content>
                            <p>Ships by: <strong>Wednesday, July 24</strong></p>
                            <p>Free Fast Shipping</p>
                            <p>Free Overnight Shipping, Hassle-Free Returns</p>
                        </Accordion.Content>
                    </Accordion.Panel>
                </Accordion>
            </div>
        </div>
    );
};

export default Product;