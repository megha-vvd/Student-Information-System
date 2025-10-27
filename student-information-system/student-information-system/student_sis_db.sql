
CREATE DATABASE IF NOT EXISTS student_sis_db;
USE student_sis_db;
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL
);
CREATE TABLE IF NOT EXISTS courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(150) NOT NULL
);
CREATE TABLE IF NOT EXISTS enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
CREATE TABLE IF NOT EXISTS grades (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT,
    course_id INT,
    grade VARCHAR(5),
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);
INSERT INTO courses (course_name) VALUES ('Mathematics'),('Computer Science'),('Physics') ON DUPLICATE KEY UPDATE course_name=course_name;
INSERT INTO students (name,email) VALUES ('Alice Example','alice@example.com'),('Bob Student','bob@example.com') ON DUPLICATE KEY UPDATE name=name;
INSERT INTO enrollments (student_id,course_id) VALUES (1,1),(2,2);
INSERT INTO grades (student_id,course_id,grade) VALUES (1,1,'A'),(2,2,'B');
