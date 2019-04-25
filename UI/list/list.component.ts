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

    constructor(
        protected auth: AuthService,
        private activatedRoute: ActivatedRoute,
        private listService:ListService,
        private elementService:ElementService
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.entity = params.entity;
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

        this.listService.getData(request).subscribe(
            (data:any) => {
                this.totalItems = data.total_items;
                this.items = data.items;

                if(
                    typeof domain_structure.entities[this.entity].fields != "undefined"
                    && typeof domain_structure.entities[this.entity].fields.inList != "undefined"
                ) {
                    this.fields = domain_structure.entities[this.entity].fields.inList;
                } else {
                    this.fields = data.schema.fields;
                }


                this.loading = false;
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
