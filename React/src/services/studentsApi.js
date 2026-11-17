const API_URL = 'https://jsonplaceholder.typicode.com/users';

export async function fetchStudents() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Error al obtener estudiantes: ${response.status}`);
  }

  return response.json();
}