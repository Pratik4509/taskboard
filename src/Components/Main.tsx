import React from 'react'
import Table from './Table'

const Main = () => {
    return (
        <div className='w-full h-full bg-black text-neutral-50 px-10'>
            <div className='w-full py-4 text-left '>
                <div className='text-xl font-semibold mb-2'>Home</div>
                <p className='text-sm text-neutral-200'>Monitor all your projects from here</p>
            </div>
            <div className='mx-auto mt-4 mb-8 w-full px-3 py-1.5 rounded border border-neutral-800 bg-light-black text-gray-300 flex justify-evenly items-center'>
                <div className='w-full text-left border-r-2 border-dashed border-gray-600'>
                    <div className='mb-2'>Total Projects</div>
                    <p className='text-amber-500'>4</p>
                </div>
                <div className='w-full text-left border-r-2 border-dashed border-gray-600 pl-8'>
                    <div className='mb-2'>Total Tasks</div>
                    <p className='text-pink-500'>4</p>
                </div>
                <div className='w-full text-left border-r-2 border-dashed border-gray-600 pl-8'>
                    <div className='mb-2'>Total Members</div>
                    <p className='text-sky-500'>4</p>
                </div>
                <div className='w-full text-left pl-8'>
                    <div className='mb-2'>Tasks Completed</div>
                    <p className='text-emerald-500'>4</p>
                </div>
            </div>
            <Table />
        </div>
    )
}

export default Main