import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { UsersPage } from '../users/users';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = UsersPage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
