import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VerificationForm from "@/components/VerificationForm";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    Pi?: {
      authenticate: (
        scopes: string[],
        onIncompletePaymentFound: (payment: any) => void
      ) => Promise<{
        accessToken: string;
        user: {
          uid: string;
          username: string;
        };
      }>;
      createPayment: (payment: {
        amount: number;
        memo: string;
        metadata: object;
      }) => Promise<any>;
      openShareDialog: (title: string, message: string) => Promise<void>;
    };
  }
}

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isPiBrowser, setIsPiBrowser] = useState(false);

  useEffect(() => {
    console.log("Checking Pi SDK availability...");
    // Check if running in Pi Browser
    const checkPiBrowser = async () => {
      try {
        if (window.Pi) {
          console.log("Pi SDK is available");
          setIsPiBrowser(true);
        } else {
          console.log("Pi SDK not found - this is expected in development");
          setIsPiBrowser(false);
          toast({
            title: "Not in Pi Browser",
            description: "Please open this app in Pi Browser for full functionality",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error checking Pi Browser:", error);
        setIsPiBrowser(false);
      }
    };

    checkPiBrowser();
  }, []);

  const handlePiAuth = async () => {
    console.log("Attempting Pi authentication...");
    try {
      if (!window.Pi) {
        console.log("Pi SDK not available, showing mock auth for development");
        setIsAuthenticated(true);
        setUsername("DevUser");
        toast({
          title: "Development Mode",
          description: "Using mock authentication. Connect Pi SDK in production.",
        });
        return;
      }

      const scopes = ["username", "payments", "wallet_address"];
      const auth = await window.Pi.authenticate(scopes, () => {
        console.log("Handling incomplete payment...");
        return Promise.resolve();
      });
      
      console.log("Authentication successful:", auth);
      setIsAuthenticated(true);
      setUsername(auth.user.username);
      toast({
        title: "Successfully connected!",
        description: "You are now authenticated with Pi Network.",
      });
    } catch (error) {
      console.error("Pi authentication failed:", error);
      toast({
        title: "Authentication Failed",
        description: "Could not connect to Pi Network",
        variant: "destructive",
      });
    }
  };

  const handlePayment = async () => {
    if (!window.Pi) {
      toast({
        title: "Development Mode",
        description: "Payments are only available in Pi Browser",
        variant: "destructive",
      });
      return;
    }

    try {
      const payment = await window.Pi.createPayment({
        amount: 1,
        memo: "Test payment for Integrity app",
        metadata: { type: "verification_payment" }
      });
      
      console.log("Payment created:", payment);
      toast({
        title: "Payment Initiated",
        description: "Please complete the payment in Pi Browser",
      });
    } catch (error) {
      console.error("Payment failed:", error);
      toast({
        title: "Payment Failed",
        description: "Could not create payment",
        variant: "destructive",
      });
    }
  };

  const handleShare = async () => {
    if (!window.Pi) {
      toast({
        title: "Development Mode",
        description: "Sharing is only available in Pi Browser",
        variant: "destructive",
      });
      return;
    }

    try {
      await window.Pi.openShareDialog(
        "Integrity App",
        "Verify and validate with confidence on Pi Network!"
      );
    } catch (error) {
      console.error("Share failed:", error);
      toast({
        title: "Share Failed",
        description: "Could not open share dialog",
        variant: "destructive",
      });
    }
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
        <div>
          <Hero onGetStarted={handleGetStarted} />
          {isAuthenticated && (
            <div className="flex flex-col items-center gap-4 mt-4">
              <Button 
                onClick={handlePayment}
                className="bg-secondary hover:bg-secondary/90 text-primary font-semibold"
              >
                Send 1 Pi Test Payment
              </Button>
              <Button 
                onClick={handleShare}
                variant="outline"
                className="text-primary font-semibold"
              >
                Share App
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="container mx-auto py-16">
          <VerificationForm />
        </div>
      )}
    </div>
  );
};

export default Index;