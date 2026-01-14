import { PersonInterface } from "./person.interface";

export interface UserInterface{
id: number;
personId: number;

username: string;
password: string;

createdAt: string;
createdById: number;

updatedAt: string;
updatedById: number;

person: PersonInterface;

createdBy: UserInterface;
updatedBy: UserInterface;
}