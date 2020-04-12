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
  {
    'title' => 'The Invention of Nature: The Adventures of Alexander von Humboldt, the Lost Hero of Science',
    'author' => 'Andrea Wulf'
  },
  {
    'title' => 'Slaughterhouse Five',
    'author' => 'Kurt Vonnegut'
  },
  {
    'title' => 'Sapiens: A Brief History of Humankind',
    'author' => 'Noah Yuval Harari'
  },
  {
    'title' => 'Widnokrąg',
    'author' => 'Wiesław Myśliwski'
  },
  {
    'title' => 'Ciemno, prawie noc',
    'author' => 'Joanna Bator'
  },
  {
    'title' => 'Code Complete',
    'author' => 'Steve McConnell'
  },
  {
    'title' => 'Black Cloud',
    'author' => 'Fred Hoyle'
  },
  {
    'title' => 'Homo Deus',
    'author' => 'Noah Yuval Harari'
  },
  {
    'title' => 'Obietnica Poranka',
    'author' => 'Roman Gary'
  },
  {
    'title' => 'Autobiografia Alicji B. Toklas',
    'author' => 'Gertruda Stein'
  }
]
book_titles_user_2 = [
  {
    'title' => 'Atlas Shrugger',
    'author' => 'Foo Shrugger'
  },
  {
    'title' => 'The Fontanaheads',
    'author' => 'Bar Fontanaheads'
  },
  {
    'title' => 'Why The Buying',
    'author' => 'Baz Buying'
  }
]

def add_books_to_user(user, titles)
  titles.each_with_index do |book, i|
    end_date = Time.now - (Random.new.rand * 150).days

    author = Author.find_or_create_by(
      name: book['author']
    )

    new_book = user.books.create(
      title: book['title'],
      author_id: author['id'],
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

add_books_to_user(user1, book_titles_user_1)
add_books_to_user(user2, book_titles_user_2)
