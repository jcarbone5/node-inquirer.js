const fs = require("fs");
const { v4: uuid } = require("uuid");
require("colors");

const path = "./db/db.json";
let tasks = [];

const addTask = (description = '') => {
    const newTask = {
        id: uuid(),
        description,
        done: false
    }

    tasks.push(newTask);
}

const getTasks = (data = false) => {
    if (data) return tasks;
    
    tasks.forEach((task, i) => {
        const index = i + 1;
        const state = task.done ? 'Completada'.green : 'Pendiente'.red;
        const description = task.description;

        console.log(`${index} ${description} - ${state}`);
    });
}

const getTasksPendingAndComplete = (complete = true) => {
    let indexCount = 0

    tasks.forEach((task, i) => {
        const state = task.done ? 'Completada'.green : 'Pendiente'.red;
        const description = task.description;

        if (complete) {
            if (task.done) {
                indexCount += 1
                console.log(`${indexCount} ${description} - ${state}`);
            }
        } else {
            if (!task.done) {
                indexCount += 1
                console.log(`${indexCount} ${description} - ${state}`);
            }
        }
    });
}

const deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
}

const updateTasks = (ids = []) => {
    ids.forEach(id => {
        tasks.forEach((task, i) => {
            if(task.id === id) {
                task.done = true;
            }
        })
    });

    tasks.forEach(task => {
        if(!ids.includes(task.id)) {
            task.done = false;
        }
    });
}

const readDB = () => {
    if (fs.existsSync(path)) {
        const tasksData = fs.readFileSync(path)
        tasks = JSON.parse(tasksData);
    } else {
        fs.writeFileSync(path, JSON.stringify(tasks), 'utf-8');
    }
}

const saveDB = () => {
    fs.existsSync(path) && fs.writeFileSync(path, JSON.stringify(tasks));
}

module.exports = {
    addTask,
    getTasks,
    getTasksPendingAndComplete,
    deleteTask,
    updateTasks,
    readDB,
    saveDB
}
