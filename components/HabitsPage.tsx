import React from "react";
import { Checkbox } from "@/components/ui/checkbox";

const Habits = [
	{ id: 1, name: "Drink Water", streak: 5 },
	{ id: 2, name: "Exercise", streak: 4 },
	{ id: 3, name: "Meditate", streak: 3 },
	{ id: 4, name: "Read a book", streak: 2 },
];

export default function HabitsPage() {
	return (
		<>
			<div className="bg-gray-100 max-w-screen-lg mx-auto px-8 py-10 mt-10 rounded-lg shadow-lg">
				{Habits.map((habit) => (
					<div
						key={habit.id}
						className="flex py-4 border-b border-gray-500 items-center"
					>
						<Checkbox className="w-6 h-6" />
						<p className="text-black font-semibold ml-4 flex-grow">
							{habit.name}
						</p>
						<p className="text-black ml-auto">Streak: {habit.streak}</p>
					</div>
				))}
			</div>
		</>
	);
}
