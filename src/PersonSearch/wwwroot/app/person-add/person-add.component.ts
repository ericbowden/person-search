import { Component, OnInit, style, state, animate, transition, trigger } from '@angular/core';

import { Person } from '../person-search/person';

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

    private person: Person;
    private showModal = false;

    show(): void {
        this.person = new Person();
        this.showModal = !this.showModal;
    }

    hide(): void {
        this.showModal = false;
    }

   /* ngOnInit() {

        // the short way
        this.personForm = this.formBuilder.group({
            name: ['', [<any>Validators.required, <any>Validators.minLength(5)]],
            address: this.formBuilder.group({
                street: ['', <any>Validators.required],
                postcode: ['8000']
            })
        });

        // subscribe to form changes  
        this.subcribeToFormChanges();

        // Update single value
        (<FormControl>this.personForm.controls['name'])
            .setValue('John', { onlySelf: true });

        // Update form model
        // const people = {
        // 	name: 'Jane',
        // 	address: {
        // 		street: 'High street',
        // 		postcode: '94043'
        // 	}
        // };

        // (<FormGroup>this.myForm)
        //     .setValue(people, { onlySelf: true });

    }

    subcribeToFormChanges() {
        const myFormStatusChanges$ = this.personForm.statusChanges;
        const myFormValueChanges$ = this.personForm.valueChanges;

        myFormStatusChanges$.subscribe(x => this.events.push({ event: 'STATUS_CHANGED', object: x }));
        myFormValueChanges$.subscribe(x => this.events.push({ event: 'VALUE_CHANGED', object: x }));
    }

    save(model: Person, isValid: boolean) {
        this.submitted = true;
        console.log(model, isValid);
    }*/

}