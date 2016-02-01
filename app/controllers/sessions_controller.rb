class SessionsController < ApplicationController
    
    def new
        # loads the login-form from the view sessions/new.html.erb
        
        if is_logged_in?
            flash[:info] = "You want to login when you're already logged in?!? NO! NOT HAPPENING!"
            redirect_to current_user
        end
    end
    
    # Attempt a login
    def create
        # Retrieve the user by mail
        @user = User.find_by(email: params[:session][:email].downcase)
        
        # Checks if we got a user first and then if the password is correct
        if @user && @user.authenticate(params[:session][:password])
            # Log the user in and redirect to the user page
            log_in @user # helpers/sessions_helper
            redirect_to @user
        else
            # Creates an error message and render the layout with the form
            # flash.now is for rendering (lives for the cycle), danger = bootstrap
            flash.now[:danger] = 'Invalid email/password combination'
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
