/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { UacTestModule } from '../../../test.module';
import { CompanyMySuffixComponent } from 'app/entities/company-my-suffix/company-my-suffix.component';
import { CompanyMySuffixService } from 'app/entities/company-my-suffix/company-my-suffix.service';
import { CompanyMySuffix } from 'app/shared/model/company-my-suffix.model';

describe('Component Tests', () => {
    describe('CompanyMySuffix Management Component', () => {
        let comp: CompanyMySuffixComponent;
        let fixture: ComponentFixture<CompanyMySuffixComponent>;
        let service: CompanyMySuffixService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [UacTestModule],
                declarations: [CompanyMySuffixComponent],
                providers: []
            })
                .overrideTemplate(CompanyMySuffixComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(CompanyMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CompanyMySuffixService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new CompanyMySuffix(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.companies[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
