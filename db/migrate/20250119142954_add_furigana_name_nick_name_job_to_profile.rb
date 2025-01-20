class AddFuriganaNameNickNameJobToProfile < ActiveRecord::Migration[7.0]
  def up
    add_column :profiles, :furigana_name, :string
    add_column :profiles, :nick_name, :string
    add_column :profiles, :job, :string
  end

  def down
    remove_column :profiles, :furigana_name
    remove_column :profiles, :nick_name
    remove_column :profiles, :job
  end
end
