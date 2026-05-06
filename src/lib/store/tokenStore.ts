let accessToken: string | null = null;

export const setAccessToken = (token: string) => {
  accessToken = token;
  // Сохраняем в localStorage для персистентности
  if (typeof window !== 'undefined') {
    localStorage.setItem('accessToken', token);
  }
};

export const getAccessToken = (): string | null => {
  if (accessToken) return accessToken;

  // Восстанавливаем из localStorage при загрузке
  if (typeof window !== 'undefined') {
    accessToken = localStorage.getItem('accessToken');
  }
  return accessToken;
};

export const clearAccessToken = () => {
  accessToken = null;
  if (typeof window !== 'undefined') {
    localStorage.removeItem('accessToken');
  }
};
