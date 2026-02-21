import { inject, Injectable, signal } from "@angular/core";
import { Donor } from "../models/donor.model";
import { ApiService } from "./api.service";
import { SpringPageable } from "../interfaces/spring-pageable.interface";
import { Person } from "../models/person.model";
import { DatePipe } from "@angular/common";

@Injectable()
export class DonorService{

    private api = inject(ApiService);

    LEGACY_ENDPOINT = 'oraid';
    DONOR_ENDPOINT = 'donors';

    private donors = signal<Donor[]>([]);
    public $donors = this.donors.asReadonly();

    private formPreload = signal<{
        fullname: string;
        birthdate: string;
        phone?: string;
        nin?: string;
    }>({
        fullname: "",
        birthdate: ""
    });

    loadDonors(page: number = 1){
        this.api.get(this.LEGACY_ENDPOINT + `?page=${page}`).subscribe(
            (response) => {
                const pageable = response as SpringPageable;
                const list: Donor[] = [];
                pageable.content.forEach((element: any, index: number) => {
                    list.push(Donor.fromOraJson(element)); 
                });

                this.donors.set(list);
            }, 
            (error) => {
                console.log(error);
            }
        );
    }

    getFormPreload(){
        return this.formPreload.asReadonly();
    }

    setFormPreload(form: {
        fullname: string;
        birthdate: string;
        phone?: string;
        nin?: string;
    }){
        this.formPreload.set(form);
    }

    cleanFormPreload(){
        this.formPreload.set({
            fullname: "",
            birthdate: "",
            phone: "",
            nin: ""
        });
    }

    //

    getById(id: number){
        new Promise<Donor>((resolve, reject)=>{
            this.api.get(this.LEGACY_ENDPOINT + `/${id}`).subscribe(
                (response) => {
                    resolve(response as Donor);
                }, 
                (error) => {
                    reject(error);
                }
            );
        });
    }

    getByDonorNo(donorNo: string) {
        return new Promise<Donor>((resolve, reject)=>{
            this.api.get(this.LEGACY_ENDPOINT + `/donor/${donorNo}`).subscribe(
                (response) => {
                    if(!response) reject("Aucune donnée trouvée !");

                    resolve(Donor.fromOraJson(response));
                }, 
                (error) => {
                    console.log(error);
                    reject(error);
                }
            );
        });
    }

    getByInfo(lastname: string, firstname: string, birthdate: Date){
        const datePipe = new DatePipe('en-US');
        const birthDateString = datePipe.transform(birthdate, 'yyyy-MM-dd')!;

        return new Promise<Donor>((resolve, reject)=>{
            this.api.post(this.LEGACY_ENDPOINT + '/donor/search', {
                lastname: lastname, 
                firstname: firstname, 
                birthdate: birthDateString
            }).subscribe(
                (response: any) => {
                    if(!response) reject({
                        status: 404,
                        message: "Donneur introuvable !"
                    });
                    
                    resolve(Donor.fromOraJson(response));
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

    storeLegacy(donor: Donor){
        return new Promise<Donor>((resolve, reject)=>{
            this.api.post(this.LEGACY_ENDPOINT, donor.toJson()).subscribe(
                (response) => {
                    if(!response) reject("Aucune donnée trouvée !");

                    const donorSaved = Donor.fromOraJson(response);

                    if(donorSaved.donorNo == null) reject("Enregistrement échoué !");
                    
                    resolve(donorSaved);
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    updateLegacy(donor: Donor){
        console.log(donor.toJson());
        return new Promise<Donor>((resolve, reject)=>{
            this.api.put(this.LEGACY_ENDPOINT, donor.toJson()).subscribe(
                (response)=>{
                    if(!response) reject("Aucune donnée trouvée !");

                    const donorSaved = Donor.fromOraJson(response);

                    if(donorSaved.donorNo == null) reject("Mise à jour échouée !");
                    
                    resolve(donorSaved);
                },
                (error) => {
                    reject(error);
                }
            )
        })
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