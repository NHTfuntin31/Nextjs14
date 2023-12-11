import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import ResetPassword from "@/app/components/reset-password";
import type { Database } from "@/types/supabase";

const ResetPasswordPage =async () => {
	const supabase = createServerComponentClient<Database>({
		cookies,
	})

	const {
		data: { session }
	} = await supabase.auth.getSession()

	if (session) {
		redirect('/')
	}

	return <ResetPassword />
}

export default ResetPasswordPage