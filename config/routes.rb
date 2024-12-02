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

  get 'tournament-ids', to: 'tournaments#tournament_ids'

  resources :tournaments, only: [:edit, :update, :destroy, :show, :create, :index] do 
    get 'categories', to: 'tournaments#categories'
    post 'add_player'
    post 'add_new_player'
    post 'add_new_team'
  end

  resources :categories do 
    get 'divisions', to: 'categories#divisions'
  end
  
  resources :profiles, only: [:edit, :update, :destroy, :show, :create]


  resources :tournament_tables do
    post :league_select_players, on: :member
  end

  resources :timetables, only: [:index, :show, :new, :create] do
    get 'venues_for_tournament', on: :collection
  end

  resources :users do
    collection do
      post 'show_api_key'
      post 'regenerate_api_key'
      get 'players-list', to: 'users#players_list'
    end
  end
  # Defines the root path route ("/")
  # root "articles#index"
end
