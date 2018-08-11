import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { UserServiceProvider } from '../../providers/user-service/user-service'

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    users = [];
    constructor(public navCtrl: NavController, public userService: UserServiceProvider, public toastCtrl: ToastController) {

    }

    ionViewDidLoad() {
        return this.fetchUsers()
    }

    fetchUsers() {
        return this.userService.getUsers().subscribe(data => this.users = data['data'], error => this.error(error))
    }

    keys(obj: object) {
        return Object.keys(obj)
    }

    success() { // Success
        this.presentToast('Success!', false)
        return this.fetchUsers()
    }

    error(error) {
        this.presentToast(error.message || error, true)
    }

    createTestUser() {
        const testuser = {
            fullname: 'juanito',
            email: 'juanito@juan.com',
            password: 'foo',
            restaurants: []
        }
        this.userService.createUser(testuser).subscribe(data => this.success(), error => this.error(error))
    }

    updateTestUser() {
        if (!this.users || !this.users.length) return this.presentToast('There are no users!', true)
        this.userService.updateUser(this.users[0]._id, { fullname: 'Name Modified' }).subscribe(data => this.success(), error => this.error(error))
    }

    deleteTestUser() {
        if (!this.users || !this.users.length) return this.presentToast('There are no users!', true)
        this.userService.deleteUser(this.users[0]._id).subscribe(data => this.success(), error => this.error(error))
    }

    presentToast(msg: string, isError: boolean) {
        const toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'top',
            cssClass: isError ? 'error-toast' : 'success-toast'
        });
        toast.present();
    }

}
