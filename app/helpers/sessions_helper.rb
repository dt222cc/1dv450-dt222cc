module SessionsHelper
    # Creates a temporary encrypt cookie
    def log_in(user)
        session[:user_id] = user.id
    end
    
    # Remove all about the session, put current_user to nil
    def log_out
        session.delete(:user_id)
        @current_user = nil
    end
    
    # Fetch and returns the current user, if set or ask the database
    def current_user
       @current_user || User.find_by(id: session[:user_id])
    end
    
    # Returns true if current_user is logged in
    def is_logged_in?
       !current_user.nil?
    end
    
    # Returns true if current_user is admin
    def is_admin
        current_user.email == "admin@123.se"
    end
    
    # Protection, must be logged in
    def check_user
        unless is_logged_in?
            flash[:danger] = "Do log in!"
            redirect_to login_path
        end
    end
    
end
