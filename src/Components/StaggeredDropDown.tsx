import {
    FiEdit,
    FiTrash,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import { IconType } from "react-icons";
import { useDispatch } from "react-redux";
import { handleDelete, setCurrentId, setIsOpen } from "../features/kanban/kanbanSlice";

interface DDProps {
    handleEdit: () => void
    id: string
}
const StaggeredDropDown = ({ handleEdit, id }: DDProps) => {
    const [open, setOpen] = useState(false);

    return (
        // <div className="p-8 pb-56 flex items-center justify-center bg-white">
        <motion.div animate={open ? "open" : "closed"} className="relative">
            <button
                onClick={() => setOpen((pv) => !pv)}
                className="rounded-md text-indigo-50 hover:bg-indigo-500 transition-colors"
            >
                <motion.span variants={iconVariants}>
                    {open
                        ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    }
                </motion.span>
            </button>

            <motion.ul
                initial={wrapperVariants.closed}
                variants={wrapperVariants}
                style={{ originY: "top", translateX: "-50%" }}
                className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-36 overflow-hidden"
            >
                <Option setOpen={setOpen} Icon={FiEdit} text="Edit" id={id} />
                {/* <Option setOpen={setOpen} Icon={FiPlusSquare} text="Duplicate" /> */}
                <Option setOpen={setOpen} Icon={FiTrash} text="Remove" id={id} className="text-red-600 hover:bg-red-100 hover:text-red-600" />
            </motion.ul>
        </motion.div>
        // </div>
    );
};

const Option = ({
    text,
    Icon,
    setOpen,
    id,
    className
}: {
    text: string;
    Icon: IconType;
    setOpen: Dispatch<SetStateAction<boolean>>;
    id: string;
    className?: string;
}) => {
    const dispatch = useDispatch()
    const handleClick = (id: string) => {
        setOpen(false);
        if (text === 'Remove') {
            dispatch(handleDelete(id))
        }
        if (text === 'Edit') {
            dispatch(setIsOpen(true))
            dispatch(setCurrentId(id))
        }
    }
    return (
        <>
            <motion.li
                variants={itemVariants}
                onClick={() => handleClick(id)}
                className={`${className} flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer`}
            >
                <motion.span variants={actionIconVariants}>
                    <Icon />
                </motion.span>
                <span>{text}</span>
            </motion.li>
        </>
    );
};

export default StaggeredDropDown;

const wrapperVariants = {
    open: {
        scaleY: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
        },
    },
    closed: {
        scaleY: 0,
        transition: {
            when: "afterChildren",
            staggerChildren: 0.1,
        },
    },
};

const iconVariants = {
    open: { rotate: 180 },
    closed: { rotate: 0 },
};

const itemVariants = {
    open: {
        opacity: 1,
        y: 0,
        transition: {
            when: "beforeChildren",
        },
    },
    closed: {
        opacity: 0,
        y: -15,
        transition: {
            when: "afterChildren",
        },
    },
};

const actionIconVariants = {
    open: { scale: 1, y: 0 },
    closed: { scale: 0, y: -7 },
};