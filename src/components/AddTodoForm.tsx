import React, {useState} from "react";
import {ToastContainer, Bounce, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddTodoFormProps {
    addTodo: (title: string, desc: string) => void;
}

/*
 * AddTodoForm: Create two input fields for title, and description string fields
 * As well as a submit button which creates the new To Do via addTodo 
 */
function AddTodoForm({addTodo}: AddTodoFormProps) {
    const [title, setTitle] = useState<string>('');
    const [desc, setDesc] = useState<string>('');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addTodo(title, desc);
        setTitle('');
        setDesc('');
        var toasterMesage = "Added TODO with title [" + title + "]";
        toast(toasterMesage, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    value={title}
                    type="text"
                    placeholder="Provide a title for the new To Do"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                    value={desc}
                    placeholder="Briefly describe the To Do task"
                    onChange={(e) => setDesc(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add To Do</button>
            <ToastContainer/>
        </form>
    );
}

export default AddTodoForm;