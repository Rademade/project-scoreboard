class Api::ApplicationController < ApplicationController
  include ActionController::MimeResponds

  around_action :wrap_in_try

  def wrap_in_try
    begin
      yield
    rescue Exception => e
      render json: { error: e.message }, status: :unprocessable_entity
    end
  end
end
