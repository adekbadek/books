Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  scope '/v1' do
    post 'authenticate', to: 'users#authenticate'
    post 'signup', to: 'users#signup'
    get 'user', to: 'users#user'
    get :books, to: 'books#index'
    post :books, to: 'books#create'
    get ':books/:id', to: 'books#show'
    delete ':books/:id', to: 'books#remove'
    patch ':books/:id', to: 'books#edit'
    get :authors, to: 'authors#index'
  end
end
