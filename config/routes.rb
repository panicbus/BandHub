Bandhub::Application.routes.draw do

  get "apis/api" => "apis#api"
  get "apis/songkick" => "apis#songkick"

  devise_for :users, path_names: {sign_in: "login", sign_out: "logout"},
                   controllers: {omniauth_callbacks: "omniauth_callbacks"}

  # resources :bands
  root :to => "bands#index"
  # get "/"
  get "bands/index"

  get "bands/show"

  post "bands/create"

  get "bands/destroy"

  get "bands/favorite" => "bands#favorite"
  post "bands/favorite" => "bands#favorite"
  delete "bands/favorite/:id" => "bands#destroy"

end
