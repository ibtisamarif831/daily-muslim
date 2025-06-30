import type { Route } from "./+types/home";
import {
	FajrIcon,
	MidMorningIcon,
	DhuhrIcon,
	AsrIcon,
	NightIcon,
	JummahIcon,
} from "../components/global/icons"; // Adjust the import path as needed
import React, { useState, useMemo } from "react";
import { TaskItem, type Task } from "~/components/tasks/TaskItem";
import { RoutineSection } from "~/components/routine/RoutineSection";

// --- DATA ---
// It's good practice to keep static data separate from component logic.
const initialTasks = [
	// Fajr Tasks
	{
		id: "task1",
		section: "fajr",
		completed: false,
		content: (
			<>
				<strong>Perform Wudhu mindfully</strong> & Pray Fajr Salah with khushu
				(focus).
			</>
		),
	},
	{
		id: "task2",
		section: "fajr",
		completed: false,
		content: (
			<>
				<strong>Post-salah dhikr:</strong>
				<ul className="list-disc list-inside text-sm text-gray-700 mt-1">
					<li>SubhanAllah (33x), Alhamdulillah (33x), Allahu Akbar (34x)</li>
				</ul>
			</>
		),
	},
	{
		id: "task3",
		section: "fajr",
		completed: false,
		content: (
			<>
				<strong>Sit quietly (2–5 mins):</strong> Deep breathing + reflection.
			</>
		),
	},
	{
		id: "task4",
		section: "fajr",
		completed: false,
		content: (
			<>
				<strong>Morning Dua & Sunlight:</strong>
				<p className="text-sm font-serif italic text-sky-700 mt-1">
					"Allahumma aj’al hadha al-yawm khayran li fi deeni wa dunyaya wa
					akhirati"
				</p>
				<p className="text-sm mt-1">
					Get 5-10 mins sunlight & drink water with salt/lemon.
				</p>
			</>
		),
	},
	// Mid-Morning Tasks
	{
		id: "task5",
		section: "mid-morning",
		completed: false,
		content: (
			<>
				<strong>Delay caffeine</strong> 45–60 mins after waking.
			</>
		),
	},
	{
		id: "task6",
		section: "mid-morning",
		completed: false,
		content: (
			<>
				<strong>Read Qur’an (3–5 verses slowly).</strong> Example: Surah
				Al-Inshirah.
			</>
		),
	},
	{
		id: "task7",
		section: "mid-morning",
		completed: false,
		content: (
			<>
				<strong>Follow ultradian rhythm:</strong> 90 mins work + 10 min mindful
				break.
			</>
		),
	},
	// Dhuhr Tasks
	{
		id: "task8",
		section: "dhuhr",
		completed: false,
		content: (
			<>
				<strong>Pray Dhuhr Salah.</strong>
			</>
		),
	},
	{
		id: "task9",
		section: "dhuhr",
		completed: false,
		content: (
			<>
				<strong>Post-salah reflection (2 mins):</strong>
				<p className="text-sm mt-1">
					Close eyes, say "Ya Salaam" 3x. Ask: "What do I need right now to stay
					balanced?"
				</p>
			</>
		),
	},
	{
		id: "task10",
		section: "dhuhr",
		completed: false,
		content: (
			<>
				<strong>Stretch or walk (5 mins)</strong> with Dhikr (La hawla wa la
				quwwata illa billah).
			</>
		),
	},
	// Asr Tasks
	{
		id: "task11",
		section: "asr",
		completed: false,
		content: (
			<>
				<strong>Pray Asr Salah.</strong>
			</>
		),
	},
	{
		id: "task12",
		section: "asr",
		completed: false,
		content: (
			<>
				<strong>Quiet reflection or journaling (5 mins):</strong>
				<p className="text-sm mt-1">
					Ask: “How did I respond to others today?” & write 3 blessings from the
					day.
				</p>
			</>
		),
	},
	{
		id: "task13",
		section: "asr",
		completed: false,
		content: (
			<>
				<strong>Recite 1 surah before Maghrib</strong> & make Dua.
				<p className="text-sm font-serif italic text-orange-700 mt-1">
					"Allahumma inni a’udhu bika minal-hammi wal-huzn..."
				</p>
			</>
		),
	},
	// Night Tasks
	{
		id: "task14",
		section: "night",
		completed: false,
		content: (
			<>
				<strong>Pray Isha Salah + Witr.</strong>
			</>
		),
	},
	{
		id: "task15",
		section: "night",
		completed: false,
		content: (
			<>
				<strong>Recite Ayat al-Kursi</strong> + Surah Ikhlas, Falaq, Nas (3x
				each).
			</>
		),
	},
	{
		id: "task16",
		section: "night",
		completed: false,
		content: (
			<>
				<strong>Deep breathing (3x)</strong> + repeat "Ya Latif" or "Ya Salam".
				<p className="text-sm font-serif italic text-indigo-700 mt-1">
					"Allahumma inni aslamtu nafsi ilayk..."
				</p>
			</>
		),
	},
] as Task[];
const sections = [
	{
		id: "fajr",
		title: "✨ Morning Routine (Fajr Start)",
		description: "Set intention, align body & soul, energize for the day.",
		icon: <FajrIcon />,
		iconBg: "bg-sky-100",
		borderColor: "border-sky-400",
	},
	{
		id: "mid-morning",
		title: "☀️ Mid-Morning (Post-Fajr to Dhuhr)",
		description: "Focus zone, stable energy, light spiritual input.",
		icon: <MidMorningIcon />,
		iconBg: "bg-amber-100",
		borderColor: "border-amber-400",
	},
	{
		id: "dhuhr",
		title: "🕛 Dhuhr Midday Reset",
		description: "Reset brain, body, and spirit after social/work load.",
		icon: <DhuhrIcon />,
		iconBg: "bg-green-100",
		borderColor: "border-green-400",
	},
	{
		id: "asr",
		title: "🌇 Asr to Maghrib",
		description: "Prevent burnout, recharge socially & spiritually.",
		icon: <AsrIcon />,
		iconBg: "bg-orange-100",
		borderColor: "border-orange-400",
	},
	{
		id: "night",
		title: "🌙 Night Wind-Down (Isha & Sleep)",
		description: "Close the day with peace, faith, and nervous system rest.",
		icon: <NightIcon />,
		iconBg: "bg-indigo-100",
		borderColor: "border-indigo-400",
	},
];

// --- REUSABLE COMPONENTS ---

const Header = () => (
	<header className="text-center mb-8">
		<h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
			Daily Mindfulness & Energy
		</h1>
		<p className="text-lg font-serif italic text-white/80 mt-1">
			A Pakistani-Muslim Inspired Routine
		</p>
	</header>
);

const ProgressBar = ({ percentage }: { percentage: number }) => (
	<div className="mb-8 px-2">
		<div className="flex justify-between items-center mb-1">
			<span className="text-sm font-semibold text-white/90">
				Daily Progress
			</span>
			<span className="text-sm font-semibold text-white/90">{percentage}%</span>
		</div>
		<div className="w-full bg-white/20 rounded-full h-2.5">
			<div
				className="bg-gradient-to-r from-amber-400 to-amber-500 h-2.5 rounded-full transition-all duration-500"
				style={{ width: `${percentage}%` }}
			/>
		</div>
	</div>
);

function App() {
	const [tasks, setTasks] = useState<Task[]>(initialTasks);

	const handleToggleTask = (taskId: string) => {
		setTasks((prevTasks) =>
			prevTasks.map((task) =>
				task.id === taskId ? { ...task, completed: !task.completed } : task,
			),
		);
	};
	const totalTasks = tasks.length;

	const progressPercentage =
		(tasks.filter((task) => task.completed).length / totalTasks) * 100;

	return (
		// Add a background color to the main container to match the design aesthetic
		<div className="bg-slate-900 min-h-screen">
			<main className="max-w-3xl mx-auto p-4 sm:p-6 md:p-8">
				<Header />
				<ProgressBar percentage={progressPercentage} />

				<div className="space-y-6">
					{sections.map((section) => (
						<RoutineSection
							key={section.id}
							id={section.id}
							title={section.title}
							description={section.description}
							icon={section.icon}
							iconBg={section.iconBg}
							borderColor={section.borderColor}
							tasks={tasks.filter((task) => task.section === section.id)}
							onToggle={handleToggleTask}
						/>
					))}

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<section
							id="jummah"
							className="card bg-white rounded-2xl shadow-lg p-6"
						>
							<div className="flex items-center gap-4">
								<div className="bg-teal-100 p-2 rounded-full">
									<JummahIcon />
								</div>
								<div>
									<h2 className="text-xl font-bold text-gray-900">
										🎓 Jummah Weekly Reflection
									</h2>
								</div>
							</div>
							<div className="mt-4 text-gray-700 space-y-2">
								<p>After Jummah, sit quietly for 5 mins.</p>
								<p className="font-semibold">
									Reflect: "How did I grow this week? What do I ask from Allah
									next week?"
								</p>
								<p>Make 1 focused dua for clarity, healing, or guidance.</p>
							</div>
						</section>

						<section
							id="framework"
							className="card bg-white rounded-2xl shadow-lg p-6"
						>
							<h2 className="text-xl font-bold text-center text-gray-900 mb-4">
								3-Part Framework
							</h2>
							<div className="flex justify-around text-center">
								<div>
									<h3 className="font-bold text-sky-600">Spiritual</h3>
									<ul className="text-sm mt-2 space-y-1 text-black">
										<li>Salah</li>
										<li>Dhikr</li>
										<li>Duas</li>
										<li>Qur’an</li>
									</ul>
								</div>
								<div>
									<h3 className="font-bold text-green-600">Psychological</h3>
									<ul className="text-sm mt-2 space-y-1 text-black">
										<li>Journaling</li>
										<li>Gratitude</li>
										<li>Breathing</li>
										<li>Presence</li>
									</ul>
								</div>
								<div>
									<h3 className="font-bold text-orange-600">Physical</h3>
									<ul className="text-sm mt-2 space-y-1 text-black">
										<li>Hydration</li>
										<li>Sunlight</li>
										<li>Movement</li>
										<li>Rest</li>
									</ul>
								</div>
							</div>
						</section>
					</div>
				</div>

				<footer className="text-center mt-12 pb-4">
					<p className="text-sm text-white/70">
						Remember: Mindfulness is part of your deen — just brought to life
						intentionally.
					</p>
				</footer>
			</main>
		</div>
	);
}

export default App;
