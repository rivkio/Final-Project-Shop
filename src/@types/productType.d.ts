export type IImage = {
    url?: string;
    // alt: string;
};

export type IProductInput = {
    productName: string;
    subtitle: string;
    productDescription: string;
    price: number;
    color: string;
    sizes: string[];
    model: string;
    image: IImage;
    alt: string;
    category: string;
    quantity: number;
};


export type IProduct = IProductInput & {
    _id: string;
    barcode: number;
    createdAt: Date;
    shoppingCart: string[];
    quantity: number;
    sold: number;
    userId: string;
};


export type ICartProduct = {
    productId: string;
    title: string;
    price: number;
    size: string;
};


export interface ICartItem {
    _id: string;
    productId: string;
    quantity: number;
    productName: string;
    price: number;
    size: string;
    image: IImage;
};

export interface ICart extends Document {
    userId: string;
    items: ICartItem[];
};

export interface ICartWithTotals extends ICart {
    totalQuantity: number;
    totalPrice: number;
};

export interface CartContextProps {
    cart: ICartWithTotals | null;
    setCart: Dispatch<SetStateAction<ICartWithTotals | null>>;
    fetchCart: () => void;
};

export type IOrderProduct = {
    productId: string;
    quantity: number;
    size: string;
    productName: string;
    price: number;
};

export type IOrder = {
    _id: string;
    userId: string;
    products: IOrderProduct[];
    totalAmount: number;
    status: string;
    createdAt: Date;
    orderNumber: string;
};


export interface SalesByDateQuery {
    startDate: string;
    endDate: string;
}