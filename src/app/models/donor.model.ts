import { CenterInterface } from "../interfaces/center.interface";
import { DonorInterface } from "../interfaces/donor/donor.interface";
import { PersonInterface } from "../interfaces/person.interface";
import { UserInterface } from "../interfaces/user.interface";
import { Person } from "./person.model";

export class Donor{
    private _id: number;
    private _personId: number;
    private _centerId?: number;
    private _donorNo: string;
    private _lastDonation?: Date;
    private _bloodType: string;
    private _eligible: boolean;
    private _mother?: string;
    private _father?: string;
    private _civilQuality?: string;
    private _marital?: string;

    private _createdAt?: Date;
    private _createdById?: number;
    private _updatedAt?: Date;
    private _updatedById?: number;
    private _createdBy?: UserInterface;
    private _updatedBy?: UserInterface;
    private _center?: CenterInterface;
    private _person: Person;
    
    constructor(){
        this._id = 0;
        this._personId = 0;
        this._donorNo = "";
        this._bloodType = "";
        this._eligible = false;
        this._mother = "";
        this._father = "";
        this._person = Person.buildEmpty();
    }

    build(_id: number, _personId: number, _donorNo: string, _bloodType: string, _eligible: boolean, _civilQuality: string, _person: Person){
        this._id = _id;
        this._personId =  _personId;
        this._donorNo = _donorNo;
        this._bloodType = _bloodType.trim().replaceAll(" ", "");
        this._eligible = _eligible;
        this._civilQuality = _civilQuality;
        this._marital = "";
        this._person = _person;

        return this;
    }

    buildParent(_mother: string, _father: string){
        this._mother = _mother;
        this._father = _father;
        
        return this;
    }

    //getter and setters

    public get id() { return this._id; }
    public get personId() { return this._personId; }
    public get centerId() { return this._centerId; }
    public get donorNo() { return this._donorNo; }
    public get lastDonation() { return this._lastDonation; }
    public get bloodType() { return this._bloodType; }
    public get eligible() { return this._eligible; }
    public get mother() { return this._mother; }
    public get father() { return this._father; }
    public get civilQuality() { return this._civilQuality; }
    public get marital() { return this._marital; }
    public get createdAt() { return this._createdAt; }
    public get createdById() { return this._createdById; }
    public get updatedAt() { return this._updatedAt; }
    public get updatedById() { return this._updatedById; }
    public get createdBy() { return this._createdBy; }
    public get updatedBy() { return this._updatedBy; }
    public get center() { return this._center; }
    public get person() { return this._person; }

    //setter
    public set id(id_: number) { this._id = id_; }
    public set personId(personId_: number) { this._personId = personId_; }
    public set centerId(centerId_: number|undefined) { this._centerId = centerId_; }
    public set donorNo(donorNo_: string) { this._donorNo = donorNo_; }
    public set lastDonation(lastDonation_: Date|undefined) { this._lastDonation = lastDonation_; }
    public set bloodType(bloodType_: string) { this._bloodType = bloodType_; }
    public set eligible(eligible_: boolean) { this._eligible = eligible_; }
    public set mother(mother_: string|undefined) { this._mother = mother_; }
    public set father(father_: string|undefined) { this._father = father_; }
    public set civilQuality(civilQuality_: string|undefined) { this._civilQuality = civilQuality_; }
    public set marital(marital_: string|undefined) { this._marital = marital_; }
    public set createdAt(createdAt_: Date|undefined) { this._createdAt = createdAt_; }
    public set createdById(createdById_: number|undefined) { this._createdById = createdById_; }
    public set updatedAt(updatedAt_: Date|undefined) { this._updatedAt = updatedAt_; }
    public set updatedById(updatedById_: number|undefined) { this._updatedById = updatedById_; }
    public set createdBy(createdBy_: UserInterface|undefined) { this._createdBy = createdBy_; }
    public set updatedBy(updatedBy_: UserInterface|undefined) { this._updatedBy = updatedBy_; }
    public set center(center_: CenterInterface|undefined) { this._center = center_; }
    public set person(person_: Person) { this._person = person_; }

    toJson(){
        return {
            id: this._id,
            personId: this._personId,
            centerId: this._centerId,
            donorNo: this._donorNo,
            lastDonation: this._lastDonation,
            bloodType: this._bloodType,
            eligible: this._eligible,
            mother: this._mother,
            father: this._father,
            civilQuality: this._civilQuality,
            marital: this._marital,
            person: this._person.toJson()
        }
    }

    static fromJson(json: any){
        const donor = new Donor();
        donor.id = json.id;
        donor.personId = json.personId;
        donor.centerId = json.centerId;
        donor.donorNo = json.donorNo;
        donor.lastDonation = new Date(json.lastDonation!);
        donor.bloodType = json.bloodType;
        donor.eligible = json.eligible;
        donor.mother = json.mother;
        donor.father = json.father;
        donor.civilQuality = json.quality;
        donor.marital = json.marital;

        donor.person = Person.fromJson(json.person!);

        return donor;
    }

    static fromOraJson(json: any){
        const donor = new Donor();
        donor.id = 0;
        donor.personId = 0;
        donor.centerId = 0;
        donor.donorNo = json.cb;
        donor.lastDonation = json.dated1 ? new Date(json.dated1) : undefined;
        donor.bloodType = json.groupe ? json.groupe.trim() : '';
        //donor.eligible = json.eligible;
        //donor.mother = json.mother;
        //donor.father = json.father;
        donor.civilQuality = json.qualite ? json.qualite.trim() : '';
        //donor.marital = json.marital;
        donor.createdAt = json.dcreation ? new Date(json.dcreation) : new Date("0000-01-01");
        donor.updatedAt = json.ts ? new Date(json.ts) : new Date("0000-01-01");

        donor.person = Person.fromOraJson(json);

        return donor;
    }

}