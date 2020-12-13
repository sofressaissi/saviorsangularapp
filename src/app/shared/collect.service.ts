import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CollectService {

  constructor(private httpClient: HttpClient) { }

  addMyCollect(collectToAdd) {
    return this.httpClient.post('http://localhost:3000/collects', collectToAdd);
  }

  getMyCollects() {
    return this.httpClient.get('http://localhost:3000/collects');
  }
  deleteCollect(idCollect) {
    return this.httpClient.delete('http://localhost:3000/collects/'+idCollect);
  }
}
