import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  addCategory(catToAdd) {
    return this.httpClient.post('http://localhost:3000/categories', catToAdd);
  }
  getCategories() {
    return this.httpClient.get('http://localhost:3000/categories');
  } 
}
