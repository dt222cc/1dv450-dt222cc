class UsersController < ApplicationController
    # before_action is a validation callback that protects some of the actions
    before_action :check_user, only: [:show]
  
    # Shows the signup page for new users
    # GET /signup
    def new
        @user = User.new
        
        if is_logged_in?
            flash[:info] = "Sign up!? Do logout if you want to register another email..."
            redirect_to current_user
        end
    end
    
    # Creates a new user if possible
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
    
    def show
        @user = User.find(params[:id])
        
        if current_user != @user
            flash[:info] = "You have no access to that page -.-"
            redirect_to current_user
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :password, :password_confirmation)
    end
end
