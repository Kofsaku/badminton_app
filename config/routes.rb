Rails.application.routes.draw do
  root 'homepage#index'
  get 'about', to: 'homepage#about'
  get 'terms-of-service', to: 'homepage#terms_of_service'
  get 'faqs', to: 'homepage#faqs'
  get 'privacy-policy', to: 'homepage#privacy-policy'
  get 'contact', to: 'homepage#contact'
  get 'create-account', to: 'homepage#create_account'
  get 'login', to: 'homepage#login'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get 'tournament-creation', to: 'tournaments#new'
  get 'tournament-management', to: 'tournaments#tournament_management'
  get 'players-management', to: 'users#index'
  resources :tournaments, only: [:edit, :update, :destroy, :show, :create, :index]
  resources :profiles, only: [:edit, :update, :destroy, :show, :create]
  resources :users do
    collection do
      post 'show_api_key'
      post 'regenerate_api_key'
    end
  end
  # Defines the root path route ("/")
  # root "articles#index"
end
