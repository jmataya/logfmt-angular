# logfmt-angular
[![Build Status](https://travis-ci.org/jmataya/logfmt-angular.svg?branch=master)](https://travis-ci.org/jmataya/logfmt-angular)  

LogFmt-Angular is an AngularJS module that makes it easy to log in the logfmt format. For those that don't know, logfmt is the logging format that was introduced and made popular by Heroku because it is both easily human readable and machine readable. An example of what you might see in a traditional logfmt message:

```
at=info method=GET path=/ host=mutelight.org fwd="124.133.52.161" dyno=web.2 connect=4ms service=8ms status=200 bytes=1653
```  

Check out more information about logfmt and its history here: [bandur.org/logfmt](http://brandur.org/logfmt).  

### What does logfmt-angular do?  

So far, not very much, but it will get better! Right now, it takes JSON messages and logs them to the console. But, more support is coming. There's already experimental support to enable saving to local storage. In the future, we'll add the ability to disable logging in production and logging to a remote console.  

With logfmt-angular, you can bring robust logging to your AngularJS applications.  

# Starter Guide  
## Quick Configuration  

To get started using logfmt-angular, just do the following:  

````JavaScript  
// Add logfmt-angular as a dependency to your app.
angular.module('your-app', ['logfmt']);

// Inject logfmt into your controller.  
angular.module('your-app').controller('MainCtrl', function($scope, LogFmt) {
  // ...
});
````  

## Usage  

Just pass JSON with your desired content to `LogFmt.log()`.  

````JavaScript  
LogFmt.log({status: "error", message: "Something blew up!"});  
````  

And you'll see output like:  

````  
timestamp=14-5-2014-05:03:12 status=error message="Something blew up!"  
````  

# Contributors  
Jeff Mataya ([@thebigmatay](http://twitter.com/thebigmatay))  

# License  

The MIT License

Copyright (c) 2013 Martin Gontovnikas http://www.gon.to/

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

