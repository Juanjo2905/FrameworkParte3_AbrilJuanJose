import './StudentCard.css';

export function StudentCard({ student, isFavorite, onSelect, onToggleFavorite }) {
  function handleFavoriteClick(e) {
    // Evita que al pulsar la estrella se dispare también el clic de toda la tarjeta
    e.stopPropagation();
    onToggleFavorite(student);
  }

  return (
    <article className="card" onClick={() => onSelect(student)}>
      <div className="card-header">
        <h3>{student.name}</h3>
        <button
          type="button"
          className={`fav-btn ${isFavorite ? 'is-favorite' : ''}`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>

      <p className="card-info">
        <strong>Correo:</strong> {student.email}
      </p>
      <p className="card-info">
        <strong>Ciudad:</strong> {student.address?.city}
      </p>
      <p className="card-info">
        <strong>Empresa:</strong> {student.company?.name}
      </p>
    </article>
  );
}