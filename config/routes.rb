Bandhub::Application.routes.draw do

  get "apis/api" => "apis#api"

  devise_for :users, path_names: {sign_in: "login", sign_out: "logout"}
  # devise_for :users

  resources :bands
  root :to => "bands#index"
  # get "/"
  get "bands/index"

  get "bands/show"

  get "bands/create"

  get "bands/destroy"



end
