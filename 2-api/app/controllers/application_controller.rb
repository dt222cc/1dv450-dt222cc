class ApplicationController < ActionController::Base
    # Prevent CSRF attacks by raising an exception.
    # For APIs, you may want to use :null_session instead.
    protect_from_forgery with: :exception

    # We must include the helper we want to user
    include SessionsHelper

    # No cache, one solution to not re login after user has been logged out by backing
    before_action :no_cache

    def no_cache
        response.headers["Cache-Control"] = "no-cache, no-store, max-age=0, must-revalidate"
        response.headers["Pragma"] = "no-cache"
        response.headers["Expires"] = "Fri, 09 Jan 2004 00:00:00 GMT"
    end
end
