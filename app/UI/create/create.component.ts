import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import domain_structure from '../../../assets/config/domain_structure.json';



@Component({

    selector: 'app-create',
    templateUrl: 'create.component.html'

})

export class CreateComponent implements OnInit {

    private loading:boolean = true;

    private requestParams;
    private entity:string;

    private item:any = {};
    private fields:any = [];

    constructor(
        private activatedRoute: ActivatedRoute,
    )
    {
        this.activatedRoute.params.subscribe(params => {
            this.requestParams = params;
        })

    }

    ngOnInit()
    {
        let entity = this.requestParams.entity;
        this.entity = entity;

        if(
            typeof domain_structure.entities[entity].fields != "undefined"
            && typeof domain_structure.entities[entity].fields.editable != "undefined"
        ) {
            this.fields.editable = this.fields.inDetail = domain_structure.entities[entity].fields.editable;
        } else {
            // no editable fields
        }

        this.loading = false;


    }
}