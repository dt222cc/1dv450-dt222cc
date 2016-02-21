require 'api_constraints'

Rails.application.routes.draw do
  # Redirect root: '/' to the login page
  root:to => redirect('login')

  # Routes for User Login & Register
  get 'login' => 'sessions#new'
  post 'login' => 'sessions#create'
  get 'logout' => 'sessions#destroy'
  get 'signup', :to => "users#new"

  # Resource routes for User and App resources
  resources :users
  resources :apps

  # Source: http://railscasts.com/episodes/350-rest-api-versioning
  # Resource route for api, within namespaces
  namespace :api, defaults: {format: 'json'}  do
    scope module: :v1, constrains: ApiConstraints.new(version: 1, default: true) do
      resources :creators, :events, :positions, :tags
    end
  end
end
