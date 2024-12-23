Rails.application.routes.draw do
  root 'homepage#index'
  namespace :api do
    namespace :v1 do
      get 'tournaments', to: 'tournaments#get_all_tournaments'
      post 'tournaments/q', to: 'tournaments#get_tournaments_by_query'
      get 'tournaments/:id/tournament-venues', to: 'tournaments#get_venues_by_tournament_id'
      get 'tournaments/:id/tournament-data', to: 'tournaments#get_tournament_data_by_id'
      get 'tournament-tables', to: 'tournament_tables#get_all_tournament_tables'
      get 'tournament-tables/:id', to: 'tournament_tables#get_tournament_table_by_id'
      post 'tournament-tables', to: 'tournament_tables#add_new_tournament_table'
      put 'tournament-tables/:id', to: 'tournament_tables#update_tournament_table_by_id'
      delete 'tournament-tables/:id', to: "tournament_tables#delete_tournament_table_by_id"
      get 'timetables', to: 'timetables#get_all_timetables'
      get 'timetables/:id', to: 'timetables#get_timetable_by_id'
      post 'timetables', to: 'timetables#add_new_timetable'
      resources :match_classes do
      end
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
    get 'tournament_divisions'
    get 'tournament_categories'
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
      get 'organizers-list', to: 'users#organizers_list'
      get 'organizers-list/:id', to: 'users#get_organizer_by_id'
      put 'organizers-list/:id', to: 'users#update_organizer_by_id'
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