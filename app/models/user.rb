class User < ApplicationRecord
  has_many :books, dependent: :destroy
  validates :email, uniqueness: true
  validates :password, :length => {:minimum => 6}
  has_secure_password
end
