import { signal } from "@angular/core";
import { AddressInterface } from "../interfaces/address.interface";
import * as data from "../../assets/json/struct.json"

export class AddressService{

    private addresses = signal<AddressInterface[]>((data as any).default.addresses);
    public $addresses = this.addresses.asReadonly();

    loadAddress(address: AddressInterface[]){
        this.addresses.set(address);
    }

    search(term: string){
        return this.addresses().filter(value => value.province.toLowerCase().startsWith(term.toLowerCase()));
    }

    searchGood(term: string) {
        return this.addresses().filter(obj =>
            obj.localites.some(loc =>
                loc.nom.toLowerCase().includes(term.toLowerCase())
            )
        );
    }

}