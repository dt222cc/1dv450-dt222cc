class UsersController < ApplicationController
    # before_action is a validation callback that protects some of the actions
    before_action :check_user, only: [:show]
  
    # GET /signup
    def new
        @user = User.new
        
        # Redirect back to user dashboard if the user tries to visit the signup page
        if is_logged_in?
            redirect_to current_user
        end
    end
    
    # POST /signup
    def create
        @user = User.new(user_params) # using strong parameters (security)
        
        if @user.save     
            flash[:success] = 'Welcome! Login to get your API key/s for your application/s.'
            redirect_to login_path
        else
            flash.now[:danger] = 'No no no... again.'
            render 'new'
        end
    end
    
    # GET /users/:id
    def show
        @user = User.find(params[:id])
        @apps = App.all # Admin interface
        # Prevents access to other users, ful hack? :D
        if current_user != @user and !is_admin
            # flash[:info] = "You have no access to that page -.-"
            redirect_to current_user
        end
    end
    
    private
    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
