import Button from '@/shared/components/common/Button';
import { Icon } from '@/shared/components/common/icon';
import clsx from 'clsx';
import React, { useState } from 'react';

const Pricing = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const pricingPlans = [
    {
      price: "NGN20,000",
      duration: "/month",
      title: "FutureLabs Skill Subscription",
      description: "Learn a skill monthly with access to live lessons and pre-recorded courses",
      features: [
        "Access to live classes",
        "Pre-recorded sessions",
        "Dedicated tutor support",
        "Weekly assignments and evaluations",
        "Certificate of Completion",
      ],
      buttonLabel: "Choose plan",
    },
    {
      price: "NGN120,000",
      duration: "/6 month",
      title: "Invest in Your Future",
      description: "Simple pricing for 6 months of skill mastery. No extra charges",
      features: [
        "Access to live classes",
        "Pre-recorded sessions",
        "Dedicated tutor support",
        "Weekly assignments and evaluations",
        "Certificate of Completion",
      ],
      buttonLabel: "Choose plan",
    },
  ];

  return (
    <div className=" md:px-5">
      <div className="flex justify-center gap-[2.4375rem] flex-wrap ">
        {pricingPlans.map((plan, index) => (
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
              <Button
                className="w-full py-2  bg-[#F57F20]/10 text-[#F57F20] rounded-[1.875rem] transition"
                radius="rounded24"
              >
                {plan.buttonLabel}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
