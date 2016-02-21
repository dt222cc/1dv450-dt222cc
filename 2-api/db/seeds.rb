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

# User with no apps
u = User.create(email: '222@222.se', password: '222222', password_confirmation: '222222')

## Positioning API ##

# Add some Creators (users that create events, not dev users that registers their applications)
c1 = Creator.create(displayname: 'User 1', email: 'user@one.se', password: 'userone', password_confirmation: 'userone')
c2 = Creator.create(displayname: 'User 2', email: 'user@two.se', password: 'usertwo', password_confirmation: 'usertwo')
c3 = Creator.create(displayname: 'User 3', email: 'user@three.com', password: 'iamuser3', password_confirmation: 'iamuser3')
c4 = Creator.create(displayname: 'User 4', email: 'user@four.com', password: 'iamuser4', password_confirmation: 'iamuser4')

# Add some Positions
p1 = Position.create(latitude: '56.678629', longitude: '16.357822')
p2 = Position.create(latitude: '56.703249', longitude: '16.357555')
p3 = Position.create(latitude: '38.871869', longitude: '-77.056267')
p4 = Position.create(latitude: '-75.731303', longitude: '31.170769')

# Add some Events
e1 = Event.create(name: 'Decision', description: 'What kind of position API should I go for?')
e2 = Event.create(name: 'Shops? Food?', description: 'Perhaps places where you can eat brunch. Specific cuisine?')
e3 = Event.create(name: 'Just events?', description: 'Events, celebrations, incidents, occurrences, experiences')
e4 = Event.create(name: 'What is this?', description: 'Ice and snow')

# Add some Tags
t1 = Tag.create(name: 'Har inte bestämt tema ännu')
t2 = Tag.create(name: 'Hmm.. hm...')
t3 = Tag.create(name: 'Test')

# Add tags to events
e1.tags << t1
e2.tags << t2
e4.tags << t2
e4.tags << t3

# Add events to creators (only creators can add events, can have many events)
c2.events << e1
c3.events << e2
c4.events << e3
c4.events << e4

# Also couple events to positions (A position can have many events)
p1.events << e1
p2.events << e2
p3.events << e3
p4.events << e4
