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
    _id: string;
    createdAt: Date;
    isAdmin: boolean;
    cart: ICartProduct[];
};

export type ILogin = {
    email: string;
    password: string;
};

export type IJWTPayload = {
    _id: string;
    isAdmin: boolean;
    // isBusiness: boolean;
};

export interface AuthContextProviderProps {
    children: ReactNode;
};

export interface AuthContextType {
    token: string | null;
    user: IUser | undefined;
    isLoggedIn: boolean;
    login: (email: string, password: string) => Promise<void>
    register: (form: IUser) => Promise<void>
    logout: () => void;
    onUpdateUser: (user: IUser) => void;
};

export type ErrorType = {
    status: number;
    message: string;
    details: string;
};

export interface DecodedToken {
    _id: string;
    isAdmin: boolean
};

interface SearchContextType {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
};

export type FCC = ({ children }: { children: ReactNode }) => ReactNode;


export type updateUserType = {
    name: {
        first: string;
        middle: string;
        last: string;
    };
    phone: string;
    image: {
        url: string;
        alt: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
};