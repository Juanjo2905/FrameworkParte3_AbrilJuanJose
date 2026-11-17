
import { StudentsProvider } from './context/StudentsContext';
import { StudentListPage } from './pages/StudentListPage';

function App() {
  return (
    <StudentsProvider>
      <StudentListPage />
    </StudentsProvider>
  );
}

export default App;