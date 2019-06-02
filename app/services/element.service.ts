import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

import {RepositoryService} from "../Infrastructure/Repository/repository.service";
import {query} from "@angular/animations";

@Injectable()
export class ElementService
{
    private data:any;

    constructor(
        private repository: RepositoryService
    )
    {

    }

    getData(entity, uuid, referencedEntities)
    {
        let query_string = entity + '/' + uuid;
        if(referencedEntities.length != 0) {
            query_string += '?referenced_entities=' + referencedEntities.join(',') + "&referenced_entities_contents=" + referencedEntities.join(',');
        }
        return this.repository.fetch(query_string)
            .pipe(
                map(
                    data => {
                        // do some conversions if necessary
                        return data;
                    }

                )
            )
    }

    delete(entity, uuid)
    {
        return this.repository.delete(entity, uuid);
    }

}