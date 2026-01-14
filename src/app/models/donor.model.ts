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

    build(_id: number, _personId: number, _donorNo: string, _bloodType: string, _eligible: boolean, _mother: string, _father: string, _person: Person){
        this._id = _id;
        this._personId =  _personId;
        this._donorNo = _donorNo;
        this._bloodType = _bloodType;
        this._eligible = _eligible;
        this._mother = _mother;
        this._father = _father;
        this._person = _person;

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
            father: this._father
        }
    }

    static fromJson(json: any){
        const donor = new Donor();
        donor._id = json.id;
        donor._personId = json.personId;
        donor._centerId = json.centerId;
        donor._donorNo = json.donorNo;
        donor._lastDonation = new Date(json.lastDonation!);
        donor._bloodType = json.bloodType;
        donor._eligible = json.eligible;
        donor._mother = json.mother;
        donor._father = json.father;

        donor._person = Person.fromJson(json.person!);

        return donor;
    }

}