import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
	return (
		<>
			<div className="flex justify-center py-4">
				<Link href={"/AddHabit"}>
					<button className="bg-orange-400 hover:bg-orange-500 hover:scale-110 animation ease-in duration-200 text-white font-bold py-4 px-4 rounded-[2.0rem]">
						<Plus />
					</button>
				</Link>
			</div>
			<footer className="bg-gray-100 text-gray-600 p-4 text-center">
				<div className="container mx-auto">
					<p>© Copyright {new Date().getFullYear()}. All rights reserved.</p>
				</div>
			</footer>
		</>
	);
}
