import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="flex w-full flex-col items-center justify-between">
      <Spinner />
    </div>
  );
}
