Rails.application.routes.draw do
  resources :tasks, only: [:index, :create, :destroy] do
    member { patch :toggle }
    collection { get :stats }
  end
  root "tasks#index"
end