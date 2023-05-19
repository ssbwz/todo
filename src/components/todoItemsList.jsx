//react
import React, { useEffect, useState } from 'react';
// storage
import { GlobalState } from '../storage/GlobalState';

// style
import './style/todoItemsList.css'
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';

import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import Checkbox from '@mui/material/Checkbox';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';

import { Grid } from '@mui/material';
// initializing id of the todo items
var itemId = 0;

// Create a shorthand Hook for using the GlobalState
const useGlobalState = () => React.useContext(GlobalState);


function TodoItemsList() {

    const [text, setText] = useState();
    const [updatedText, setUpdatedText] = useState();
    const { todoList } = useGlobalState();

    const [vTodoField, setVTodoField] = useState()


    useEffect(() => {
        // changing the height of the navbar based on the size of the page
        var navbar = document.querySelector('.navbar');
        var pageHeight = document.querySelector('.App').offsetHeight;
        var pageWidth = document.querySelector('.App').offsetWidth;

        var maxHeight = window.innerHeight;

        if (pageWidth > 541) {
            if (pageHeight > maxHeight) {
                navbar.style.height = '100%';
            } else {
                navbar.style.height = '98.2vh';
            }
        }

    }, [todoList])


    // adding item function
    function addItem(e) {
        // preventing the default event when rendering the page
        e.preventDefault()

        //validation
        if (text === undefined || text.trim() === '') {
            setVTodoField('please fill the todo field')
            return
        }
        if (itemId === 22) {
            setVTodoField("You can't add more than 22 tasks")
            return
        }
        // initializing new item
        const newItem =
        {
            id: ++itemId,
            text: text,
            checked: false,
            editable: false
        }

        // adding the new item in the todo list
        const updatedList = [...todoList, newItem]

        // saving the updated todo list
        updateToDOList(updatedList)

        // adding styling when the list count is one
        if (updatedList.length === 1) {
            document.getElementById("todoList").style.marginTop = '10px'
            document.getElementById("todoList").style.padding = '10px 0 10px 0'
        }
        setVTodoField()
    }


    // removing item from the todo list function
    function removeItem(e, id) {
        // preventing the default event when rendering the page
        e.preventDefault()
        //filtering the items and return all of the items expect the selected item
        const updatedList = todoList.filter((item) => item.id !== id);
        // saving the updated todo list
        updateToDOList(updatedList)

        // removing styling when the list count is 0
        if (updatedList.length === 0) {
            document.getElementById("todoList").style.padding = '0'
            document.getElementById("todoList").style.marginTop = '0'
        }
    }

    // check item from the todo list function
    function checkItem(checked, id) {
        //Updating the item check field
        todoList.forEach((item) => {
            if (item.id === id) {
                item.checked = checked;
            }
        });

        // saving the updated todo list
        updateToDOList(todoList)
    }


    // updating item function
    function updatingText(e, updatedItem) {
        // preventing the default event when rendering the page
        e.preventDefault()

        // turning th editable mode off
        switchInputType(e, updatedItem.id)

        //Updating the item check field
        todoList.forEach((item) => {
            if (item.id === updatedItem.id) {
                //validation
                if (updatedText !== undefined) {
                    if (updatedText.trim() !== '') {
                        item.text = updatedText;
                    }
                }
            }
        });

        // saving the updated todo list
        updateToDOList(todoList)
    }

    // replace the todo item from text to be editable
    function switchInputType(e, id) {
        // preventing the default event when rendering the page
        e.preventDefault()
        // replace the todoItem with editable todoItem
        todoList.forEach((item) => {
            if (item.id === id) {
                item.editable = !item.editable;
            }
        });
        // saving the updated todo list
        updateToDOList(todoList)
    }

    // updating the todo list by setting the the GlobalState
    function updateToDOList(updateToDOList) {
        // saving the updated todo list
        GlobalState.set({
            todoList: updateToDOList,
        });
    }

    return <>
        <Grid container
            justifyContent={'center'}
            className='todoItemsList'
        >

            <Grid item >
                <FormControl error variant="standard">
                    <TextField
                        id="outlined-textarea"
                        label="Todo"
                        placeholder="Add todo task"
                        onChange={e => setText(e.target.value)}
                        size='small'
                    />

                    <FormHelperText id="component-error-text">{vTodoField}</FormHelperText>
                </FormControl>
                <IconButton className='addTodoItemButton' aria-label="add" onClick={addItem} >
                    <AddCircleIcon htmlColor='#6665dd' fontSize="large" />
                </IconButton>
            </Grid>

            <Grid container
                justifyContent={'center'}
                className='todoList'
                id='todoList'>
                {todoList.map((item) => {
                    if (item.editable !== true) {
                        return (
                            <Grid container
                                margin={0.4}
                                className='todoItem'
                                key={item.id}>

                                <Grid item lg={8} sm={12} xs={12} md={12}>
                                    <Checkbox checked={item.checked} onChange={e => checkItem(e.target.checked, item.id)} />
                                    {item.text}
                                </Grid>

                                <Grid item lg={4} sm={12} xs={12} md={12}>
                                    <IconButton aria-label="edit" onClick={e => switchInputType(e, item.id)} >
                                        <ModeEditOutlineOutlinedIcon htmlColor='#6665dd' />
                                    </IconButton>
                                    <IconButton aria-label="delete" onClick={e => removeItem(e, item.id)}>
                                        <DeleteForeverOutlinedIcon htmlColor='#6665dd' />
                                    </IconButton>
                                </Grid>

                            </Grid>
                        )
                    }
                    else {
                        return <>
                            <Grid item
                             lg={11} sm={11} xs={11} md={11}>
                                <Grid container 
                                margin={1} 
                                className='todoItemEditable'
                                 key={item.id}>

                                    <Grid item lg={8} sm={12} xs={12} md={12}>
                                        <Checkbox checked={item.checked} onChange={e => checkItem(e.target.checked, item.id)} />
                                        <TextField id="standard-basic"
                                            label="todo task"
                                            multiline
                                            defaultValue={item.text} onChange={e => setUpdatedText(e.target.value)} variant="standard" />
                                    </Grid>

                                    <Grid item lg={4} sm={12} xs={12} md={12}>
                                        <IconButton aria-label="edit" onClick={e => updatingText(e, item)}>
                                            <SaveAltOutlinedIcon htmlColor='#6665dd' />
                                        </IconButton>
                                        <IconButton aria-label="delete" onClick={e => removeItem(e, item.id)}>
                                            <DeleteForeverOutlinedIcon htmlColor='#6665dd' />
                                        </IconButton>
                                    </Grid>

                                </Grid>
                            </Grid>
                        </>
                    }
                }
                )}
            </Grid>

        </Grid>
    </>
}

export default TodoItemsList;
