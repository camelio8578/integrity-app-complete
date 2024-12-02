import React, { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VerificationForm from "@/components/VerificationForm";
import { toast } from "@/components/ui/use-toast";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handlePiAuth = () => {
    // Simulate Pi Network authentication
    console.log("Authenticating with Pi Network...");
    setIsAuthenticated(true);
    setUsername("PiUser");
    toast({
      title: "Successfully connected!",
      description: "You are now authenticated with Pi Network.",
    });
  };

  const handleGetStarted = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please connect with Pi Network first.",
        variant: "destructive",
      });
      return;
    }
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <Header
        onAuthClick={handlePiAuth}
        isAuthenticated={isAuthenticated}
        username={username}
      />
      {!showForm ? (
        <Hero onGetStarted={handleGetStarted} />
      ) : (
        <div className="container mx-auto py-16">
          <VerificationForm />
        </div>
      )}
    </div>
  );
};

export default Index;