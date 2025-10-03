import { useEffect, useState } from "react";

const items = [
  {
    logoDark: '/assets/logos/ut-white.png',
    logoLight: '/assets/logos/ut-black.png',
    link: 'https://www.utwente.nl/en/',
    alt: 'Logo 1'
  },
  {
    logoDark: '/assets/logos/NXTGEN.jpg',
    logoLight: '/assets/logos/NXTGEN.jpg',
    link: 'https://nxtgenhightech.nl/',
    alt: 'Logo 1'
  },
  {
    logoDark: '/assets/logos/uneedle.png',
    logoLight: '/assets/logos/uneedle.png',
    link: 'https://www.uneedle.com/',
    alt: 'Logo 1'
  },
  {
    logoDark: '/assets/logos/oddbot.png',
    logoLight: '/assets/logos/oddbot.png',
    link: 'https://www.odd.bot/',
    alt: 'Logo 2'
  },
  {
    logoDark: '/assets/logos/cooll.png',
    logoLight: '/assets/logos/cooll.png',
    link: 'https://cooll.com/',
    alt: 'Logo 2'
  },
  {
    logoDark: '/assets/logos/distribute-white.png',
    logoLight: '/assets/logos/distribute-black.png',
    link: 'https://www.distribute.company/',
    alt: 'Logo 2'
  },
];



export const Sponsors = () => {
  const [isDark, setIsDark] = useState(document.documentElement.classList.contains('dark'));

 useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);





  return (
    <section
      id="sponsors"
      className="container pt-24 sm:py-32"
    >
      <h2 className="text-center text-md lg:text-xl font-bold mb-8 text-primary">
        Investors and Collaborating Companies
      </h2>

      <div className="flex flex-wrap justify-center items-center gap-4 md:gap-10">
    {items.map((item, idx) => (
      <a href={item.link} target="_blank" rel="noopener noreferrer" key={idx}>
        <img 
        src={isDark ? item.logoDark : item.logoLight} 
        alt={item.alt} 
        style={{height: 60 }} />
      </a>
    ))}
  </div>





    </section>
  );
};
