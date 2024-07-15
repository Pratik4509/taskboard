import React from 'react'
import Sidebar from './Sidebar'
import { KanbanBoard } from './KanbanBoard'
import { Outlet } from 'react-router-dom'

const Home = () => {
    return (
        <div className="App flex h-screen">
            <Sidebar />
            {/* <KanbanBoard /> */}
            <Outlet/>
        </div>
    )
}

export default Home