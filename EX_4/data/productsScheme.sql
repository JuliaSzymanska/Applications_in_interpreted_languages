--IF EXISTS(SELECT 1 FROM master.dbo.sysdatabases WHERE name = 'Shop') DROP DATABASE Shop
--GO
--CREATE DATABASE Shop
--GO

CREATE TABLE Shop..categories (
	category_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	category_name VARCHAR(50) NOT NULL,
);
GO

CREATE TABLE Shop..products ( 
		product_id      INT	PRIMARY KEY IDENTITY(1,1) NOT NULL,
		product_name     VARCHAR(50) NOT NULL,
		description VARCHAR(150),
		unit_price FLOAT NOT NULL,
		unit_weight FLOAT NOT NULL,
		category_id INT NOT NULL,
		FOREIGN KEY (category_id) REFERENCES categories(category_id),
		CONSTRAINT unit_price_greater CHECK (unit_price > 0),
		CONSTRAINT unit_weight_greater CHECK (unit_weight > 0),
    );
GO

CREATE TABLE Shop..states (
	status_id INT PRIMARY KEY IDENTITY(1,1) NOT NULL,
	status_name VARCHAR(12) NOT NULL,
	CONSTRAINT status_name_in CHECK (status_name IN ('Not approved', 'Approved', 'Canceled', 'Completed')),
);
GO

CREATE TABLE Shop..orders ( 
		order_id INT	PRIMARY KEY IDENTITY(1,1) NOT NULL,
		approval_date DATETIME,
		status_id INT,
		FOREIGN KEY (status_id) REFERENCES states(status_id),
		buyer_login VARCHAR(50) NOT NULL,
		buyer_email VARCHAR(50) NOT NULL,
		buyer_phone_number VARCHAR(20),
		CONSTRAINT buyer_phone_number_check CHECK(buyer_phone_number LIKE '[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]'),
		CONSTRAINT buyer_email_check CHECK(buyer_email LIKE '%@%.%')
);
GO

CREATE TABLE Shop..products_for_orders ( 
		order_id INT NOT NULL,
		FOREIGN KEY (order_id) REFERENCES orders(order_id),
		product_id INT NOT NULL,
		FOREIGN KEY (product_id) REFERENCES products(product_id),
		PRIMARY KEY (order_id, product_id),
		number_of_items INT NOT NULL, 
		CONSTRAINT number_of_items_greater CHECK (number_of_items > 0),
);
GO