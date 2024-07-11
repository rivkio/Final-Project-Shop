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
    name: {
        first: string;
        middle?: string;
        last: string;
    };
    phone: string;
    email: string;
    password: string;
    image?: {
        url: string;
        alt?: string;
    };
    address: {
        state?: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
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
    id: string;
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


export type ILogin = {
    email: string;
    password: string;
};

export type IJWTPayload = {
    _id: string;
    isAdmin: boolean;
    // isBusiness: boolean;
};


// export type UpdateProduct ={
//     productName: string;
//     subtitle: string;
//     productDescription: string;
//     price: number;
//     color: string[];
//     sizes: number[];
//     model: string;
//     web: string;
//     image: IImage;
//     category: string;
//     quantity: number;
//     barcode: number;
// }



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

export interface DecodedToken {
    _id: string;
    // ניתן להוסיף כאן שדות נוספים מהטוקן לפי הצורך
}