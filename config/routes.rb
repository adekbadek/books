Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/api' do
    get :books, to: 'books#index'
    post :books, to: 'books#create'
    delete ':books/:id', to: 'books#remove'
    patch ':books/:id', to: 'books#edit'
  end
end
