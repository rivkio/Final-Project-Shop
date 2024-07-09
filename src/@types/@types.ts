import { ReactNode } from "react";

export type IName = {
    first: string;
    middle?: string;
    last: string;
};

export type IAddress = {
    street: string;
    city: string;
    state?: string;
    country: string;
    houseNumber: number;
    zip?: string;
};

export type IImage = {
    alt: string;
    url: string;
};

export type RegisterUser = {
    name: IName;
    phone: string;
    email: string;
    password: string;
    address: IAddress;
};

export type IUserInput = {
    name: IName;
    phone: string;
    email: string;
    password: string;
    image?: IImage;
    address: IAddress;
};

export type IUser = IUserInput & {
    createdAt: Date;
    isAdmin: boolean;
    cart: ICartProduct[];
};

// export type User = {
//     _id: string
//     isBusiness: boolean
//     email: string
//     name: {
//         first: string
//         middle: string
//         last: string
//     },
//     phone: string
//     address: {
//         street: string
//         city: string
//         state: string
//         zip?: string
//     }
// }

export type ICartProduct = {
    productId: string;
    productName: string;
    price: number;
    size: string;
};

export type ILogin = {
    email: string;
    password: string;
};

export type IJWTPayload = {
    _id: string;
    isAdmin: boolean;
    isBusiness: boolean;
};


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

export type UpdateProduct ={
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
}


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

export interface AuthContextProviderProps {
    children: ReactNode;
}

export interface AuthContextType {
    token: string | null;
    user: IUser | undefined;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>
    register: (form: IUser) => Promise<void>
    logout: () => void;
}

// טיפוס לפונקציה שמקבלת ילדים ומחזירה אלמנט של ראקט
export type FCC = ({ children }: { children: ReactNode }) => ReactNode;