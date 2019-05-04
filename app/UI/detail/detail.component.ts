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
    private referencedEntitiesWithField;

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
        let referencedEntities:any = this.referencedEntities;

        // check if we have referenced entities on the list
        if(
            domain_structure.entities[this.entity] !== undefined
            && domain_structure.entities[this.entity].fields !== undefined
            && domain_structure.entities[this.entity].fields.inList !== undefined
        ) {
            let referencedEntitiesWithField:any = [];
            domain_structure.entities[this.entity].fields.inList.forEach(
                function(listItem) {
                    if(listItem.indexOf(".") > 0) {
                        // this field to show in the list is from another entity
                        // referencedEntities contains the entities we have to request
                        referencedEntities.push(listItem.replace(/\.[a-z]*$/, ''));
                        // referencedEntitiesWithField contains all the field to show structure (entity.subEntityN.field)
                        referencedEntitiesWithField.push(listItem);
                    }
                });
            // store it for later
            this.referencedEntitiesWithField = referencedEntitiesWithField;
        }

        this.referencedEntities = referencedEntities.filter(function(value, index, self) {
            return self.indexOf(value) === index;
        });


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

                let referencedEntitiesWithField = this.referencedEntitiesWithField;

                let item = this.item;

                referencedEntitiesWithField.forEach(function(referencedEntityWithField) {

                    // split it in order to be able to arrive to the final field
                    let splittedReferencedEntityWithField = referencedEntityWithField.split(".");

                    let subItem = item;

                    // parse all the parts of the entity.subEntityN.field obtain the final value
                    splittedReferencedEntityWithField.forEach(function(referencedEntityWithFieldParts) {

                        if(
                            typeof subItem.references != "undefined"
                            && typeof subItem.references[referencedEntityWithFieldParts] != "undefined"
                        ) {
                            // it is still an entity
                            subItem = subItem.references[referencedEntityWithFieldParts];
                        } else {
                            // it's the final field => assign it's value to the item to show on the list (to get it easier on the view)
                            item[referencedEntityWithField] = subItem[0][referencedEntityWithFieldParts];
                        }
                    })

                })


                this.loading = false;
            }
        );
    }
}