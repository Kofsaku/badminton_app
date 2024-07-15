class CreateProfiles < ActiveRecord::Migration[7.0]
  def change
    create_table :profiles do |t|
      t.string :role
      t.string :real_name
      t.string :pet_name
      t.string :telephone_number
      t.string :prefecture
      t.string :address
      t.string :city
      t.string :gender
      t.date :date_of_birth
      t.string :gender
      t.integer :years_of_experience
      t.string :racket
      t.string :affiliation
      t.string :age
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
