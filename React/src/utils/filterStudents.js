export function filterStudents(students, searchQuery, showOnlyFavorites, favoriteIds) {
  const term = searchQuery.toLowerCase().trim();

  return students.filter((student) => {
    const matchesName = !term || student.name.toLowerCase().includes(term);
    const matchesFavorite = !showOnlyFavorites || favoriteIds.includes(student.id);
    return matchesName && matchesFavorite;
  });
}