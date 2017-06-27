unless User.where(email: 'co@rademade.com').exists?
  User.create({
    email: 'co@rademade.com',
    password: 'rademade',
    admin: true
  })
end

unless Project.where(name: 'Ping-Pong').exists?
  Project.create({
    name: 'Ping-Pong',
    jira_board_id: 25
  })
end

unless JiraAccount.where(username: 'mp@rademade.com').exists?
  JiraAccount.find_or_create_by({
    username: 'mp@rademade.com',
    password: 'rademade',
    site: 'https://rademade-pingpong.atlassian.net'
  })
end

user = User.find_by(email: 'co@rademade.com')
project = Project.find_by(name: 'Ping-Pong')
project.users << user

project.jira_account = JiraAccount.find_by(username: 'mp@rademade.com')
project.save
