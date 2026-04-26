"use client";

import Hero from "@/components/Hero";
import { GALLERY_ITEMS, GALLERY_FILTERS } from "@/lib/content";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const GalleryPage = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredItems =
    activeFilter === "All"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeFilter);

  return (
    <div className="overflow-x-hidden">
      <Hero
        Image="images/carousel-1.jpg"
        section="Gallery"
        desc="Browse our recent solar installations across Melbourne and regional Victoria."
      />

      <div className="py-10 md:py-16 px-4 font-sans">
        <div className="max-w-6xl mx-auto">
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-10">
            {GALLERY_FILTERS.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                  activeFilter === filter
                    ? "bg-[#32C36C] text-white shadow-lg"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.image}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group relative h-64 md:h-72 rounded-xl overflow-hidden cursor-pointer"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-white font-bold text-base md:text-lg">
                      {item.title}
                    </h3>
                    <span className="text-green-300 text-sm font-medium">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredItems.length === 0 && (
            <p className="text-center text-slate-400 py-10">
              No projects found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryPage;
