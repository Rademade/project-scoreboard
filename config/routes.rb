Rails.application.routes.draw do
  mount RademadeAdmin::Engine => '/admin'

  namespace :rademade_admin, path: 'admin' do
    admin_resources :projects
    admin_resources :roles
    admin_resources :users
  end

  scope :api, module: :api, defaults: { format: :json } do
    scope :v1, module: :v1 do
      resources :projects, only: [:index]
    end
  end
end
