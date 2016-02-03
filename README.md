# 1DV450 Registration App
- Author: Sing Trinh (dt222cc)
- [Service](https://coursepress.lnu.se/kurs/webbramverk/tjansten-toerh/)
- [Running app](https://c9-1dv450-dt222cc-registrationapp-dt222cc.c9users.io/) *Might not be up

## Part 1 of 3
An application where a developer can register their applications and thus obtain API-key/-keys used by the requests against the API (Part 2)

## Installation with Cloud9
Do use another way if you're up for it.

Create a new workspace, from git:
```
https://github.com/dt222cc/1dv450-dt222cc-registrationapp.git
```

Install the dependencies:
```
$ bundle install
```

Set up the database:
```
$ rake db:setup
```

Start the server:
```
$ rails server -b $PORT -p $IP
```


Visit the url:
```
Link inside the green popup

or

Use Preview>Preview Running Application
```

Note: Still at developing environment and not production.