/**
 * A model for an individual corporate employee
 */
export class CorporateEmployee {
    id: string;
    name: string;
    gender: string;
    company: string;
    age: number;

    constructor(id: string, name: string, gender: string, company: string, age: number){
        this.id = id;
        this.name = name;
        this.gender = gender;
        this.company = company;
        this.age = age;
    }
}
