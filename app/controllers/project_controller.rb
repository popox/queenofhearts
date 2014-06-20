class ProjectController  < Yodatra::Base

  before do
    content_type 'application/json'
  end

  get '/project/:project_id/ideas' do
    # Authorization
    unless project_allowed?(params[:project_id])
      status 400
      return [Errors::BZZZZ].to_json
    end

    @all = Idea.where(:project_id => params[:project_id])

    if @all.nil?
      status 400
      [Errors::ID_NOT_FOUND].to_json
    else
      @all.to_json
    end
  end

  private

  def project_allowed?(id)
    %w(clicrdv mobile_user).include?(id)
  end
end