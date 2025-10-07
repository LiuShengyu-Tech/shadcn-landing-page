import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Linkedin, Mail ,School} from "lucide-react";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  socialNetworks: SociaNetworkslProps[];
}

interface SociaNetworkslProps {
  name: string;
  url: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "/assets/photos/shengyu.png",
    name: "Shengyu Liu",
    position: "PhD Candidate",
    socialNetworks: [
       {
        name: "Mail",
        url: "mailto:s.liu-4@utwente.nl",
      },
      {
        name: "School",
        url: "https://people.utwente.nl/s.liu-4",
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/shengyu-liu-038502195/",
      },
     
    ],
  },
  {
    imageUrl: "/assets/photos/sipke.jpg",
    name: "Sipke Hoekstra",
    position: "Assistant Professor",
    socialNetworks: [
       {
        name: "Mail",
        url: "mailto:s.hoekstra@utwente.nl",
      },
      {
        name: "School",
        url: "https://people.utwente.nl/s.hoekstra",
      },
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/sipke-hoekstra-361a9856/",
      },
     
    ],
  },
  {
    imageUrl: "/assets/photos/sebastian.jpg",
    name: "Sebastian Thiede",
    position: "Full Professor Chair of Manufacturing Systems",

    socialNetworks: [
      {
        name: "Mail",
        url: "mailto:s.thiede@utwente.nl",
      },
 {
        name: "School",
        url: "https://people.utwente.nl/s.thiede",
      },
      
      {
        name: "Linkedin",
        url: "https://www.linkedin.com/in/sebastian-thiede-42a7802b/?locale=en",
      },
    ],
  },
];

export const Team = () => {
  const socialIcon = (iconName: string) => {
    switch (iconName) {
      case "Linkedin":
        return <Linkedin size="20" />;
      case "Mail":
        return <Mail size="20" />;
      case "School":
        return <School size="20" />;
    }
  };

  return (
    <section
      id="contact"
      className="container py-24 sm:py-32 text-center"
    >
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="bg-gradient-to-b from-primary/60 to-primary text-transparent bg-clip-text">
          Contact {" "}
        </span>
        Information
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground">
        University of Twente | Faculty of Engineering Technology | Dept. of Design, Production & Management(DPM)
        Chair of Manufacturing System

      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-10 justify-items-center">
        {teamList.map(
          ({ imageUrl, name, position, socialNetworks }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center w-80"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <img
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
                <p>UT-ET-DPM-MS</p>
              </CardContent>

              <CardFooter>
                {socialNetworks.map(({ name, url }: SociaNetworkslProps) => (
                  <div key={name}>
                    <a
                      rel="noreferrer noopener"
                      href={url}
                      target="_blank"
                      className={buttonVariants({
                        variant: "ghost",
                        size: "sm",
                      })}
                    >
                      <span className="sr-only">{name} icon</span>
                      {socialIcon(name)}
                    </a>
                  </div>
                ))}
              </CardFooter>
            </Card>
          )
        )}
      </div>
    </section>
  );
};
