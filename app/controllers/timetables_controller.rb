class TimetablesController < ApplicationController
  before_action :set_timetable, only: [:show, :edit, :update, :destroy, :generate_cells]

  # List all timetables
  def index
    @timetables = Timetable.all.order(:created_at)
  end

  # Show a specific timetable
  def show
    @cells = @timetable.timetable_cells.order(:number) # Load timetable cells for display
  end

  # Form for creating a new timetable
  def new
    @timetable = Timetable.new
  end

  # Create a new timetable
  def create
    @timetable = Timetable.new(timetable_params)
    if @timetable.save
      @timetable.generate_cells # Automatically generate timetable cells after creation
      redirect_to @timetable, notice: 'Timetable created and cells generated successfully.'
    else
      flash.now[:alert] = @timetable.errors.full_messages.to_sentence
      render :new
    end
  end

  # Form for editing a timetable
  def edit
  end

  # Update a timetable
  def update
    if @timetable.update(timetable_params)
      @timetable.generate_cells if params[:regenerate_cells] # Regenerate cells if requested
      redirect_to @timetable, notice: 'Timetable updated successfully.'
    else
      flash.now[:alert] = @timetable.errors.full_messages.to_sentence
      render :edit
    end
  end

  # Delete a timetable
  def destroy
    @timetable.destroy
    redirect_to timetables_path, notice: 'Timetable deleted successfully.'
  end

  # Generate timetable cells dynamically
  def generate_cells
    @timetable.generate_cells
    redirect_to @timetable, notice: 'Timetable cells regenerated successfully.'
  end

  private

  def set_timetable
    @timetable = Timetable.find(params[:id])
  end

  def timetable_params
    params.require(:timetable).permit(:tournament_id, :tournament_venue_id, :row_count)
  end
end
