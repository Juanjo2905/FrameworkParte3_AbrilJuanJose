import { useStudents } from '../context/StudentsContext';
import { StudentCard } from '../components/StudentCard';
import './StudentListPage.css';

export function StudentListPage() {
  const {
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
  } = useStudents();

  return (
    <main className="page-container">
      <div className="header-bar">
        <h2>Lista de Estudiantes</h2>
        <button
          type="button"
          className={`favorites-btn ${showOnlyFavorites ? 'active' : ''}`}
          onClick={toggleFavoritesFilter}
        >
          {showOnlyFavorites ? '★ Mostrando favoritos' : '☆ Favoritos'} ({favoritesCount})
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar estudiante por nombre..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {selectedStudent && (
        <section className="detail-panel">
          <div className="detail-header">
            <h3>Detalle de {selectedStudent.name}</h3>
            <button type="button" onClick={() => setSelectedStudent(null)}>
              Cerrar
            </button>
          </div>
          <p><strong>Usuario:</strong> {selectedStudent.username}</p>
          <p><strong>Teléfono:</strong> {selectedStudent.phone}</p>
          <p><strong>Sitio web:</strong> {selectedStudent.website}</p>
          <p>
            <strong>Dirección:</strong> {selectedStudent.address?.street}, {selectedStudent.address?.city}
          </p>
        </section>
      )}

      {isLoading && <p className="status-message">Cargando estudiantes...</p>}

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {!isLoading && !errorMessage && (
        <section className="students-grid">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                isFavorite={favoriteIds.includes(student.id)}
                onSelect={setSelectedStudent}
                onToggleFavorite={toggleFavorite}
              />
            ))
          ) : (
            <p className="empty-message">
              {showOnlyFavorites
                ? 'No tienes estudiantes favoritos con ese criterio.'
                : 'No se encontraron estudiantes con ese nombre.'}
            </p>
          )}
        </section>
      )}
    </main>
  );
}