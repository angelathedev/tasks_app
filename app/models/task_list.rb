# frozen_string_literal: true

class TaskList
  Task = Struct.new(:id, :text, :done, keyword_init: true)

  def self.instance
    @instance ||= new
  end

  def initialize
    @seq = 0
    @tasks = {}
    create('Pick up groceries')
    create('Buy new phone case')
    create('Walk the dog')
    create('Cook dinner')
    create('Clean the house')
    create('Wash the car')
    create('Do the laundry')
    create('Buy new shoes')
  end

  def all = @tasks.values

  def create(text)
    @seq += 1
    task = Task.new(id: @seq, text: text.to_s.strip, done: false)
    @tasks[task.id] = task
    task
  end

  def toggle(id)
    t = @tasks[id.to_i]
    return nil unless t

    t.done = !t.done
    t
  end

  def delete(id)
    @tasks.delete(id.to_i)
  end
end
