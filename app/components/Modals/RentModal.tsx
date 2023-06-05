"use client"
import React, { useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';

enum STEPS {
	CATEGORY = 0,
	LOCATION = 1,
	INFO = 2,
	IMAGES = 3,
	DESCRIPTION = 4,
	PRICE = 5
}



const RentModal = () => {
	const rentModal = useRentModal();
	const [steps, setSteps] = useState(STEPS.CATEGORY);

	const onBack = () => {
		setSteps((value) => value - 1);
	}

	const onNext = () => {
		setSteps((value) => value + 1);
	}

	return (
		<Modal
			isOpen={rentModal.isOpen}
			onClose={rentModal.onClose}
			onSubmit={rentModal.onClose}
			title='Your home'
			actionLabel='Submit'
			secondaryActionLabel=''
		/>
	)
}

export default RentModal