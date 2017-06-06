import { Meteor } from 'meteor/meteor';
import { Email } from 'meteor/email';
import { Accounts } from 'meteor/accounts-base'

Meteor.startup(() => {
  Accounts.config({});

  Accounts.emailTemplates.siteName = "Template";
  Accounts.emailTemplates.from = "template@template.com";

  if ( Meteor.users.find().count() === 0 ) {
    console.log("creating default user");
    let defaultUserId=Accounts.createUser({
      username: 'demo',
      email: 'demo@template.com',
      password: 'changeme',
      profile: {
        first_name: 'Admin',
        last_name: 'User',
      }
    });
    Roles.addUsersToRoles(defaultUserId, 'admin', Roles.GLOBAL_GROUP);
  }
});
