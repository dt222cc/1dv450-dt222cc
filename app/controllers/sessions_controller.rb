class SessionsController < ApplicationController
    
    def new
        # Loads the login-form from the view sessions/new.html.erb
        
        # Redirect back to user dashboard if the user tries to visit the login page (also the root page)
        if is_logged_in?
            redirect_to current_user
        end
    end
    
    # Attempt a login
    def create
        # Retrieve the user by mail
        user = User.find_by(email: params[:session][:email].downcase)
        
        # Checks if we got a user first and then if the password is correct
        if user && user.authenticate(params[:session][:password])
            # Log the user in and redirect to the user page
            log_in user # helpers/sessions_helper
            redirect_to user
        else
            # Creates an error message and render the layout with the form
            # flash.now is for rendering (lives for the cycle), danger: css class for bootstrap
            if !user
                flash.now[:danger] = 'User/email does not exists'
            else
                flash.now[:danger] = 'Invalid email/password combination'
            end
            render 'new'
        end
    end
    
    # Called when logout
    def destroy
        log_out # helpers/sessions_helper
        flash[:info] = "Thanks for the visit, welcome back!"
        redirect_to root_url # go back
    end
end
