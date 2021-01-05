SELECT * FROM categories
SELECT * FROM products

INSERT INTO categories (category_name) VALUES ('pierwsza')
INSERT INTO categories (category_name) VALUES ('druga')

INSERT INTO products (product_name, unit_price, unit_weight, category_id) VALUES 
('laptop', 1.0, 1.3, 1)

INSERT INTO products (product_name, unit_price, unit_weight, category_id) VALUES 
('laptop drugi', 2.0, 2.3, 1)

INSERT INTO states (status_name) VALUES ('Not approved')
INSERT INTO states (status_name) VALUES ('Approved')
INSERT INTO states (status_name) VALUES ('Canceled')
INSERT INTO states (status_name) VALUES ('Completed')

INSERT INTO orders (approval_date, status_id, buyer_login, buyer_email, buyer_phone_number)
VALUES ('2020/04/26 16:50:00', 1, 'loginnn', 'a@a.a', '123456789')
INSERT INTO orders (approval_date, status_id, buyer_login, buyer_email, buyer_phone_number)
VALUES ('2020/05/20 16:50:00', 2, 'everybody', 'b@b.b', '987654321')
INSERT INTO orders (approval_date, status_id, buyer_login, buyer_email, buyer_phone_number)
VALUES ('2020/12/16 16:50:00', 3, 'onemoretime', 'c@c.c', '154321789')

SELECT * FROM categories
SELECT * FROM products
SELECT * FROM states
SELECT * FROM orders
SELECT * FROM products_for_orders

SELECT * FROM orders o where o.buyer_login = 'everybody'

 UPDATE orders SET status_id = 1 where order_id = 2

CREATE TABLE Shop..prod
(
	product_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	product_name VARCHAR(50) NOT NULL,
	description VARCHAR(150),
	unit_price FLOAT NOT NULL,
	unit_weight FLOAT NOT NULL,
	category_id INT NOT NULL,
);
GO
