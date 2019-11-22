import {IVisitor} from "../interfaces/IVisitor";

export class Visitor implements IVisitor {
    passId: number;
    name?: string;
    surname?: string;
    isoDate: string;

    constructor(visitor?: IVisitor) {
        this.passId = visitor.passId;
        this.name = visitor.name;
        this.surname = visitor.surname;
        this.isoDate = visitor.isoDate;
    }
}
