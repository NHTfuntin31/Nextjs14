'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from
	'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Loading from '@/app/loading'
import * as z from 'zod'
import type { Database } from '@/types/supabase'
type Schema = z.infer<typeof schema>

const schema = z.object({
	email: z.string().email({ message: "メールアドレスの形式ではありません。" })
})

const Email = ({ email }: { email: string }) => {
	const router = useRouter()
	const supabase = createClientComponentClient<Database>()
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: { email: '' },
		resolver: zodResolver(schema),
	})

	const onSubmit: SubmitHandler<Schema> = async (data) => {
		setLoading(true)

		try {
			const { error: UpdateUserError } = await supabase.auth.updateUser(
				{email: data.email},
				{emailRedirectTo: `${location.origin}/auth/login`}
			)

			if (UpdateUserError) {
				setMessage('エラーが発生しました。' + UpdateUserError.message)
				return
			}

			setMessage('確認用のURLを送信しました。')

			const { error: signOutError } = await supabase.auth.signOut()

			if (signOutError) {
				setMessage('エラーが発生しました。' + signOutError.message)
				return
			}

			router.push('/auth/login')
		} catch (error) {
			setMessage('エラーが発生しました。' + error)
			return
		} finally {
			setLoading(false)
			router.refresh()
		}
	}

	return (
		<div>
			<div className="text-center font-bold text-xl mb-10">メールアドレス変更</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="mb-5">
					<div className="text-sm mb-1 font-bold">
						現在のメールアドレス
					</div>
					<div>{email}</div>
				</div>

				<div className="mb-5">
					<div className="text-sm mb-1 font-bold">メールアドレス変更</div>

					<input
						type="email"
						className="border rounded-md w-full py-2 px-3 focus:outline-none focus:border-sky-500"
						placeholder="新しいメールアドレス"
						id="email"
						{...register('email', { required: true })}
					/>
					<div className="my-3 text-center text-sm text-red-500">{errors.email?.message}</div>
				</div>

				<div className="mb-5">
					{loading ? (
						<Loading />
					) : (
						<button
							type="submit"
							className="font-bold bg-sky-500 hover:brightness-95 w-full rounded-full p-2 text-white text-sm"
						>
							変更
						</button>
					)}
				</div>
			</form>

			{message && <div className="my-5 text-center text-red-500 mb-5">{message}</div>}
		</div>
	)
}

export default Email