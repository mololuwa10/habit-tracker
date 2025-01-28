/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Menu } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function HabitsPage() {
	const [habits, setHabits] = useState<
		{ id: number; habitName: string; streak: number }[]
	>([]);

	// Fetch habits from the database
	const fetchHabits = async () => {
		const response = await fetch(
			"https://habittrackerfunctionapp-gwc7enc8f2ejb3a7.uksouth-01.azurewebsites.net/api/AddHabit"
		);
		const data = await response.json();
		setHabits(
			data.map((habit: any) => ({
				id: habit.id,
				habitName: habit.habitName,
				streak: habit.streak,
			}))
		);
	};

	// Handle drag and drop
	const handleDragEnd = async (result: any) => {
		if (!result.destination) return;

		const reorderedItems = [...habits];
		const [removed] = reorderedItems.splice(result.source.index, 1);
		reorderedItems.splice(result.destination.index, 0, removed);

		setHabits(reorderedItems);

		// Send the updated order to the backend
		await fetch(
			"https://habittrackerfunctionapp-gwc7enc8f2ejb3a7.uksouth-01.azurewebsites.net/api/updatehabitorder",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(
					reorderedItems.map((habit, index) => ({
						id: habit.id,
						order: index,
					}))
				),
			}
		);
	};

	useEffect(() => {
		fetchHabits(); // Fetch habits when the page loads
	}, []);
	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="bg-gray-100 mx-auto max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] px-4 py-10 mt-10 rounded-lg shadow-lg">
				<Droppable droppableId="habits" direction="vertical">
					{(provided) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className="space-y-2"
						>
							{habits.map((habit, index) => (
								<Draggable
									key={habit.id}
									draggableId={habit.id ? habit.id.toString() : "defaultId"}
									index={index}
								>
									{(provided, snapshot) => (
										<div
											ref={provided.innerRef}
											{...provided.draggableProps}
											className={`flex py-4 border-b border-gray-500 items-center ${
												snapshot.isDragging ? "bg-blue-100" : ""
											}`}
											style={provided.draggableProps.style}
										>
											<Checkbox className="w-6 h-6" />
											<p className="text-black font-semibold ml-4 flex-grow">
												{habit.habitName}
											</p>
											<p className="text-black ml-16">
												Streak: {habit.streak || 0}
											</p>
											<div
												{...provided.dragHandleProps}
												className="cursor-pointer"
											>
												<Menu />
											</div>
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	);
}
