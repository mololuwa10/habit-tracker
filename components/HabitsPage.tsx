/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Menu } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialHabits = [
	{ id: 1, name: "Drink Water", streak: 5 },
	{ id: 2, name: "Exercise", streak: 4 },
	{ id: 3, name: "Meditate", streak: 3 },
	{ id: 4, name: "Read a book", streak: 2 },
];

export default function HabitsPage() {
	const [habits, setHabits] = useState(initialHabits);

	const handleDragEnd = (result: any) => {
		if (!result.destination) return;

		const reorderedItems = [...habits];
		const [removed] = reorderedItems.splice(result.source.index, 1);
		reorderedItems.splice(result.destination.index, 0, removed);

		setHabits(reorderedItems);
	};

	return (
		<DragDropContext onDragEnd={handleDragEnd}>
			<div className="bg-gray-100 max-w-screen-lg mx-auto px-8 py-10 mt-10 rounded-lg shadow-lg">
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
									draggableId={habit.id.toString()}
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
												{habit.name}
											</p>
											<p className="text-black ml-16">Streak: {habit.streak}</p>
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
