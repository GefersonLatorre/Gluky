import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Publication } from '../model/publication.model';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  readonly rootURL = 'http://localhost:51358/api';

  constructor(private http: HttpClient) { }

  addPublication(publication: Publication) {
    return this.http.post(this.rootURL + "/Publication/", publication);
  }

  putPublication(formData: Publication) {
    return this.http.put(this.rootURL + '/Publication/'+ formData.id, formData);
  }

  refreshList(){
    return this.http.get(this.rootURL + "/Publication");
  }

}
