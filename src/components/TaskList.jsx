import { useEffect, useState } from "react";
import api from "../services/api";
import TaskForm from "./TaskForm";
import { Popover } from "flowbite-react";
import { SlOptionsVertical } from "react-icons/sl";
import { MdEdit, MdDelete } from "react-icons/md";
import TaskItem from "./TaskItem";
import TaskEdit from "./TaskEdit";



const TaskList = () => {
    const [ tasks, setTasks ] = useState([]);
    const [loading, setLoading] = useState(false);
    // console.log(tasks);
    
    // Fonction asynchrone pour recuperer tous les taches
    async function fetchTasks() { 
        try {
            const response = await api.get('/tasks');
            // console.log(response.data.tasks);
            setTasks(response.data.tasks);
        } catch (err) {
            console.error("Erreur cote client : ", err);
        }
    };
    // useEffect pour qu'au premier recharge de la page qu'il affiche tous les taches
    useEffect(() => {
        fetchTasks();
    }, [tasks]);

    async function handleDeleteTask(id) {
        try {
            setLoading(true);
            await api.delete(`tasks/${id}`);
            console.log("Tache suprimee avec succes !");
        } catch (err) {
           console.error("Supression de la tache echouée : ", err);
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-6xl mb-10">Liste des taches</h2>
            <div className="flex flex-col gap-2">
                {tasks.map((task) => (
                    <div key={task.id} className="bg-gray-200 rounded-lg p-2 flex flex-row justify-between gap-4">
                        <h2>{task.title}</h2>
                       <Popover
                            arrow={false}
                            clearTheme={{ base: true }}
                            className="rounded-lg"
                            aria-labelledby="default-popover"
                            content={
                                <div className="flex flex-col justify-start bg-gray-200 no-underline">
                                    <TaskItem props={task} />
                                    <TaskEdit props={task} />
                                    <button 
                                        onClick={() => handleDeleteTask(task.id)}
                                        className="flex flex-row gap-2 items-center py-1.5 px-2.5 text-gray-600 text-left cursor-pointer hover:bg-gray-300 duration-200 w-full"
                                    >
                                        <MdDelete className="text-lg" />
                                        <span>Supprimer</span>
                                    </button>
                                </div>
                            }
                        >
                            <button>
                                <SlOptionsVertical />
                            </button>
                        </Popover>
                    </div>
                ))}
            </div>
            <TaskForm />
        </div>
    )
}

export default TaskList;