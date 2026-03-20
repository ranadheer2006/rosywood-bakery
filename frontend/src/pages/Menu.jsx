import React, { useEffect, useState } from 'react';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', 'Cakes', 'Pastries', 'Breads', 'Cookies', 'Cupcakes'];

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // ✅ FILTER + SEARCH
  useEffect(() => {
    let result = [...products];

    if (category !== 'All') {
      result = result.filter(p => p.category === category);
    }

    if (searchTerm) {
      result = result.filter(p =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [category, searchTerm, sortBy, products]);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#e91e63" }}>
        🍰 Menu
      </h1>

      {/* FILTER BUTTONS */}
      <div style={{ textAlign: "center", margin: "20px 0" }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            style={{
              margin: "5px",
              padding: "8px 12px",
              borderRadius: "10px",
              background: category === cat ? "#e91e63" : "#ddd",
              color: category === cat ? "#fff" : "#000",
              border: "none"
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SEARCH */}
      <div style={{ textAlign: "center" }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: "10px", borderRadius: "10px" }}
        />
      </div>

      {/* PRODUCTS */}
      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "20px",
            marginTop: "20px"
          }}
        >
          {filteredProducts.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;