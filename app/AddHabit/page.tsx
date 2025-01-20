"use client";
import { Button } from "@/components/ui/button";

export default function AddHabit() {
	return (
		<>
			<div className="bg-gray-100 max-w-screen-lg mx-auto px-8 py-10 mt-10 rounded-lg shadow-lg">
				<div className="mb-4">
					<label
						htmlFor="habitname"
						className="block text-gray-700 text-sm font-bold mb-2"
					>
						Habit Name
					</label>
					<input
						type="text"
						id="habitname"
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
					/>
				</div>

				<Button className="mt-4 text-white px-6 py-2 rounded hover:bg-gray-950 hover:scale-110 animation ease-in duration-200">
					Save
				</Button>
			</div>
		</>
	);
}
