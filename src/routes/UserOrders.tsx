import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { IOrder } from '../@types/productType';
import './OrderConfirmation.scss';
import { useAuth } from '../hooks/useAuth';
import { FiX } from 'react-icons/fi';
import orderService from '../services/order';
import { useSearch } from '../hooks/useSearch';


const UserOrders = () => {
    const [orders, setOrders] = useState<IOrder[]>([]);
    const { user } = useAuth();
    const { searchTerm } = useSearch();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                if (user) {
                    const res = await orderService.getOrdersByUser(user._id);
                    setOrders(res.data);
                }
            } catch (err) {
                console.error('Error fetching orders:', err);
            }
        };

        fetchOrders();
    }, [user]);

    const filteredUserOrders = orders.filter(userOrders =>
        userOrders.orderNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (orders.length === 0) {
        return (
            <div className="empty-orders-page flex flex-col items-center justify-center text-green-500">
                <h2 className="text-2xl font-semibold mb-4">Your orders list is empty</h2>
                <p className="text-lg mb-4">Should we start shopping?</p>
                <Link to="/" className="back-to-shopping text-green-400 hover:underline flex items-center">
                    <FiX className="mr-2" />
                    Back to Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="order-confirmation-page">
            <h1 className="order-title">Order Confirmation</h1>
            {filteredUserOrders.map(order => (
                <div key={order._id} className="order-details-container">
                    <h2 className="order-title">Order #{order.orderNumber}</h2>
                    <div className="order-summary">
                        {order.status === 'cancelled' && (
                            <p className="order-cancelled-message text-red-500">Order cancelled</p>
                        )}
                        {order.products.map((product, index) => (
                            <div key={`${product.productId}-${index}`} className="order-item">
                                <span className="item-title">{product.productName}</span>
                                <span className="item-size">Size: {product.size}</span>
                                <span className="item-price">Price: ${(product.price * product.quantity).toFixed(2)}</span>
                                <span className="item-quantity">Quantity: {product.quantity}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserOrders;

