import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card, { CardImage, CardContent, CardTitle, CardDescription } from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');

  // Mock data
  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'fashion', name: 'Fashion' },
    { id: 'home', name: 'Home & Living' },
    { id: 'sports', name: 'Sports' },
  ];

  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`,
    description: 'High quality product with amazing features',
    price: (Math.random() * 200 + 20).toFixed(2),
    image: '📦',
    category: categories[Math.floor(Math.random() * (categories.length - 1)) + 1].id,
    rating: (Math.random() * 2 + 3).toFixed(1),
    inStock: Math.random() > 0.2,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Products</h1>
          <p className="text-gray-600">Discover our wide range of quality products</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg transition ${
                    selectedCategory === category.id
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-2">
              <label className="text-sm text-gray-600">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} hover>
              <Link to={`/products/${product.id}`}>
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-6xl">{product.image}</span>
                </div>
                <CardContent>
                  <div className="flex items-start justify-between mb-2">
                    <CardTitle>{product.name}</CardTitle>
                    {product.inStock ? (
                      <Badge variant="success">In Stock</Badge>
                    ) : (
                      <Badge variant="danger">Out of Stock</Badge>
                    )}
                  </div>
                  <CardDescription className="mb-3">{product.description}</CardDescription>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-bold text-primary">${product.price}</span>
                    <div className="flex items-center text-sm text-gray-600">
                      ⭐ {product.rating}
                    </div>
                  </div>
                  <Button className="w-full" size="sm" disabled={!product.inStock}>
                    {product.inStock ? 'Add to Cart' : 'Sold Out'}
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-12 flex justify-center gap-2">
          <Button variant="outline" size="sm">Previous</Button>
          <Button size="sm">1</Button>
          <Button variant="outline" size="sm">2</Button>
          <Button variant="outline" size="sm">3</Button>
          <Button variant="outline" size="sm">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default Products;
