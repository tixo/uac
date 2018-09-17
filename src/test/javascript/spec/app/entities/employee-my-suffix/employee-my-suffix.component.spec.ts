/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UacTestModule } from '../../../test.module';
import { EmployeeMySuffixComponent } from 'app/entities/employee-my-suffix/employee-my-suffix.component';
import { EmployeeMySuffixService } from 'app/entities/employee-my-suffix/employee-my-suffix.service';
import { EmployeeMySuffix } from 'app/shared/model/employee-my-suffix.model';

describe('Component Tests', () => {
    describe('EmployeeMySuffix Management Component', () => {
        let comp: EmployeeMySuffixComponent;
        let fixture: ComponentFixture<EmployeeMySuffixComponent>;
        let service: EmployeeMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [UacTestModule],
                declarations: [EmployeeMySuffixComponent],
                providers: []
            })
                .overrideTemplate(EmployeeMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(EmployeeMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(EmployeeMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new EmployeeMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.employees[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
