import { Skeleton } from '@/components/ui/skeleton';

export function SkeletonLoading() {
  return (
    <div className="flex items-center space-x-4 w-full">
      <Skeleton className="h-20 w-20 rounded-full flex-shrink-0" />
      <div className="space-y-2 w-full">
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[75%]" />
      </div>
    </div>
  );
}
