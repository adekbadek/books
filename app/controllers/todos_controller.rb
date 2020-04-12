class TodosController < ApplicationController
  def index
    todos = self.get_authenticated_user.todos.reject{|todo| todo.is_completed}
    render(
      status: 200,
      json: serialize_todos(todos)
    )
  end

  def all
    render(
      status: 200,
      json: serialize_todos(self.get_authenticated_user.todos)
    )
  end

  def remove
    self.get_authenticated_user.todos.destroy(params[:id])
    render(
      status: 200,
      json: {id: params[:id]}
    )
  end

  def edit
    user = self.get_authenticated_user
    todo = user.todos.find(params[:id])
    updates = JSON.parse request.body.read

    # Add spaced repetitions after notes are prepared.
    if updates.key?('is_completed') && updates['is_completed']
      updates['completed_on'] = Date.today
      if todo.action == 'prepare_notes'
        [10, 30, 60].each do |offset|
          Todo.create(
            user: user,
            book: todo.book,
            action: 'review',
            due_date: Date.today + offset.days
          )
        end
      end
    end

    todo.update(updates)

    render(
      status: 200,
      json: serialize_todos([todo]).first
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
