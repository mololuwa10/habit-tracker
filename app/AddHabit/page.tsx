// /* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function getSessionId() {
	let sessionId = localStorage.getItem("sessionId");
	if (!sessionId) {
		sessionId = crypto.randomUUID(); // Generates a unique identifier
		localStorage.setItem("sessionId", sessionId);
	}
	return sessionId;
}

// {
// 	onHabitAdded,
// 	onClose,
// }: {
// 	onHabitAdded: (habit: any) => void;
// 	onClose: () => void;
// }

export default function AddHabit() {
	const [habitName, setHabitName] = useState("");
	const [loading, setLoading] = useState(false); // Track loading state
	const [error, setError] = useState<string | null>(null);

	const addHabit = async () => {
		if (!habitName) return alert("Habit name cannot be empty!");

		setLoading(true);
		setError(null);

		const response = await fetch(
			"https://habittrackerfunctionapp-gwc7enc8f2ejb3a7.uksouth-01.azurewebsites.net/api/AddHabit",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Session-Id": getSessionId(),
				},
				body: JSON.stringify({ habitName }),
			}
		);

		if (!response.ok) {
			alert("Failed to add habit. Please try again.");
			return;
		}

		const newHabit = await response.json(); // Expecting the response to include the saved habit
		// onHabitAdded(newHabit);
		setHabitName(""); // Clear input field
		alert(`Habit "${newHabit.HabitName}" added successfully!`);

		// Close the modal
		// onClose();
		setLoading(false);
	};

	return (
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
					value={habitName}
					onChange={(e) => setHabitName(e.target.value)}
					className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
				/>
			</div>

			<Button
				onClick={addHabit}
				disabled={loading}
				className="mt-4 text-white px-6 py-2 rounded hover:bg-gray-950 hover:scale-110 animation ease-in duration-200"
			>
				{loading ? "Saving..." : "Save"}
			</Button>
		</div>
	);
}
