# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

## Registration App ##

# Admin
User.create(email: 'admin@123.se', password: 'password', password_confirmation: 'password')

# User with two apps
u = User.create(email: '123@123.se', password: '123123', password_confirmation: '123123')
u.apps << App.create(name: 'DemoApp', description: 'With optional description', key: 'BF6STN_TIeaHNM4t8oiBtw')
u.apps << App.create(name: 'SecondApp', description: '', key: 'cBedFzsSJ3KlOR0iA1atiQ')

# User with one app
u = User.create(email: '111@111.se', password: '111111', password_confirmation: '111111')
u.apps << App.create(name: 'Cool', description: 'Really?', key: 'c_aWhv9o0Ux8uOO_THLbjg')
u.apps << App.create(name: 'Quick Key', description: 'Really? Cmon..', key: 'abc') # Bwaha

# User with no apps
u = User.create(email: '222@222.se', password: '222222', password_confirmation: '222222')

## Positioning API ##

# Add some Creators (users that create events, not dev users that registers their applications)
c1 = Creator.create(displayname: 'User 1', email: 'user@one.se', password: 'userone', password_confirmation: 'userone')
c2 = Creator.create(displayname: 'User 2', email: 'user@two.se', password: 'usertwo', password_confirmation: 'usertwo')
c3 = Creator.create(displayname: 'User 3', email: 'user@three.com', password: 'iamuser3', password_confirmation: 'iamuser3')
c4 = Creator.create(displayname: 'User 4', email: 'user@four.com', password: 'iamuser4', password_confirmation: 'iamuser4')

# Add some Positions
p1 = Position.create(address_city: "Smålands Lejons Väg, 393 58 Kalmar")
p2 = Position.create(address_city: "Storgatan 35, 392 31 Kalmar")
p3 = Position.create(address_city: "Gröndalsvägen 19, 391 28 Kalmar")
p4 = Position.create(address_city: "Bredbandet 1, 392 30 Kalmar")
p5 = Position.create(address_city: "Järnvägsstationen, 392 32 Kalmar")
p6 = Position.create(address_city: "Galggatan 4, 391 29 Kalmar")

# Add some Tags, lowercase
t1 = Tag.create(name: 'tag1')
t2 = Tag.create(name: 'tag2')
t3 = Tag.create(name: 'tag3')
t4 = Tag.create(name: 'demo')
t5 = Tag.create(name: 'random')

# Add the/some Events
e1 = Event.create(name: 'Event 1', description: 'Notive: There is no specific topic/genre')
e2 = Event.create(name: 'Event 2', description: 'Adding some more events')
e3 = Event.create(name: 'Event 3', description: 'Events, celebrations, incidents, occurrences, experiences, whatever')
e4 = Event.create(name: 'Event 4', description: 'Description is needed...', )
e5 = Event.create(name: 'Event 5', description: '.')
e6 = Event.create(name: 'Event 6', description: '..')
e7 = Event.create(name: 'Event 7', description: 'And another one')

# Add tags to Events (Notice that we can have events with no tags)
e1.tags << t1
e2.tags << t2
e3.tags << t3
e4.tags << t1
e4.tags << t2
e5.tags << t4
e5.tags << t5

# Add events to creators (only creators can add events, can have many events)
c1.events << e1
c1.events << e2
c1.events << e3
c2.events << e4
c3.events << e5
c4.events << e6
c4.events << e7

# Also couple events to positions (A position can have many events)
p1.events << e1
p2.events << e2
p3.events << e3
p4.events << e4
p5.events << e5
p6.events << e6
p1.events << e7
