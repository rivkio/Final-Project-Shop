export type IImage = {
    url?: string;
};

//types for variant
export type IVariant = {
    _id?: string;
    size: string;
    quantity: number;
    price: number;
};

export type IProductInput = {
    productName: string;
    subtitle: string;
    productDescription: string;
    image: IImage;
    alt: string;
    sizes: string[];
    barcode: number;
    variants: IVariant[];
    // price: number;
    // color: string;
    // model: string;
    // category: string;
};

export type IProduct = IProductInput & {
    _id: string;
    createdAt: Date;
    shoppingCart: string[];
    quantity: number;
    sold: number;
    userId: string;
};


// export type ICartProduct = {
//     productId: string;
//     title: string;
//     price: number;
//     size: string;
// };


export interface ICartItem {
    productId: string;
    variantId: string;
    productName: string;
    price: number;
    size: string;
    quantity: number;
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
    addToCart: (productId: string, variantId: string, quantity: number, size: string, price: number) => Promise<void>;
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
};

interface AddToCartButtonProps {
    productId: string;
    variants: IVariant[];
    productName: string;
    image: IImage;
};

// // טיפוס עבור עדכון פרטי משתמש
// export type updateUserType = {
//     name: IName;
//     phone: string;
//     address: IAddress;
// };