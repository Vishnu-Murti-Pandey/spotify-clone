import Link from 'next/link'
import React from 'react'
import { twMerge } from 'tailwind-merge'

const SidebarItem = ({ icon: Icon, lable, active, href }) => {
    return (
        <Link
            href={href}
            className={twMerge(`
                flex flex-row h-auto item-center w-full gap-x-4 text-md font-medium  
                cursor-pointer hover:text-white transition text-neutral-400 py-1
            `, active && "text-white"
            )}
        >
            <Icon size={26} />
            <p className='truncate w-full'>{lable}</p>
        </Link>
    )
}

export default SidebarItem