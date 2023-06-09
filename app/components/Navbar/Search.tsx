'use client';
import useSearchModal from '@/app/hooks/useSearchModal';
import {BiSearch} from 'react-icons/bi';

const Search = () => {
	const searchModal = useSearchModal();

	
	return (
		<div className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer '
			onClick={searchModal.onOpen}
		>
			<div className='flex flex-row justify-between items-center'>
				<div className='text-sm font-semibold px-6'>
					Search
				</div>
				<div className='text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3'>
					<div className='hidden sm:block '>
						Add Filters
					</div>
					<div className='p-2 rounded-full text-white bg-blue-600'>
						<BiSearch size={18}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Search
