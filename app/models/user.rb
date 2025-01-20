# frozen_string_literal: true

# app/models/user.rb
class User < ApplicationRecord
  # Add secure password handling
  has_secure_password

  has_one :profile, dependent: :destroy
  accepts_nested_attributes_for :profile

  has_many :team_players, dependent: :destroy
  has_many :teams, through: :team_players
  has_many :tournament, dependent: :destroy

  validates :email, presence: true, uniqueness: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'must be a valid email address' }

  before_create :generate_api_key

  def regenerate_api_key
    generate_api_key
    save
  end

  private

  # Generate a random API key using SecureRandom
  def generate_api_key
    self.api_key = SecureRandom.hex(20)
  end
end
