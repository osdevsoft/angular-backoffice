import {Component, Injectable, Input, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms"

import domain_structure from '../../../assets/config/domain_structure.json';

@Component({

    selector: 'app-search',
    templateUrl: 'search.component.html'

})

@Injectable()
export class SearchComponent implements OnInit {

    @Input() entity: any = '';
    @Input() listComponent: any = '';
    @Input() editableItem: any = {};

    searchFields: any = [];
    expanded: boolean = false;

    constructor() {}

    ngOnInit(): void {
        if(
            typeof domain_structure.entities[this.entity].fields != "undefined"
            && typeof domain_structure.entities[this.entity].fields.inSearch != "undefined"
        ) {
            this.searchFields = domain_structure.entities[this.entity].fields.inSearch;
        } else {
            this.searchFields = domain_structure.entities[this.entity].fields.inList;
        }
    }

    postData(form: NgForm) {
        this.listComponent.searchPostData(this.editableItem);
    }

    toggleView()
    {
        this.expanded = !this.expanded;
    }

}