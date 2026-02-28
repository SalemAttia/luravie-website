export function ProductsSkeleton() {
  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-16">
          <div className="h-8 md:h-10 w-64 bg-teal/10 rounded-xl mx-auto mb-4 animate-pulse" />
          <div className="h-5 w-80 bg-teal/5 rounded-lg mx-auto animate-pulse" />
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-10">
          {[0, 1, 2].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] rounded-2xl md:rounded-[2rem] bg-teal/5 mb-3 md:mb-6" />
              <div className="space-y-2 px-1 md:px-2">
                <div className="flex justify-between">
                  <div className="h-4 md:h-5 w-24 bg-teal/10 rounded-md" />
                  <div className="h-4 md:h-5 w-16 bg-coral/10 rounded-md" />
                </div>
                <div className="h-3 w-20 bg-teal/5 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
