class AddAvatarReferenceToUser < ActiveRecord::Migration
  def up
    change_table :users do |t|
      t.references :avatar
    end
  end
end
