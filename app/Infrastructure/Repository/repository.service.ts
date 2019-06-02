import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SessionService} from "../../services/session.service";

@Injectable()
export class RepositoryService {

    private api_url = 'http://api.myproject.sandbox/api/';
    private httpOptions =  {};

    constructor(
        private httpClient: HttpClient,
        private session: SessionService,
    )
    {
    }


    fetch(query, authorizationRequired = true)
    {
        this.buildRequestHeaders(authorizationRequired);
        return this.httpClient.get(this.api_url + query, this.httpOptions);

    }

    post(entity, data, authorizationRequired = true) {
        this.buildRequestHeaders(authorizationRequired);

        let api_url = this.api_url;
        api_url += entity;
        if(
            typeof data.uuid != "undefined"
            && data.uuid != null
        ) {
            api_url += '/' + data.uuid;
        }

        return this.httpClient.post(api_url, JSON.stringify(data), this.httpOptions)
            .toPromise()
            .then(this.extractData)
            .catch(this.errorRequest);
    }

    delete(entity, uuid, authorizationRequired = true) {
        this.buildRequestHeaders(authorizationRequired);

        let api_url = this.api_url;
        api_url += entity + '/' + uuid;

        return this.httpClient.delete(api_url, this.httpOptions)
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

    buildRequestHeaders(authorizationRequired)
    {
        if(authorizationRequired == true) {
            let headers_object = new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': "Bearer "+ this.session.getAuthToken()
            });

            this.httpOptions = {
                headers: headers_object
            };
        }
    }

    treatResponse(response)
    {
    }

}