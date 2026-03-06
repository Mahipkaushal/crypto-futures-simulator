'use client';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 px-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 -left-20 w-80 h-80 bg-[#0df26c] opacity-5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 -right-20 w-80 h-80 bg-[#0df26c] opacity-5 blur-[120px] rounded-full" />

            <div className="w-full max-w-md z-10">
                {children}
            </div>
        </div>
    );
}
