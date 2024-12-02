import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface HeroProps {
  onGetStarted: () => void;
}

const Hero = ({ onGetStarted }: HeroProps) => {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-primary mb-6">
          Welcome to Integrity
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          A secure and transparent verification platform built on Pi Network.
          Verify and validate with confidence.
        </p>
        <Button
          onClick={onGetStarted}
          className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-lg text-lg"
        >
          Get Started
        </Button>
      </motion.div>
    </div>
  );
};

export default Hero;