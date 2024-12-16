"use client";
import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      if (scrollYProgress.get() < 0.05) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.2,
        }}
        className={cn("fixed z-[5000] inset-x-0 mx-auto", className)}
      >
        {/* Nav Container */}
        <div
          className={cn(
            // Base styles
            "relative flex items-center justify-between",
            // Width transitions
            "transition-all duration-300 ease-in-out",
            // Width for different states
            mobileMenuOpen ? "w-[95%]" : "w-[60%]",
            // Minimum width and responsive width
            "min-w-[200px]",
            // Container positioning
            "mx-auto",
            // Padding
            "px-4 sm:px-6 md:px-8 lg:px-20 xl:px-32",
            "py-3 sm:py-4 lg:py-5",
            // Positioning
            "top-4 sm:top-6 lg:top-0",
            // Border radius
            "rounded-xl lg:rounded-none",
            // Full width at 630px
            "min-[630px]:w-full"
          )}
          style={{
            backdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(17, 25, 40, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.125)",
          }}
        >
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/jsm-logo.png"
                alt="Company Logo"
                width={120}
                height={40}
                className="h-6 w-auto sm:h-8 lg:h-10"
                priority
              />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="min-[630px]:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:text-gray-300 transition-colors"
            >
              {mobileMenuOpen ? (
                <IoMdClose className="h-6 w-6" />
              ) : (
                <RxHamburgerMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden min-[630px]:flex items-center justify-end space-x-8 flex-grow">
            {navItems.map((navItem: any, idx: number) => (
              <Link
                key={`desktop-link-${idx}`}
                href={navItem.link}
                className="relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 text-base"
              >
                <span className="!cursor-pointer">{navItem.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Navigation Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "absolute left-0 right-0",
                  "top-full mt-2",
                  "p-4 rounded-lg",
                  "min-[630px]:hidden",
                  "bg-[rgba(17,25,40,0.95)]",
                  "border border-white/[0.125]",
                  "backdrop-blur-md"
                )}
              >
                <div className="flex flex-col space-y-4">
                  {navItems.map((navItem: any, idx: number) => (
                    <Link
                      key={`mobile-link-${idx}`}
                      href={navItem.link}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-neutral-50 hover:text-neutral-300 transition-colors py-2 text-sm sm:text-base"
                    >
                      <span className="flex items-center space-x-2">
                        {navItem.icon && <span>{navItem.icon}</span>}
                        <span>{navItem.name}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
 export default FloatingNav