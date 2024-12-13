import { IGeoLocation } from './geo_location.';

export interface IAddress {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: IGeoLocation;
} 