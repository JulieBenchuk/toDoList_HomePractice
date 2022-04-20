import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    tasks: Array<TasksType>
    listName: string
    changeFilter: (value: FilterValuesType) => void
    deleteWish: (id: string) => void
    addWish: (input: string) => void
    changeStatus: (tID: string, isDoneStatus: boolean) => void
}

function ToDoList(props: TodolistPropsType) {
    const [input, setInput] = useState("")
    const [error, setError] = useState("")
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
       let newInput = e.currentTarget.value
        setInput(newInput)
        setError("")
    }
    const onClickButton = () => {
        let pureWish = input.trim()
        pureWish !=="" ? props.addWish(input) : setError("Wrong input!")
        setInput("")
    }
    const onEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key==="Enter" && onClickButton()}
    return (
        <div>
            <div>{props.listName}</div>
            <input value={input} onChange={onChangeInputHandler} onKeyPress={onEnterPress}/>
            <button onClick={onClickButton}>+</button>
            <div>{error}</div>
            <ul>
                {props.tasks.map(t => {
                    const onClickDeleteHandler = ()=>{
                        props.deleteWish(t.id)
                    }
                    const onChangeStatus = (e: ChangeEvent<HTMLInputElement>)=> {
                        props.changeStatus(t.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone} onChange={onChangeStatus}/>  <span>{t.title}</span>
                            <button onClick={onClickDeleteHandler}>x</button>
                        </li>
                    )
                })}
            </ul>
            <button onClick={() => props.changeFilter("all")}>All</button>
            <button onClick={() => props.changeFilter("come true")}>Come true</button>
            <button onClick={() => props.changeFilter("not yet come true")}>Not yet come true</button>

        </div>
    )
}

export default ToDoList