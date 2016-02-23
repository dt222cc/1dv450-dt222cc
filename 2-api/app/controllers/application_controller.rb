class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # Include helper for Login
  include SessionsHelper

  # One solution to not display the page prior to the logout
  # by "backing" back to the page after the user has logged out is "no cache".
  before_action :no_cache

  def no_cache
    response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
    response.headers["Pragma"] = "no-cache"
    response.headers["Expires"] = "Fri, 09 Jan 2004 00:00:00 GMT"
  end
end
