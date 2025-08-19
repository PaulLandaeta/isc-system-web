import jsonClient from './jsonServerInstance';

const authenticateUser = async (email: string, password: string) => {
  try {
    const response = await jsonClient.get('/login', {
      params: {
        'user.email': email,
        'user.password': password,
      },
    });

    const data = response.data[0];

    if (!data) {
      throw new Error('Credenciales incorrectas');
    }

    const { user, menu, permissions, token } = data;

    // Adaptamos el objeto al tipo UserResponse
    const userResponse = {
      user: {
        id: parseInt(user.id),
        username: user.username || user.email, // o null si no hay
        name: user.name,
        lastname: user.lastname || '',
        mothername: user.mothername || '',
        email: user.email,
        code: user.code || '',
        phone: user.phone,
        degree: user.degree || '',
        role: user.role,
      },
      token: token || 'fake-jwt-token',
      menu: menu.map((category: any) => ({
        category: category.category,
        items: category.items.map((item: any) => ({
          name: item.name,
          path: item.path,
          displayname: item.displayName,
          icon: item.icon,
        })),
      })),
      permissions,
    };

    return userResponse;
  } catch (error: any) {
    console.error('Error en login:', error.message);
    throw new Error('Login fallido: ' + error.message);
  }
};

export { authenticateUser }; // Corregido el nombre de la exportación
