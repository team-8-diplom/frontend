import { createContext, useContext } from 'react';

export type Profile = {
  firstName: string;
  lastName: string;
  skills: string[];
};

export type ProfileContextType = {
  profile: Profile | null;
  setProfile: (profile: Profile) => void;
  isLoading: boolean;
  error: string | null;
};

export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = (): ProfileContextType => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error('useProfile must be used within ProfileProvider');
  return context;
};
