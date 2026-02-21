import { DatePipe } from "@angular/common";
import { PersonInterface } from "../interfaces/person.interface";

export class Person{

    private _id: number;
    private _lastname: string;
    private _firstname: string;
    private _gender: string;
    private _birthDate: Date;
    private _old: number = 0;
    private _birthPlace: string;
    private _phone: string;
    private _email: string;
    private _address: string;
    private _nin: string;
    private _drivingLicenceNo: string;
    
    constructor(id_: number, lastname_: string, firstname_: string, gender_: string, birthDate_: Date, birthPlace_: string, phone_: string, email_: string, address_: string, nin_: string, drivingLicenceNo_: string){
        this._id = id_;
        this._lastname = lastname_;
        this._firstname = firstname_;
        this._gender = gender_;
        this._birthDate = birthDate_;
        this._old = Person.oldCalculator(this._birthDate);
        this._birthPlace = birthPlace_;
        this._phone = phone_;
        this._email = email_;
        this._address = address_;
        this._nin = nin_;
        this._drivingLicenceNo = drivingLicenceNo_;
    }

    static buildEmpty(){
        return new Person(0, "", "", "", new Date("2000-07-24"), "", "", "", "", "", "");
    }

    //getter and setters

    public get id() { return this._id; }
    public get fullname() { return this._lastname + " " + this._firstname; }
    public get lastname() { return this._lastname; }
    public get firstname() { return this._firstname; }
    public get gender() { return this._gender; }
    public get birthDate() { return this._birthDate; }
    public get old() { return this._old; }
    public get birthPlace() { return this._birthPlace; }
    public get phone() { return this._phone; }
    public get email() { return this._email; }
    public get address() { return this._address; }
    public get nin() { return this._nin; }
    public get drivingLicenceNo() { return this._drivingLicenceNo; }

    public set id(id_: number) { this._id = id_; }
    public set lastname(lastname_: string) { this._lastname = lastname_; }
    public set firstname(firstname_: string) { this._firstname = firstname_; }
    public set gender(gender_: string) { this._gender = gender_; }
    public set birthDate(birthDate_: Date) { this._birthDate = birthDate_; }
    public set old(old_: number) { this._old = old_; }
    public set birthPlace(birthPlace_: string) { this._birthPlace = birthPlace_; }
    public set phone(phone_: string) { this._phone = phone_; }
    public set email(email: string) { this._email = email; }
    public set address(_address: string) { this._address = _address; }
    public set nin(nin: string) { this._nin = nin; }
    public set drivingLicenceNo(drivingLicenceNo: string) { this._drivingLicenceNo = drivingLicenceNo; }

    private static oldCalculator(birthdate: Date){
        const today = new Date();
        const age = today.getFullYear() - birthdate.getFullYear();
        const m = today.getMonth() - birthdate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthdate.getDate())) {
            return age - 1;
        } else {
            return age;
        }
    }

    toJson(){
        const datePipe = new DatePipe('en-US');
        const birthDateString = datePipe.transform(this._birthDate, 'yyyy-MM-dd')!;
        
        return {
            id: this._id,
            lastName: this._lastname,
            firstName: this._firstname,
            gender: this._gender,
            birthDate: birthDateString,
            birthPlace: this._birthPlace,
            phone: this._phone,
            email: this._email,
            address: this._address,
            nin: this._nin,
            drivingLicenceNo: this._drivingLicenceNo
        };
    }

    static fromJson(json: any){
        const person = Person.buildEmpty();

        person.id = json.id;
        person.lastname = json.lastname;
        person.firstname = json.firstname;
        person.gender = json.gender;
        person.birthDate = new Date(json.birthDate);
        person.old = this.oldCalculator(person.birthDate);
        person.birthPlace = json.birthPlace;
        person.phone = json.phone;
        person.address = json.address;
        person.email = json.email ? json.email : '';

        person.nin = json.nin ? json.nin : '';
        person.drivingLicenceNo = json.drivingLicenceNo ? json.drivingLicenceNo : '';

        return person;
    }

    static fromOraJson(json: any){
        const person = Person.buildEmpty();

        person.id = 0;
        person.lastname = json.nom;
        person.firstname = json.pren;
        person.gender = json.sexe ? json.sexe.toLowerCase() : '';
        person.birthDate = json.daten ? new Date(json.daten) : new Date("0000-01-01");
        person.old = this.oldCalculator(person.birthDate);
        person.birthPlace = json.lieun;
        person.phone = json.tport;
        person.address = json.ad1;
        person.email = json.email;

        person.nin = json.nin ? json.nin : '';
        person.drivingLicenceNo = json.drivingLicenceNo ? json.drivingLicenceNo : '';

        return person;
    }

    
}