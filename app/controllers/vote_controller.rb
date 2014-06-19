class VoteController  < Yodatra::Base

  before do
    content_type 'application/json'
  end

  get '/ideas/:id/vote' do
    # Authorization
    return unless user_allowed?

    # Go
    @one = Idea.find(params[:id])

    if @one.nil?
      status 400
      [Errors::ID_NOT_FOUND].to_json
    else
      @one.score += 1
      if @one.save
        @one.to_json
      else
        status 400
        [Errors::VOTE_IMPOSSIBLE].concat(@one.errors).to_json
      end
    end
  end

  get '/top' do
    Idea.order(:score).limit(5).to_json
  end

  private

  # Check session/User/Auth
  def user_allowed?
    true
  end

end