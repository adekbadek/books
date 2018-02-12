# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

user1 = User.create(email: 'user1@mail.com' , password: 'qweqweqwe')
user2 = User.create(email: 'user2@mail.com' , password: 'qweqweqwe')

book_titles_user_1 = [
  'The Invention of Nature: The Adventures of Alexander von Humboldt, the Lost Hero of Science',
  'Slaughterhouse Five',
  'Sapiens: A Brief History of Humankind',
  'Widnokrąg',
  'Ciemno, prawie noc',
  'Code Complete',
  'Black Cloud',
  'Homo Deus',
  'Obietnica Poranka',
  'Autobiografia Alicji B. Toklas'
]
book_titles_user_2 = [
  'Atlas Shrugger',
  'The Fontanaheads',
  'Why The Buying'
]

def add_books_to_user(user, titles)
  titles.each_with_index do |book, i|
    end_date = Time.now - (Random.new.rand * 150).days

    new_book = user.books.create(
      title: book,
      start_date: end_date - (Random.new.rand * 20 + 5).days
    )

    if i < 2
      # currently reading
    elsif i < 4
      new_book.on_hold = end_date
    elsif i < 7
      new_book.start_date = nil
    else
      new_book.end_date = end_date
    end

    ApplicationController.change_reps(new_book)
  end
end

add_books_to_user(user1, book_titles_user_1)
add_books_to_user(user2, book_titles_user_2)
