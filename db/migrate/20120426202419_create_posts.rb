class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :text, :null => false
      t.references :user
      t.timestamps
    end
  end
end
