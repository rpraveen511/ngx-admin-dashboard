import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class SinequaService extends DataService {

  baseApiURL: string = environment.backendAPI;

  constructor(
     https: HttpClient,
  ) {
    super(https);
  }

  private get_headers(auth = true) {
    const headers = {
      'Accept' : '*/*',
      'Content-Type' : 'application'
    };
    return headers;
  }

  private format_and_get_resource(resource) {
    return JSON.stringify(resource);
  }

  private construct_and_get_query_params(queryParams) {
    let params = new HttpParams();
    for (const key of Object.keys(queryParams)) {
      params = params.set(key, queryParams[key]);
    }
    return params;
  }


    getEvents(data) {
      const url = this.baseApiURL + 'dev.plugin';
      const resource = this.format_and_get_resource(data);
      return this.create(url, resource, this.get_headers());
    }

    getNodes(data) {
      const url = this.baseApiURL + 'dev.plugin';
      const resource = this.format_and_get_resource(data);
      return this.create(url, resource, this.get_headers());
    }

}


