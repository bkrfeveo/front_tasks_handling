import { Label, Modal, ModalBody, ModalHeader, Select, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { MdEdit } from "react-icons/md";
import api from "../services/api";


const TaskEdit = ({ props}) => {
    const dateUpdated = new Date().toString();
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    
    const [ editTask, setEditTask ] = useState({ 
            title: props?.title, 
            description: props?.description, 
            priority: props?.priority, 
            completed: props?.completed, 
            dueDate: props?.dueDate, 
            updateAt: dateUpdated
        });

    function onCloseModal() {
        setOpenModal(false);
        setEditTask({ 
            title: props.title, 
            description: props.description, 
            priority: props.priority, 
            completed: props.completed, 
            dueDate: props.dueDate, 
            updateAt: dateUpdated
        });
    }

    async function handleEditTask () {
        try {
            setLoading(true);
            await api.put(`/tasks/${props.id}`, editTask);
            console.log('Tache mise a jour avec succes !');
            
        } catch (err) {
           console.error("Mise à jour de la tache echouée : ", err);
        } finally {
            setLoading(false);
            setOpenModal(false);
        }
    }

    return(
        <div>
            <button 
                className="flex flex-row gap-2 items-center py-1.5 px-2.5 text-gray-600 text-left cursor-pointer hover:bg-gray-300 duration-200 w-full"
                onClick={() => setOpenModal(true)}
            >
                <MdEdit className="text-lg" />
                <span>Modifier</span>
            </button>
            <Modal show={openModal} size="md" onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">Modifier une tâche</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="titleInput">Titre de la tache</Label>
                            </div>
                            <TextInput
                                id="titleInput"
                                placeholder="Ex: Presentation projet..."
                                value={editTask.title}
                                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                                required
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="descriptionInput">Description (facultative)</Label>
                            </div>
                            <Textarea 
                                value={editTask.description}
                                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
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
                                    value={editTask.priority}
                                    onChange={(e) => setEditTask({ ...editTask, priority: e.target.value })}
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
                                    value={editTask.dueDate}
                                    onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <button 
                                className={`${loading ? 'pointer-events-none opacity-50' : ''} bg-blue-500 hover:bg-blue-600 duration-200 active:bg-blue-600 text-white font-medium py-2 px-10 text-lg rounded-lg mx-auto`}
                                type="submit"
                                onClick={() => handleEditTask()}
                            >
                                Modifier
                            </button>
                        </div>
                    </div>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default TaskEdit;