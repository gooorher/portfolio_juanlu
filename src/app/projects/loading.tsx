import { Navbar } from "@/components/navbar"

export default function Loading() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container px-4 py-12 mx-auto max-w-5xl">
                {/* Skeleton grid matching case study layout */}
                <div className="animate-pulse space-y-8">
                    <div className="h-8 w-24 bg-muted/50 rounded" />

                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                        <div className="space-y-4">
                            <div className="h-6 w-32 bg-muted/50 rounded-full mb-4" />
                            <div className="h-12 w-3/4 bg-muted/50 rounded mb-6" />
                            <div className="h-6 w-full bg-muted/50 rounded" />
                            <div className="h-6 w-5/6 bg-muted/50 rounded" />
                            <div className="flex gap-2 mt-8">
                                <div className="h-8 w-20 bg-muted/50 rounded-full" />
                                <div className="h-8 w-20 bg-muted/50 rounded-full" />
                                <div className="h-8 w-20 bg-muted/50 rounded-full" />
                            </div>
                        </div>
                        <div className="h-[350px] bg-muted/30 rounded-2xl border border-border/50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="h-32 bg-muted/30 rounded-xl" />
                        <div className="h-32 bg-muted/30 rounded-xl" />
                        <div className="h-32 bg-muted/30 rounded-xl" />
                    </div>
                </div>
            </main>
        </div>
    )
}
