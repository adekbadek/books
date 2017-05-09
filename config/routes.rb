Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/api' do
    get :books, to: 'books#index'
    post :create, to: 'books#create'
  end
end
