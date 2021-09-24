const inquirer = require("inquirer");
require("colors");

const questions = [
    {
        type: "list",
        name: "option",
        message: "¿Qué desea hacer?",
        choices: [
            {
                value: "1",
                name: `${ '1.'.green } Crear una tarea`
            },
            {
                value: "2",
                name: `${ '2.'.green } Listar tareas`
            },
            {
                value: "3",
                name: `${ '3.'.green } Listar tareas completadas`
            },
            {
                value: "4",
                name: `${ '4.'.green } Listar tareas pendientes`
            },
            {
                value: "5",
                name: `${ '5.'.green } Completar tarea(s)`
            },
            {
                value: "6",
                name: `${ '6.'.green } Borrar tarea`
            },
            {
                value: "0",
                name: `${ '0.'.green } Salir`
            }
        ]
    }
];

const inquirerMenu = async () => {
    const { option } = await inquirer.prompt(questions);
    return option;
}

const pause = async () => {
    const question = [{
        type: "input",
        name: "enter",
        message: `Presione ${'ENTER'.green} para continuar`
    }];

    console.log();

    await inquirer.prompt(question);
}

const readInput = async (message) => {
    const question = [{
        type: "input",
        name: "description",
        message,
        validate: (value) => {
            if(value.length === 0) {
                throw Error('Debe especificar una descripción');
            }

            return true
        }
    }];

    const { description } = await inquirer.prompt(question);
    return description;
}

const readTasksToDelete = async (tasks) => {    
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${ i + 1 } ${ task.description }`
        }
    });

    choices.unshift({
        value: "0",
        name: "0 Cancelar" 
    })

    const question = {
        type: "list",
        name: "id",
        message: "Borrar tareas",
        choices
    };

    const { id } = await inquirer.prompt(question);
    return id;
}

const readTasksToMark = async (tasks) => {    
    const choices = tasks.map((task, i) => {
        return {
            value: task.id,
            name: `${ i + 1 } ${ task.description }`,
            checked: task.done ? true : false
        } 
    });

    const question = {
        type: "checkbox",
        name: "ids",
        message: "Marcar tareas",
        choices
    };

    const { ids } = await inquirer.prompt(question);
    return ids;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    readTasksToDelete,
    readTasksToMark
}