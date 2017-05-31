class UsersController < ApplicationController
  skip_before_action :get_authenticated_user, only: [:signup, :authenticate]

  def user
    render(
      status: 200,
      json: self.get_authenticated_user.slice(:name, :email)
    )
  end

  def signup
    new_user = User.create(email: params[:email] , password: params[:password])
    if new_user.valid?
      command = AuthenticateUser.call(params[:email], params[:password])
      render json: { user: command.get_user_details, auth_token: command.result }
    else
      render json: { error: new_user.errors }, status: 400
    end
  end

  def authenticate
    command = AuthenticateUser.call(params[:email], params[:password])

    if command.success?
      render json: { user: command.get_user_details, auth_token: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end
end
