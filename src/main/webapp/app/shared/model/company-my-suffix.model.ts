import { IDepartmentMySuffix } from 'app/shared/model//department-my-suffix.model';

export interface ICompanyMySuffix {
    id?: number;
    name?: string;
    depts?: IDepartmentMySuffix[];
}

export class CompanyMySuffix implements ICompanyMySuffix {
    constructor(public id?: number, public name?: string, public depts?: IDepartmentMySuffix[]) {}
}
