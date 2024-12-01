Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'tournaments', to: 'tournaments#getAllTournaments'
      get 'tournaments/:id/tournament-venues', to: 'tournaments#getVenuesByTournamentId'
      get 'tournaments/:id/tournament-data', to: 'tournaments#getTournamentDataById'
      get 'tournament-tables', to: 'tournament_tables#getAllTournamentTables'
      get 'tournament-tables/:id', to: 'tournament_tables#getTournamentTableById'
      post 'tournament-tables', to: 'tournament_tables#addNewTournamentTable'
      put 'tournament-tables/:id', to: 'tournament_tables#updateTournamentTableById'
      delete 'tournament-tables/:id', to: "tournament_tables#deleteTournamentTableById"
      get 'timetables', to: 'timetables#getAllTimetables'
      get 'timetables/:id', to: 'timetables#getTimetableById'
      post 'timetables', to: 'timetables#addNewTimetable'
      resources :categories do
        get 'divisions', to: 'categories#divisions'
      end
    end
  end
  # Root and homepage routes
  get 'about', to: 'homepage#about'
  get 'terms-of-service', to: 'homepage#terms_of_service'
  get 'faqs', to: 'homepage#faqs'
  get 'privacy-policy', to: 'homepage#privacy-policy'
  get 'contact', to: 'homepage#contact'
  get 'create-account', to: 'homepage#create_account'
  get 'login', to: 'homepage#login'
  
  # Tournament management routes
  get 'tournament-creation', to: 'tournaments#new'
  get 'tournament-management', to: 'tournaments#tournament_management'
  get 'players-management', to: 'users#index'
  
  resources :tournaments, only: [:edit, :update, :destroy, :show, :create, :index] do
    get 'categories', to: 'tournaments#categories'
    resources :timetables, only: [:index, :new, :create, :show, :destroy] do
      member do
        post :generate_cells # Custom route for generating timetable cells dynamically
      end
    end
  end
  
  resources :profiles, only: [:edit, :update, :destroy, :show, :create]
  
  resources :tournament_tables do
    post :league_select_players, on: :member # Original functionality preserved
    collection do
      get :new_round_robin  # Form for creating a round-robin table
      post :create_round_robin
      get :new_knockout      # Form for creating a knockout table
      post :create_knockout
    end
    member do
      post :assign_player # Assign a player or team to a tournament table
    end
  end
  
  # resources :timetables, only: [:index, :show, :edit, :new, :create] do
  #   collection do
  #     get :venues_for_tournament
  #   end
  #   member do
  #     post :generate_cells
  #   end
  # end
  
  resources :users do
    collection do
      post 'show_api_key'
      post 'regenerate_api_key'
    end
  end
  
  # Scoreboards for matches (accessible from timetables)
  resources :scoreboards, only: [:show]
  
  # Catch-all route for debugging (optional, remove in production)
  get '/*path' => 'homepage#index'
  match '*path', to: 'application#not_found', via: :all
end