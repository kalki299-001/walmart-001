import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { LogIn, LogOut } from 'lucide-react';

export const AuthButton: React.FC = () => {
  const { user, signInWithGoogle, signOut, loading } = useAuth();

  if (loading) {
    return (
      <Button variant="outline" disabled>
        Loading...
      </Button>
    );
  }

  if (user) {
    return (
      <Button 
        variant="outline" 
        onClick={signOut}
        className="flex items-center space-x-2"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </Button>
    );
  }

  return (
    <Button 
      onClick={signInWithGoogle}
      className="flex items-center space-x-2"
    >
      <LogIn className="w-4 h-4" />
      <span>Sign in with Google</span>
    </Button>
  );
};