class Book < ApplicationRecord
  belongs_to :user
  has_one :author
  has_many :todos, dependent: :destroy
end
