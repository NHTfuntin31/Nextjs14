'use server'

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import Navigation from './navigation'
import type { Database } from "@/types/supabase"

const SupabaseListener = async () => {
	const supabase = createServerComponentClient<Database>({ cookies })

	const {
		data: { session },
	} = await supabase.auth.getSession()

	return <Navigation session={session} />
}

export default SupabaseListener