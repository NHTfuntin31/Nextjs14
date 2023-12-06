'use client'
import TodoList from "@/components/todos/TodoList"
import { addTodo, getAllTodos } from "@/utils/supabase/supabaseFunctions";
import { useEffect, useState } from "react"

const TodoApp = () => {
	const [todos, setTodos] = useState<any>([]);
	const [title, settitle] = useState<string>("");

	useEffect(() => {
		const getTodos = async () => {
			const todo = await getAllTodos();
			setTodos(todo)
			console.log(todo);
		}
		getTodos()
	}, [todos])

	const handleSubmit = async (e:any) => {
		e.preventDefault();
		if (title === "") return;
		console.log(title)
		await addTodo(title);
		let todo = await getAllTodos();
		setTodos(todo)
		settitle("")
	}

	return (
		<section className="text-center mb-2 text-2x1 font-medium">
			<h3>Supabase Todo App</h3>
			<form onSubmit={(e) => handleSubmit(e)}>
				<input type="text" className="mr-2 shadow-lg p-1 outline-none"
				onChange={(e) => settitle(e.target.value)}
				value={title}
				/>
				<button className="shadow-md border-2 px-1 py-1 rounded-lg bg-green-200">Add</button>
			</form>
			<TodoList todos={todos} />
		</section>
	)
}
export default TodoApp