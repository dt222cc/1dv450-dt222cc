class AppsController < ApplicationController
    def new
        @apps = App.new
    end

    def create
        @apps = current_user.apps.new(key_params) # strong parametes

        if @apps.save
            flash[:success] = "Application added!"
            redirect_to current_user
        else
            render 'new'
        end
    end
    
    private
    def key_params
        params.require(:app).permit(:name, :description)
    end
end
