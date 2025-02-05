export default function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} className="p-4 border rounded">
          <div className="aspect-square relative overflow-hidden">
            <div className="bg-muted-foreground/10 w-full h-full" />
          </div>
          <div className="mt-2">
            <div className="h-4 w-3/4 bg-muted-foreground/10 mb-2" />
            <div className="h-3 w-1/2 bg-muted-foreground/10" />
          </div>
        </div>
      ))}
    </div>
  );
}
