user = User.create({
  email: 'co@rademade.com',
  password: 'rademade',
  first_name: 'Mykhailo',
  last_name: 'Paliukh',
  admin: true
})
user.role = Role.create(name: 'Developer')
user.save

# Ping-Pong ERP
project = Project.create({
  name: 'Ping-Pong ERP'
})
project.users << user
project.jira_account = JiraAccount.create({
  site: 'https://rademade-erp.atlassian.net',
  username: 'mp@rademade.com',
  password: 'rademade'
})
project.jira_helper_field = JiraHelperField.create({
  rapid_view_id: 19,
  story_points_field: 'customfield_10022'
})
project.save

# Ping-Pong
project = Project.create({
  name: 'Ping-Pong'
})
project.users << user
project.jira_account = JiraAccount.create({
  site: 'https://rademade-pingpong.atlassian.net',
  username: 'mp@rademade.com',
  password: 'rademade'
})
project.jira_helper_field = JiraHelperField.create({
  rapid_view_id: 25,
  story_points_field: 'customfield_10022'
})
project.save
