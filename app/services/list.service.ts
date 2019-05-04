import { Injectable } from "@angular/core";
import {RepositoryService} from "../Infrastructure/Repository/repository.service";

@Injectable()
export class ListService
{

    constructor(
        private repository: RepositoryService
    )
    {
    }

    getData(request)
    {
        // which fields are to be shown on list
        return this.repository.fetch(request);
    }
}