export interface PersonInterface{
    id: number;
    lastname: string;
    firstname: string;
    gender: string;
    birthDate: string;
    birthPlace: string;
    phone: string;
    email?: string;
    nin?: string;
    drivingLicenceNo?: string;
}

/**
person: {
    id: 1,
    lastname: "",
    firstname: "",
    gender: "",
    birthDate: new Date("2000-07-24"),
    birthPlace: "",
    phone: "",
    email: "",
    nin: "",
    drivingLicenceNo: "",
}
 */