import { StaticImageData } from "next/image";

export interface ITabprops {
  tab: string
  title: string;
  content: string[] | string;
}

export interface IPricingProps {
  title: string;
  value: string;

}
export interface PricingPlan {
  price: string; // The price of the plan, e.g., "NGN20,000".
  duration: string; // The duration of the plan, e.g., "/month" or "/6 month".
  title: string; // The title of the plan, e.g., "FutureLabs Skill Subscription".
  description: string; // A brief description of the plan.
  features: string[]; // A list of features included in the plan.
  buttonLabel: string; // The label text for the plan's button.
}


export interface ICourse {
  id: string;
  img: StaticImageData
  title: string;
  tabs: ITabprops[];
  pricing: IPricingProps[];
  pricingPlans: PricingPlan[]
}