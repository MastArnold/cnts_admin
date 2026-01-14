import { CenterInterface } from "../center.interface";
import { PersonInterface } from "../person.interface";
import { UserInterface } from "../user.interface";

export interface DonorInterface{
    id: number;
    centerId?: number;
    personId: number;
    donorNo: string;
    lastDonation?: string;
    bloodType: string;
    eligible: boolean;
    mother?: string;
    father?: string;
    qualityCode?: string;
    protocol?: string;

    createdAt?: string;
    createdById?: number;

    updatedAt?: string;
    updatedById?: number;

    createdBy?: UserInterface;
    updatedBy?: UserInterface;

    center?: CenterInterface;
    person?: PersonInterface;
}