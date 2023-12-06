import { Todo } from "@/utils/interface";
import { deleteTodo } from "@/utils/supabase/supabaseFunctions";

interface ITodo {
	todos: Todo[];
}

const TodoList = (props: ITodo) => {
	const { todos } = props;
	
	const handleDelete = async (id: number) => {
		await deleteTodo(id)
	}
	return (
	<div>
		<ul className="mx-auto">
			{
				todos.map((todo) => (
					<div key={todo.id} className="flex bg-orange-200 rounded-md mt-2 mb-2 p-2 justify-between">
				<li className="font-medium">{todo.title}</li>
				<span onClick={() => handleDelete(todo.id)} className="cursor-pointer">X</span>
			</div>
				))
			}
		</ul>
	</div>
	)
}

export default TodoList