module PostsHelper
  def avatar_models(posts)
    output = 'var models = ['
    groups = posts.group_by {|x| x.user.avatar.filename}
    output.concat(groups.map do |avatar_filename, posts|
      "{ url: '#{avatar_filename}', placeholderIds: [" + 
      posts.map {|x| "'avatar_placeholder#{x.id}'"}.join(", ") +
      "]}"
    end
    .join(", ") + "];")
    javascript_tag output
  end
end
