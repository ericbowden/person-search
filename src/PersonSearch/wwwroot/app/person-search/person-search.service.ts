import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/toPromise';

import { Person } from './person';

@Injectable()
export class PersonSearchService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private searchUrl = './api/person';

    constructor(public http: Http) {}

    search(term: string): Observable<Person[]> {
        const url = `${this.searchUrl}?q=${term}`;

        return this.http
            .get(url)
            .map(response =>
                response.json() as Person[]
            );
    }

    create(person: Person): Promise<Person> {
        return this.http
            .post(this.searchUrl, JSON.stringify(person), { headers: this.headers })
            .toPromise()
            .then(res => res.ok)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}
