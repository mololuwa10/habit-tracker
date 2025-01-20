/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AddHabit from "@/app/AddHabit/page";
import { Plus, X } from "lucide-react";
import React, { useState } from "react";

export default function Footer() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const toggleModal = () => {
		setIsModalOpen(!isModalOpen);
	};

	const closeModal = (e: any) => {
		if (e.target.id === "modal-backdrop") {
			setIsModalOpen(false);
		}
	};

	return (
		<>
			<div className="flex justify-center py-4">
				<button
					className="bg-orange-400 hover:bg-orange-500 hover:scale-110 animation ease-in duration-200 text-white font-bold py-4 px-4 rounded-[2.0rem]"
					onClick={toggleModal}
				>
					<Plus className="w-6 h-6 sm:w-8 sm:h-8" />
				</button>
			</div>

			{isModalOpen && (
				<div
					id="modal-backdrop"
					onClick={closeModal}
					className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50"
				>
					{/* Modal Content */}
					<div
						className="bg-white rounded-lg p-6 w-full max-w-md transition-all transform ease-in duration-300 sm:max-w-sm lg:max-w-lg"
						onClick={(e) => e.stopPropagation()}
					>
						<button
							className="absolute top-4 right-4 text-gray-600 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8"
							onClick={toggleModal}
						>
							<X className="w-6 h-6" />
						</button>
						<AddHabit /> {/* Render the AddHabit component inside the modal */}
					</div>
				</div>
			)}

			<footer className="bg-gray-100 text-gray-600 p-4 text-center">
				<div className="container mx-auto">
					<p className="text-sm sm:text-base">
						© Copyright {new Date().getFullYear()}. All rights reserved.
					</p>
				</div>
			</footer>
		</>
	);
}
