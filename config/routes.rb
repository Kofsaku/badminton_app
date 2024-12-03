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
  get '', to: 'homepage#index'
  get 'about', to: 'homepage#about'
  get 'terms-of-service', to: 'homepage#terms_of_service'
  get 'faqs', to: 'homepage#faqs'
  get 'privacy-policy', to: 'homepage#privacy-policy'
  get 'contact', to: 'homepage#contact'
  
  # Tournament management routes
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

  get 'scoreboard', to: 'scoreboard#index'

  resources :categories do
    get 'divisions', to: 'categories#divisions'
  end

  resources :profiles, only: %i[edit update destroy show create]

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
  
  resources :users do
    collection do
      post 'show_api_key'
      post 'regenerate_api_key'
      get 'players-list', to: 'users#players_list'
    end
  end

  resources :matches, only: %i[index show create update] do
    member do
      post 'add_log'
      patch 'complete'
      get 'scoreboard'
    end

    collection do
      get 'all'
      get 'new'
    end
  end
  
  # Scoreboards for matches (accessible from timetables)
  resources :scoreboards, only: [:show]
  
  # Catch-all route for debugging (optional, remove in production)
  get '/*path' => 'homepage#index'
  match '*path', to: 'application#not_found', via: :all
end