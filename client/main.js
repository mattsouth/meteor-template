import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Accounts } from 'meteor/accounts-base';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

AccountsTemplates.configure({
    defaultLayout: 'layout',
    showForgotPasswordLink: true,
    enablePasswordChange: true
});
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.addFields([
  {
      _id: 'username',
      type: 'text',
      displayName: "Username",
      required: true
  }
]);
AccountsTemplates.configureRoute('signUp');

AccountsTemplates.configureRoute('changePwd',{
  path:'/settings#password',
  redirect: '/settings',
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

Router.route('/logout', function() {
  Meteor.logout(function() {
    Router.go('/');
  });
})

Template.layout.helpers({
  avatar() {
    return Gravatar.imageUrl(Meteor.user().emails[0].address,{secure:true,size:24});
  },
  username() {
    return Meteor.user().username;
  }
});

// default route
Router.route('/profile', function () {
  // todo: add subscription(s) here
  if (this.ready()) {
    this.render('profile');
  } else {
    this.render('loading');
  }
});

Template.profile.helpers({
  avatar() {
    return Gravatar.imageUrl(Meteor.user().emails[0].address,{secure:true,size:200});
  },
  user() {
    return Meteor.user();
  }
});

// default route
Router.route('/settings', function () {
  // todo: add subscription(s) here
  if (this.ready()) {
    this.render('settings');
  } else {
    this.render('loading');
  }
});
