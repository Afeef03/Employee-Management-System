import React from 'react';

interface Product {
  name: string;
  color: string;
  category: string;
  price: string;
}

const products: Product[] = [
  { name: 'Apple MacBook Pro 17"', color: 'Silver', category: 'Laptop', price: '$2999' },
  { name: 'Microsoft Surface Pro', color: 'White', category: 'Laptop PC', price: '$1999' },
  { name: 'Magic Mouse 2', color: 'Black', category: 'Accessories', price: '$99' },
  { name: 'Apple Watch', color: 'Black', category: 'Watches', price: '$199' },
  { name: 'Apple iMac', color: 'Silver', category: 'PC', price: '$2999' },
  { name: 'Apple AirPods', color: 'White', category: 'Accessories', price: '$399' },
  { name: 'iPad Pro', color: 'Gold', category: 'Tablet', price: '$699' },
  { name: 'Magic Keyboard', color: 'Black', category: 'Accessories', price: '$99' },
  { name: 'Smart Folio iPad Air', color: 'Blue', category: 'Accessories', price: '$79' },
  { name: 'AirTag', color: 'Silver', category: 'Accessories', price: '$29' },
];

const ProductTable: React.FC = () => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-4">
              <input
                id="checkbox-all"
                type="checkbox"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
            </th>
            <th className="px-6 py-3">Product name</th>
            <th className="px-6 py-3">Color</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, idx) => (
            <tr
              key={idx}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <input
                  id={`checkbox-${idx}`}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </td>
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {product.name}
              </th>
              <td className="px-6 py-4">{product.color}</td>
              <td className="px-6 py-4">{product.category}</td>
              <td className="px-6 py-4">{product.price}</td>
              <td className="px-6 py-4">
                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                  Edit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav
        className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4"
        aria-label="Table navigation"
      >
        <span className="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">
          Showing <span className="font-semibold text-gray-900 dark:text-white">1-10</span> of{' '}
          <span className="font-semibold text-gray-900 dark:text-white">1000</span>
        </span>
        <ul className="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
          {['Previous', '1', '2', '3', '4', '5', 'Next'].map((label, idx) => (
            <li key={idx}>
              <a
                href="#"
                className={`flex items-center justify-center px-3 h-8 border border-gray-300 ${
                  label === '3'
                    ? 'text-blue-600 bg-blue-50 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-500 bg-white dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
                } ${
                  label === 'Previous' ? 'rounded-s-lg' : label === 'Next' ? 'rounded-e-lg' : ''
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ProductTable;
