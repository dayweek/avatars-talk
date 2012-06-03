class User < ActiveRecord::Base
  acts_as_authentic

  attr_accessible :password, :login, :password_confirmation, :avatar_id

  has_many   :posts
  belongs_to :avatar
end