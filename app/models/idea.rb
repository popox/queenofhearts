class Idea < ActiveRecord::Base
  validates_presence_of :title, :body, :user_id
  validate :allowed_project_id

  def allowed_project_id
    unless %w(mobile_user clicrdv).include?(project_id)
      errors.add(:project_id, ::Errors::IMPOSSIBLE)
    end
  end
end
