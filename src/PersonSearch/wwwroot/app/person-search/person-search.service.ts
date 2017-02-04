import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Person } from './person';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PersonSearchService {

    constructor(private http: Http) {
    }

    private searchUrl = 'http://localhost:57546/api/person';

    search(term: string): Observable<Person[]> {
        //var bob = this.http.get(`app/heroes/?name=${term}`);

        return this.http
            .get(`app/bob/?name=${term}`)
            .map(response =>
                response.json().data as Person[]
            );
    }

    getPerson(id: number): Promise<Person> {
        const url = `${this.searchUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Person)
            .catch(this.handleError);
    }

    getPersons(term: string): Promise<Person[]> {
        return this.http.get(`${this.searchUrl}?q=${term}`)
            .toPromise()
            .then(response =>  response.json() as Person[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}