import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  company_id: number;
}

interface Company {
  id: number;
  name: string;
}

const ContactForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<Partial<Contact>>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    company_id: 0,
  });

  const { data: companies } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await axios.get('https://pingcrm-demo.onrender.com/api/companies');
      return response.data;
    },
  });

  const { data: contact } = useQuery({
    queryKey: ['contact', id],
    queryFn: async () => {
      const response = await axios.get(`https://pingcrm-demo.onrender.com/api/contacts/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  useEffect(() => {
    if (contact) {
      setFormData(contact);
    }
  }, [contact]);

  const mutation = useMutation({
    mutationFn: (data: Partial<Contact>) => {
      if (id) {
        return axios.put(`https://pingcrm-demo.onrender.com/api/contacts/${id}`, data);
      }
      return axios.post('https://pingcrm-demo.onrender.com/api/contacts', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contacts'] });
      navigate('/contacts');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">
        {id ? 'Edit Contact' : 'Create Contact'}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out text-gray-700"
              required
              placeholder="Enter first name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out text-gray-700"
              required
              placeholder="Enter last name"
            />
          </div>
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
            placeholder="email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out text-gray-700"
            placeholder="(123) 456-7890"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Company</label>
          <select
            name="company_id"
            value={formData.company_id}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out text-gray-700"
            required
          >
            <option value="">Select a company</option>
            {companies?.map((company: Company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Street Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out text-gray-700"
            placeholder="Enter street address"
          />
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out text-gray-700"
              placeholder="Enter city"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out text-gray-700"
              placeholder="Enter state"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">ZIP Code</label>
            <input
              type="text"
              name="zip_code"
              value={formData.zip_code}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 ease-in-out text-gray-700"
              placeholder="Enter ZIP code"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-4 pt-6 mt-8 border-t">
          <button
            type="button"
            onClick={() => navigate('/contacts')}
            className="px-6 py-3 border border-red-300 bg-red-50 rounded-lg text-red-700 hover:bg-red-100 font-medium transition-colors duration-200 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors duration-200 ease-in-out shadow-sm"
          >
            {id ? 'Update' : 'Create'} Contact
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm; 