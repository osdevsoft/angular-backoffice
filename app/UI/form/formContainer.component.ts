import {Component, Injectable} from '@angular/core';
import { Input } from "@angular/core";
import {NgForm} from "@angular/forms";
import {RepositoryService} from "../../Infrastructure/Repository/repository.service";


@Component({

    selector: 'entity-form-container',
    templateUrl: 'formContainer.component.html'
})

@Injectable()
export class FormContainerComponent {

    @Input() fields: string = '';
    @Input() item: any = {};
    @Input() editableItem:any = {};
    @Input() entity: string = '';

    public loading: boolean = false;

    constructor(
        private repository: RepositoryService
    )
    {
    }

    async postData(form: NgForm)
    {
        this.loading = true;
        let res = await this.repository.post(this.entity, this.editableItem);
        this.item.uuid = res;
        this.editableItem.uuid = res;
        this.loading = false;
    }


}