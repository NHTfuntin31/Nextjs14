
export default function Home() {
  async function create(formData:FormData) {
    'use server'
    console.log("check form data" , formData.get("username"));
    
  }
  return (
    <>
      <div>hello world</div>
      <div>
        <form action={create}>
          <input name="username" type="text" />
          <button type="submit">Save</button>
        </form>
      </div>
    </>
  )
}
