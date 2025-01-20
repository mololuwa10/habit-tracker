import Footer from "@/components/Footer";
import HabitsPage from "@/components/HabitsPage";
import Header from "@/components/Header";

export default function Home() {
	return (
		<>
			<div className="bg-white min-h-screen">
				<Header />

				<HabitsPage />

				<Footer />
			</div>
		</>
	);
}
