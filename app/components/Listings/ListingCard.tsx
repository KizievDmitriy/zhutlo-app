'use client';
import useCountries from '@/app/hooks/useCountries';
import { SafeListing, SafeReservation, SafeUser } from '@/app/types';
import { useRouter } from 'next/navigation';
import React, { useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import Image from 'next/image';
import HeartButton from '../HeartButton';
import Button from '../Button';

interface ListingCardProps {
	data: SafeListing;
	reservation?: SafeReservation;
	onAction?: (id: string) => void;
	disabled?: boolean;
	actionLabel?: string;
	actionId?: string;
	currentUser?: SafeUser | null; 
}

const ListingCard: React.FC<ListingCardProps> = ({
	data,
	reservation,
	onAction,
	disabled,
	actionLabel,
	actionId = '',
	currentUser
}) => {
	const router = useRouter();
	const { getByValue } = useCountries();
	const location = getByValue(data.locationValue);

	const handleCansel = useCallback(
		(e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();

			if(disabled) {
				return;
			}

			onAction?.(actionId);
		}, [actionId, disabled, onAction]
	);

	const price = useMemo(() => {
		if(reservation) {
			return reservation.totalPrice
		}

		return data.price
	},[data.price, reservation]);

	const reservationDate = useMemo(() => {
		if(!reservation) {
			return null
		}

		const start = new Date(reservation.startDate);
		const end = new Date(reservation.endDate);

		return `${format(start, 'PP')} - ${format(end, 'PP')}`
	},[reservation])

	return (
		<div className='col-span-1  cursor-pointer group'
			onClick={() => router.push(`/listings/${data.id}`)}
		>
			<div className='flex flex-col gap-2 w-full'>
				<div className='relative aspect-square w-full overflow-hidden rounded-xl'>
					<Image
						fill
						sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						alt='listings'
						src={data.imageSrc}
						className='object-cover w-full h-full group-hover:scale-110 transition'
					/>
					<div className='absolute top-3 right-3'>
						<HeartButton 
							listingId={data.userId}
							currentUser={currentUser}
						/>
					</div>
				</div>
				<h3 className='font-semibold text-lg'>
					{location?.region}, {location?.label}
				</h3>
				<p className='font-light text-neutral-500'>
					{reservationDate || data.category}
				</p>
				<div className='flex flex-row items-center gap-1'>
					<p className='font-semibold '>
						$ {price}
					</p>
					{!reservation && (
						<p className='font-light text-neutral-500'>/ night</p>
					)}
				</div>
				{onAction && actionLabel && (
					<Button
						disabled={disabled}
						small
						label={actionLabel}
						onClick={handleCansel}
					/>
				)}
			</div>
		</div>
	)
}

export default ListingCard