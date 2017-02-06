import { PersonSearchService } from './person-search.service';
import { Person } from './person';

import { async, TestBed, inject } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';

describe('PersonSearchService',
() => {
    let personSearchService: PersonSearchService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                PersonSearchService
            ]
        });
    });

    beforeEach(async(inject([PersonSearchService],
    (service: PersonSearchService) => {
        personSearchService = service;
    })));

    it('Should be defined',
    () => {
        expect(personSearchService).toBeDefined();
    });


    describe('Search person function',
    () => {
        it('Should call http get',
        () => {
            const url = './api/person?q=term';
            const term = 'term';
            const observable = new Observable<any>();

            spyOn(personSearchService.http, 'get')
                .and.callFake(() =>
                    observable
                );

            personSearchService.search(term);

            expect(personSearchService.http.get).toHaveBeenCalled();
            expect(personSearchService.http.get).toHaveBeenCalledWith(url);
        });

        it('Should call map',
        () => {
            const term = 'term';
            const observable = new Observable<any>();

            spyOn(personSearchService.http, 'get')
                .and.callFake(() =>
                    observable
                );

            spyOn(observable, 'map');

            personSearchService.search(term);

            expect(observable.map).toHaveBeenCalled();
        });
    });

    describe('Create person function',
    () => {

        it('Should call http post',
        () => {
            const url = './api/person';
            const observable = new Observable<any>();
            const person = new Person();
            person.firstName = 'Bob';
            person.lastName = 'McDonald';

            spyOn(personSearchService.http, 'post')
                .and.callFake(() =>
                    observable
                );

            personSearchService.create(person);

            expect(personSearchService.http.post).toHaveBeenCalled();
            expect(personSearchService.http.post['calls'].argsFor(0)[0]).toBe(url);
            expect(personSearchService.http.post['calls'].argsFor(0)[1]).toBe(JSON.stringify(person));
        });

        it('Should call as promise',
        () => {
            const observable = new Observable<any>();
            const person = new Person();
            person.firstName = 'Bob';
            person.lastName = 'McDonald';
            const promise = observable.toPromise();

            spyOn(personSearchService.http, 'post')
                .and.callFake(() =>
                    observable
                );
            spyOn(observable, 'toPromise')
                .and.callFake(() =>
                    promise
                );

            personSearchService.create(person);

            expect(observable.toPromise).toHaveBeenCalled();
        });
    });
});
