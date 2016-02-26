# 1DV450 API
- Author: Sing Trinh (dt222cc)
- [Overview](https://coursepress.lnu.se/kurs/webbramverk/tjansten-toerh/)
- [Task](https://coursepress.lnu.se/kurs/webbramverk/webb-api-back-end/)

## Part 2 of 3
A generic position API for now... no theme yet.

## Setup with Cloud9
Login/signup then create a new workspace, from git:
```
https://github.com/dt222cc/1dv450-dt222cc-registrationapp.git
```

Navigate to the correct folder
```
cd 2-api/
```

Run following commands to install the dependencies, setup the database and start the server:
```
$ bundle install
$ rake db:setup
$ rails server -b $PORT -p $IP
```

## Namespace
You can access the API by adding **/api/v1/** to the url, because of namespaces and versioning

## API-key
Every request requires an api-key as **'access_token'**-parameter:
```
/api/v1/events?access_token=whxCcu2btlThnOg-z_vslA
```

Available keys, use these or register for a new one
```
BF6STN_TIeaHNM4t8oiBtw

cBedFzsSJ3KlOR0iA1atiQ

c_aWhv9o0Ux8uOO_THLbjg
```

## Format
Only **JSON**, no xml

## Postman

[POSTMAN-file with examples of available calls](https://www.getpostman.com/collections/6d4af80cddea0a337fb5)

## Authentication

Some actions **requires** authentication (events: **POST**, **DELETE**, **UPDATE**).

With POSTMAN use Basic Auth with any of the creators email:password, note: not dev users.
```
Username: user@two.se
Password: usertwo

Adds to the header as an Authorization header
```

This digest adds to the header as an Authorization header

## Resources

My API have four resources:
```
- creators
- events
- positions
- tags
```

#### GET Request params

For events
```
tag_id          # Get all events associated with the tag_id
lat             # Used with lng to get events nearby the coordination
lng             # Can also be used with tag_id
```

All resources
```
offset          # Skip first x
limit           # Limit amount to x

```

#### POST
Add to header:  `Content-Type: application/json`

To create an event do a POST request against events.

The body should contain a JSON-object with the key **`event`** with the attributes species, weight och width.
```
{
  "event": {
    "name": "Event name",
    "description": "Event description",
    "position": {
      "latitude": "56",
      "longitude": "16"
    }
  }
}
```

A tag or several tags can be added to the event.
```
{
  "event": {
    "name": "Event name",
    "description": "Event description",
    "position": {
      "latitude": "56",
      "longitude": "16"
    },
    tags: [ { "name": "tagName"} ]
  }
}
```

#### PUT

Works in similar fashion as a POST request, but against an existing event.

#### DELETE

DELETE request against events can be done but only for authenticated creators.

Also only able to delete the creators own events.

## Note

I opted to include lots of error responds for the developers using the API so they get an easier time using it.

The consequence for that is more cluttered code.
