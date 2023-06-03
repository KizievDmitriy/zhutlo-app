'use client';
import { signIn } from 'next-auth/react';
import React from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import{ FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import useLoginModal from '@/app/hooks/useLoginModal';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../Inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { useRouter } from 'next/navigation';



const LoginModal = () => {
	const router = useRouter();
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
			email: '',
			password: '',
		}
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);

		signIn('credentials', {
			...data,
			redirect: false,
		})
		.then((callback) => {
			setIsLoading(false);

			if(callback?.ok) {
				toast.success('Logged in');
				router.refresh();
				loginModal.onClose();
			}

			if(callback?.error) {
				toast.error(callback.error)
			}
		})
	};

	const bodyContent = (
		<div className='flex flex-col gap-4'>
				<Heading
					title='Welcome back'
					subtitle='Login to your account!'
					center
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
					type='password'
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
				onClick={() => {}}
			/>
			<Button
				outline
				label='Continue with Github'
				icon={AiFillGithub}
				onClick={() => {}}
			/>
			<div className='text-center mt-4 text-neutral-500 font-light'>
				<div className='flex flex-row gap-2 items-center justify-center'>
					<div>Already have an account?</div>
					<div className='hover:underline cursor-pointer text-neutral-800'
						onClick={registerModal.onClose}
					>
						Log in
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
		  secondaryActionLabel=''
			disabled={isLoading}
			isOpen={loginModal.isOpen}
			title='Login' 
			actionLabel='Continue'
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	)
}

export default LoginModal