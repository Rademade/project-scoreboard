require_relative 'boot'

require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "sprockets/railtie"

Bundler.require(*Rails.groups)

module Scoreboard
  class Application < Rails::Application
    config.to_prepare do
      require 'services'
    end

    config.assets.initialize_on_precompile = true
    config.middleware.insert_before(Rack::Sendfile, LightResizer::Middleware, Rails.root)
    config.i18n.default_locale = :en
    config.time_zone = 'Kyiv'
    config.generators do |g|
      g.test_framework false
    end
  end
end
