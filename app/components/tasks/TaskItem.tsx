import { CheckmarkIcon } from "../global/icons";

export interface Task {
	id: string;
	completed: boolean;
	section?: string; // Optional section for categorization
	content?: React.ReactNode; // Optional content for more complex task descriptions
}
interface TaskItemProps {
	task: Task;
	onToggle: (id: string) => void;
	borderColor?: string; // Optional prop for custom border color
}

export const TaskItem = ({ task, onToggle, borderColor }: TaskItemProps) => (
	<div className="task-item">
		<input
			type="checkbox"
			id={task.id}
			className="hidden"
			checked={task.completed}
			onChange={() => onToggle(task.id)}
		/>
		<label
			htmlFor={task.id}
			className="task-label flex items-start gap-3 cursor-pointer"
		>
			<div
				className={`mt-1 flex-shrink-0 w-5 h-5 border-2 ${borderColor} rounded-md flex items-center justify-center transition-all duration-300 ${task.completed ? "bg-sky-400 border-sky-400" : ""}`}
			>
				{task.completed && <CheckmarkIcon />}
			</div>
			<div
				className={`task-content flex-grow transition-transform duration-300 ${task.completed ? "text-gray-500 line-through" : " text-black"}`}
			>
				{task.content}
			</div>
		</label>
	</div>
);
