import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { StudentCard } from './StudentCard';

describe('StudentCard', () => {
  const mockStudent = {
    id: 1,
    name: 'Leanne Graham',
    email: 'sincere@april.biz',
    address: { city: 'Gwenborough' },
    company: { name: 'Romaguera-Crona' },
  };

  it('debe mostrar los datos del estudiante y ejecutar onSelect al hacer clic', () => {
    const handleSelect = vi.fn();
    const handleToggleFavorite = vi.fn();

    render(
      <StudentCard
        student={mockStudent}
        isFavorite={false}
        onSelect={handleSelect}
        onToggleFavorite={handleToggleFavorite}
      />
    );

    expect(screen.getByText('Leanne Graham')).toBeInTheDocument();
    expect(screen.getByText(/sincere@april.biz/i)).toBeInTheDocument();
    expect(screen.getByText(/Gwenborough/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText('Leanne Graham'));
    expect(handleSelect).toHaveBeenCalledWith(mockStudent);
  });
});