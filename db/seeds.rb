# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

# Admin
User.create(email: 'admin@123.com', password: 'password', password_confirmation: 'password')

# User with two apps
u = User.create(email: '123@123.se', password: '123123', password_confirmation: '123123')
u.apps << App.create(name: 'DemoApp', description: 'With optional description', key: 'BF6STN_TIeaHNM4t8oiBtw')
u.apps << App.create(name: 'SecondApp', description: '', key: 'cBedFzsSJ3KlOR0iA1atiQ')

# User with one app
u = User.create(email: '111@111.se', password: '111111', password_confirmation: '111111')
u.apps << App.create(name: 'Cool', description: 'Really?', key: 'c_aWhv9o0Ux8uOO_THLbjg')

# User with no apps
u = User.create(email: '222@222.se', password: '222222', password_confirmation: '222222')