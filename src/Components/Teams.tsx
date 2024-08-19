import React from 'react'
import Table from './Table'
import { Breadcrumbs } from './Breadcrumbs'
import TeamsTable from './TeamsTable'

const Teams = () => {
    return (
        <div className='w-full h-full bg-black text-neutral-50 p-12 overflow-scroll overflow-x-hidden no-scrollbar'>
            <Breadcrumbs current='Team'/>
            <TeamsTable/>
        </div>
    )
}

export default Teams