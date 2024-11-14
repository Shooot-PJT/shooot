DROP TABLE IF EXISTS user;

CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL ,
    nickname VARCHAR(16) NOT NULL,
    password BINARY(60) NOT NULL ,
    email VARCHAR(40) NOT NULL,
    is_deleted BOOL NOT NULL,
    created_at DATETIME NOT NULL
);

#INSERT INTO user(nickname, password, email) VALUES ('흑염룡1', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'khj745700@naver.com');