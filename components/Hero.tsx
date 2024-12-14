import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";
import { Spotlight } from "./ui/Spotlight";
import { TextGenerateEffect } from "./ui/TextGenerateEffect";
import { useState, useEffect } from "react";

const Hero = () => {
  const videos = [
    {
      src: "/construction-video.mp4",
      text: "Building a Better Future, One Brick at a Time",
    },
    {
      src: "/engineering-video.mp4",
      text: "Innovating Engineering Solutions for Tomorrow",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 10000); // Change every 10 seconds
    return () => clearInterval(interval);
  }, [videos.length]);

  const { src: currentVideo, text: currentText } = videos[currentIndex];

  return (
    <div className="relative pb-20 pt-36 h-screen overflow-hidden w-screen">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          key={currentVideo} // Forces re-render to swap videos
          autoPlay
          muted
          loop
          className="w-full h-full object-cover"
          style={{
            filter: "brightness(0.5) blur(1px)", // Adds a dim and slightly blurred effect
            opacity: 0.9, // Makes the video semi-transparent
          }}
        >
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay for Fading Effect */}
        <div className="absolute inset-0 bg-black opacity-20 pointer-events-none"></div>

        {/* Grid Overlay */}
        <div
          className="absolute inset-0 pointer-events-none bg-grid-black-100/[0.2]"
          style={{
            backgroundSize: "10px 10px",
            filter: "brightness(0.9) blur(1px)", // Adds a dim and slightly blurred effect
            opacity: 0.8, // Makes the video semi-transparent
          }}
        ></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
        <div>
          <Spotlight
            className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen opacity-5"
            fill="white"
          />
          <Spotlight
            className="h-[80vh] w-[50vw] top-10 left-full"
            fill="purple"
          />
          <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="blue" />
        </div>

        <div className="flex flex-col items-center justify-center relative my-20">
          <p className="uppercase tracking-widest text-xs text-blue-100 max-w-80">
            Dynamic Web Magic with Next.js
          </p>
          {/* Animated Text Based on Current Video */}
          <div className="px-4">
            <TextGenerateEffect
              key={currentIndex} // Forces re-render for animation
              words={currentText}
              className="text-center text-[30px] md:text-4xl lg:text-5xl"
            />
          </div>
          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            Hi! I&apos;m Adrian, a Next.js Developer based in Croatia.
          </p>
          <a href="#about">
            <MagicButton
              title="Show my work"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
