-- Seed initial products for Cassava Roll Co.
-- These are the four main flavors

INSERT INTO public.products (name, flavor, description, price, stock_quantity, image_url, status)
VALUES 
  (
    'Classic Cassava Roll',
    'Classic',
    'Our signature original recipe featuring tender cassava wrapped around a rich, creamy coconut filling. A timeless Filipino delicacy that started our journey.',
    149.00,
    100,
    '/images/products/classic-cassava-roll.jpg',
    'available'
  ),
  (
    'Ube Cassava Roll',
    'Ube',
    'A vibrant purple twist on our classic, infused with authentic Filipino ube (purple yam). Sweet, earthy, and absolutely stunning.',
    169.00,
    75,
    '/images/products/ube-cassava-roll.jpg',
    'available'
  ),
  (
    'Pandan Cassava Roll',
    'Pandan',
    'Fragrant pandan leaves lend their distinctive aroma and subtle sweetness to this elegant green variation. A taste of tropical paradise.',
    159.00,
    80,
    '/images/products/pandan-cassava-roll.jpg',
    'available'
  ),
  (
    'Strawberry Cassava Roll',
    'Strawberry',
    'Fresh strawberry essence meets traditional cassava in this delightful fusion. Perfect for those who love fruity sweetness.',
    179.00,
    60,
    '/images/products/strawberry-cassava-roll.jpg',
    'available'
  )
ON CONFLICT DO NOTHING;
