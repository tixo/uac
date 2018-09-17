import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { UacEmployeeMySuffixModule } from './employee-my-suffix/employee-my-suffix.module';
import { UacCompanyMySuffixModule } from './company-my-suffix/company-my-suffix.module';
import { UacDepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        UacEmployeeMySuffixModule,
        UacCompanyMySuffixModule,
        UacDepartmentMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class UacEntityModule {}
