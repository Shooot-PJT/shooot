DROP TABLE IF EXISTS project_participant;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS user;

CREATE TABLE user (
    user_id INT PRIMARY KEY AUTO_INCREMENT NOT NULL ,
    nickname VARCHAR(16) NOT NULL,
    password BINARY(60) NOT NULL ,
    email VARCHAR(40) NOT NULL,
    is_deleted BOOL NOT NULL,
    created_at DATETIME NOT NULL
);


CREATE TABLE project (
    project_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name VARCHAR(80) NOT NULL ,
    logo_image TEXT NOT NULL ,
    memo TEXT NOT NULL ,
    is_deleted BOOL NOT NULL ,
    created_at DATETIME NOT NULL
);

CREATE TABLE project_participant (
    project_participant_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id INTEGER NOT NULL ,
    project_id INTEGER NOT NULL ,
    is_deleted BOOL NOT NULL ,
    created_at DATETIME NOT NULL,
    is_owner BOOL NOT NULL ,
    FOREIGN KEY (project_id) REFERENCES project(project_id),
    FOREIGN KEY (user_id) REFERENCES user(user_id)
);

#INSERT INTO user(nickname, password, email) VALUES ('흑염룡1', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'khj745700@naver.com');