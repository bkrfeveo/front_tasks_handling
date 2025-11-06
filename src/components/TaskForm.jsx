import { Button, Checkbox, Label, Modal, ModalBody, ModalHeader, Select, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import api from "../services/api";

export default function TaskForm() {
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorTitle, setErrorTitle] = useState(false);
    const dateCreated = new Date().toString();
    
    const [ newTask, setNewTask ] = useState({ 
        title: "", 
        description: "", 
        priority: "", 
        completed: false, 
        dueDate: "", 
        createdAt: dateCreated 
    });


    function onCloseModal() {
        setOpenModal(false);
        setNewTask({ 
            title: "", 
            description: "", 
            priority: "", 
            completed: false, 
            dueDate: "", 
            createdAt: "" 
        });
    }

    async function handleSubmit () {
        try {
            // console.log(newTask);
            if (!newTask.title) {
                setErrorTitle(true);
            } else {
                setLoading(true);
                setErrorTitle(false);
                await api.post('/tasks', newTask);
                setNewTask({ 
                    title: "", 
                    description: "", 
                    priority: "", 
                    completed: false, 
                    dueDate: "", 
                    createdAt: "" 
                });
            }

        } catch(err) {
            console.error("Ajout de nouvelle tache echouée : ", err);
        } finally {
            setLoading(false);
            errorTitle ? setOpenModal(false) : setOpenModal(true)
        }
    }

    return (
        <div>
            <button 
                className="bg-blue-500 hover:bg-blue-600 duration-200 active:bg-blue-600 text-white font-medium py-2 px-10 w-full text-lg rounded-[10px] mx-auto"
                onClick={() => setOpenModal(true)}
            >Ajouter une tâche</button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Ajouter une nouvelle tâche</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="titleInput">Titre de la tache *</Label>
                            </div>
                            <TextInput
                                id="titleInput"
                                placeholder="Ex: Presentation projet..."
                                value={newTask.title}
                                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                                required
                            />
                            {errorTitle && <p className="text-red-500 mt-2">Le titre est requis</p>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="descriptionInput">Description (facultative)</Label>
                            </div>
                            <Textarea 
                                value={newTask.description}
                                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                                id="descriptionInput" 
                                rows={3}
                            ></Textarea>
                        </div>
                        <div className="flex flex-row gap-4 justify-between">
                            <div className="w-1/2">
                                <div className="mb-2 block">
                                    <Label htmlFor="priorityInput">Niveau de priorité</Label>
                                </div>
                                <Select
                                    id="priorityInput"
                                    value={newTask.priority}
                                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                                >
                                    <option value="">Selectionner</option>
                                    <option value="low">faible</option>
                                    <option value="medium">moyen</option>
                                    <option value="high">élevé</option>
                                </Select>
                            </div>
                            <div className="w-1/2">
                                <div className="mb-2 block">
                                    <Label htmlFor="dueDateInput">Date limite</Label>
                                </div>
                                <input
                                    type="date"
                                    id="dueDateInput"
                                    className="border-gray-300 bg-gray-50 rounded-lg p-2 text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                                    value={newTask.dueDate}
                                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <button 
                                className={`${loading ? 'pointer-events-none opacity-50' : ''} bg-blue-500 hover:bg-blue-600 duration-200 active:bg-blue-600 text-white font-medium py-2 px-10 text-lg rounded-lg mx-auto`}
                                type="submit"
                                onClick={() => handleSubmit()}
                            >
                                {!loading ? 'Ajouter' : 'Patientez...'}
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    );
}