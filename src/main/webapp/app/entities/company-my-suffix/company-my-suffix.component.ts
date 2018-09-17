import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ICompanyMySuffix } from 'app/shared/model/company-my-suffix.model';
import { Principal } from 'app/core';
import { CompanyMySuffixService } from './company-my-suffix.service';

@Component({
    selector: 'jhi-company-my-suffix',
    templateUrl: './company-my-suffix.component.html'
})
export class CompanyMySuffixComponent implements OnInit, OnDestroy {
    companies: ICompanyMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private companyService: CompanyMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {}

    loadAll() {
        this.companyService.query().subscribe(
            (res: HttpResponse<ICompanyMySuffix[]>) => {
                this.companies = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInCompanies();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ICompanyMySuffix) {
        return item.id;
    }

    registerChangeInCompanies() {
        this.eventSubscriber = this.eventManager.subscribe('companyListModification', response => this.loadAll());
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
