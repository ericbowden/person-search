import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'people-search-app',
    templateUrl: './person-search.component.html',
})
export class AppComponent {
    name = "Angular 2"; 
    showHeading = true;
    heroes = ['Magneta', 'Bombasto', 'Magma', 'Tornado'];

    toggleHeading() {
        this.showHeading = !this.showHeading;
    }
}
