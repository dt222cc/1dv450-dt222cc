class UsersController < ApplicationController
    # Shows the signup page for new users
    # GET /signup
    def new
        @user = User.new
    end
    
    # Creates a new user if possible
    # POST /signup
    def create
        @user = User.new(user_params)
        
        if @user.save     
            flash[:notice] = 'Welcome! Login to get API key/s for your application/s.' #Elaborate users#new with a link to login
        else
            flash[:notice] = 'No no no.'
        end
        render 'new'
    end
    
    private
    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
