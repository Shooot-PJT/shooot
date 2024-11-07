DROP TABLE IF EXISTS project_build_log;
DROP TABLE IF EXISTS project_test_metric_log;
DROP TABLE IF EXISTS api_test_method;
DROP TABLE IF EXISTS api_stress_test_log;
DROP TABLE IF EXISTS api_stress_test_start_log;
DROP TABLE IF EXISTS build_file_api_docs;
DROP TABLE IF EXISTS project_file;
DROP TABLE IF EXISTS project_build;
DROP TABLE IF EXISTS api_subscribe;
DROP TABLE IF EXISTS api;
DROP TABLE IF EXISTS domain;
DROP TABLE IF EXISTS project_participant;
DROP TABLE IF EXISTS project;
DROP TABLE IF EXISTS notification;
DROP TABLE IF EXISTS user;

CREATE TABLE user
(
    user_id    INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
    nickname   VARCHAR(16) NOT NULL,
    password   BINARY(60) NOT NULL,
    email      VARCHAR(40) NOT NULL,
    is_deleted BOOL        NOT NULL,
    created_at DATETIME    NOT NULL
);


CREATE TABLE project
(
    project_id   INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    name         VARCHAR(80)         NOT NULL,
    english_name VARCHAR(20)         NOT NULL,
    content_type VARCHAR(30),
    filename     VARCHAR(100),
    memo         TEXT,
    is_deleted   BOOL                NOT NULL,
    created_at   DATETIME            NOT NULL
);

CREATE TABLE project_participant
(
    project_participant_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id                INTEGER             NOT NULL,
    project_id             INTEGER             NOT NULL,
    is_deleted             BOOL                NOT NULL,
    created_at             DATETIME            NOT NULL,
    is_owner               BOOL                NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project (project_id),
    FOREIGN KEY (user_id) REFERENCES user (user_id)
);

CREATE TABLE domain
(
    api_domain_id      INTEGER     NOT NULL AUTO_INCREMENT PRIMARY KEY,
    project_id         INTEGER     NOT NULL,
    domain_name        VARCHAR(30) NOT NULL,
    domain_description TEXT        NOT NULL,
    created_at         DATETIME    NOT NULL,
    modified_at        DATETIME    NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project (project_id)
);

CREATE TABLE api
(
    api_id          INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    api_domain_id   INTEGER     NOT NULL,
    api_manager_id  INTEGER     NOT NULL,
    api_title       VARCHAR(30) NOT NULL,
    api_description TEXT        NOT NULL,
    method          VARCHAR(10) NOT NULL,
    url             TEXT        NOT NULL,
    created_at      DATETIME    NOT NULL,
    modified_at     DATETIME    NOT NULL,
    is_real_server  BOOL        NOT NULL,
    is_secure       BOOL        NOT NULL,
    test_status     VARCHAR(10),
    FOREIGN KEY (api_domain_id) REFERENCES domain (api_domain_id),
    FOREIGN KEY (api_manager_id) REFERENCES project_participant (project_participant_id)
);

CREATE TABLE api_subscribe
(
    api_subscribe_id       INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    api_id                 INTEGER NOT NULL,
    project_participant_id INTEGER NOT NULL,
    FOREIGN KEY (api_id) REFERENCES api (api_id),
    FOREIGN KEY (project_participant_id) REFERENCES project_participant (project_participant_id)
);

CREATE TABLE notification
(
    notification_id BINARY(16) PRIMARY KEY NOT NULL,
    user_id         INTEGER  NOT NULL,
    content         JSON     NOT NULL,
    created_at      DATETIME NOT NULL,
    foreign key (user_id) REFERENCES user (user_id)
);


CREATE TABLE project_build
(
    project_build_id  INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    md5_check_sum     CHAR(32)     NOT NULL,
    file_name         VARCHAR(100) NOT NULL,
    version_major     TINYINT      NOT NULL,
    version_minor     TINYINT      NOT NULL,
    version_patch     TINYINT      NOT NULL,
    version_temporary TINYINT,
    is_deployment     BOOL         NOT NULL,
    project_id        INTEGER      NOT NULL,
    is_deleted        BOOL         NOT NULL,
    created_at        DATETIME     NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project (project_id)
);

CREATE TABLE project_build_log
(
    project_build_log_id BINARY(16) NOT NULL PRIMARY KEY,
    project_build_id     INTEGER     NOT NULL,
    created_at           DATETIME    NOT NULL,
    status               VARCHAR(30) NOT NULL,
    FOREIGN KEY (project_build_id) REFERENCES project_build (project_build_id)
);

CREATE TABLE build_file_api_docs
(
    build_api_docs_id INTEGER    NOT NULL AUTO_INCREMENT PRIMARY KEY,
    api_id            INTEGER,
    project_build_id  INTEGER    NOT NULL,
    url               TEXT       NOT NULL,
    method            VARCHAR(7) NOT NULL,
    FOREIGN KEY (api_id) REFERENCES api (api_id)
);



CREATE TABLE `project_test_metric_log`
(
    `test_log_id`            BINARY(16)	NOT NULL,
    `build_file_api_docs_id` INTEGER  NOT NULL,
    `cpu_utilization`        FLOAT    NOT NULL,
    `ram_utilization`        FLOAT    NOT NULL,
    `network_utilization`    FLOAT    NOT NULL,
    `disk_utilization`       FLOAT    NOT NULL,
    `jvm_memory_usage`       FLOAT NULL,
    `gc_pause_time`          FLOAT NULL,
    `thread_count`           SMALLINT NULL,
    `request_count`          BIGINT NULL,
    `heap_memory_usage`      FLOAT NULL,
    `non_heap_memory_usage`  FLOAT NULL,
    `cache_hits`             BIGINT NULL,
    `cache_misses`           BIGINT NULL,
    `active_connections`     SMALLINT NULL,
    `total_connections`      SMALLINT NULL,
    `created_at`             DATETIME NOT NULL,
    FOREIGN KEY (build_file_api_docs_id) REFERENCES build_file_api_docs (build_api_docs_id)
);

CREATE TABLE api_test_method
(
    api_test_method_id INTEGER     NOT NULL AUTO_INCREMENT PRIMARY KEY,
    api_id             INTEGER     NOT NULL,
    type               VARCHAR(20) NOT NULL,
    virtual_users_num  SMALLINT    NOT NULL,
    test_duration      SMALLINT    NOT NULL,
    FOREIGN KEY (api_id) REFERENCES api (api_id)
);


CREATE TABLE api_stress_test_start_log
(
    api_stress_test_start_log_id INTEGER  NOT NULL PRIMARY KEY AUTO_INCREMENT,
    project_participant_id       INTEGER  NOT NULL,
    project_build_id             INTEGER  NOT NULL,
    created_at                   DATETIME NOT NULL,
    FOREIGN KEY (project_participant_id) REFERENCES project_participant (project_participant_id),
    FOREIGN KEY (project_build_id) REFERENCES project_build (project_build_id)
);

CREATE TABLE api_stress_test_log
(
    api_stress_test_log_id       BINARY(16) NOT NULL,
    api_stress_test_start_log_id INTEGER NOT NULL,
    build_file_api_docs_id       INTEGER NOT NULL,
    response_body                TEXT,
    url                          TEXT,
    request_content              TEXT,
    type                         VARCHAR(10),
    FOREIGN KEY (build_file_api_docs_id) REFERENCES build_file_api_docs (build_api_docs_id),
    FOREIGN KEY (api_stress_test_start_log_id) REFERENCES api_stress_test_start_log (api_stress_test_start_log_id)
);

CREATE TABLE project_file
(
    project_build_id    INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    project_file        LONGBLOB                NOT NULL,
    docker_compose_file MEDIUMBLOB ,
    file_name           VARCHAR(100)        NOT NULL,
    FOREIGN KEY (project_build_id) REFERENCES project_build (project_build_id)
);

INSERT INTO user(nickname, password, email, is_deleted, created_at)
VALUES ('흑염룡1',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'khj745700@naver.com', false, NOW());
INSERT INTO user(nickname, password, email, is_deleted, created_at)
VALUES ('요하땅><',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'yoha6865@naver.com', false, NOW());
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (3, '김철수', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'travis45@gmail.com', FALSE, '2024-01-21 07:44:49');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (4, '이영희', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'velezdiana@vincent-kline.com', FALSE, '2024-07-20 15:40:40');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (5, '박민수', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'josephsantiago@jensen.com', FALSE, '2024-07-06 00:27:27');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (6, '최지우', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'deannajohnson@sanchez.info', FALSE, '2024-01-30 08:44:56');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (7, '정수빈', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'csmith@yahoo.com', FALSE, '2024-05-15 02:00:21');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (8, '장민혁', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'daniel20@morris.com', FALSE, '2024-08-30 09:53:05');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (9, '윤지아', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'daniel00@washington.biz', FALSE, '2024-06-20 16:38:56');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (10, '한지민', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'crystal43@lewis.com', FALSE, '2024-08-21 02:22:13');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (11, '최현우', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'rowens@hotmail.com', FALSE, '2024-05-11 11:36:36');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (12, '신정훈', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'wrobinson@simmons.com', FALSE, '2024-10-21 14:33:11');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (13, '오하영', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'lorrainewilliams@yahoo.com', FALSE, '2024-09-07 00:38:19');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (14, '권나연', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'gillespiesean@gmail.com', FALSE, '2024-01-29 01:05:45');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (15, '서지호', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'gabrielunderwood@parker-jackson.com', FALSE, '2024-04-07 03:23:38');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (16, '김다은', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'brianakelly@gmail.com', FALSE, '2024-08-09 21:58:09');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (17, '박준영', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'larsondavid@yahoo.com', FALSE, '2024-03-09 21:13:07');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (18, '이서연', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'williamrichardson@torres-rodriguez.info', FALSE, '2024-09-01 19:09:23');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (19, '송하은', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'boydjennifer@marquez.net', FALSE, '2024-03-18 06:26:50');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (20, '홍준기', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'ssavage@hotmail.com', FALSE, '2024-08-15 21:41:49');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (21, '문지윤', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'ssa132vage@hotmail.com', FALSE, '2024-08-15 21:41:49');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (22, '이승현', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'steinjeff@hernandez-bowman.com', FALSE, '2024-02-07 15:17:59');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (23, '백민지', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'dpennington@yahoo.com', FALSE, '2024-06-19 13:43:53');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (24, '강지훈', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'fisherjamie@yahoo.com', FALSE, '2024-05-13 16:38:47');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (25, '조민아', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'shelby54@yahoo.com', FALSE, '2024-08-17 13:07:41');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (26, '임수진', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'dhudson@gmail.com', FALSE, '2024-10-12 08:19:44');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (27, '한주영', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'jennifer30@murphy.com', FALSE, '2024-08-04 19:32:08');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (28, '윤현수', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'davidleonard@thomas.net', FALSE, '2024-09-26 06:01:55');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (29, '정해준', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'davidsonchristopher@underwood-newman.biz', FALSE, '2024-10-10 04:35:18');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (30, '차은우', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'fross@hotmail.com', FALSE, '2024-10-07 09:10:29');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (31, '도민준', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'uflynn@hotmail.com', FALSE, '2024-06-29 08:49:23');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at) VALUES (32, '구본혁', 0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432, 'cummingsscott@santos.com', FALSE, '2024-02-24 21:15:22');



INSERT INTO project(name, english_name, content_type, filename, memo, is_deleted, created_at)
VALUES ("프로젝트1", "project1", "image/jpeg", "5CA08755-59D8-41DA-B6C8-FE241DB35889", "메모", 0, NOW());
INSERT INTO project(name, english_name, content_type, filename, memo, is_deleted, created_at)
VALUES ("프로젝트2", "project2", "image/jpeg", "5CA08755-59D8-41DA-B6C8-FE241DB35889", "메모", 0, NOW());
INSERT INTO project_participant(user_id, project_id, is_deleted, created_at, is_owner)
VALUES (2, 1, 0, NOW(), true);
INSERT INTO project_participant(user_id, project_id, is_deleted, created_at, is_owner)
VALUES (2, 2, 0, NOW(), true);
INSERT INTO project_participant(user_id, project_id, is_deleted, created_at, is_owner)
VALUES (1, 1, 0, NOW(), false);
INSERT INTO project_participant(user_id, project_id, is_deleted, created_at, is_owner)
VALUES (1, 2, 0, NOW(), false);
