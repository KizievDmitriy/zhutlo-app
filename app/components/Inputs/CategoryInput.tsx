'use client';
import React from 'react';
import { IconType } from 'react-icons';

interface CategoryInputProps {
	icon: IconType;
	label: string;
	selected?: boolean;
	onClick: (value: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
	icon: Icon, label, selected, onClick
}) => {
	return (
		<div
			onClick={() => onClick(label)}
			className={`
				rounded-xl p-4 border-2 flex items-center justify-center gap-3 hover:border-blue-600 transition cursor-pointer
				${selected ? 'border-blue-600' : 'border-neutral-200'}
			`}
		>
			<Icon size={30} />
			<div className='font-semibold'>
				{label}
			</div>
		</div>
	)
}

export default CategoryInput