"use client";

import Hero from "@/components/Hero";
import { PRODUCT_CATEGORIES } from "@/lib/content";
import { useState } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ProductPage = () => {
  const [activeCategory, setActiveCategory] = useState(PRODUCT_CATEGORIES[0].id);
  const category = PRODUCT_CATEGORIES.find((c) => c.id === activeCategory) || PRODUCT_CATEGORIES[0];

  return (
    <div className="overflow-x-hidden">
      <Hero
        Image="images/carousel-2.jpg"
        section="Our Products"
        desc="We supply and install Australia's leading solar brands — Tier 1 panels, premium batteries, reliable inverters and smart EV chargers."
      />

      <div className="py-10 md:py-16 px-4 font-sans">
        <div className="max-w-6xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center mb-8">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-full font-semibold text-sm md:text-base transition-all duration-300 ${
                  activeCategory === cat.id
                    ? "bg-[#32C36C] text-white shadow-lg"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Category Description */}
          <p className="text-center text-slate-500 max-w-3xl mx-auto mb-10 text-sm md:text-base">
            {category.description}
          </p>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.products.map((product, index) => (
              <motion.div
                key={`${category.id}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="flex flex-col gap-4 border border-slate-100 rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="relative h-48 w-full bg-slate-100">
                    <Image
                      src={product.image}
                      alt={`${product.brand} ${product.model}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-3 p-5 flex-grow">
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 rounded-full bg-green-50 text-[#32C36C] font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-bold text-black">{product.brand}</h3>
                    <p className="text-sm font-semibold text-slate-600">{product.model}</p>
                    <p className="text-sm text-slate-500 flex-grow">{product.description}</p>
                    <div className="flex flex-col gap-1 text-xs text-slate-500 mt-2 border-t pt-3">
                      {"type" in product && <span>Type: {product.type}</span>}
                      {"efficiency" in product && <span>Efficiency: {product.efficiency}</span>}
                      {"capacity" in product && <span>Capacity: {product.capacity}</span>}
                      {"power" in product && <span>Power: {product.power}</span>}
                      {"connector" in product && <span>Connector: {product.connector}</span>}
                      {"warranty" in product && <span>Warranty: {product.warranty}</span>}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex justify-center mt-12">
            <Button
              size="lg"
              className="bg-[#32C36C] hover:bg-[#2B9A5A] rounded-full"
              asChild
            >
              <Link href="/quote">Get a Free Quote</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
