class AddDefaultUser < ActiveRecord::Migration
  def up
    walt = Avatar.create! :name => 'Walt', :filename => '/models/forum_walt.js'
    hand = Avatar.create! :name => 'Hand', :filename => '/models/forum_hand.js'
    bunny = Avatar.create! :name => 'Bunny', :filename => '/models/forum_bunny.js'
    infinite = Avatar.create! :name => 'HeadScan', :filename => '/models/forum_infinite.js'
    duck = Avatar.create! :name => 'Duck', :filename => '/models/forum_duck.js'
    User.create! login: 'guest', password: 'guest', password_confirmation: 'guest', avatar_id: duck.id
    User.create! login: 'Neo', password: 'matrix', password_confirmation: 'matrix', avatar_id: bunny.id
    User.create! login: 'Mouse', password: 'mouse', password_confirmation: 'mouse', avatar_id: hand.id
    User.create! login: 'Switch', password: 'switch', password_confirmation: 'switch', avatar_id: infinite.id
    User.create! login: 'Apoc', password: 'apoc', password_confirmation: 'apoc', avatar_id: walt.id
    User.create! login: 'Dozer', password: 'dozer', password_confirmation: 'dozer', avatar_id: duck.id

    # posts
    posts = [
      ['Dozer', "It's a single celled protein combined with synthetic aminos, vitamins, and minerals. Everything the body needs."],
      ["Mouse", "It doesn't have _everything_ the body needs."],

      ['Mouse', "So I understand you've run through the agent training program...you, uh, you know...I wrote that program."],
      ['Apoc', 'Here it comes...'],
      ['Mouse', 'So, uh, what did you think of her?'],
      ['Neo', 'Of who...?'],
      ['Mouse', "The woman in the red dress! I, I designed her. She, um..well she doesn't talk very much, but...but if you'd like to meet her, I can arrange a much more personalized milieu.",],
      ["Switch", 'Digital pimp, hard at work.'],
      ["Mouse", "Pay no attention these hypocrites, Neo. To deny our own impulses, is to deny the very thing that makes us human."]
    ]
    posts.each do |post|
      user = User.where(login: post.first).first
      user.posts.create! text: post.last
    end
  end

  def down
  end
end
