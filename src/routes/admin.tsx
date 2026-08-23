import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { AdminLayout } from "@/components/admin/layout/AdminLayout";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin")({
	component: AdminRouteWrapper,
});

function AdminRouteWrapper() {
	const { session, loading } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!loading && !session) {
			navigate({ to: "/login" });
		}
	}, [session, loading, navigate]);

	if (loading) {
		return (
			<div className="min-h-dvh flex items-center justify-center bg-[#050507] text-white">
				Verificando acesso...
			</div>
		);
	}

	if (!session) {
		return null; // Will redirect in useEffect
	}

	return (
		<AdminLayout>
			<Outlet />
		</AdminLayout>
	);
}
