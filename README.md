# koa-cms

A cms site of koa framework.

Firstly, install mongodb and run `npm install` and `npm start` to start the site.

Next, you need a few records in the database to start using the user system.

Run these commands on mongo via the terminal.
**Obviously you should use your own email address.**

default password: **asdf**
```js
use koa-cms; // or your MongoDB's db name if different
```

```js
db.admingroups.insert({ _id: 'root', name: 'Root' });
db.admins.insert({ name: {first: 'Root', last: 'Admin', full: 'Root Admin'}, groups: ['root'] });
var rootAdmin = db.admins.findOne();
db.users.save({ username: 'root', isActive: true, email: 'your@email.addy', password: '$2a$10$mK2IhtqOCifD5/YH2GQPl.odhjcy4ENXNBkqanC0fMAxfPj1bWy2u', roles:{admin: rootAdmin._id} });
var rootUser = db.users.findOne();
rootAdmin.user = { id: rootUser._id, name: rootUser.username };
db.admins.save(rootAdmin);
```