class PostsController < ApplicationController
  before_filter :require_user, except: :index

  def index
    @posts = Post.includes(user: :avatar).order('created_at DESC').all
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new(params[:post])
    @post.user = current_user

    if @post.save
      redirect_to posts_url, notice: 'Post was successfully created.'
    else
      render :new
    end
  end

  def destroy
    @post = current_user.posts.find(params[:id])
    @post.destroy

    redirect_to posts_url
  end
end
