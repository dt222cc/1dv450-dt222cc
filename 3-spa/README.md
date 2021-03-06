# 1DV450 Single Page Application
- Author: Sing Trinh (dt222cc)
- [Overview](https://coursepress.lnu.se/kurs/webbramverk/tjansten-toerh/)
- [Task](https://coursepress.lnu.se/kurs/webbramverk/spa-front-end/)

## Part 3 of 3
A client application written in AngularJS which uses asynchronous calls against the prior written API.

## Pre-requirements: API

Setup and run the API from the part 2, with for example Cloud9:

Login/signup then create a new workspace:
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

## The Single Page Application

App is not available online/live. One way of doing this is by cloning the repository to your system and have it run there.

Runs like a typical express app:

Navigate to `3-spa` and open a console window, run `npm install` to grab the dependencies, steps for setting up `npm & node.js` might be necessary if this step does not work. run `node app.js` to boot server up. Open a web-browser, URL is `localhost:3000`.

## Extra

If no events are being displayed, check the URL used (3-spa/app/public/app/app.js) and check if the API is working as indended.

## Credentials

Email:    user@one.se
Password: userone

Email:    user@two.se
Password: usertwo

## Changes made to the API

I updated the position to geocode with address_city instead of JUST latitude and longitude.

I added/updated something with CORS. Issue with accessing the API from localhost.

I did some fixes with event deletion where the associated resources connected to it was not properly destroyed because of order of destruction, where I destroyed the resource "before" the linked resources which led to a system failure and messed up other functionality like receiving the events for display (Status 500).

I updated some minor stuff regarding the response for events/event. The serialization: always return an array instead of just one single object if only 1 event was found, this to handle the response a bit easier.

So the main changes was geocoding and CORS.