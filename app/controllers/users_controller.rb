class UsersController < ApplicationController
  skip_before_action :get_authenticated_user

  def signup
    new_user = User.create(email: params[:email] , password: params[:password])
    if new_user.valid?
      command = AuthenticateUser.call(params[:email], params[:password])
      render json: { auth_token: command.result }
    else
      render json: { email: params[:email], error: new_user.errors }, status: 400
    end
  end

  def authenticate
    command = AuthenticateUser.call(params[:email], params[:password])

    if command.success?
      render json: { auth_token: command.result }
    else
      render json: { error: command.errors }, status: :unauthorized
    end
  end
end