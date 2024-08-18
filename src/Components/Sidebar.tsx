import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { RootState } from '../redux/store';


const Sidebar: React.FC = () => {
    const location = useLocation()
    const [isProjectsOpen, setIsProjectsOpen] = useState(location.pathname.startsWith('/project'));
    const [isTeamOpen, setIsTeamOpen] = useState(location.pathname.startsWith('/team'));

    const projects = useSelector((state: RootState) => state.kanban.projects)

    const toggleProjects = () => setIsProjectsOpen(!isProjectsOpen);
    const toggleTeam = () => setIsTeamOpen(!isTeamOpen);

    return (
        <div className="w-72 h-screen bg-light-black text-white flex flex-col border-r border-neutral-800 ">
            <div className="p-4">
                <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122" />
                    </svg>
                    <div className="ml-4">
                        <h3 className="text-lg font-semibold">Taskboard</h3>
                    </div>
                </div>
            </div>

            <nav className="mt-4 px-3 flex-grow flex flex-col justify-start items-start w-full">
                <NavLink
                    to="/"
                    className={({ isActive }) => `w-full block py-1.5 px-2 rounded text-neutral-400 hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-neutral-50' : ''}`}
                >
                    <div className=' w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm  rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        <span>Home</span>
                    </div>
                </NavLink>
                <div className='w-full mt-4'>
                    <NavLink to='/project'
                        className={({ isActive }) => `mt-2 block rounded text-neutral-400 hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-white' : ''}`}
                    >
                        <button
                            className="w-full text-left py-1.5 px-2 rounded">
                            <div className='w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
                                </svg>
                                <span className='flex justify-between w-full'>
                                    <p>Projects</p>
                                </span>
                            </div>
                        </button>
                    </NavLink>
                </div>

                <div className='w-full mt-4'>
                    <NavLink to='/team' className={({ isActive }) => `mt-2 block rounded text-neutral-400 hover:bg-gray-700 ${isActive ? 'bg-gray-700 text-white' : ''}`}
                    >
                        <button className="w-full text-left py-1.5 px-2 rounded hover:bg-gray-700 text-sm text-neutral-400">
                            <div className='w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                                </svg>
                                <span>Team</span>
                            </div>
                        </button>
                    </NavLink>
                </div>

                <NavLink
                    to="/labels"
                    className={({ isActive }) => `w-full block py-1.5 px-2 rounded text-neutral-400 hover:bg-gray-700 ${isActive ? 'bg-gray-700' : ''}`}
                >
                    <div className='w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
                        </svg>
                        <span>Labels</span>
                    </div>
                </NavLink>
            </nav>

            {/* <div className="p-4">
                <button className="w-full py-2 px-4 bg-blue-600 rounded hover:bg-blue-700">Create New Task</button>
            </div> */}
        </div>
    );
};

export default Sidebar;
