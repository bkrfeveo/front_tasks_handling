import { useEffect, useState } from "react";
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
    const [taskCompleted, setTaskCompleted] = useState(false);
    const [markComplete, setMarkComplete] = useState(false);

    
    // Fonction asynchrone pour recuperer tous les taches
    async function fetchTasks() { 
        try {
            // const token = localStorage.getItem('token')
            // console.log(token);
            
            // Activer le loading avant la demande
            setLoading(true);
            const response = await api.get('/tasks');
            console.log(response.data.tasks);
            setTasks(response.data.tasks);
        } catch (err) {
            console.error("Erreur lors du recuperation des taches : ", err);
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
             useEffect(() => {
                fetchTasks();
            }, []);
        } catch (err) {
            console.error("Supression de la tache echouée : ", err);
        } finally {
            setLoading(false);
        }
    };

    const handleMarkCompletedTask = async ({task}) => {
        try {
            setMarkComplete(true);
            setLoading(true);
            await api.put(`tasks/${task._id}`, {...task, completed: markComplete});
            console.log("Tache marquée comme terminée");
        } catch (err) {
            console.error("Mis a jour du statut de la tache échoué : ", err);
        } finally {
            setLoading(false);
        }
        // console.log(taskCompleted);
    }
    
    // Filtrage et rechercher de taches
    const filteredTasks = tasks.filter((task, index) => {
        // recuperer les donnees recherchees tout en prenant en compte la sensibilite a la casse
        const matchesSearch = task.title.toLowerCase().includes(searchTask.toLowerCase()) 
        && task.priority.toLowerCase().includes(levelPriority.toLowerCase())
        // && task.completed.toString().includes(taskCompleted.toString());

        return matchesSearch;
    });

    

    function handleReset () {
        setLevelPriority("");
        setSearchTask("");
        setTaskCompleted(false);
        // setFilterTasks(tasks);
    };
    

    return (
        <div className="flex flex-col gap-5 w-full">
            <h2 className="text-6xl font-semibold text-gray-700 my-6">Gestion des taches</h2>
            <div className="flex flex-col gap-3 mb-8">
                <h2 className="text-gray-700 text-left font-medium text-xl">Filtrer vos recherches</h2>
                <div className="flex md:flex-row flex-col gap-3 w-full">
                    <div className="grid gap-4 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
                        <select
                            className="bg-transparent w-full rounded-lg border-gray-400"
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
                        <select
                            className="bg-transparent w-full rounded-lg border-gray-400"
                            value={taskCompleted}
                            onChange={(e) => setTaskCompleted(e.target.checked)}
                            name="filterPriority"
                            id="filterPriority"
                        >
                            <option>Statut tache</option>
                            <option value={true}>Terminé</option>
                            <option value={false}>Non terminé</option>
                        </select>
                        <input
                            className="bg-transparent w-full rounded-lg border-gray-400"
                            value={searchTask}
                            onChange={(e) => setSearchTask(e.target.value)}
                            type="search"
                            placeholder="Recherchez ici"
                            name="searchTask"
                            id="searchTask"
                        />
                        <input
                        className="border border-blue-400 hover:bg-blue-500 hover:text-white active:text-white duration-200 active:bg-blue-600 text-gray-700 font-medium py-1.5 px-6 rounded-[10px]"
                        type="reset"
                        onClick={handleReset}
                        value="Reinitialiser"
                        />
                    </div>
                    <TaskForm />
                </div>
            </div>
            {loading && (
                <div className="text-xl font-medium w-full flex justify-center mt-16 text-center">
                    <h3>Patientez...</h3>
                </div>
            )}

            {!loading && filteredTasks.length === 0 && (
                <div className="text-xl font-medium w-full flex justify-center mt-16 text-center">
                    <h3>Aucune tache disponible. Veuillez en ajouter.</h3>
                </div>
            )}
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 flex-col gap-6 w-full justify-center">
                {(!loading && filteredTasks.length !== 0) && filteredTasks.map((task, index) => (
                <div 
                    className="bg-gray-200 rounded-lg px-4 py-8 flex flex-row items-start justify-between gap-4"
                    key={index} 
                >
                    <div className="flex flex-col gap-8 justify-between w-full h-full">
                        <div className="flex flex-row justify-between items-start w-full">
                            <div className="flex flex-col gap-4 w-full">
                                <h2 className="flex flex-col text-2xl font-semibold text-gray-800 justify-start text-left">
                                    <span>{task.title}</span>
                                </h2>
                                <h2 className="flex flex-col justify-start text-left">
                                    <span className="font-bold text-gray-700">Description </span>
                                    <span>{task.description}</span>
                                </h2>
                                {task.priority === 'faible' &&
                                    <h2 className=" flex flex-row gap-2 justify-start text-left font-medium text-blue-500">
                                        <span className="font-medium text-gray-700">Priorité</span>
                                        <span>Faible</span>
                                    </h2>
                                }
                                {task.priority === 'moyen' &&
                                    <h2 className="flex flex-row gap-2 justify-start text-left font-medium text-green-500">
                                        <span className="font-medium text-gray-700">Priorité</span>
                                        <span>Moyen</span>
                                    </h2>
                                }
                                {task.priority === 'eleve' &&
                                    <h2 className="flex flex-row gap-2 justify-start text-left font-medium text-red-500">
                                        <span className="font-medium text-gray-700">Priorité</span>
                                    <span>Elevé</span>
                                    </h2>
                                }
                                <button
                                    className="border border-blue-400 hover:bg-blue-500/10 w-fit hover:text-black active:text-black duration-200 active:bg-blue-600/30 text-gray-700 text-sm py-1.5 px-3 rounded-sm"
                                    onClick={() => handleMarkCompletedTask(task={task})}
                                >
                                    Marquez comme terminée
                                </button>
                            </div>
                            <Popover
                                arrow={false}
                                clearTheme={{ base: true }}
                                className="rounded-lg"
                                aria-labelledby="default-popover"
                                content={
                                    <div className="flex flex-col w-fit justify-start bg-gray-200 no-underline">
                                        <TaskEdit props={task} />
                                        <button 
                                            onClick={() => handleDeleteTask(task._id)}
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
                        <TaskItem props={task} />
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default TaskList;