import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

// Observable class extensions
import 'rxjs/add/observable/of';

// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

import { PersonSearchService } from './person-search.service';
import { Person } from './person';

@Component({
    moduleId: module.id,
    selector: 'people-search-app',
    templateUrl: './person-search.component.html',
    styleUrls: ['./person-search.component.css'],
    providers: [PersonSearchService]
})
export class PersonSearchComponent implements OnInit {

    public persons: Observable<Person[]>;
    public searchTerms = new Subject<string>();
    public showLoadingMask = false;

    constructor(
        public personService: PersonSearchService
    ) { }

    search(term: string): void {
        this.searchTerms.next(term);
    }

    ngOnInit(): void {
        this.persons = this.searchTerms
            .debounceTime(300)        // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous

            .switchMap(term => term   // switch to new observable each time the term changes, unsubscribing from previous calls
                // return the http search observable
                ? this.callSearchService(term)
                // or the observable of empty persons if there was no search term
                : Observable.of<Person[]>([]))

            .catch(error => {
                console.log(error);
                return Observable.of<Person[]>([]);
            });

        this.persons.subscribe(() =>
            // this timeout simulates loading the data, it should be removed in a production environment
            setTimeout(() => { this.showLoadingMask = false; }, 1500));
    }

    callSearchService(term: any): Observable<Person[]> {
        this.showLoadingMask = true;
        return this.personService.search(term);
    }

}
