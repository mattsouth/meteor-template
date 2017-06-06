import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Accounts.onLogin(function(){
  if ($('#login-dropdown-list').hasClass('open')) {
    // in mobile view we want to close the whole navbar on login
    $(".navbar-collapse").collapse('hide');
    // only do this redirect when an actual login is made, not just a page reload
    Router.go('/');
  }
});

Accounts.onLogout(function(){
  Router.go('/');
});

Router.configure({
  layoutTemplate: 'layout'
});

// default route
Router.route('/', function () {
  // todo: add subscription(s) here
  if (this.ready()) {
    this.render('home');
  } else {
    this.render('loading');
  }
});
