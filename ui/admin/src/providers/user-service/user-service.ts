import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the UserServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserServiceProvider {

    constructor(public http: HttpClient) {
        console.log('Hello UserServiceProvider Provider');
    }

    getUsers() {
        return this.http.get('http://localhost:3000/users')
    }

    createUser(user: object) {
        return this.http.post('http://localhost:3000/users', user, { headers: { 'Content-Type': 'application/json' } })
    }

    updateUser(id: string, user: object) {
        return this.http.put('http://localhost:3000/users/' + id, user, { headers: { 'Content-Type': 'application/json' } })
    }

    deleteUser(id: string) {
        return this.http.delete('http://localhost:3000/users/' + id)
    }
}
