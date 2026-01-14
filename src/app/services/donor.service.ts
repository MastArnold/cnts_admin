import { inject, Injectable, signal } from "@angular/core";
import { Donor } from "../models/donor.model";
import { ApiService } from "./api.service";
import { SpringPageable } from "../interfaces/spring-pageable.interface";
import { Person } from "../models/person.model";
import { DatePipe } from "@angular/common";

@Injectable()
export class DonorService{

    private api = inject(ApiService);

    DONOR_ENDPOINT = 'oraid';

    private donors = signal<Donor[]>([]);
    public $donors = this.donors.asReadonly();

    loadDonors(page: number = 1){
        this.api.get(this.DONOR_ENDPOINT + `?page=${page}`).subscribe(
            (response) => {
                const pageable = response as SpringPageable;
                const list: Donor[] = [];
                pageable.content.forEach((element: any, index: number) => {
                    const person = new Person(
                        index, 
                        element.nom, 
                        element.pren, 
                        element.sexe ? element.sexe.trim().toLowerCase() : "", 
                        element.daten ? new Date(element.daten) : new Date("0001-01-01"), 
                        element.lieun, 
                        element.tport, 
                        element.email, 
                        element.ad1, 
                        '', 
                        ''
                    );
                    
                    list.push(new Donor().build(
                        index,
                        person.id,
                        element.cb,
                        element.groupe ? element.groupe.trim() : "",
                        true,
                        '',
                        '',
                        person
                    )); 
                });

                this.donors.set(list);
            }, 
            (error) => {
                console.log(error);
            }
        );
    }

    getById(id: number){
        new Promise<Donor>((resolve, reject)=>{
            this.api.get(this.DONOR_ENDPOINT + `/${id}`).subscribe(
                (response) => {
                    resolve(response as Donor);
                }, 
                (error) => {
                    reject(error);
                }
            );
        });
    }

    getByInfo(lastname: string, firstname: string, birthdate: Date){
        const datePipe = new DatePipe('en-US');
        const birthDateString = datePipe.transform(birthdate, 'yyyy-MM-dd')!;

        return new Promise<Donor>((resolve, reject)=>{
            this.api.post(this.DONOR_ENDPOINT + '/donor/search', {
                lastname: lastname, 
                firstname: firstname, 
                birthdate: birthDateString
            }).subscribe(
                (response: any) => {
                    if(!response) reject("Donneur Introuvable !");

                    const person = new Person(
                        0, 
                        response.nom, 
                        response.pren, 
                        response.sexe ? response.sexe.trim().toLowerCase() : "", 
                        response.daten ? new Date(response.daten) : new Date("0001-01-01"), 
                        response.lieun, 
                        response.tport,
                        response.email, 
                        response.ad1,
                        '', 
                        ''
                    );
                    
                    const donor = new Donor().build(
                        0,
                        person.id,
                        response.cb,
                        response.groupe ? response.groupe.trim() : "",
                        true,
                        '',
                        '',
                        person
                    );

                    donor.createdAt = response.dcreation ? new Date(response.dcreation) : undefined;
                    donor.updatedAt = response.ts ? new Date(response.ts) : undefined;
                    
                    resolve(donor);
                }, 
                (error) => {
                    reject(error);
                }
            );
        });
    }

    search(term: string){
        //return this.donors().filter((value) => (value.person?.lastname+value.person.firstname).startsWith(term));
    }

    view(id: number){

    }

    store(){

    }

    update(){

    }

    toTrash(){

    }

    fromTrash(){

    }

    delete(){

    }

}