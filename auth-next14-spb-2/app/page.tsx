import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

import type { Database } from "@/types/supabase"

const Home = async () => {

  const supabase = createServerComponentClient<Database>({
    cookies,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <div className="text-center text-xl">
      { session ? <div>ログイン済</div> : <div>未ログイン</div>}
    </div>
  )
}

export default Home