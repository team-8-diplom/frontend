type GetUsersMeResponse = {
  data?: { first_name: string; last_name: string; skills: string[] };
  error?: { detail: string };
};

export const getUsersMe = async (): Promise<GetUsersMeResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const shouldFail = false;
  if (shouldFail) {
    return {
      error: {
        detail: 'Не удалось загрузить профиль. Попробуйте позже.',
      },
    };
  }

  return {
    data: {
      first_name: 'Иван',
      last_name: 'Петров',
      skills: ['Python', 'scikit-learn', 'Pandas', 'SQL'],
    },
  };
};
