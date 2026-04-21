USE calcdb;

CREATE TABLE IF NOT EXISTS results (
  id INT AUTO_INCREMENT PRIMARY KEY,
  num1 INT,
  num2 INT,
  result INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO results (num1, num2, result) VALUES
(1,2,3),
(10,5,15);