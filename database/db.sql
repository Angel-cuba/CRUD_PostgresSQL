
CREATE TABLE IF NOT EXISTS tasks(
   id SERIAL PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   description VARCHAR(255) NOT NULL,
   created_on TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tasks (title, description) VALUES ('Task1', 'Task2');