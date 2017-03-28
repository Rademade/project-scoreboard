require 'mina/deploy'
require 'mina/bundler'
require 'mina/rails'
require 'mina/git'
require 'mina/rvm'
require 'mina/npm'

set :domain, 'vm.rademade.com'
set :port, 2236
set :branch, :master
set :user, 'scoreboard'
set :repository, 'git@github.com:Rademade/project-scoreboard.git'
set :forward_agent, true
set :deploy_to, '/home/scoreboard/website-backend'
set :shared_paths, ['log', 'public/uploads', 'tmp']

ruby_version = File.read(File.join __dir__, '../.ruby-version').chomp
ruby_gemset = File.read(File.join __dir__, '../.ruby-gemset').chomp

task :environment do
  invoke :"rvm:use[#{ruby_version}@#{ruby_gemset}]"
  queue 'export RAILS_ENV=production'
end

task :add_github_to_known_hosts do
  repo_host = repository.split(%r{@|://}).last.split(%r{:|\/}).first
  repo_host = repo_host.sub(/-backend$/, '')
  queue %[
    if ! ssh-keygen -F #{repo_host} >/dev/null; then
      ssh-keyscan -t rsa -H #{repo_host} >> ~/.ssh/known_hosts
    fi
  ]
end

task :setup => :environment do
  queue %[mkdir -p "#{deploy_to}/#{shared_path}/log"]
  queue %[mkdir -p "#{deploy_to}/#{shared_path}/config"]
  queue %[mkdir -p "#{deploy_to}/#{shared_path}/public/uploads"]
  invoke :add_github_to_known_hosts
end

namespace :npm do
  desc 'Install node modules using npm'
  task :install_fixed do
    queue %{(
      echo '-----> Installing node modules using npm'
      sub_directory=$(pwd | sed -r "s/.*?$(basename $build_path)//g")
      cd frontend
      #{echo_cmd %[mkdir -p "#{deploy_to}/#{shared_path}$sub_directory/node_modules"]}
      #{echo_cmd %[ln -s "#{deploy_to}/#{shared_path}$sub_directory/node_modules" 'node_modules']}
      #{echo_cmd %[#{fetch(:npm_bin)} install #{fetch(:npm_options)}]}
    )}
  end
end

desc 'Build Frontend'
task :build_frontend do
  invoke :'npm:install_fixed'
  queue %{(
    cd frontend
    #{echo_cmd %[npm run deploy]}
  )}
end

desc 'Deploys the current version to the server.'
task deploy: :environment do
  deploy do
    invoke :'git:clone'
    invoke :'deploy:link_shared_paths'
    invoke :'bundle:install'
    invoke :'rails:db_migrate'
    queue "#{bundle_bin} exec rake rademade_admin:bower:install"
    invoke :'rails:assets_precompile'
    invoke :build_frontend

    to :launch do
      invoke :'deploy:cleanup'
      queue "touch #{deploy_to}/#{current_path}/tmp/restart.txt"
    end
  end
end
