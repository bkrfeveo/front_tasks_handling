
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { GoIssueClosed } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import api from "../services/api";



const TaskItem = ({ props }) => {

    // console.log(id);
    const [openModal, setOpenModal] = useState(false);
    
    function onCloseModal() {
        setOpenModal(false);
    };

    function onOpenModal() {
        setOpenModal(true);
    }

    const handleMarkUncompletedTask = async ({props}) => {
        try {
            await api.put(`tasks/${props._id}`, {...props, completed: false});
            console.log("Tache marquée comme non terminée");
        } catch (err) {
            console.error("Mis a jour du statut de la tache échoué : ", err);
        }
    };

    return (
        <div>
            <button 
                className="bg-blue-500 flex items-center justify-center gap-4 hover:bg-blue-600 duration-200 active:bg-blue-700 text-white font-medium py-2 px-10 w-full rounded-[10px]"
                onClick={onOpenModal}
            >
                {/* <IoEye className="text-lg" /> */}
                <span>Détail de la tache</span>
            </button>
            <Modal show={openModal} dismissible size="2xl" onClose={onCloseModal} popup>
                <ModalHeader />
                <ModalBody>
                    <h3 className="text-xl font-bold border-b border-gray-600 pb-4 mb-4 text-gray-900 dark:text-white">Détail de la tâche</h3>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-semibold text-gray-200 pb-2">Titre de la tache </h3>
                            <p className="text-gray-300">{props.title}</p>
                        </div>
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-semibold text-gray-200 pb-2">Description de la tache </h3>
                            <p className="text-gray-300">
                                {props.description}
                            </p>
                        </div>
                        <div className="flex flex-row justify-between mt-2 pr-4">
                            <div className="flex flex-col">
                                <h3 className="text-md font-semibold text-gray-200 pb-2">Niveau de priorité </h3>
                                <p className="text-gray-300">
                                    {(props.priority === "faible" || props.priority === "low")&& 'Faible'}
                                    {(props.priority === "moyen" || props.priority === "medium") && 'Moyen'}
                                    {(props.priority === "eleve" || props.priority === "high") && 'Elevé'}
                                </p>
                            </div>
                            <div className="flex flex-col gap-0">
                                <h3 className="text-md font-semibold text-gray-200 pb-2">Date limite </h3>
                                <p className="text-gray-300">
                                    {props.dueDate}
                                    {/* 12 Novembre 2025 */}
                                </p>
                            </div>
                        </div>
                            {props.completed ?
                                (<div className="flex flex-row justify-between w-full items-center">
                                    <div className="flex flex-row gap-2 items-center">
                                        <h3 className="text-md font-semibold text-gray-200">Tache terminée </h3>
                                        <GoIssueClosed className="text-xl text-green-400" />
                                    </div>
                                    <button
                                        className="border border-red-400 hover:bg-red-500/10 w-fit text-white hover:text-white active:text-white duration-200 active:bg-red-600/50 text-xs py-1.5 px-3 rounded-sm"
                                        onClick={() => handleMarkUncompletedTask({props})}
                                    >
                                        Marquez comme non terminée
                                    </button>
                                </div>)
                        
                            :
                                (<div className="flex flex-row gap-2 items-center pb-2">
                                    <h3 className="text-md font-semibold text-gray-200">Tache non terminée </h3>
                                    <IoIosCloseCircleOutline className="text-xl text-red-500" />
                                </div>)
                            }
                    </div>
                </ModalBody>
            </Modal>           
                

        </div>
    );
}

export default TaskItem;