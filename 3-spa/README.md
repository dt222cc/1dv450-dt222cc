# 1DV450 Single Page Application
- Author: Sing Trinh (dt222cc)
- [Overview](https://coursepress.lnu.se/kurs/webbramverk/tjansten-toerh/)
- [Task](https://coursepress.lnu.se/kurs/webbramverk/spa-front-end/)

## Part 3 of 3
A client application written in AngularJS which uses asynchronous calls against the prior written API.

## Pre-requirements for this app

Setup and run the API from previous step, with Cloud9:

Login/signup then create a new workspace, from git:
```
https://github.com/dt222cc/1dv450-dt222cc.git
```

Navigate to the correct folder
```
cd 2-api/
```

Run following commands to install the dependencies, setup the database and start the server:
```
$ bundle install

$ rake db:setup

$ rails server -p $PORT -b $IP
```

## Initial setup for the single page application

One way of doing this is by cloning the repository, navigate to `3-spa` and open a console window.

Run `npm install` to grab the dependencies, steps for setting up `node.js` might be necessary if this step does not work.

## Running the app

Runs like a typical express app:

    node app.js

Open a web-browser, URL is `localhost:3000`.

## Extra

If no events are being displayed, check the URL used (3-spa/app/public/app/app.js) and check if the API is working.

Does not handle places with the same name.

## Credentials

Email:    user@one.se
Password: userone

Email:    user@two.se
Password: usertwo
