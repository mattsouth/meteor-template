import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

AccountsTemplates.configure({
    defaultLayout: 'layout'
});
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');

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

Router.route('/logout', function() {
  Meteor.logout(function() {
    Router.go('/');
  });
})

Template.layout.helpers({
  avatar() {
    console.log(Meteor.user());
    return Gravatar.imageUrl(Meteor.user().emails[0].address,{secure:true,size:24});
  },
  username() {
    return Meteor.user().username;
  }
});
