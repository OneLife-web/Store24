import React, { useState, useEffect, useRef } from "react";

const ScrollspyTabs = () => {
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
      content: (
        <div>
          <h3 className="text-xl font-semibold mb-2">Our Story</h3>
          <p>
            We are a passionate team dedicated to creating innovative
            solutions...
          </p>
        </div>
      ),
    },
    {
      id: "section2",
      title: "Reviews",
      content: (
        <ul className="list-disc pl-5">
          <li>Web Development</li>
          <li>Mobile App Design</li>
          <li>UI/UX Consulting</li>
        </ul>
      ),
    },
    {
      id: "section3",
      title: "FAQs",
      content: (
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </form>
      ),
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
    sectionRefs.current[sectionId]?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <nav
        ref={navRef}
        className={`sticky top-0 bg-white z-10 transition-all duration-300 ${
          showNav ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
        }`}
      >
        <ul className="flex p-4">
          {sections.map((section) => (
            <li key={section.id} className="mr-4">
              <button
                className={`px-3 py-2 rounded relative ${
                  activeTab === section.id
                    ? "font-semibold after:bg-primary after:rounded-full after:-translate-x-1/2 after:left-1/2 after:w-6 after:h-1 after:absolute after:bottom-0 "
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
          className="min-h-screen p-4"
        >
          <h2 className="text-2xl font-bold mb-4">{section.title}</h2>
          {section.content}
        </div>
      ))}
    </div>
  );
};

export default ScrollspyTabs;
