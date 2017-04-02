user = User.create({
  email: 'co@rademade.com',
  password: 'rademade',
  first_name: 'Rademade',
  last_name: 'Admin',
  admin: true
})
user.role = Role.create(name: 'Developer')
user.save

# Ping-Pong
project = Project.create({
  name: 'Ping-Pong',
  jira_rapid_view_id: 25
})
project.users << user
project.jira_account = JiraAccount.create({
  site: 'https://rademade-pingpong.atlassian.net',
  username: 'mp@rademade.com',
  password: 'rademade'
})
project.save
