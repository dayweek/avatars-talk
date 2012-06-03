class CreateUserSessions < ActiveRecord::Migration
  def self.up
    create_table :user_sessions do |t|
      t.string :session_id, :null => false
      t.text :data
      t.timestamps
    end

  end

  def self.down
    drop_table :user_sessions
  end
end
