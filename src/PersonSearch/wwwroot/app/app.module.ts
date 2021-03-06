import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PersonSearchComponent } from './person-search/person-search.component';
import { PersonAddComponent } from './person-add/person-add.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [ PersonSearchComponent, PersonAddComponent],
    bootstrap: [ PersonSearchComponent ]
})
export class AppModule { }
