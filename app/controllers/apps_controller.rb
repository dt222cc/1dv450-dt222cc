class AppsController < ApplicationController
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
        @app = current_user.apps.find(params[:id])
    end
    
    # PATCH /apps/:id
    def update
        @app = current_user.apps.find(params[:id])
        if @app.update_attributes(key_params)
            flash[:success] = "Successfully updated the application"
            redirect_to current_user
        else
            render 'edit'
        end
    end

    # DELETE /apps/:id
    def destroy
        if current_user.apps.find(params[:id]).destroy
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
end
