import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { PersonSearchComponent } from './person-search/person-search.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule
    ],
    declarations: [PersonSearchComponent],
    bootstrap: [ PersonSearchComponent ]
})
export class AppModule { }
