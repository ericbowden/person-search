# Person Search Website
### MVC 6 project that uses Angular 2 and Web Api to run a person search website.
# Steps to Run

* install [Visual Studio](https://www.visualstudio.com/downloads/) (if not installed)
* install [DotNetCore 1.0.1](https://visualstudiogallery.msdn.microsoft.com/c94a02e9-f2e9-4bad-a952-a63a967e3935/file/77371/12/DotNetCore.1.0.1-VS2015Tools.Preview2.0.3.exe?SRC=VSIDE&UPDATE=TRUE) (if not installed)
* install [TypeScript](http://download.microsoft.com/download/6/D/8/6D8381B0-03C1-4BD2-AE65-30FF0A4C62DA/TS2.0.3-TS-release20-nightly-20160921.1/TypeScript_Dev14Full.exe) for Visual Studio (if not installed)
* open project and wait for dependencies to install
  * ( a warning will display that not all were installed but this is a current bug in Angular 2 for Visual Studio)
* run by clicking IIS Express or pressing Ctrl-F5 to build and run project

# Testing
### Run Jasmine JS Tests
* install [Node.js](https://nodejs.org/en/download/) (if not installed)
* Navigate to ```src/PersonSearch``` project folder where ```gulp.js``` is located in a command prompt
* Type and run ```npm run test``` in the command prompt

### TSLint
* Navigate to ```src/PersonSearch``` project folder where ```gulp.js``` is located in a command prompt
* Type and run ```npm run lint``` in the command prompt

# Additional Notes

* The project uses randomuser.me to seed the data, which keeps the list in memory in the ```PersonRepository``` implementation. An interface exists to the repository to get the persons to be searched as well as adding a person to the in-memory list.
* Since the loading of the list does not accurately show loading times in a production environment, a set timeout has been put in simulate the loading times.
* Dependency Injection has been implemented on both the front end and back end to help with unit testing. However unit tests only exist for the front end using Karma and Jasmine.
* Using Angular 2's Observables, we get additional functionality with the app and endpoint:
  * The endpoint isn't hit on everykeystrock due to Observable debouncing.
  * The endpoint isn't hit with the same query params for subsequent requests, they must be distinct.
  * Observables deal with out-of-order responses, meaning that old requests are unsubscribed if a new one is sent out.

# Future Work
* Implement ```PersonRepository``` with an actual database using Entity Framework
* Implement server side unit testing for controllers and services
