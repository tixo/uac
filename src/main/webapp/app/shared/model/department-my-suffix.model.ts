import { ICompanyMySuffix } from 'app/shared/model//company-my-suffix.model';
import { IEmployeeMySuffix } from 'app/shared/model//employee-my-suffix.model';

export interface IDepartmentMySuffix {
    id?: number;
    name?: string;
    company?: ICompanyMySuffix;
    emps?: IEmployeeMySuffix[];
}

export class DepartmentMySuffix implements IDepartmentMySuffix {
    constructor(public id?: number, public name?: string, public company?: ICompanyMySuffix, public emps?: IEmployeeMySuffix[]) {}
}
