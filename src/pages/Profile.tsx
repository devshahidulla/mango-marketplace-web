import React, { useState } from 'react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St',
    city: 'New York',
    state: 'NY',
    zipCode: '10001',
    country: 'USA',
  });

  const tabs = [
    { id: 'profile', name: 'Profile Info', icon: '👤' },
    { id: 'orders', name: 'My Orders', icon: '📦' },
    { id: 'addresses', name: 'Addresses', icon: '📍' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  const orders = [
    { id: '12345', date: '2025-12-01', status: 'Delivered', total: 299.97, items: 3 },
    { id: '12344', date: '2025-11-28', status: 'Shipped', total: 149.99, items: 2 },
    { id: '12343', date: '2025-11-15', status: 'Processing', total: 89.99, items: 1 },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Update profile:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="text-center mb-6 pb-6 border-b">
                <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                  👤
                </div>
                <h3 className="font-semibold text-lg">{formData.firstName} {formData.lastName}</h3>
                <p className="text-sm text-gray-600">{formData.email}</p>
              </div>

              <nav className="space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 ${
                      activeTab === tab.id
                        ? 'bg-primary text-white'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
                <button className="w-full text-left px-4 py-3 rounded-lg transition flex items-center gap-3 text-red-600 hover:bg-red-50">
                  <span className="text-xl">🚪</span>
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              {/* Profile Info Tab */}
              {activeTab === 'profile' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <Input
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>

                    <Input
                      label="Email Address"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />

                    <Input
                      label="Phone Number"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                    <Input
                      label="Street Address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Input
                        label="City"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                      />
                      <Input
                        label="State"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                      />
                      <Input
                        label="ZIP Code"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                      />
                    </div>

                    <Button type="submit" size="lg">
                      Save Changes
                    </Button>
                  </form>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">My Orders</h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                          <div>
                            <p className="font-semibold text-lg">Order #{order.id}</p>
                            <p className="text-sm text-gray-600">
                              Placed on {order.date} • {order.items} items
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm text-gray-600">Total</p>
                              <p className="font-bold text-primary">${order.total}</p>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                              'bg-yellow-100 text-yellow-800'
                            }`}>
                              {order.status}
                            </span>
                            <Button variant="outline" size="sm">View Details</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === 'addresses' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Saved Addresses</h2>
                    <Button>Add New Address</Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-semibold">Home</h3>
                        <span className="text-xs bg-primary text-white px-2 py-1 rounded">Default</span>
                      </div>
                      <p className="text-sm text-gray-600">
                        {formData.address}<br />
                        {formData.city}, {formData.state} {formData.zipCode}<br />
                        {formData.country}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">Delete</Button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div>
                  <h2 className="text-2xl font-bold mb-6">Account Settings</h2>
                  <div className="space-y-6">
                    <div className="border-b pb-6">
                      <h3 className="font-semibold mb-3">Password</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Change your password to keep your account secure
                      </p>
                      <Button variant="outline">Change Password</Button>
                    </div>

                    <div className="border-b pb-6">
                      <h3 className="font-semibold mb-3">Email Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary" />
                          <span className="ml-2 text-sm">Order updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary focus:ring-primary" />
                          <span className="ml-2 text-sm">Promotional emails</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-primary focus:ring-primary" />
                          <span className="ml-2 text-sm">Newsletter</span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3 text-red-600">Danger Zone</h3>
                      <p className="text-sm text-gray-600 mb-3">
                        Permanently delete your account and all associated data
                      </p>
                      <Button variant="danger">Delete Account</Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
