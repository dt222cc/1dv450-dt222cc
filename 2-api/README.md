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

$ rails server -p $PORT -b $IP
```

**Alternative to `$ rails server -p $PORT -b $IP`**

**Cloud9:** Open a new **Run Configuration** by clicking the plus sign that's located right side of open tab/tabs. Select **Ruby on Rails** as the **Runner** and pick the directory **/2-api/** as the **CWD**, then **press Run** and it "should" work.

## Namespace
You can access the API by adding **/api/v1/** to the url, because of namespaces and versioning

## API-key
Every request requires an api-key as **'access_token'**-parameter:
```
/api/v1/events?access_token=BF6STN_TIeaHNM4t8oiBtw
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
Do consider that the URL is different because it's against my cloud9 workspace.

[POSTMAN-file with examples of available calls](https://www.getpostman.com/collections/6d4af80cddea0a337fb5)

## Authentication
Some actions **requires** authentication (events: **POST**, **DELETE**, **UPDATE**).

With POSTMAN use Basic Auth with any of the creators email:password, note: not dev users.
```
Username: user@two.se
Password: usertwo
```

This digest/token adds to the header as an Authorization header.

From an application that uses this API: the digest from the username/email and password should be added as an Authorization header aswell. For example:
```
      var params = Object.assign({ access_token: API_CONSTANT.key });
      return $http({
        method: 'DELETE',
        url: API_CONSTANT.url + resourceName,
        headers: {
          'Accept': API_CONSTANT.format,
          'Authorization': 'Basic ' + digest
        },
        params: params
      });
```

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

The body should contain a JSON-object with the key **`event`** with the attributes name, description and address_city.
```
{
  "event": {
    "name": "Event name",
    "description": "Event description",
    "position": {
      "address_city": "Bredbandet 1, 392 30 Kalmar"
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
      "address_city": "Bredbandet 1, 392 30 Kalmar"
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

Deletes positions and tags associated with the event also gets deleted if those resource only had that "one" link.

## Note
I should probably have good error handling which handles many different scenarios. The consequence for that probably more cluttered code. We'll see if I can refactor it.

You can search for events with the following paths aswell:
```
/api/v1/creators/2/events
/api/v1/positions/4/events
/api/v1/tags/2/events
```

Offset and limit gets included in the response only if they are **not** default values.
