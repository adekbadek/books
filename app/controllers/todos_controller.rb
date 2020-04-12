class TodosController < ApplicationController
  def index
    render(
      status: 200,
      json: serialize_todos(self.get_authenticated_user.todos)
    )
  end

  private

  def serialize_todos(todos)
    todos.map{|todo|
      serialized_todo = todo.as_json
      serialized_todo = serialized_todo.except('user_id', 'updated_at', 'created_at')
      serialized_todo[:book_title] = todo.book.title
      serialized_todo
    }
  end
end
