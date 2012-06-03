class CreateAvatars < ActiveRecord::Migration
  def change
    create_table :avatars do |t|
      t.string :name, :null => false
      t.string :filename, :null => false

      t.timestamps
    end
  end
end
