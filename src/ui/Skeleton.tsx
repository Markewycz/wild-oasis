import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonLoading({ times }: { times: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: times }).map((_, index) => (
        <div key={index} className="flex items-center space-x-4 w-full">
          <Skeleton className="h-20 w-20 flex-shrink-0" />
          <div className="space-y-2 w-full">
            <Skeleton className="h-8 w-[90%]" />
            <Skeleton className="h-8 w-[70%]" />
          </div>
        </div>
      ))}
    </div>
  );
}
