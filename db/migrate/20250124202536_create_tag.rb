class CreateTag < ActiveRecord::Migration[7.0]
  def change
    create_table :tags do |t|
      t.references :taggable, polymorphic: true, null: false
      t.string :value

      t.timestamps
    end
  end
end
