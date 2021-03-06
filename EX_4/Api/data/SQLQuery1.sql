SELECT * FROM categories
SELECT * FROM products

INSERT INTO categories (category_name) VALUES ('Stacjonarne')
INSERT INTO categories (category_name) VALUES ('Laptopy')

INSERT INTO products (product_name, description, unit_price, unit_weight, category_id) VALUES 
('Dell Vostro', 'The best laptop', 2999.0, 5.6, 1)

INSERT INTO products (product_name, description, unit_price, unit_weight, category_id) VALUES 
('Asus Vivobook', 'Good description', 2089.0, 2.3, 2)

INSERT INTO states (status_name) VALUES ('Not approved')
INSERT INTO states (status_name) VALUES ('Canceled')
INSERT INTO states (status_name) VALUES ('Approved')
INSERT INTO states (status_name) VALUES ('Completed')

INSERT INTO orders (approval_date, status_id, buyer_login, buyer_email, buyer_phone_number)
VALUES ('2020/04/26 16:50:54', 1, 'jSzymanska', 'j@s.pl', '123456789')
INSERT INTO orders (approval_date, status_id, buyer_login, buyer_email, buyer_phone_number)
VALUES ('2020/05/20 12:13:24', 2, 'pZdrzalik', 'p@z.pl', '987654321')
INSERT INTO orders (approval_date, status_id, buyer_login, buyer_email, buyer_phone_number)
VALUES ('2020/12/16 19:20:50', 3, 'someBody', 's@b.pl', '154321789')

INSERT INTO products_for_orders (order_id, product_id, number_of_items)
VALUES (1, 1, 4);
INSERT INTO products_for_orders (order_id, product_id, number_of_items)
VALUES (1, 2, 3);
INSERT INTO products_for_orders (order_id, product_id, number_of_items)
VALUES (2, 1, 1);
INSERT INTO products_for_orders (order_id, product_id, number_of_items)
VALUES (2, 2, 5);
INSERT INTO products_for_orders (order_id, product_id, number_of_items)
VALUES (3, 2, 2);

SELECT * FROM categories
SELECT * FROM products
SELECT * FROM states
SELECT * FROM orders
SELECT * FROM products_for_orders


SELECT * FROM orders o, products_for_orders p WHERE o.order_id = p.order_id