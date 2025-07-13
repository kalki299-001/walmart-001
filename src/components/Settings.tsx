import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Trash2, AlertTriangle, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface SettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Settings = ({ isOpen, onClose }: SettingsProps) => {
  const { user, signOut } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteUserData = async () => {
    if (!user) return;
    
    setIsDeleting(true);
    try {
      // Delete user data from all tables
      const { error: cartError } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      const { error: wishlistError } = await supabase
        .from('wishlist_items')
        .delete()
        .eq('user_id', user.id);

      const { error: followingError } = await supabase
        .from('following')
        .delete()
        .eq('user_id', user.id);

      const { error: interactionsError } = await supabase
        .from('user_interactions')
        .delete()
        .eq('user_id', user.id);

      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('user_id', user.id);

      if (cartError || wishlistError || followingError || interactionsError || profileError) {
        throw new Error('Failed to delete some user data');
      }

      toast.success('All user data deleted successfully');
      setShowConfirmation(false);
      onClose();
      
      // Sign out the user and refresh
      await signOut();
      window.location.reload();
      
    } catch (error) {
      toast.error('Failed to delete user data');
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-lg max-w-md w-full p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Settings</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {user && (
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-semibold mb-2">Account</h3>
              <p className="text-gray-400 text-sm mb-4">{user.email}</p>
            </div>

            <div className="border-t border-gray-800 pt-6">
              <h3 className="text-white font-semibold mb-2 flex items-center">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                Danger Zone
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                This action will permanently delete all your data including cart items, wishlist, following, and profile information.
              </p>
              
              {!showConfirmation ? (
                <button
                  onClick={() => setShowConfirmation(true)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete All My Data</span>
                </button>
              ) : (
                <div className="space-y-3">
                  <p className="text-red-400 font-semibold">Are you absolutely sure?</p>
                  <p className="text-gray-400 text-sm">
                    This action cannot be undone. All your data will be permanently deleted.
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleDeleteUserData}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>{isDeleting ? 'Deleting...' : 'Yes, Delete Everything'}</span>
                    </button>
                    <button
                      onClick={() => setShowConfirmation(false)}
                      disabled={isDeleting}
                      className="bg-gray-600 hover:bg-gray-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};