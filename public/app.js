const API_BASE = '';

class TasksApp {
    constructor() {
        this.tasks = [];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadTasks();
    }

    setupEventListeners() {
        const addBtn = document.getElementById('addBtn');
        const newTaskInput = document.getElementById('newTaskInput');

        addBtn.addEventListener('click', () => this.addTask());
        newTaskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
    }

    async loadTasks() {
        try {
            const response = await fetch(`${API_BASE}/tasks`);
            this.tasks = await response.json();
            this.render();
            this.updateStats();
        } catch (error) {
            console.error('Error loading tasks:', error);
        }
    }

    async addTask() {
        const input = document.getElementById('newTaskInput');
        const text = input.value.trim();

        if (!text) return;

        try {
            const response = await fetch(`${API_BASE}/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            });

            if (response.ok) {
                const newTask = await response.json();
                this.tasks.push(newTask);
                input.value = '';
                this.render();
                this.updateStats();
            }
        } catch (error) {
            console.error('Error adding task:', error);
        }
    }

    async toggleTask(id) {
        try {
            const response = await fetch(`${API_BASE}/tasks/${id}/toggle`, {
                method: 'PATCH'
            });

            if (response.ok) {
                const updatedTask = await response.json();
                const taskIndex = this.tasks.findIndex(t => String(t.id) === String(id));
                if (taskIndex !== -1) {
                    this.tasks[taskIndex] = updatedTask;
                    this.render();
                    await this.updateStats();
                }
            }
        } catch (error) {
            console.error('Error toggling task:', error);
        }
    }

    async deleteTask(id) {
        try {
            const response = await fetch(`${API_BASE}/tasks/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.tasks = this.tasks.filter(t => String(t.id) !== String(id));
                this.render();
                await this.updateStats();
            }
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }

    async updateStats() {
        try {
            const response = await fetch(`${API_BASE}/tasks/stats`);
            const stats = await response.json();

            document.getElementById('total').textContent = stats.total;
            document.getElementById('done').textContent = stats.done;
            document.getElementById('notDone').textContent = stats.not_done;
        } catch (error) {
            console.error('Error updating stats:', error);
        }
    }

    render() {
        const taskList = document.getElementById('taskList');

        if (this.tasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <p>🎯 No tasks yet!</p>
                    <small>Add your first task above to get started</small>
                </div>
            `;
            return;
        }

        taskList.innerHTML = this.tasks.map(task => `
            <div class="task-item ${task.done ? 'done' : ''}" data-task-id="${task.id}">
                <input
                    type="checkbox"
                    class="task-checkbox"
                    ${task.done ? 'checked' : ''}
                    data-task-id="${task.id}"
                >
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <button class="delete-btn" data-task-id="${task.id}">
                    Delete
                </button>
            </div>
        `).join('');

        // Add event listeners after rendering
        document.querySelectorAll('.task-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const taskId = e.target.dataset.taskId;
                this.toggleTask(taskId);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.target.dataset.taskId;
                this.deleteTask(taskId);
            });
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

const app = new TasksApp();