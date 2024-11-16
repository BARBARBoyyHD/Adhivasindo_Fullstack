CREATE TABLE `userRole` (
  `role_id` integer PRIMARY KEY,
  `role_name` varchar(10)
);

CREATE TABLE `student` (
  `user_id` integer PRIMARY KEY,
  `username` varchar(30),
  `password` varchar(255),
  `student_name` varchar(50),
  `refreshToken` varchar(255),
  `refreshTokenExpiredIn` date,
  `createdAt` varchar(50),
  `role_id` integer DEFAULT 2
);

CREATE TABLE `pemateri` (
  `pmteri_id` integer PRIMARY KEY,
  `username` varchar(30),
  `password` varchar(255),
  `pmteri_name` varchar(50),
  `refreshToken` varchar(255),
  `refreshTokenExpiredIn` date,
  `createdAt` varchar(50),
  `role_id` integer DEFAULT 3
);

CREATE TABLE `materi` (
  `materi_id` integer PRIMARY KEY,
  `title` varchar(100),
  `description` text,
  `createdAt` date,
  `pmteri_id` integer
);

CREATE TABLE `submissions` (
  `submission_id` integer PRIMARY KEY,
  `student_id` integer,
  `materi_id` integer,
  `content` text,
  `score` integer,
  `createdAt` date
);

CREATE TABLE `leaderboard` (
  `leaderboard_id` integer PRIMARY KEY,
  `student_id` integer,
  `rank` integer,
  `score` integer,
  `updatedAt` date
);

ALTER TABLE `student` ADD FOREIGN KEY (`role_id`) REFERENCES `userRole` (`role_id`);

ALTER TABLE `pemateri` ADD FOREIGN KEY (`role_id`) REFERENCES `userRole` (`role_id`);

ALTER TABLE `materi` ADD FOREIGN KEY (`pmteri_id`) REFERENCES `pemateri` (`pmteri_id`);

ALTER TABLE `submissions` ADD FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`);

ALTER TABLE `submissions` ADD FOREIGN KEY (`materi_id`) REFERENCES `materi` (`materi_id`);

ALTER TABLE `leaderboard` ADD FOREIGN KEY (`student_id`) REFERENCES `student` (`user_id`);
