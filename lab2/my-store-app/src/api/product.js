// Імітація API для отримання продуктів
export async function getProducts() {
    // В реальному додатку тут був би запит до API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                {
                    id: 1,
                    title: 'Smartphone X',
                    price: 699,
                    description: 'Latest smartphone with advanced features and high-quality camera.',
                    image: 'https://via.placeholder.com/300x300?text=Smartphone',
                    category: 'electronics'
                },
                {
                    id: 2,
                    title: 'Laptop Pro',
                    price: 1299,
                    description: 'Powerful laptop for professional use with high performance.',
                    image: 'https://via.placeholder.com/300x300?text=Laptop',
                    category: 'electronics'
                },
                {
                    id: 3,
                    title: 'Wireless Headphones',
                    price: 199,
                    description: 'Premium wireless headphones with noise cancellation.',
                    image: 'https://via.placeholder.com/300x300?text=Headphones',
                    category: 'electronics'
                },
                {
                    id: 4,
                    title: 'Smart Watch',
                    price: 249,
                    description: 'Fitness tracker and smartwatch with health monitoring features.',
                    image: 'https://via.placeholder.com/300x300?text=SmartWatch',
                    category: 'electronics'
                },
                {
                    id: 5,
                    title: 'Casual T-Shirt',
                    price: 29,
                    description: 'Comfortable cotton t-shirt for everyday wear.',
                    image: 'https://via.placeholder.com/300x300?text=TShirt',
                    category: 'clothing'
                },
                {
                    id: 6,
                    title: 'Running Shoes',
                    price: 89,
                    description: 'Lightweight running shoes with cushioned soles.',
                    image: 'https://via.placeholder.com/300x300?text=Shoes',
                    category: 'clothing'
                }
            ]);
        }, 500);
    });
}