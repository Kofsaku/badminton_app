Rails.application.routes.draw do
<<<<<<< Updated upstream
  root 'homepage#index'
=======
  namespace :api do
    namespace :v1 do
      get 'tournaments', to: 'tournaments#getAllTournaments'
      get 'tournaments/:id/tournament-venues', to: 'tournaments#getVenuesByTournamentId'
      get 'tournaments/:id/tournament-data', to: 'tournaments#getTournamentDataById'
      get 'tournament-tables', to: 'tournament_tables#get_all_tournament_tables'
      get 'tournament-tables/:id', to: 'tournament_tables#get_tournament_table_by_id'
      post 'tournament-tables', to: 'tournament_tables#add_new_tournament_table'
      put 'tournament-tables/:id', to: 'tournament_tables#update_tournament_table_by_id'
      delete 'tournament-tables/:id', to: "tournament_tables#delete_tournament_table_by_id"
      get 'timetables', to: 'timetables#get_all_timetables'
      get 'timetables/:id', to: 'timetables#get_timetable_by_id'
      post 'timetables', to: 'timetables#add_new_timetable'
      resources :categories do
        get 'divisions', to: 'categories#divisions'
      end
    end
  end
  # Root and homepage routes
  get '', to: 'homepage#index'
>>>>>>> Stashed changes
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
  resources :tournaments, only: [:edit, :update, :destroy, :show, :create, :index] do 
    get 'categories', to: 'tournaments#categories'
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
    end
  end
  # Defines the root path route ("/")
  # root "articles#index"
end
