import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get('http://localhost:3000/users');
  }
  getUser(email: string, password: string) {
    return this.httpClient.get('http://localhost:3000/users?email='+email+'&password='+password);
  }
  addUser(userToAdd) {
    return this.httpClient.post('http://localhost:3000/users/', userToAdd);
  }
  updateUser(userId, userToUpdate) {
    return this.httpClient.put('http://localhost:3000/users/'+userId, userToUpdate);
  }
  deleteUser(userId) {
    return this.httpClient.delete('http://localhost:3000/users/'+userId);
  }
  addConnectedUser(usedConnected) {
    return this.httpClient.post('http://localhost:3000/connectedUser/', usedConnected);
  }
  getConnectedUser() {
    return this.httpClient.get('http://localhost:3000/connectedUser');
  }
  deleteConnectedUser(userId) {
    return this.httpClient.delete('http://localhost:3000/connectedUser/'+userId);
  }
}
