import { PersonSearchComponent } from './person-search.component';
import { PersonAddComponent } from '../person-add/person-add.component';
import { PersonSearchService } from './person-search.service';
import { Person } from './person';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';

describe('AppComponent',
    function() {
        let comp: PersonSearchComponent;
        let fixture: ComponentFixture<PersonSearchComponent>;

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
            var rst = new Observable<Person[]>();

            spyOn(comp.personService, "search").and.callFake((term: any) => {
                console.log('fake called', term);
                return rst.toPromise();
            });
        });

        it('should create component', () => expect(comp).toBeDefined());

        it('should instantiate the Observables', () => {
            expect(comp.persons).not.toBeDefined();
            spyOn(comp.searchTerms,'subscribe');
            comp.ngOnInit();
            expect(comp.persons).toBeDefined();
            expect(comp.searchTerms.subscribe).toHaveBeenCalled();
        });

        it('should call search service', (done) => {
            const term = "test";
            comp.ngOnInit();

            comp.persons.subscribe(() => {
                expect(comp.personService.search).toHaveBeenCalled();
                done();
            });
            comp.search(term);
        });

        it('should call service with right term', (done) => {
            const term = "test";
            spyOn(comp, 'callSearchService');

            comp.ngOnInit();

            comp.persons.subscribe(() => {
                expect(comp.callSearchService["calls"].argsFor(0)[0]).toBe(term);
                done();
            });

            comp.search(term);
        });

        it('should prevent multiple calls to the service', (done) => {
            const term = "test";
            comp.ngOnInit();

            comp.persons.subscribe(() => {
                expect(comp.personService.search["calls"].argsFor(0)[0]).toBe(term);
                done();
            });

            comp.search("term1");
            comp.search("term2");
            comp.search("term3");
            comp.search(term);
        });

        it('should hide loading mask', (done) => {
            const term = "test";
            comp.ngOnInit();

            comp.persons.subscribe(() => {
                expect(comp.showLoadingMask).toBe(true);
                done();
            });

            comp.search(term);
        });
    });