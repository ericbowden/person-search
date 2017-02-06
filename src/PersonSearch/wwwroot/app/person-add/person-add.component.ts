import { Component, style, animate, transition, trigger } from '@angular/core';

import { Person } from '../person-search/person';
import { PersonSearchService } from '../person-search/person-search.service';


@Component({
    moduleId: module.id,
    selector: 'person-add',
    templateUrl: './person-add.component.html',
    styleUrls: ['./person-add.component.css'],

    // Modal animations
    animations: [
        trigger('fadeInOut', [
            transition(':enter', [   // :enter is alias to 'void => *'
                style({ opacity: 0 }),
                animate(100, style({ opacity: 1 }))
            ]),
            transition(':leave', [   // :leave is alias to '* => void'
                animate(100, style({ opacity: 0 }))
            ])
        ])
    ]
})
export class PersonAddComponent {

    private person: Person;
    private showModal = false;
    private showSuccess = false;
    private showError = false;

    constructor(private personService: PersonSearchService) {}

    show(): void {
        this.person = new Person();
        this.showModal = !this.showModal;
    }

    hide(): void {
        this.showModal = false;
    }

    onSubmit(e: any) {
        e.preventDefault();
        this.personService.create(this.person)
            .then(rst => {
                if (rst) {
                    this.hide();
                    this.showSuccessBtn();
                }
            }).catch(() => this.showErrorBtn());
    }

    showSuccessBtn() {
        this.showSuccess = true;
        setTimeout(() => this.showSuccess = false, 2000);
    }

    showErrorBtn() {
        this.showError = true;
        setTimeout(() => this.showError = false, 5000);
    }
}
