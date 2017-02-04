import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Person } from './person';

@Injectable()
export class PersonSearchService {

    constructor(private http: Http) {
    }

    private searchUrl = './api/person';

    search(term: string): Observable<Person[]> {
        const url = `${this.searchUrl}?q=${term}`;

        return this.http
            .get(url)
            .map(response =>
                response.json() as Person[]
            );
    }
}