import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";

import {ElementService} from "../../services/element.service";

import domain_structure from '../../../assets/config/domain_structure.json';

@Component({
    selector: 'app-detail',
    templateUrl: 'detail.component.html'
})

export class DetailComponent implements OnInit {

    private loading:boolean = true;

    private requestParams;
    private entity:string;
    private uuid:string;

    private item:any;
    private editableItem:any = {};
    private fields:any = [];
    private referencedEntities:any = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private elementService: ElementService,
        private router: Router
    )
    {
        this.activatedRoute.params.subscribe(params => {
            this.requestParams = params;
        });

        // this.router is used to reload the page content when navigating to same route
        this.router.routeReuseStrategy.shouldReuseRoute = function(){
            return false;
        };
        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                // trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;
                // if you need to scroll back to top, here is the right place
                window.scrollTo(0, 0);
            }
        });

    }

    ngOnInit()
    {
        let entity = this.requestParams.entity;
        let uuid = this.requestParams.uuid;
        this.entity = entity;
        this.uuid = uuid;

        if(typeof domain_structure.entities[entity].referencedEntities != "undefined") {
            this.referencedEntities = domain_structure.entities[entity].referencedEntities;
        }
        this.elementService.getData(entity, uuid, this.referencedEntities).subscribe(
            (data:any) => {
                this.item = data.items[0];
                this.fields = [];
                if(
                    typeof domain_structure.entities[entity].fields != "undefined"
                    && typeof domain_structure.entities[entity].fields.inDetail != "undefined"
                ) {
                    this.fields.inDetail = domain_structure.entities[entity].fields.inDetail;
                } else {
                    this.fields.inDetail = data.schema.fields;
                }

                if(
                    typeof domain_structure.entities[entity].fields != "undefined"
                    && typeof domain_structure.entities[entity].fields.editable != "undefined"
                ) {
                    this.fields.editable = domain_structure.entities[entity].fields.editable;
                } else {
                    this.fields.editable = [];
                }

                let editableItem:any = {
                    uuid: this.item.uuid
                };

                this.fields.editable.forEach(function(editableField) {
                    editableItem[editableField] = data.items[0][editableField];
                });

                this.editableItem = editableItem;
                this.loading = false;
            }
        );
    }
}