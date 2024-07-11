
export type IProductInput = {
    productName: string;
    subtitle: string;
    productDescription: string;
    price: number;
    color: string[];
    sizes: number[];
    model: string;
    web: string;
    image: IImage;
    category: string;
    quantity: number;
    barcode: number;
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
    productName: string;
    price: number;
    size: string;
};


export type IOrderProduct = {
    productId: string;
    quantity: number;
    size: string;
};

export type IOrder = {
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