import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import type { Database } from "@/types/supabase";
import Signup from "@/app/components/signup";

const SignupPage =async () => {
	const supabase = createServerComponentClient<Database>({
		cookies,
	})

	const {
		data: { session }
	} = await supabase.auth.getSession()

	if (session) {
		redirect('/')
	}

	return <Signup />
}

export default SignupPage