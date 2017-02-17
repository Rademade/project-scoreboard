user = User.create({
  email: 'cp@rademade.com',
  password: 'rademade',
  admin: true
})

user.role = Role.create(name: 'Developer')
user.save

project = Project.create({
  name: 'Ping-Pong'
})

project.jira_account = JiraAccount.create({
  site: 'https://rademade-erp.atlassian.net',
  username: 'mp@rademade.com',
  password: 'rademade'
})

project.jira_helper_field = JiraHelperField.create({
  rapid_view_id: 19,
  story_points_field: 'customfield_10022',
  story_status_field: 'customfield_10020'
})

project.save
