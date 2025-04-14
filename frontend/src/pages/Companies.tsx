import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Company {
  id: number;
  name: string;
  email: string;
  website: string;
}

const Companies = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: companies, isLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await axios.get('http://0.0.0.0:10000/api/companies');
      return response.data;
    },
  });

  const filteredCompanies = companies?.filter(
    (company: Company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">Companies</h1>
        <Link
          to="/companies/new"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 hover:text-white"
        >
          Add Company
        </Link>
      </div>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search companies..."
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
                Website
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCompanies?.map((company: Company) => (
              <tr key={company.id}>
                <td className="px-6 py-4 whitespace-nowrap text-black">{company.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-black">{company.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                  >
                    {company.website}
                  </a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link
                    to={`/companies/${company.id}/edit`}
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

export default Companies; 