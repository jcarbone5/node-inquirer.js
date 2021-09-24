const { 
    inquirerMenu, 
    pause, 
    readInput, 
    readTasksToDelete, 
    readTasksToMark 
} = require("./helpers/inquirer");

const { 
    addTask, 
    getTasks, 
    getTasksPendingAndComplete, 
    deleteTask,
    updateTasks,
    readDB,
    saveDB
} = require("./helpers/actions");

const main = async () => {
    let option = '', tasks = [];

    readDB();

    do {
        console.clear();
        
        option = await inquirerMenu();

        switch (option) {
            case '1':
                const description = await readInput("Ingrese una descripción: ");
                addTask(description);

                break;

            case '2':
                getTasks();

                break;

            case '3':
                getTasksPendingAndComplete()

                break;

            case '4':
                getTasksPendingAndComplete(false)

                break;

            case '5':
                tasks = getTasks(true);
                const ids = await readTasksToMark(tasks);
                
                updateTasks(ids);

                break;

            case '6':
                tasks = getTasks(true);
                const id = await readTasksToDelete(tasks);

                deleteTask(id);

                break;
        }

        saveDB();

        await pause();
    } while (option !== '0');
}

main();