import { PersonAddComponent } from './person-add.component';

import { PersonSearchService } from '../person-search/person-search.service';
import { Person } from '../person-search/person';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';

describe('PersonAddComponent',
() => {
    let comp: PersonAddComponent;
    let fixture: ComponentFixture<PersonAddComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
                imports: [
                    FormsModule,
                    HttpModule
                ],
                providers: [
                    PersonSearchService
                ],
                declarations: [PersonAddComponent]
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PersonAddComponent);
        comp = fixture.componentInstance;
    });

    it('should create component', () => expect(comp).toBeDefined());

    describe('Show function',
    () => {
        it('Sets showModal',
        () => {
            comp.show();
            expect(comp.showModal).toBe(true);
        });
    });

    describe('Hide function',
    () => {
        it('Sets showModal',
        () => {
            comp.hide();
            expect(comp.showModal).toBe(false);
        });
    });

    describe('OnSubmit function',
    () => {

        const e = new Event('submit');

        beforeEach(() => {
            const rst = new Observable<Person[]>();

            spyOn(comp.personService, 'create')
                .and.callFake((term: any) => {
                    return rst.toPromise();
                });
        });

        it('preventDefault called',
        () => {
            spyOn(e, 'preventDefault');
            comp.onSubmit(e);
            expect(e.preventDefault).toHaveBeenCalled();
        });

        it('service called',
        () => {
            comp.onSubmit(e);
            expect(comp.personService.create).toHaveBeenCalled();
        });

        it('service called with person',
        () => {
            const person = new Person();
            comp.person = person;
            comp.onSubmit(e);
            expect(comp.personService.create['calls'].argsFor(0)[0]).toBe(person);
        });
    });

    describe('ShowSuccessBtn function',
    () => {
        it('Sets showSuccess',
        () => {
            comp.showSuccessBtn();
            expect(comp.showSuccess).toBe(true);
        });
    });

    describe('ShowErrorBtn function',
    () => {
        it('Sets showError',
        () => {
            comp.showErrorBtn();
            expect(comp.showError).toBe(true);
        });
    });
});
