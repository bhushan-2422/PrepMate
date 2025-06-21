import { getTechLogos } from "@/lib/utils";
import React from "react";
import Image from "next/image";

const DisplayTechIcons = async ({ techstack }) => {
  const techlogos = await getTechLogos(techstack);
  return (
    <div className="flex ">
      {techlogos.slice(0, 3).map(({ tech, url }, index) => {
        return (
          <div
            key={tech}
            className={`relative group bg-dark-300 rounded-full p-2 flex-center ${
              index >= 1 ? "-ml-3" : ""
            }`}
          >
            <span className="tech-tooltip">{tech}</span>
            <Image
              src={url}
              alt={tech}
              width={100}
              height={100}
              className="size-5"
            />
          </div>
        );
      })}{" "}
    </div>
  );
};

export default DisplayTechIcons;
