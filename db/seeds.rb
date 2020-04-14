require 'faker'

user1 = User.create(email: 'user1@mail.com' , password: 'qweqweqwe')

books_total = 50

book_titles_user_1 = books_total.times.map{|i| {
  'title' => Faker::Book.title,
  'author' => Faker::Book.author,
}}

def add_books_to_user(user, books, books_total)
  books.each_with_index do |book, i|
    end_date = Time.now - (Random.new.rand * 150).days

    author = Author.find_or_create_by(
      name: book['author']
    )

    new_book = user.books.create(
      title: book['title'],
      author_id: author['id'],
      start_date: end_date - (Random.new.rand * 20 + 5).days
    )

    if i < books_total * 0.1
      # currently reading
    elsif i < books_total * 0.3
      new_book.on_hold = end_date
    elsif i < books_total * 0.6
      new_book.start_date = nil
    else
      new_book.end_date = end_date
      todo_action = 'review'
      if i % 2 == 0
        todo_action = 'prepare_notes'
      end
      todo = Todo.create(
        user: user,
        book: new_book,
        action: todo_action,
        due_date: end_date + 5.days
      )
    end

    new_book.save
  end
end

add_books_to_user(user1, book_titles_user_1, books_total)
