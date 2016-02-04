class AppsController < ApplicationController
    before_action :check_user, except: [:new, :create]
    
    # GET /apps/:id
    def new
        @app = App.new
    end
    
    # POST /apps
    def create
        @app = current_user.apps.new(key_params) # strong parametes

        if @app.save
            flash[:success] = "Application added!"
            redirect_to current_user
        else
            render 'new'
        end
    end
    
    # GET /apps/:id/edit
    def edit
        @app = App.find(params[:id])
    end
    
    # PATCH /apps/:id
    def update
        @app = App.find(params[:id])
        if @app.update_attributes(key_params)
            flash[:success] = "Successfully updated the application"
            redirect_to current_user
        else
            render 'edit'
        end
    end

    # DELETE /apps/:id
    def destroy
        if App.find(params[:id]).destroy
            flash[:success] = "Application was removed successfully"
        else
            flash[:error] = "Something went wrong trying to delete the application"
        end
        
        redirect_to current_user
    end

    private
    def key_params
        params.require(:app).permit(:name, :description)
    end
    
    # Protection, only for admins and the applications user to access, might not be necessary 
    def check_user
        unless current_user == App.find(params[:id]).user or is_admin
            flash[:error] = "You do not have the authority to do that"
            redirect_to root_path
        end        
    end
end
