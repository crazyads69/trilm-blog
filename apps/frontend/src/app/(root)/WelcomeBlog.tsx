export default function WelcomeBlog() {
  return (
    <div className="w-full py-8">
      <div className="mx-auto space-y-4">
        <div className="flex flex-col space-y-3">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight">
            Welcome to trilm&apos;s space
          </h1>
          <p className="text-muted-foreground max-w-[650px] text-base sm:text-md">
            What i&apos;ve been up to lately, and what i think about the world.
          </p>
        </div>
        <div className="pt-6">
          <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background shadow-sm">
            <span className="text-foreground font-medium mr-2">
              Latest Posts
            </span>
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              New
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
