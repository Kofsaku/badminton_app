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

  resources :tournaments
  resources :profiles
  resources :users
  # Defines the root path route ("/")
  # root "articles#index"
end
