import React from 'react'
import { Link, useLocation } from 'react-router-dom'

interface BreadcrumbsProps {
    current?: string,
}


const breadcrumbNameMap: Record<string, string> = {
    '/project': 'Projects',
    '/project/:id': 'Project Details',
    '/team': 'Team',
    '/team/:id': 'Member Details',
    // Add other routes here as needed
};

export const Breadcrumbs = ({ current }: BreadcrumbsProps) => {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <nav className="flex py-4 px-4 text-gray-600 text-sm font-light bg-light-black rounded-md" aria-label='breadcrumb'>
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                    </Link>
                    {
                        pathnames.length > 0 && (
                            <span className="mx-2">/</span>
                        )
                    }
                </li>
                {
                    pathnames.map((value, index) => {
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathnames.length - 1;
                        const name = breadcrumbNameMap[to] || value.charAt(0).toUpperCase() + value.slice(1);

                        return (
                            <li key={to} className='flex items-center'>
                                {isLast ? (
                                    <span className="text-white">{current}</span>
                                ) : (
                                    <>
                                        <Link to={to} className="text-gray-400 hover:text-white transition-colors">
                                            {name}
                                        </Link>
                                        <span className="mx-2">/</span>
                                    </>
                                )
                                }
                            </li>
                        )
                    })
                }
            </ol>
        </nav>
    )
}
