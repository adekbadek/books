# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

books = ['The Redux Book', 'Slaughterhouse Five', 'Sapiens: A Brief History of Humankind', 'Widnokrąg', 'Ciemno, prawie noc']

books.each do |book|
  end_date = Time.now - (Random.new.rand * 200).days

  Book.create(
    title: book,
    start_date: end_date - (Random.new.rand * 20 + 5).days,
    end_date: end_date,
    rep_1: end_date + 10.days,
    rep_2: end_date + 30.days,
    rep_3: end_date + 60.days
  )
end
