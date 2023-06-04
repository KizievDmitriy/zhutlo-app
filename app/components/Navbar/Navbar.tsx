'use client';
import React from 'react'
import Container from '../Container'
import Logo from './Logo'
import Search from './Search'
import UserMenu from './UserMenu'
import { SafeUser } from '@/app/types';


interface NavbarProps {
	currentUser?: SafeUser | null;
}

 const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
	// console.log(currentUser)
	return (
		<div className='fixed bg-white w-full z-10 shadow-sm'>
			<div className="py-4 border-b-[1px]">
				<Container>
					<div className='flex flex-row justify-between items-center gap-3 md:gap-0'>
						<Logo/>
						<Search/>
						<UserMenu currentUser={currentUser}/>
					</div>
				</Container>
			</div>
		</div>
	)
}

export default Navbar