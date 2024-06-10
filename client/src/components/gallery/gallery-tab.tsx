import Image from "next/image";
import { Tab } from "@headlessui/react";

import { cn } from "@/lib/utils";

interface GalleryTabProps {
  image: string;
}

const GalleryTab: React.FC<GalleryTabProps> = ({ image }) => {
  return (
    <Tab className="relative flex items-center justify-center bg-white rounded-md cursor-pointer aspect-square">
      {({ selected }) => (
        <div>
          <span className="absolute inset-0 w-full h-full overflow-hidden rounded-md aspect-square">
            <Image
              fill
              alt=""
              src={image}
              className="object-cover object-center"
            />
          </span>
          <span
            className={cn(
              "absolute inset-0 rounded-md ring-2 ring-offset-2",
              selected ? "ring-black" : "ring-transparent"
            )}
          />
        </div>
      )}
    </Tab>
  );
};

export default GalleryTab;
