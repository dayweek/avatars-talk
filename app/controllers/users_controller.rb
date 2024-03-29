class UsersController < ApplicationController
  before_filter :require_no_user, only: [:new, :create]
  before_filter :require_user,    only: [:edit, :update]
  
  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])

    if @user.save
      flash[:notice] = 'Account registered!'
      redirect_back_or_default root_path
    else
      render :new
    end
  end

  def edit
    @user = @current_user
  end

  def update
    @user = @current_user
 
    if @user.update_attributes(params[:user])
      flash[:notice] = 'Account updated!'
      redirect_to posts_url
    else
      render :edit
    end
  end
end
