Summary
=======
A node.js library for communicating with the [Doorbell](http://doorbell.io/) REST API. This library
uses [Q](https://github.com/kriskowal/q) to return promises. 

You can install via npm:

	npm install node-doorbell


Methods implemented:
====================

`open`
`submit`


# Examples

In order to use this library, you'll need your application ID and key. These can be found
by navigating to Setup within your Doorbell application. Then Installation Instructions, and onto 
the API tab.

## Record the form has been opened

    var doorbell = require('node-doorbell');

    var DB = new doorbell('YOUR_APP_ID', 'YOUR_KEY');

    DB.open().then(function() {
      console.log('Successfully opened form');
    });

## Submit Feedback

To submit feedback, you must provide an email address and a message.

    DB.submit('test@user.com', 'Your app is incredible!').then(function() {
      // Message has been sent!
    });
    
You may optionally include a name and any extra properties in an object. The extra properties
will show on Doorbell under the Properties section.

    var extras = {
      userId: 123456,
      page: 'dashboard',
      account: 'premium'
    };

    DB.submit('test@user.com', 'This page is confusing!', 'Test User', extras).then(function() {
      // Message with additional info has been sent!
    });
    
## Handling Errors

If an error is encountered, the promise returned by these functions will be rejected with a reason for the error.