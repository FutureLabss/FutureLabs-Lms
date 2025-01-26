import { displayExploreData } from "@/core/const/landingpage/explore.data";
import CardComponent from "./card";

export default function DashboardCardExplore() {
  return (
    <div className="bg-background py-10" id="schools">
      <h2 className="text-center md:text-3xl xsm:text-[1.5rem] font-bold text-white mb-6">Explore a World of <span className="text-orange-400">Skills</span></h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:pr-[108px] md:pl-[80px] gap-[40px] mt-10">
        {displayExploreData.map((data, index) => (
          <CardComponent
            key={index}
            title={data.title}
            description={data.description}
            persons={data.persons}
            img={data.img}
            id={data.id}
          />
        ))}
      </div>
    </div>
  );
}