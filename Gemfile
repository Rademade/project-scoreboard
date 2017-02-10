source 'https://rubygems.org'

gem 'rails', '~> 5.0.0', '>= 5.0.0.1'
gem 'pg'
gem 'rademade_admin',
  git: 'git@github.com:Rademade/rademade_admin',
  branch: 'feature/rails-5',
  ref: 'c1c38615'

gem 'puma', '~> 3.0'

group :development, :test do
  gem 'rack-cors', require: 'rack/cors'
  gem 'pry'
  gem 'byebug', platform: :mri
end

group :development do
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
