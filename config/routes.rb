Bandhub::Application.routes.draw do

  get "apis/api" => "apis#api"
  get "apis/songkick" => "apis#songkick"

  devise_for :users, path_names: {sign_in: "login", sign_out: "logout"},
                   controllers: {omniauth_callbacks: "omniauth_callbacks"}

  root :to => "bands#index"

  get "bands/index"

  get "bands/show"

  post "bands/create"

  # get "bands/destroy"
  get "bands/favorite/:id" => "bands#destroy"
  delete "bands/favorite/:id" => "bands#destroy"

  get "bands/favorite" => "bands#favorite"
  post "bands/favorite" => "bands#favorite"


end
