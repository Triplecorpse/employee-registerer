import {IStudent} from "../interfaces/IStudent";

export class Student implements IStudent {
    passId: number;
    name: string;
    surname: string;

    constructor(student?: IStudent) {
        this.passId = student.passId;
        this.name = student.name;
        this.surname = student.surname;
    }
}
