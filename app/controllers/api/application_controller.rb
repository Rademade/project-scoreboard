class Api::ApplicationController < ApplicationController
  include ActionController::MimeResponds

  around_action :wrap_in_try

  def wrap_in_try
    yield
  rescue ActiveRecord::RecordInvalid => validation_errors
    render json: validation_errors.record.errors, status: :unprocessable_entity
  rescue JIRA::HTTPError => error
    render json: { message: error.message }, status: error.code
  rescue Exception => error
    render json: { message: error.message }, status: :unprocessable_entity
  end
end
