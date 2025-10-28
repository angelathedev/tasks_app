# frozen_string_literal: true

Rails.application.routes.draw do
  resources :tasks, only: %i[index create destroy] do
    member { patch :toggle }
    collection { get :stats }
    collection{delete :clear_completed}
  end
  root 'tasks#index'
end
