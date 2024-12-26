import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const VerificationForm = () => {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");

    if (!window.Pi) {
      toast({
        title: "Development Mode",
        description: "Verification payments are only available in Pi Browser",
        variant: "destructive",
      });
      return;
    }

    try {
      const payment = await window.Pi.createPayment({
        amount: 1,
        memo: "Document verification payment",
        metadata: { type: "document_verification" }
      });
      
      console.log("Verification payment created:", payment);
      toast({
        title: "Payment Initiated",
        description: "Please complete the payment to submit your verification",
      });
    } catch (error) {
      console.error("Verification payment failed:", error);
      toast({
        title: "Payment Failed",
        description: "Could not process verification payment",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-md mx-auto p-6 shadow-lg animate-fadeIn">
      <h2 className="text-2xl font-bold text-primary mb-6">
        Submit for Verification
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            placeholder="Enter document title"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Input
            id="description"
            placeholder="Enter brief description"
            className="w-full"
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-dark text-white"
        >
          Submit & Pay 1π
        </Button>
      </form>
    </Card>
  );
};

export default VerificationForm;