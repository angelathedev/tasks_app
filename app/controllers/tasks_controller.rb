class TasksController < ApplicationController
    def index
      render json: TaskList.instance.all.map { |t|
        { id: t.id, text: t.text, done: t.done }
      }
    end
  
    def create
      text = (params[:text] || params.dig(:task, :text)).to_s
      return render json: { error: "text is required" }, status: 422 if text.strip.empty?
      t = TaskList.instance.create(text)
      render json: { id: t.id, text: t.text, done: t.done }, status: :created
    end
  
    def toggle
      t = TaskList.instance.toggle(params[:id])
      return render json: { error: "not found" }, status: 404 unless t
      render json: { id: t.id, text: t.text, done: t.done }
    end
  
    def destroy
      deleted = TaskList.instance.delete(params[:id])
      return head :not_found unless deleted
      head :no_content
    end

    def stats
      tasks = TaskList.instance.all
      render json: {
        total: tasks.count,
        done: tasks.count { |t| t.done },
        not_done: tasks.count { |t| !t.done }
      }
    end
  end