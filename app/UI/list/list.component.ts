import {Component} from '@angular/core';
import { ActivatedRoute } from "@angular/router";

import {AuthService} from "../../services/auth/auth.service";
import {ListService} from "../../services/list.service";
import {ElementService} from "../../services/element.service";

import domain_structure from '../../../assets/config/domain_structure.json';

@Component({

    selector: 'app-list',
    templateUrl: 'list.component.html'

})

export class ListComponent {

    private entity:string;
    private totalItems:number;
    private items:any[];
    private fields:any[];

    private loading: boolean = true;
    private currentPage: number = 1;
    private referencedEntitiesWithField: any[];

    constructor(
        protected auth: AuthService,
        private activatedRoute: ActivatedRoute,
        private listService:ListService,
        private elementService:ElementService
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.entity = params.entity;
            this.currentPage = 1;
            this.load();
        });

    }
    load(query_string = null) {

        this.loading = true;

        let request = this.entity;

        let itemsPerPage = domain_structure.listing.itemsPerPage;
        request += "?query_filters[page_items]=" + itemsPerPage + "&query_filters[page]=" + this.currentPage;

        if(query_string != null) {
            request += '&' + query_string;
        }

        // check if we have referenced entities on the list
        if(
            domain_structure.entities[this.entity] !== undefined
            && domain_structure.entities[this.entity].fields !== undefined
            && domain_structure.entities[this.entity].fields.inList !== undefined
        ) {
            let referencedEntities:any = [];
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

            // request the referenced fields
            if(referencedEntities.length > 0) {
                request += '&referenced_entities=' + referencedEntities.join(",");
            }
        }

        this.listService.getData(request).subscribe(

            (data:any) => {
                this.totalItems = data.total_items;
                this.items = data.items;

                // assign which fields we have to show
                if(
                    typeof domain_structure.entities[this.entity].fields != "undefined"
                    && typeof domain_structure.entities[this.entity].fields.inList != "undefined"
                ) {
                    this.fields = domain_structure.entities[this.entity].fields.inList;
                } else {
                    this.fields = data.schema.fields;
                }

                // do we have fields from another entities?
                if(this.referencedEntitiesWithField.length > 0) {

                    let referencedEntitiesWithField = this.referencedEntitiesWithField;

                    // parse all the referenced fields
                    // we have to search for it for all the items of the list
                    this.items.forEach(function(item) {

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

                    })

                }

                this.loading = false;
            },
            error => {
                if(error.status == 401) {
                    this.auth.logout('Session expired');
                }
            }
        );

    }

    async deleteItem(uuid) {
        if (confirm('Are you sure you want to delete this item?')) {
            let res = await this.elementService.delete(this.entity, uuid);
            let element = document.getElementById(uuid).parentNode.parentNode;
            element.parentNode.removeChild(element);
            let totalItems = document.getElementById('totalItems').innerHTML;
            document.getElementById('totalItems').innerHTML = (parseInt(totalItems) - 1).toString();
        }

    }

    searchPostData(item: any) {
        let query_string = Object.keys(item).map(
            key => 'search_fields['+key+']=' + item[key]).join('&');
        this.load(query_string);
    };

    loadPage(page) {
        this.currentPage = page;
        this.load();
    }


}
