import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-slate-950">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none fixed inset-0 -z-10"></main>
            <div className="flex-1 flex flex-col relative">
                {children}
            </div>
        </div>
    );
}
