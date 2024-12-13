import { IAddress } from "./address";
import { ICompany } from "./company";

export interface ICustomer {
    id: number;
    name: string;
    username: string;
    email: string;
    address: IAddress;
    phone: string;
    website: string;
    company: ICompany;      
} 

export type ICustomers = ICustomer[];