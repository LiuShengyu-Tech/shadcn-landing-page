import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import scalability from "/assets/imgs/scalability.gif";
import aspect_ratio from "/assets/imgs/aspect_ratio.gif";
import deversity from "/assets/imgs/deversity.gif";

interface FeatureProps {
  title: string;
  description: string;
  image: string;
}

const features: FeatureProps[] = [
  {
    title: "Diversity Scenarios",
    description:
      "Generate multiple layout alternatives based on user-defined parameters, enabling exploration of diverse design options.",
    image: deversity,
  },
  {
    title: "Different Aspect Ratios",
    description:
      "Generate layouts that adapt to various aspect ratios, ensuring factory layout optimization for different configurations.",
    image: aspect_ratio,
  },
  {
    title: "Scalability",
    description:
      "Design layouts that can easily scale up or down based on changing production needs and facility sizes.",
    image: scalability,
  },
];

const featureList: string[] = [
  "User interface",
  "Customizable parameters",
  "Real-time layout generation",
  "Export options",
  "Integration with CAD software",
  "Cost estimation",
  "Lifecycle assessment",
];

export const GD_Features = () => {
  return (
    <section
      id="gd_features"
      className="container py-24 sm:py-32 space-y-8"
    >
      <h2 className="text-3xl lg:text-4xl font-bold md:text-center">
        Generative Design{" "}
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Features
        </span>
      </h2>

      <div className="flex flex-wrap md:justify-center gap-4">
        {featureList.map((feature: string) => (
          <div key={feature}>
            <Badge
              variant="secondary"
              className="text-sm"
            >
              {feature}
            </Badge>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map(({ title, description, image }: FeatureProps) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>

            <CardContent>{description}</CardContent>

            <CardFooter>
              <img
                src={image}
                alt="About feature"
                className="w-[200px] lg:w-[300px] mx-auto"
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};
