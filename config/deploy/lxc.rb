server 'vm.rademade.com', user: 'scoreboard', roles: %w{web app db}
set :deploy_to, '/home/project-scoreboard/website'
set :branch, :master
set :rails_env, :production
set :repo_url, 'git@github.com:Rademade/project-scoreboard.git'
set :env_vars, {
  DEPLOY_STAGE: 'lxc'
}
