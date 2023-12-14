import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import Password from '@/app/components/password'

import type { Database } from "@/types/supabase";

const PasswordPage = async () => {
	const supabase = createServerComponentClient<Database>({
		cookies,
	})

	const {
		data: { session }
	} = await supabase.auth.getSession()

	if (!session) {
		redirect('/auth/login')
	}

	return <Password />
}

export default PasswordPage