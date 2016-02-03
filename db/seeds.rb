# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

# Admin
User.create(email: 'admin@123.com', password: 'password', password_confirmation: 'password')

# User with two apps
u = User.create(email: '123@123.se', password: '123123', password_confirmation: '123123')
u.apps << App.create(name: 'DemoApp', description: 'Just a simple test', key: 'should be a randomized string')
u.apps << App.create(name: 'SecondApp', description: 'A second app', key: 'should be a randomized string.')

# User with one app
u = User.create(email: '111@111.se', password: '111111', password_confirmation: '111111')
u.apps << App.create(name: 'Cool', description: 'Really?', key: 'nope')

# User with no apps
u = User.create(email: '222@222.se', password: '222222', password_confirmation: '222222')