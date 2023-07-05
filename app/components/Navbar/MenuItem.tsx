'use client';
import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface MenuItemProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	onClick:() => void;
	label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({onClick, label}) => {
	return (
		<button 
		onClick={onClick}
		className='px-4 py-3 hover:bg-neutral-100 hover:text-blue-500  transition font-semibold'>
			{label}
		</button>
	)
}

export default MenuItem