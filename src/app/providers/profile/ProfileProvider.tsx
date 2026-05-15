import { type ReactNode, useCallback, useEffect, useState } from 'react';
import { type Profile, ProfileContext } from '@/app/providers/profile/ProfileContext.ts';
// import { getUsersMe } from '@/shared/api';
import { getUsersMe } from '@/shared/mock/profile.ts';

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getUsersMe(); // TODO remove mock
      if (response.error) {
        setError(response.error.detail);
      } else if (response.data) {
        setProfile({
          firstName: response.data.first_name ?? '',
          lastName: response.data.last_name ?? '',
          skills: response.data.skills ?? [],
        });
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Неизвестная ошибка');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        isLoading,
        error,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
