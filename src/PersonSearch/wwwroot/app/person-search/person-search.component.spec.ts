import { PersonSearchComponent } from './person-search.component';
import { PersonAddComponent } from '../person-add/person-add.component';
import { Person } from './person';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';

describe('PersonSearchComponent',
() => {
    let comp: PersonSearchComponent;
    let fixture: ComponentFixture<PersonSearchComponent>;

    const term = 'test';

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                imports: [
                    FormsModule,
                    HttpModule
                ],
                declarations: [PersonSearchComponent, PersonAddComponent]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonSearchComponent);
        comp = fixture.componentInstance;
        const rst = new Observable<Person[]>();

        spyOn(comp.personService, 'search')
            .and.callFake(() => {
                return rst.toPromise();
            });
    });

    it('should create component', () => expect(comp).toBeDefined());

    it('should instantiate the Observables',
    () => {
        expect(comp.persons).not.toBeDefined();
        spyOn(comp.searchTerms, 'subscribe');
        comp.ngOnInit();
        expect(comp.persons).toBeDefined();
        expect(comp.searchTerms.subscribe).toHaveBeenCalled();
    });

    it('should call search service',
    (done) => {
        comp.ngOnInit();

        comp.persons.subscribe(() => {
            expect(comp.personService.search).toHaveBeenCalled();
            done();
        });
        comp.search(term);
    });

    it('should call service with right term',
    (done) => {
        spyOn(comp, 'callSearchService');

        comp.ngOnInit();

        comp.persons.subscribe(() => {
            expect(comp.callSearchService['calls'].argsFor(0)[0]).toBe(term);
            done();
        });

        comp.search(term);
    });

    it('should prevent multiple calls to the service',
    (done) => {
        comp.ngOnInit();

        comp.persons.subscribe(() => {
            expect(comp.personService.search['calls'].argsFor(0)[0]).toBe(term);
            done();
        });

        comp.search('term1');
        comp.search('term2');
        comp.search('term3');
        comp.search(term);
    });

    it('should hide loading mask',
    (done) => {
        comp.ngOnInit();

        comp.persons.subscribe(() => {
            expect(comp.showLoadingMask).toBe(true);
            done();
        });

        comp.search(term);
    });
});
