import React, { useState, useEffect, useRef } from "react";
import ProductDescription from "./ProductDescription";
import { updateData } from "@/types";
import Reviews from "./Reviews";
import AccordionDemo from "./Accordion";

const ScrollspyTabs = ({ data }: { data: updateData }) => {
  const [activeTab, setActiveTab] = useState("section1");
  const [showNav, setShowNav] = useState(true);
  const sectionRefs: React.MutableRefObject<{
    [key: string]: HTMLDivElement | null;
  }> = useRef({});
  const navRef = useRef<HTMLElement>(null);

  const sections = [
    {
      id: "section1",
      title: "Description",
      content: <ProductDescription data={data} />,
    },
    {
      id: "section2",
      title: "Reviews",
      content: <Reviews data={data} />,
    },
    {
      id: "section3",
      title: "FAQs",
      content: <AccordionDemo faqs={data.faqs} />,
    },
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveTab(section.id);
            setShowNav(true);
          }
        },
        { threshold: 0.5 }
      );

      if (sectionRefs.current[section.id]) {
        observer.observe(sectionRefs.current[section.id]!);
      }

      observers.push(observer);

      // Add observer for the last section
      if (index === sections.length - 1) {
        const lastSectionObserver = new IntersectionObserver(
          ([entry]) => {
            if (!entry.isIntersecting && entry.boundingClientRect.top < 0) {
              setShowNav(false);
            } else {
              setShowNav(true);
            }
          },
          { threshold: [0, 1], rootMargin: "0px" }
        );

        if (sectionRefs.current[section.id]) {
          lastSectionObserver.observe(sectionRefs.current[section.id]!);
        }

        observers.push(lastSectionObserver);
      }
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const handleTabClick = (sectionId: string) => {
    setActiveTab(sectionId);
    const navHeight = navRef.current?.offsetHeight || 0; // Get the height of the nav
    const targetElement = sectionRefs.current[sectionId];
    if (targetElement) {
      const topPosition =
        targetElement.getBoundingClientRect().top + window.scrollY - navHeight; // Adjust position
      window.scrollTo({ top: topPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="max-sm:mt-4">
      <nav
        ref={navRef}
        className={`sticky top-0 z-10 bg-white transition-all duration-300 ${
          showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        <ul className="flex p-4">
          {sections.map((section) => (
            <li key={section.id} className="mr-4">
              <button
                className={`px-3 py-2 rounded relative ${
                  activeTab === section.id
                    ? "font-semibold after:bg-primary after:rounded-full after:-translate-x-1/2 after:left-1/2 after:w-6 after:h-[2px] after:absolute after:bottom-0 "
                    : ""
                }`}
                onClick={() => handleTabClick(section.id)}
              >
                {section.title}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {sections.map((section) => (
        <div
          key={section.id}
          ref={(el) => {
            sectionRefs.current[section.id] = el;
          }}
        >
          {section.content}
        </div>
      ))}
    </div>
  );
};

export default ScrollspyTabs;
