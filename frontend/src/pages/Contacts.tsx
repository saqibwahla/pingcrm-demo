import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_id: number;
}

const Contacts = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await axios.get('https://pingcrm-demo.onrender.com/api/contacts');
      return response.data;
    },
  });

  const filteredContacts = contacts?.filter(
    (contact: Contact) =>
      contact.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Contacts</h1>
        <Link
          to="/contacts/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Contact
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search contacts..."
          className="w-full px-4 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredContacts?.map((contact: Contact) => (
              <tr key={contact.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {contact.first_name} {contact.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{contact.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/contacts/${contact.id}/edit`}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Contacts; 