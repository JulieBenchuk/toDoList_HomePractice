import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import ToDoList, {TasksType} from "./ToDoList";

export type FilterValuesType = "all" | "come true" | "not yet come true";

function App() {
    let [tasks, setTasks] = useState<Array<TasksType>>([
        {id: v1(), title: "umbrella", isDone: true},
        {id: v1(), title: "sun glasses", isDone: true},
        {id: v1(), title: "JBL", isDone: false},
        {id: v1(), title: "plates", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")
    let tasksForToDoList = tasks;
    if (filter === "come true") {
        tasksForToDoList = tasks.filter(t => t.isDone === true)
    }
    if (filter === "not yet come true") {
        tasksForToDoList = tasks.filter(t => t.isDone === false)
    }
    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }
    const deleteWish = (tID: string) => {
        let deletedTasks = tasks.filter(t => t.id !== tID)
        setTasks(deletedTasks)
    }
    const addWish = (input: string) => {
        let newWish = {id: v1(), title: input, isDone: false}
        tasks = [newWish, ...tasks]
        setTasks(tasks)
    }
    const changeStatus = (tID: string, isDoneStatus: boolean) => {
        let checkedTask = tasks.find(t => t.id === tID)
        if (checkedTask) checkedTask.isDone = isDoneStatus
        setTasks([...tasks])

    }

    return (
        <div className={"App"}>
            <ToDoList listName={"Wish list"}
                      tasks={tasksForToDoList}
                      changeFilter={changeFilter}
                      deleteWish={deleteWish}
                      addWish={addWish}
                      changeStatus={changeStatus}
            />
        </div>
    )
}

export default App