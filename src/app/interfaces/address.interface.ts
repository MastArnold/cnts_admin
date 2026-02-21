export interface AddressInterface{
    province: string;
    localites: {
        nom: string;
        postal: string;
    }[];
}