import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex h-dvh overflow-hidden bg-[#07070a] text-white font-sans">
			<AdminSidebar />
			<div className="flex-1 flex flex-col min-w-0 relative">
				{/* Background visual layer */}
				<div className="absolute inset-0 pointer-events-none z-0">
					{/* Dot grid pattern */}
					<div className="absolute inset-0 bg-[radial-gradient(#ffffff06_1px,transparent_1px)] [background-size:20px_20px]" />
					{/* Ambient glow top-left */}
					<div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#a280ff]/[0.04] rounded-full blur-[100px]" />
					{/* Ambient glow bottom-right */}
					<div className="absolute -bottom-20 -right-20 w-[350px] h-[350px] bg-[#4ed4cf]/[0.03] rounded-full blur-[100px]" />
				</div>

				<AdminHeader />
				<main className="flex-1 p-6 lg:p-8 overflow-y-auto relative z-10">
					{children}
				</main>
			</div>
		</div>
	);
}

