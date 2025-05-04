export default function WelcomeBlog() {
  return (
    <div className="w-full py-12 border-b border-border/30">
      <div className="space-y-6">
        <div className="flex flex-col space-y-3">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Welcome to trilm&apos;s space
          </h1>
          <p className="text-muted-foreground max-w-[650px] text-base sm:text-lg">
            What I&apos;ve been up to lately, and what I think about the world.
          </p>
        </div>
        <div className="pt-2">
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
