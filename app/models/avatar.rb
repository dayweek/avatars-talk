class Avatar < ActiveRecord::Base
  attr_accessible :filename, :name

  has_many :users
end