'use client';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState, useCallback } from 'react';
import{ FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import axios from 'axios';

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: {
			errors,
		}
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		}
	});
  
	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		axios.post('/api/register', data)
		.then(() => {
			toast.success('Register success!Please login')
			registerModal.onClose();
			loginModal.onOpen();
		})
		.catch((error) => {
			toast.error('Somthing went wrong!!!');
		})
		.finally(() => {
			setIsLoading(false);
		})
	};

	const toggle = useCallback(
		() => {
			registerModal.onClose()
			loginModal.onOpen()
		},
		[loginModal, registerModal]
	)

	const bodyContent = (
		<div className='flex flex-col gap-4'>
				<Heading
					title='Welcome to Zhutlo'
					subtitle='Create an account!'
					center
				/>
				<Input
					id='name'
					label='Name'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<Input
					id='email'
					label='Email'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
				<Input
					id='password'
					type='Password'
					label='Password'
					disabled={isLoading}
					register={register}
					errors={errors}
					required
				/>
		</div>
	);
	
	const footerContent = (
		<div className='flex flex-col gap-4 mt-3'>
			<hr />
			<Button
				outline
				label='Continue with Google'
				icon={FcGoogle}
				onClick={() => signIn('google')}
			/>
			<Button
				outline
				label='Continue with Github'
				icon={AiFillGithub}
				onClick={() => signIn('github')}
			/>
			<div className='text-center mt-4 text-neutral-500 font-light'>
				<div className='flex flex-row gap-2 items-center justify-center'>
					<div>Already have an account?</div>
					<div className='hover:underline cursor-pointer text-neutral-800'
						onClick={toggle}
					>
						Log in
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			secondaryActionLabel=' '
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title='Register' 
			actionLabel='Continue'
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default RegisterModal