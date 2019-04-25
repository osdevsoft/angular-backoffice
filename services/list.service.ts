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

    getData(entity)
    {
        return this.repository.fetch(entity);
    }
}