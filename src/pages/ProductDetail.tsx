import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const ProductDetail = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  // Mock data
  const product = {
    id,
    name: `Amazing Product ${id}`,
    description: 'This is a detailed description of the product. It features high-quality materials, excellent craftsmanship, and modern design. Perfect for everyday use.',
    price: 99.99,
    originalPrice: 149.99,
    images: ['📦', '📦', '📦', '📦'],
    category: 'Electronics',
    brand: 'BrandName',
    inStock: true,
    stock: 25,
    rating: 4.5,
    reviews: 128,
    specifications: [
      { label: 'Weight', value: '500g' },
      { label: 'Dimensions', value: '10 x 8 x 5 cm' },
      { label: 'Material', value: 'Premium Quality' },
      { label: 'Warranty', value: '1 Year' },
    ],
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= product.stock) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="text-sm mb-6">
          <Link to="/" className="text-gray-600 hover:text-primary">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/products" className="text-gray-600 hover:text-primary">Products</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center mb-4">
                <span className="text-9xl">{product.images[selectedImage]}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-gray-100 rounded-lg h-20 flex items-center justify-center text-3xl ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    }`}
                  >
                    {image}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                  <p className="text-gray-600">{product.brand}</p>
                </div>
                {product.inStock ? (
                  <Badge variant="success">In Stock</Badge>
                ) : (
                  <Badge variant="danger">Out of Stock</Badge>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400">
                  {'⭐'.repeat(Math.floor(product.rating))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-primary">${product.price}</span>
                  <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                  <Badge variant="danger">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block font-semibold mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= product.stock}
                  >
                    +
                  </Button>
                  <span className="text-sm text-gray-600 ml-2">
                    {product.stock} available
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <Button className="flex-1" size="lg" disabled={!product.inStock}>
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  ❤️
                </Button>
              </div>

              {/* Specifications */}
              <div className="border-t pt-6">
                <h3 className="font-semibold mb-3">Specifications</h3>
                <div className="space-y-2">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{spec.label}:</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-6xl">📦</span>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Related Product {item}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-primary">${(Math.random() * 100 + 20).toFixed(2)}</span>
                    <Button size="sm">View</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
