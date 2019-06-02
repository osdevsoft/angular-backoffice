import { Component, OnInit} from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import {ElementService} from "../../services/element.service";

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
    private referencedEntitiesContents:any = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private elementService: ElementService
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

        let referencedEntitiesContents = '';
        if(typeof domain_structure.entities[entity].referencedEntities != "undefined") {
            let referencedEntities = domain_structure.entities[entity].referencedEntities;
            this.elementService.getData(entity, 'fake-uuid', referencedEntities).subscribe(
                (data: any) => {
                    if (typeof data.referenced_entities_contents != "undefined") {
                        referencedEntitiesContents = data.referenced_entities_contents;
                    }

                this.referencedEntitiesContents = referencedEntitiesContents;

                this.loading = false;
            });

        } else {
            this.loading = false;
        }


    }
}