export default function ProductLoading() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                {/* Image skeleton */}
                <div className="aspect-[3/4] rounded-2xl md:rounded-[2rem] bg-blush" />

                {/* Details skeleton */}
                <div className="space-y-6 py-4">
                    <div className="h-4 w-20 bg-blush rounded" />
                    <div className="h-8 w-3/4 bg-blush rounded" />
                    <div className="h-6 w-24 bg-blush rounded" />
                    <div className="space-y-3 pt-4">
                        <div className="h-4 w-full bg-blush rounded" />
                        <div className="h-4 w-5/6 bg-blush rounded" />
                        <div className="h-4 w-2/3 bg-blush rounded" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <div className="h-8 w-8 rounded-full bg-blush" />
                        <div className="h-8 w-8 rounded-full bg-blush" />
                        <div className="h-8 w-8 rounded-full bg-blush" />
                    </div>
                    <div className="flex gap-3 pt-4">
                        <div className="h-10 w-16 rounded-xl bg-blush" />
                        <div className="h-10 w-16 rounded-xl bg-blush" />
                        <div className="h-10 w-16 rounded-xl bg-blush" />
                    </div>
                    <div className="h-14 w-full rounded-2xl bg-blush mt-6" />
                </div>
            </div>
        </div>
    );
}
