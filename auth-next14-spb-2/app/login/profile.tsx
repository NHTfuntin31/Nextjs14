'use client'

import { useCallback, useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import {
useRouter } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import { useForm, SubmitHandler } from 'react-hook-form' 
import { zodResolver } from '@hookform/resolvers/zod' 
import Image from 'next/image' 
import Loading from '@/app/loading' 
import * as z from 'zod' 
import type { Database } from '@/types/supabase' 
import useStore from '@/store'
type Schema = z.infer<typeof schema>

const schema = z.object({
	name: z.string().min(2, {message: '2文字以上入力'}),
	introduce: z.string().min(0),
})

const Profile = () => {
	const router = useRouter()
	const supabase = createClientComponentClient<Database>()
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [avatar, setAvatar] = useState<File | null>(null)
	const [fileMessage, setFileMessage] = useState('')
	const [avatarUrl, setAvatarUrl] = useState('/noavatar.png')
	const { user } = useStore()

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: user.name ? user.name : '',
			introduce: user.introduce ? user.introduce : '',
		},

		resolver: zodResolver(schema)
	})

	useEffect(() => {
		if (user && user.avatar_url) {
			setAvatarUrl(user.avatar_url)
		}
	}, [user])

	const opUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		setFileMessage('')

		if(!File || files?.length == 0){
			setFileMessage('画像をアップロードしてください')
			return
		}

		const fileSize = files && files[0]?.size / 1024 / 1024
		const fileType = files && files[0]?.type

		if (fileSize && fileSize > 2) {
			setFileMessage('画像サイズ2MB以下')
			return
		}

		if ( fileType && fileType !== 'image.jpeg' && fileType !== 'image/png' ) {
			setFileMessage('拡張子が違う')
			return
		}

		files && setAvatar(files[0])
	}, [])

	const onSubmit: SubmitHandler<Schema> = async (data) => {
		
	}

	return (
		<div>

			<div className="text-center font-bold text-xl mb-10">プロファイル</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-5">
					<div className="flex flex-col text-sm items-center justify-center mb-5">
						<div className="relative w-24 h-24 mb-5">
							<Image src={avatarUrl} alt="avatar" className="rounded-full object-cover" fill/>
						</div>
						<input type="file" id="avatar" onChange={onUploadImage}/>
						{fileMessage && <div className="text-center text-red-500 my-5">{fileMessage}</div>}
					</div>
				</div>

				<div className="mb-5">
					<div className="text-sm mb-1 font-bold">名前</div>
					<input 
						type="text"
						className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
						placeholder="name"
						id="name"
						{...register('name')}
						required
						/>
						<div className="my-3 text-center text-sm text-red-500">{errors.name?.message}</div>
				</div>

				<div className="mb-5">
					<div className="text-sm mb-1 font-bold">自己紹介</div>
					<textarea 
						className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
						placeholder="自己紹介"
						id="introduce"
						{...register('introduce')}
						rows={5}
						/>
						<div className="my-3 text-center text-sm text-red-500">{errors.name?.message}</div>
				</div>


				<div className="mb-5">
					{loading ? (
						<Loading />
					):(
						<button
							type="submit"
							className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
						>変更</button>
					)
					}
				</div>
			</form>
					{message && <div className="my-5 text-center text-red-500 mb-5">{message}</div>}
		</div>
	)
}

export default Profile