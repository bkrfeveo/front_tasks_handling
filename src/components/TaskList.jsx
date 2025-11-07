import { useEffect, useMemo, useState } from "react";
import api from "../services/api";
import TaskForm from "./TaskForm";
import { Popover } from "flowbite-react";
import { SlOptionsVertical } from "react-icons/sl";
import { MdDelete } from "react-icons/md";
import TaskItem from "./TaskItem";
import TaskEdit from "./TaskEdit";



const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTask, setSearchTask] = useState("");
    const [loading, setLoading] = useState(false);
    const [levelPriority, setLevelPriority] = useState("");
    const [taskCompleted, setTaskCompleted] = useState("");

    
    
    // Fonction asynchrone pour recuperer tous les taches
    async function fetchTasks() { 
        try {
            // Activer le loading avant la demande
            setLoading(true);
            const response = (await api.get('/tasks'));
            // console.log(response);
            setTasks(response.data.tasks);
        } catch (err) {
            console.error("Erreur cote client : ", err);
        } finally {
            setLoading(false);
        }
    };
    // useEffect pour qu'au premier recharge de la page qu'il affiche tous les taches
    useEffect(() => {
        fetchTasks();
    }, []);
    
    // Fonction asynchrone pour suprimer une tache
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

    const handleCompletedTask = (e) => {
        setTaskCompleted(e.target.value);
        console.log(taskCompleted);
    }
    
    // Filtrage et rechercher de taches
    const filteredTasks = tasks.filter((task) => {
        // recuperer les donnees recherchees tout en prenant en compte la sensibilite a la casse
        const matchesSearch = task.title.toLowerCase().includes(searchTask.toLowerCase()) 
        && task.priority.toLowerCase().includes(levelPriority.toLowerCase()) 
        // console.log(matchesSearch);
        
        return matchesSearch;
    });

    

    function handleReset () {
        setLevelPriority("");
        setSearchTask("")
        // setFilterTasks(tasks);
    };
    

    return (
        <div className="flex flex-col gap-5 w-full">
            <h2 className="text-6xl mb-10">Liste des taches</h2>
            <div className="flex flex-col gap-3 mb-8">
                <h3 className="text-gray-700 text-left font-medium text-xl">Filtrer vos recherches</h3>
                <div className="flex md:flex-row flex-col gap-3">
                    <select
                        className="bg-transparent md:w-1/3 rounded-lg border-gray-400"
                        value={levelPriority}
                        onChange={(e) => setLevelPriority(e.target.value)}
                        name="filterPriority"
                        id="filterPriority"
                    >
                        <option value="">Niveau de priorite</option>
                        <option value="faible">Faible</option>
                        <option value="moyen">Moyen</option>
                        <option value="eleve">Elevé</option>
                    </select>
                    <input 
                        className="bg-transparent md:w-1/3 rounded-lg border-gray-400"
                        value={searchTask}
                        onChange={(e) => setSearchTask(e.target.value)}
                        type="search" 
                        placeholder="Recherchez ici"
                        name="searchTask" 
                        id="searchTask" 
                    />
                    <input 
                        className="md:w-1/3 bg-blue-500 hover:bg-blue-600 duration-200 active:bg-blue-600 text-white font-medium py-1.5 px-6 rounded-[10px]"
                        type="reset"
                        onClick={handleReset} 
                        value="Reinitialiser" 
                    />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                {!loading ?
                    filteredTasks.map((task) => (
                        <div key={task.id} className="bg-gray-200 rounded-lg p-2 flex flex-row justify-between gap-4">
                            <div className="flex flex-row justify-between w-full">
                                <h2>{task.title}</h2>
                                <h2>{task.dueDate}</h2>
                                {task.priority === 'faible' &&
                                    <h2 className="text-right font-medium text-blue-500">Faible</h2>
                                }
                                {task.priority === 'moyen' &&
                                    <h2 className="text-right font-medium text-green-500">Moyen</h2>
                                }
                                {task.priority === 'eleve' &&
                                    <h2 className="text-right font-medium text-red-500">Elevé</h2>
                                }

                                <label 
                                    className="flex flex-row gap-2 items-center"
                                    htmlFor="taskCompleted"
                                >
                                    <span>Complete</span>
                                    <input 
                                        className="rounded-xs"
                                        value={taskCompleted}
                                        onClick={handleCompletedTask}
                                        type="checkbox" 
                                        name="completed" 
                                        id="taskCompleted" 
                                    />
                                </label>
                            </div>
                        <Popover
                                arrow={false}
                                clearTheme={{ base: true }}
                                className="rounded-lg"
                                aria-labelledby="default-popover"
                                content={
                                    <div className="flex flex-col w-fit justify-start bg-gray-200 no-underline">
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
                    ))
                :
                    <div className="text-lg font-medium flex items-center justify-center mb-6 text-center">
                        <h3>Patientez...</h3>
                    </div>
                }
            </div>
            <TaskForm />
        </div>
    )
}

export default TaskList;