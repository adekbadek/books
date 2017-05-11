class User < ApplicationRecord
  has_many :books, dependent: :destroy
  has_secure_password
end
