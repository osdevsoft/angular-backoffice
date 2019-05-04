import {Component} from '@angular/core';
import { Input } from "@angular/core";

@Component({

    selector: 'entity-form-element',
    templateUrl: 'formElement.component.html'
})

export class FormElementComponent {

    @Input() item: any = '';
    @Input() editableItem: any = '';
    @Input() field: any = '';
    @Input() editableFields: string = '';

    constructor()
    {
    }

    fieldLabelClicked(name: string) {
        console.log('field clicked: ' + name);
    }


}