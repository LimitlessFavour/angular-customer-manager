import { ICustomer } from "./customer";

export interface SearchCriteria {
    searchTerm: string;
    searchBy: keyof ICustomer;
}