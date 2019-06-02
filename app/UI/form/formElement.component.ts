import {Component, OnInit} from '@angular/core';
import { Input } from "@angular/core";
import { CommonModule } from '@angular/common';

@Component({

    selector: 'entity-form-element',
    templateUrl: 'formElement.component.html'
})

export class FormElementComponent {

    @Input() item: any = '';
    @Input() editableItem: any = '';
    @Input() field: any = '';
    @Input() editableFields: string = '';
    @Input() entityReferences: any = '';
    @Input() referencedEntitiesContents: any = '';

    public referencedEntity: string = '';
    public referencedField: string = '';

    constructor()
    {
    }

    ngOnInit(): void
    {
        if (this.field.includes('.')) {
            let referencedEntityField = this.field.split('.');
            let item = this.item;
            let referencedEntity = '';
            let referencedEntityItem = '';
            let referencedField = '';
            referencedEntityField.forEach(function (entityField) {
                if (entityField == referencedEntityField[referencedEntityField.length -1]) {
                    //it's the final value
                    referencedField = entityField;
                } else {
                    // still another referenced entity
                    referencedEntity = entityField;
                    // it's an update
                    if(typeof item.references != "undefined") {
                        referencedEntityItem = item.references[entityField];
                    }
                }
            });

            this.referencedEntity = referencedEntity;
            this.referencedField = referencedField;
        }
    }

    fieldLabelClicked(name: string) {
        console.log('field clicked: ' + name);
    }


}