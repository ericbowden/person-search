import { Component, style, state, animate, transition, trigger } from '@angular/core';

import { Person } from './person';

@Component({
    moduleId: module.id,
    selector: 'person-add',
    templateUrl: './person-add.component.html',
    styleUrls: ['./person-add.component.css'],

    //Modal animations
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

    private showModal = false;

    show(): void {
        this.showModal = !this.showModal;
    }

    hide(): void {
        this.showModal = false;
    }


}