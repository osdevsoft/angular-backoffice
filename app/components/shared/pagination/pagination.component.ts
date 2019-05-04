import {Component, Injectable, Input, OnInit} from "@angular/core";
import domain_structure from '../../../../assets/config/domain_structure.json';


@Component({
    selector: 'app-pagination',
    templateUrl: 'pagination.component.html'
})

@Injectable()
export class PaginationComponent implements OnInit
{
    @Input() totalItems: number;
    @Input() currentPage;
    @Input() listComponent;

    private pages:any = {
        first: '',
        previous: '',
        pages: [],
        next: '',
        last: ''
    };
    constructor()
    {}

    ngOnInit() {
        let itemsPerPage = domain_structure.listing.itemsPerPage;
        let pagesPerPage = domain_structure.listing.pagesPerPage;

        // generate pagination
        if(this.totalItems > itemsPerPage) {

            //total number of pages
            let numPages = Math.ceil(this.totalItems / itemsPerPage);

            //generate parameter for the url
            let href = "loadPage(%page%)";

            //first page to display in the paging navigator
            let firstPage = Math.max(1, this.currentPage - Math.floor(pagesPerPage / 2));
            //last page to display in the paging navigator
            let lastPage = Math.min(numPages, firstPage + pagesPerPage - 1);

            //first page to display on the paging navigator is not the first page => display link to first page
            if (firstPage != 1) {
                // this.pages.first = href.replace('%page%', '1');
                this.pages.first = 1;
            }

            //we are not on the first page => we need a link to go to the previous page
            if (this.currentPage != 1) {
                // this.pages.previous = href.replace('%page%', (this.currentPage - 1).toString());
                this.pages.previous = this.currentPage - 1;
            }

            //links to pages
            for (let i = firstPage; i <= lastPage; i++) {
                let pageLink = href.replace('%page%', i.toString());
                this.pages.pages.push({numPage: i, link:pageLink});
            }

            //current page is not the last => display a link to the next page
            if (this.currentPage < numPages) {
                // this.pages.next = href.replace('%page%', this.currentPage + 1);
                this.pages.next = this.currentPage + 1;
            }

            //last page to display on the paging navigator is not the last page => display a link to the last page
            if (lastPage != numPages) {
                // this.pages.last = href.replace('%page%',  numPages.toString());
                this.pages.last = numPages;
            }
        }
    }

    loadPage(pageNum) {
        this.listComponent.loadPage(pageNum);
    }

}