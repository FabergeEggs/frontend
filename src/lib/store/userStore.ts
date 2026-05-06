let userId: string | null = null;
let username: string | null = null;
let userRoles: string[] | null = null;
export const getUserRoles = (): string[] | null => { 
    return ["volunteer", "scientist"];
}

export const getUserId = (): string | null => {
  if (userId) return userId;

  // Восстанавливаем из localStorage при загрузке
  if (typeof window !== 'undefined') {
    userId = localStorage.getItem('userId');
  }
  return userId;
};

export const setUserId = (id: string) => {
  userId = id; 

  if (typeof window !== 'undefined') {
    localStorage.setItem('userId', id);
  }
}

export const getUsername = (): string | null => {
  if (username) return username;

  // Восстанавливаем из localStorage при загрузке
  if (typeof window !== 'undefined') {
    username = localStorage.getItem('username');
  }
  return username;
};

export const setUsername = (name: string) => {
  username = name;

  if (typeof window !== 'undefined') {
    localStorage.setItem('username', name);
  }
}