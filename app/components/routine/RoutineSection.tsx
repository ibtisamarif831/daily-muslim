import { TaskItem, type Task } from "../tasks/TaskItem";

interface RoutineSectionProps {
	id: string;
	icon: React.ReactNode;
	iconBg: string;
	title: string;
	description: string;
	tasks: Task[];
	onToggle: (id: string) => void;
	borderColor?: string; // Optional prop for custom border color
}
export const RoutineSection = ({
	id,
	icon,
	iconBg,
	title,
	description,
	tasks,
	onToggle,
	borderColor,
}: RoutineSectionProps) => (
	<section
		id={id}
		className="card bg-white rounded-2xl shadow-lg overflow-hidden p-6"
	>
		<div className="flex items-center gap-4">
			<div className={`${iconBg} p-2 rounded-full`}>{icon}</div>
			<div>
				<h2 className="text-xl font-bold text-gray-900">{title}</h2>
				<p className="text-sm text-gray-600">{description}</p>
			</div>
		</div>
		<div className="mt-6 space-y-4">
			{tasks.map((task: Task) => (
				<TaskItem
					key={task.id}
					task={task}
					onToggle={onToggle}
					borderColor={borderColor}
				/>
			))}
		</div>
	</section>
);
