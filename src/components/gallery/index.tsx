"use client";

import Image from "next/image";
import { TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import GalleryTab from "./gallery-tab";

interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <TabGroup as="div" className="flex flex-col-reverse">
      <div className="hidden w-full max-w-2xl mx-auto mt-6 sm:block lg:max-w-none">
        <TabList className="grid grid-cols-4 gap-6">
          {images?.map((image) => (
            <GalleryTab key={image} image={image} />
          ))}
        </TabList>
      </div>
      <TabPanels className="w-full aspect-square">
        {images?.map((image) => (
          <TabPanel key={image}>
            <div className="relative w-full h-full overflow-hidden aspect-square sm:rounded-lg">
              <Image
                fill
                src={image}
                alt={"Image"}
                className="object-cover object-center"
              />
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default Gallery;
