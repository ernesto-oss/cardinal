import * as React from "react";
import * as AvatarComponent from "@radix-ui/react-avatar";

type AvatarProps = {
  image?: string | null;
  imageAlt: string;
  fallback: string;
};

export const Avatar: React.FC<AvatarProps> = ({
  image,
  imageAlt,
  fallback,
}) => {
  return (
    <AvatarComponent.Root className="inline-flex h-9 w-9 select-none items-center justify-center overflow-hidden rounded-full bg-transparent align-middle">
      <AvatarComponent.Image
        className="h-full w-full rounded-full object-cover"
        src={image as string}
        alt={imageAlt}
      />
      <AvatarComponent.Fallback className="flex h-full w-full items-center justify-center bg-slate-300/50 text-base font-bold text-slate-700">
        {fallback}
      </AvatarComponent.Fallback>
    </AvatarComponent.Root>
  );
};
