import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Company {
  id: number;
  name: string;
  email: string;
  website: string;
}

const CompanyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<Company>>({
    name: '',
    email: '',
    website: '',
  });

  const { data: company } = useQuery({
    queryKey: ['company', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:8000/api/companies/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (company) {
      setFormData(company);
    }
  }, [company]);

  const mutation = useMutation({
    mutationFn: (data: Partial<Company>) => {
      if (id) {
        return axios.put(`http://localhost:8000/api/companies/${id}`, data);
      }
      return axios.post('http://localhost:8000/api/companies', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      navigate('/companies');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
        {id ? 'Edit Company' : 'Create Company'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out text-gray-700"
              required
              placeholder="Enter company name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out text-gray-700"
              required
              placeholder="company@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out text-gray-700"
              placeholder="https://example.com"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 mt-8 border-t">
          <button
            type="button"
            onClick={() => navigate('/companies')}
            className="px-6 py-3 border border-red-300 bg-red-50 rounded-lg text-red-700 hover:bg-red-100 font-medium transition-colors duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200 ease-in-out shadow-sm"
          >
            {id ? 'Update' : 'Create'} Company
          </button>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm; 