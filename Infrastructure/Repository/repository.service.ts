import {Injectable} from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class RepositoryService {

    private api_url = 'http://api.myproject.sandbox/api/';

    constructor(
        private httpClient: HttpClient
    )
    {

    }


    fetch(query)
    {
        return this.httpClient.get(this.api_url + query );
    }

    save(entity, data) {

        let api_url = this.api_url;
        api_url += entity;
        if(
            typeof data.uuid != "undefined"
            && data.uuid != null
        ) {
            api_url += '/' + data.uuid;
        }

        return this.httpClient.put(api_url, JSON.stringify(data))
            .toPromise()
            .then(this.extractData)
            .catch(this.errorRequest);
    }

    delete(entity, uuid) {
        let api_url = this.api_url;
        api_url += entity + '/' + uuid;

        return this.httpClient.delete(api_url)
            .toPromise()
            .then(this.extractData)
            .catch(this.errorRequest);
    }

    extractData(res: Response)
    {
        return res;
    }

    errorRequest(error)
    {
        console.error(error.message || error);
    }

}