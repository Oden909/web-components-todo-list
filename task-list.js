class TaskList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                ${this._getStyles()}
            </style>
            <div class="task-list-container">
                <h2>Список задач</h2>
                <input class="task-input" type="text" placeholder="Добавьте новую задачу..." />
                <ul class="task-list"></ul>
            </div>
        `;
    }

    _getStyles() {
        return `
            :root {
                --bg-color: #111;
                --text-color: #ccc;
                --highlight-color: #339933;
                --shadow-color: #3aaa3a;
                --completed-color: #999;
                --border-color: #3aaa3a;
            }
    
            body {
                margin: 0;
                padding: 0;
                font-family: Arial, sans-serif;
                background-color: var(--bg-color);
                color: var(--text-color);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
            }
    
            task-list {
                background-color: var(--bg-color);
                color: var(--text-color);
                border: 2px solid var(--border-color);
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 0 10px var(--shadow-color);
                width: 400px;
            }
    
            .task-list-container {
                margin-bottom: 20px;
            }
    
            .task-list-container h2 {
                color: var(--highlight-color);
                text-align: center;
                margin-bottom: 10px;
            }
    
            .task-input {
                width: calc(100% - 20px);
                margin: 0 auto;
                display: block;
                padding: 10px;
                border-radius: 5px;
                border: 1px solid var(--border-color);
                background-color: #333;
                color: var(--text-color);
                margin-bottom: 20px;
            }
    
            .task-input:focus {
                outline: none;
                border-color: var(--highlight-color);
            }
    
            .task-list {
                list-style: none;
                margin: 0;
                padding: 0;
            }
    
            .task-item {
                display: flex;
                justify-content: space-around;
                align-items: center;
                background-color: #222;
                padding: 10px 0  10px 0;
                margin-bottom: 10px;
                border-radius: 5px;
                box-shadow: 0 0 5px var(--shadow-color);
                width: 100%;
                word-wrap: break-word;
                flex-wrap: wrap;
            }

            .task-item .task-text {
                flex: 1;
                word-break: break-word;
                margin-left: 10px;
            }
    
            .task-item.completed {
                background-color: #333;
                text-decoration: line-through;
                color: var(--completed-color);
                opacity: 0.7;
                transition: background-color 0.3s ease, color 0.3s ease, opacity 0.3s ease;
            }
    
            .task-item button {
                background-color: transparent;
                color: var(--highlight-color);
                border: none;
                cursor: pointer;
                font-size: 18px;
                margin-left: 10px;
                flex-shrink: 0;
            }
    
            .task-item button:hover {
                color: var(--shadow-color);
            }
    
            .task-item .check-btn {
                font-size: 20px;
                cursor: pointer;
                color: var(--highlight-color);
            }
    
            .task-item .check-btn.completed {
                color: var(--completed-color);
            }
        `;
    }

    addEventListeners() {
        const input = this.shadowRoot.querySelector('.task-input');
        input.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                const taskText = input.value.trim();
                if (taskText) {
                    this.addTask(taskText);
                    input.value = '';
                }
            }
        });
    }

    addTask(taskText) {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <button class="delete-btn">❌</button>
            <span class="check-btn">✔️</span>
        `;

        const deleteBtn = taskItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            this.removeTask(taskItem);
        });

        const checkBtn = taskItem.querySelector('.check-btn');
        checkBtn.addEventListener('click', () => {
            this.toggleTaskCompletion(taskItem);
        });

        const taskList = this.shadowRoot.querySelector('.task-list');
        taskList.appendChild(taskItem);
    }

    removeTask(taskItem) {
        taskItem.remove();
    }

    toggleTaskCompletion(taskItem) {
        taskItem.classList.toggle('completed');
    }
}

customElements.define('task-list', TaskList);
