import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Contacts from './pages/Contacts';
import Companies from './pages/Companies';
import ContactForm from './pages/ContactForm';
import CompanyForm from './pages/CompanyForm';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Navbar />
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Contacts />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/contacts/new" element={<ContactForm />} />
              <Route path="/contacts/:id/edit" element={<ContactForm />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/companies/new" element={<CompanyForm />} />
              <Route path="/companies/:id/edit" element={<CompanyForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
