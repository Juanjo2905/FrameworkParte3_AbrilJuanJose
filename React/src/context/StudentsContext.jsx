import { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { fetchStudents } from '../services/studentsApi';
import { filterStudents } from '../utils/filterStudents';

const StudentsContext = createContext();

export function StudentsProvider({ children }) {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    async function loadStudents() {
      try {
        const data = await fetchStudents();
        setStudents(data);
      } catch (error) {
        setErrorMessage('Ocurrió un error al cargar los estudiantes.');
      } finally {
        setIsLoading(false);
      }
    }
    loadStudents();
  }, []);

 
  const filteredStudents = useMemo(() => {
    return filterStudents(students, searchQuery, showOnlyFavorites, favoriteIds);
  }, [students, searchQuery, showOnlyFavorites, favoriteIds]);

  const favoritesCount = favoriteIds.length;

  function toggleFavorite(student) {
    setFavoriteIds((prevIds) =>
      prevIds.includes(student.id)
        ? prevIds.filter((id) => id !== student.id)
        : [...prevIds, student.id]
    );
  }

  function toggleFavoritesFilter() {
    setShowOnlyFavorites((prev) => !prev);
  }

  return (
    <StudentsContext.Provider
      value={{
        students,
        filteredStudents,
        isLoading,
        errorMessage,
        searchQuery,
        setSearchQuery,
        favoriteIds,
        favoritesCount,
        showOnlyFavorites,
        toggleFavoritesFilter,
        toggleFavorite,
        selectedStudent,
        setSelectedStudent,
      }}
    >
      {children}
    </StudentsContext.Provider>
  );
}

export function useStudents() {
  return useContext(StudentsContext);
}