
import { Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { IoEye } from "react-icons/io5";
import { GoIssueClosed } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import TaskEdit from "./TaskEdit";



const TaskItem = ({ props }) => {

    const [openModal, setOpenModal] = useState(true);
    // console.log(id);
    

    function getTaskID () {
        // console.log(props.id, props.title);
        setOpenModal(true);
    }

    return (
        <>
        <button 
            className="flex flex-row gap-2 items-center py-1.5 px-2.5 text-gray-600  text-left cursor-pointer hover:bg-gray-300 duration-200 w-full"
            onClick={() => getTaskID()}
        >
            <IoEye className="text-lg" />
            <span>Détail</span>
        </button>
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
            <ModalHeader>Détail de la tâche</ModalHeader>
            <ModalBody>
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-semibold text-gray-100 pb-2">Titre de la tache </h3>
                        <p className="text-gray-300">{props.title}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h3 className="text-lg font-semibold text-gray-100 pb-2">Description de la tache </h3>
                        <p className="text-gray-300">
                            {props.description}
                        </p>
                    </div>
                    <div className="flex flex-row justify-between mt-2 pr-4">
                        <div className="flex flex-col">
                            <h3 className="text-md font-semibold text-gray-100 pb-2">Niveau de priorité </h3>
                            <p className="text-gray-300">
                                {props.priority === "lower" && 'Faible'}
                                {props.priority === "medium" && 'Moyen'}
                                {props.priority === "high" && 'Elevé'}
                            </p>
                        </div>
                        <div className="flex flex-col gap-0">
                            <h3 className="text-md font-semibold text-gray-100 pb-2">Date limite </h3>
                            <p className="text-gray-300">
                                {props.dueDate}
                                {/* 12 Novembre 2025 */}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-row gap-2 items-center pb-2">
                        {props.completed ?
                            (<>
                                <h3 className="text-md font-semibold text-gray-100">Tache terminée </h3>
                                <GoIssueClosed className="text-xl text-green-400" />
                            </>)
                    
                        :
                            (<>
                                <h3 className="text-md font-semibold text-gray-100">Tache non terminée </h3>
                                <IoIosCloseCircleOutline className="text-xl text-red-500" />
                            </>)
                            }
                    </div>
                </div>
                <TaskEdit props={props} />
            </ModalBody>
        </Modal>
        </>
    );
}

export default TaskItem;