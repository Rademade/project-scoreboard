source 'https://rubygems.org'

gem 'rails', '~> 5.0.0', '>= 5.0.0.1'
gem 'pg'
gem 'rademade_admin',
  git: 'git@github.com:Rademade/rademade_admin',
  branch: 'bugfix/jquery_form_version',
  ref: 'b1a52f5'

gem 'puma', '~> 3.0'
gem 'jira-ruby', require: 'jira-ruby'

group :development, :test do
  gem 'rack-cors', require: 'rack/cors'
end

group :development do
  gem 'mina', '~> 0.3.8'
  gem 'listen', '~> 3.0.5'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
end

gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
