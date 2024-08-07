import React from 'react'
import { useParams } from 'react-router-dom';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';
import { CardType } from '../types';
import { getTasksByProjectId } from '../redux/selector';

interface Props {
    projectId: string;
    className?: string;
}

const ProgressBar = ({ projectId, className }: Props) => {
    const data: CardType[] = useSelector((state: RootState) => getTasksByProjectId(state, projectId!));
    const completed = data ? data.filter(d => d.column === "done") : [];
    const barColor = () => {
        let percent = completed.length / (data ? data.length : 1) * 100
        if (percent <= 25) {
            return 'bg-red-500';
        }
        if (percent <= 50) {
            return 'bg-amber-500'
        }
        if (percent <= 75) {
            return 'bg-lime-500'
        }
        if (percent === 100) {
            return 'bg-green-500'
        }
    }
    return (
        data.length > 0
            ? <div className={`w-96 text-xs font-light text-left ${className}`}>
                <div className='flex justify-between items-center'>
                    <div>{completed.length !== data.length ? 'Ongoing' : 'Completed'}</div>
                    <div>{`${Math.round((completed.length / (data ? data.length : 1)) * 100)}%`}</div>
                </div>
                <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div className={`h-full ${barColor()} rounded-full`} style={{ width: `${(completed.length / (data ? data.length : 1)) * 100}%` }}>
                    </div>
                </div>
                <div className=''>
                    {`${completed.length} tasks complete of ${data.length} tasks`}
                </div>
            </div>
            : <div className="text-xs font-light text-left">No Tasks</div>
    )
}

export default ProgressBar