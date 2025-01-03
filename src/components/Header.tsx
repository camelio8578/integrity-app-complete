import React from "react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  onAuthClick: () => void;
  isAuthenticated: boolean;
  username?: string;
}

const Header = ({ onAuthClick, isAuthenticated, username }: HeaderProps) => {
  return (
    <header className="w-full bg-primary py-4 px-6 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-white">Integrity</h1>
          <span className="text-xs text-white/80">Powered by Pi Network</span>
        </div>
        <div>
          {!isAuthenticated ? (
            <Button
              onClick={onAuthClick}
              className="bg-secondary hover:bg-secondary/90 text-primary font-semibold"
            >
              Connect with Pi
            </Button>
          ) : (
            <span className="text-white">Welcome, {username}!</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;