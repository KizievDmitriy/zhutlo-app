'use client';
import React, { useCallback, useState } from 'react';
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai';
import Avatar from '../Avatar';
import MenuItem from './MenuItem';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRentModal from '@/app/hooks/useRentModal';
import { signOut } from 'next-auth/react';
import { SafeUser } from '@/app/types';
import Link from 'next/link';

interface UserMenuProps {
	currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({currentUser}) => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const rentModal = useRentModal();
	const [isOpen, setIsOpen]= useState(false);

	const toggleOpen = useCallback(() => {
		setIsOpen((value) => !value);
	},[]);

	const onRent = useCallback(() => {
		if(!currentUser){
			 return loginModal.onOpen();
		}

		rentModal.onOpen();
	},[currentUser, loginModal, rentModal]);

	return (
		<div className='relative'>
			<div className='flex flex-row items-center gap-3'>
				<div 
				onClick={onRent}
				className='hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer'
				>
					Create
				</div>
				<div 
				onClick={toggleOpen}
				className='flex flex-row items-center gap-3 rounded-full p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 hover:shadow-md transition cursor-pointer'
				>
					{!isOpen ? (<AiOutlineMenu/>) : (<AiOutlineClose/>)}
					
					<div className='hidden md:block'>
						<Avatar src={currentUser?.image}/>
					</div>
				</div>
			</div>

			{isOpen && (
				<nav className='absolute top-14 md:top-12 right-0 rounded-xl shadow-md w-[45vw] md:w-[150px]  overflow-hidden bg-white  text-sm'>
					<ul className='flex flex-col cursor-pointer'>
						{currentUser ? (
						<>
							<li className='list-none px-4 py-3 hover:bg-neutral-100 hover:text-blue-500  transition '>
								<Link href="/trips" onClick={toggleOpen} className='font-semibold'>My trips</Link>
							</li>
							<li className='list-none px-4 py-3 hover:bg-neutral-100 hover:text-blue-500  transition '>
								<Link href="/favorites" onClick={toggleOpen} className='font-semibold'>My favorites</Link>
							</li>		
							<li className='list-none px-4 py-3 hover:bg-neutral-100 hover:text-blue-500  transition '>
								<Link href="/reservations" onClick={toggleOpen} className='font-semibold'>My reservations</Link>
							</li>
							<li className='list-none px-4 py-3 hover:bg-neutral-100 hover:text-blue-500  transition '>
								<Link href="/properties" onClick={toggleOpen} className='font-semibold'>My properties</Link>
							</li>							
							<li><MenuItem
								onClick={rentModal.onOpen}
								label='Create'
							/></li>
							<li className='list-none px-4 py-3 hover:bg-neutral-100 hover:text-blue-500  transition '>
								<Link href="/" onClick={toggleOpen} className='font-semibold'>To Main</Link>
							</li>
							<hr />
							<li><MenuItem
								onClick={() => signOut()}
								label='Logout'
							/></li>
						</>
						) : (
							<>
							<li><MenuItem
								onClick={loginModal.onOpen}
								label='Login'
							/></li>
							<li><MenuItem
								onClick={registerModal.onOpen}
								label='Sign up'
							/></li>
						</>
						)}
					</ul>
				</nav>
			)}
		</div>
	)
}

export default UserMenu