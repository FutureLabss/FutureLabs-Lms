import { Icon } from '@/shared/components/common/icon';
import clsx from 'clsx';
import React, { useState } from 'react';
import { PricingPlan } from '@/core/types/interface/landing/courses';

const Pricing = ({ course }: { course: PricingPlan[] }) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);



  return (
    <div className=" md:px-5">
      <div className="flex justify-center gap-[2.4375rem] flex-wrap ">
        {course.map((plan, index) => (
          <div
            key={index}
            className={clsx(
              "bg-white text-[#848199] cursor-pointer p-7 rounded-[24px] w-full md:max-w-xs  transition duration-300 flex flex-col gap-4 justify-between",
              hoveredCard === index ? "hover:text-white hover:bg-primary" : ""
            )}
            onMouseEnter={() => setHoveredCard(index)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div
              className={clsx(
                "text-[1.625rem] font-bold mb-[1.5rem]",
                hoveredCard === index ? "text-white" : "text-[#231D4F]"
              )}
            >
              {plan.price}
              <span className={clsx("text-[1.0625rem] font-medium", hoveredCard === index ? "text-white" : "text-[#848199]")}>{plan.duration}</span>
            </div>
            <div className="flex flex-col gap-[14px] mb-3">
              <h3 className={clsx("text-[16px] font-bold", hoveredCard === index ? "text-white" : "text-[#231D4F]")}>{plan.title}</h3>
              <p className="">{plan.description}</p>
            </div>
            <ul className="space-y-5 text-sm">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span>
                    <Icon.CheckList />
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <div>
              <button
                className={clsx(
                  "w-full py-3 bg-[#F57F20]/10 text-[#F57F20] rounded-[1.875rem] transition",
                  hoveredCard === index ? " bg-[#F57F20]/10 rounded-[1.875rem bg-secondary text-white" : "bg-[#F57F20]/10 rounded-[1.875rem"
                )}

              >
                {plan.buttonLabel}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
