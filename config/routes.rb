Rails.application.routes.draw do
  namespace :v1, defaults: { format: 'json' } do
    get 'things', to: 'things#index'
    get 'boggle', to: 'boggle#index'
    get 'boggle/genBoard', to: 'boggle#genBoard'
    get 'boggle/checkWord', to: 'boggle#checkWord'
    post 'boggle/checkWord', to: 'boggle#checkWord'
  end
  
  # Forward all requests to StaticController#index but requests
  # must be non-Ajax (!req.xhr?) and HTML Mime type (req.format.html?).
  # This does not include the root ("/") path.
  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  
  root 'static#index'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
