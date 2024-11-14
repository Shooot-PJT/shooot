DROP TABLE IF EXISTS project_build_log;
DROP TABLE IF EXISTS project_test_metric_log;
DROP TABLE IF EXISTS api_test_method;
DROP TABLE IF EXISTS api_stress_test_log;
DROP TABLE IF EXISTS api_stress_test_start_log;
DROP TABLE IF EXISTS build_file_api_docs;
DROP TABLE IF EXISTS project_file;
DROP TABLE IF EXISTS project_build;
DROP TABLE IF EXISTS api_subscribe;
DROP TABLE IF EXISTS api_test_case_request;
DROP TABLE IF EXISTS api_test_file;
DROP TABLE IF EXISTS api_test_log;
DROP TABLE IF EXISTS api_test_case;
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
    is_deleted         BOOL        NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project (project_id)
);

CREATE TABLE api
(
    api_id          INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    api_domain_id   INTEGER                   NOT NULL,
    api_manager_id  INTEGER                   NOT NULL,
    api_title       VARCHAR(30)               NOT NULL,
    api_description TEXT                      NOT NULL,
    method          VARCHAR(10),
    url             TEXT,
    example_url     TEXT,
    example_content JSON,
    created_at      DATETIME                  NOT NULL,
    modified_at     DATETIME                  NOT NULL,
    is_real_server  BOOL                      NOT NULL,
    is_secure       BOOL                      NOT NULL,
    is_deleted      BOOL                      NOT NULL,
    test_status     VARCHAR(10) DEFAULT 'YET' NOT NULL,
    FOREIGN KEY (api_domain_id) REFERENCES domain (api_domain_id),
    FOREIGN KEY (api_manager_id) REFERENCES project_participant (project_participant_id)
);

CREATE TABLE api_test_case
(
    api_test_case_id INTEGER                   NOT NULL AUTO_INCREMENT PRIMARY KEY,
    api_id           INTEGER                   NOT NULL,
    test_title       VARCHAR(20)               NOT NULL,
    http_status_code INTEGER,
    test_case_status VARCHAR(30) DEFAULT 'YET' NOT NULL,
    modified_at      DATETIME                  NOT NULL,
    is_deleted       BOOL                      NOT NULL,
    created_at       DATETIME                  NOT NULL,
    FOREIGN KEY (api_id) REFERENCES api (api_id)
);

CREATE TABLE api_test_log
(
    api_test_log_id        BINARY(16) PRIMARY KEY,
    project_participant_id INTEGER  NOT NULL,
    api_test_case_id       INTEGER  NOT NULL,
    is_success             BOOL     NOT NULL,
    http_status            INTEGER  NOT NULL,
    http_body              JSON,
    http_header            JSON,
    created_at             DATETIME NOT NULL,
    is_deleted             BOOL     NOT NULL,
    FOREIGN KEY (project_participant_id) REFERENCES project_participant (project_participant_id),
    FOREIGN KEY (api_test_case_id) REFERENCES api_test_case (api_test_case_id)
);

CREATE TABLE api_test_file
(
    api_file_id        BINARY(16) PRIMARY KEY,
    api_test_case_id   INTEGER     NOT NULL,
    file_path          TEXT        NOT NULL,
    file_extension     VARCHAR(20) NOT NULL,
    file_original_name TEXT        NOT NULL,
    file_size          INTEGER     NOT NULL,
    FOREIGN KEY (api_test_case_id) REFERENCES api_test_case (api_test_case_id)
);

CREATE TABLE api_test_case_request
(
    api_test_request_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    api_test_case_id    INTEGER NOT NULL,
    type                VARCHAR(10),
    content             TEXT    NOT NULL,
    FOREIGN KEY (api_test_case_id) REFERENCES api_test_case (api_test_case_id)
);

CREATE TABLE project_test_metric_log
(
    `test_log_id`               BINARY(16)	NOT NULL,
    `build_file_api_docs_id`    INTEGER  NOT NULL,
    `avg_cpu_utilization`       FLOAT    NOT NULL,
    `max_cpu_utilization`       FLOAT    NOT NULL,
    `min_cpu_utilization`       FLOAT    NOT NULL,
    `avg_ram_utilization`       FLOAT    NOT NULL,
    `max_ram_utilization`       FLOAT    NOT NULL,
    `min_ram_utilization`       FLOAT    NOT NULL,
    `avg_network_utilization`   FLOAT    NOT NULL,
    `max_network_utilization`   FLOAT    NOT NULL,
    `min_network_utilization`   FLOAT    NOT NULL,
    `avg_disk_utilization`      FLOAT    NOT NULL,
    `max_disk_utilization`      FLOAT    NOT NULL,
    `min_disk_utilization`      FLOAT    NOT NULL,
    `avg_jvm_memory_usage`      FLOAT NULL,
    `max_jvm_memory_usage`      FLOAT NULL,
    `min_jvm_memory_usage`      FLOAT NULL,
    `avg_gc_pause_time`         FLOAT NULL,
    `max_gc_pause_time`         FLOAT NULL,
    `min_gc_pause_time`         FLOAT NULL,
    `avg_thread_count`          SMALLINT NULL,
    `max_thread_count`          SMALLINT NULL,
    `min_thread_count`          SMALLINT NULL,
    `avg_request_count`         BIGINT NULL,
    `max_request_count`         BIGINT NULL,
    `min_request_count`         BIGINT NULL,
    `avg_heap_memory_usage`     FLOAT NULL,
    `max_heap_memory_usage`     FLOAT NULL,
    `min_heap_memory_usage`     FLOAT NULL,
    `avg_non_heap_memory_usage` FLOAT NULL,
    `max_non_heap_memory_usage` FLOAT NULL,
    `min_non_heap_memory_usage` FLOAT NULL,
    `avg_cache_hits`            BIGINT NULL,
    `max_cache_hits`            BIGINT NULL,
    `min_cache_hits`            BIGINT NULL,
    `avg_cache_misses`          BIGINT NULL,
    `max_cache_misses`          BIGINT NULL,
    `min_cache_misses`          BIGINT NULL,
    `avg_active_connections`    SMALLINT NULL,
    `max_active_connections`    SMALLINT NULL,
    `min_active_connections`    SMALLINT NULL,
    `avg_total_connections`     SMALLINT NULL,
    `max_total_connections`     SMALLINT NULL,
    `min_total_connections`     SMALLINT NULL,
    `created_at`                DATETIME NOT NULL,
    FOREIGN KEY (build_file_api_docs_id) REFERENCES build_file_api_docs (build_api_docs_id)
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
    project_file        LONGBLOB            NOT NULL,
    docker_compose_file MEDIUMBLOB,
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
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (3, '김철수',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'travis45@gmail.com', FALSE, '2024-01-21 07:44:49');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (4, '이영희',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'velezdiana@vincent-kline.com', FALSE, '2024-07-20 15:40:40');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (5, '박민수',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'josephsantiago@jensen.com', FALSE, '2024-07-06 00:27:27');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (6, '최지우',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'deannajohnson@sanchez.info', FALSE, '2024-01-30 08:44:56');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (7, '정수빈',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'csmith@yahoo.com', FALSE, '2024-05-15 02:00:21');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (8, '장민혁',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'daniel20@morris.com', FALSE, '2024-08-30 09:53:05');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (9, '윤지아',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'daniel00@washington.biz', FALSE, '2024-06-20 16:38:56');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (10, '한지민',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'crystal43@lewis.com', FALSE, '2024-08-21 02:22:13');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (11, '최현우',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'rowens@hotmail.com', FALSE, '2024-05-11 11:36:36');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (12, '신정훈',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'wrobinson@simmons.com', FALSE, '2024-10-21 14:33:11');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (13, '오하영',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'lorrainewilliams@yahoo.com', FALSE, '2024-09-07 00:38:19');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (14, '권나연',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'gillespiesean@gmail.com', FALSE, '2024-01-29 01:05:45');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (15, '서지호',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'gabrielunderwood@parker-jackson.com', FALSE, '2024-04-07 03:23:38');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (16, '김다은',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'brianakelly@gmail.com', FALSE, '2024-08-09 21:58:09');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (17, '박준영',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'larsondavid@yahoo.com', FALSE, '2024-03-09 21:13:07');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (18, '이서연',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'williamrichardson@torres-rodriguez.info', FALSE, '2024-09-01 19:09:23');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (19, '송하은',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'boydjennifer@marquez.net', FALSE, '2024-03-18 06:26:50');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (20, '홍준기',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'ssavage@hotmail.com', FALSE, '2024-08-15 21:41:49');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (21, '문지윤',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'ssa132vage@hotmail.com', FALSE, '2024-08-15 21:41:49');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (22, '이승현',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'steinjeff@hernandez-bowman.com', FALSE, '2024-02-07 15:17:59');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (23, '백민지',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'dpennington@yahoo.com', FALSE, '2024-06-19 13:43:53');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (24, '강지훈',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'fisherjamie@yahoo.com', FALSE, '2024-05-13 16:38:47');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (25, '조민아',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'shelby54@yahoo.com', FALSE, '2024-08-17 13:07:41');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (26, '임수진',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'dhudson@gmail.com', FALSE, '2024-10-12 08:19:44');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (27, '한주영',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'jennifer30@murphy.com', FALSE, '2024-08-04 19:32:08');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (28, '윤현수',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'davidleonard@thomas.net', FALSE, '2024-09-26 06:01:55');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (29, '정해준',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'davidsonchristopher@underwood-newman.biz', FALSE, '2024-10-10 04:35:18');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (30, '차은우',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'fross@hotmail.com', FALSE, '2024-10-07 09:10:29');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (31, '도민준',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'uflynn@hotmail.com', FALSE, '2024-06-29 08:49:23');
INSERT INTO user (user_id, nickname, password, email, is_deleted, created_at)
VALUES (32, '구본혁',
        0x24326124313024795451594A7A38462F676B5232734550516B6D72542E36434B5A585249315A76465561314274527551613763417257796E37375432,
        'cummingsscott@santos.com', FALSE, '2024-02-24 21:15:22');

INSERT INTO project(name, english_name, content_type, filename, memo, is_deleted, created_at)
VALUES ("프로젝트1", "project1", "image/jpeg", "5CA08755-59D8-41DA-B6C8-FE241DB35889", "메모", 0, NOW());
INSERT INTO project(name, english_name, content_type, filename, memo, is_deleted, created_at)
VALUES ("프로젝트2", "project2", "image/jpeg", "5CA08755-59D8-41DA-B6C8-FE241DB35889", "메모", 0, NOW());
INSERT INTO project (name, english_name, content_type, filename, memo, is_deleted, created_at)
VALUES ('피카츄', 'pikachu', 'image/jpeg', 'd3b07384-d9ab-4c5e-9e44-d9fda52d3f5f', '전기 타입 포켓몬입니다.',
        FALSE, '2023-01-01'),
       ('꼬부기', 'squirtle', 'image/jpeg', '1f3e3a13-1d2b-4b58-ae8a-d4329d50e8f4', '물 타입 포켓몬입니다.',
        FALSE, '2023-01-02'),
       ('이상해씨', 'bulbasaur', 'image/jpeg', 'a2f9ae76-4bcd-41b7-91e1-8fcb8e83e89d', '풀/독 타입 포켓몬입니다.',
        FALSE, '2023-01-03'),
       ('파이리', 'charmander', 'image/jpeg', 'f6e34d5a-6742-42d9-9cdd-9c57d3b0c2ff', '불 타입 포켓몬입니다.',
        FALSE, '2023-01-04'),
       ('리아코', 'totodile', 'image/jpeg', 'a7b6c8a8-4d11-4d98-bf23-2f9d3f8ae5a9', '물 타입 포켓몬입니다.',
        FALSE, '2023-01-05'),
       ('치코리타', 'chikorita', 'image/jpeg', 'e68d7194-2d3b-487b-8bcf-59fba6a7c52a', '풀 타입 포켓몬입니다.',
        FALSE, '2023-01-06'),
       ('브케인', 'cyndaquil', 'image/jpeg', 'c5f023f3-8fd7-4d8a-b9e4-8c18c4326ef4', '불 타입 포켓몬입니다.',
        FALSE, '2023-01-07'),
       ('물짱이', 'mudkip', 'image/jpeg', 'f1e274d4-80e7-4f6f-9308-6b3f22c9a38f', '물 타입 포켓몬입니다.',
        FALSE, '2023-01-08'),
       ('나무지기', 'treecko', 'image/jpeg', 'b0d95f04-e5f7-45f9-91e7-b75ed4d87fa8', '풀 타입 포켓몬입니다.',
        FALSE, '2023-01-09'),
       ('아차모', 'torchic', 'image/jpeg', 'd2b8359f-d8e9-4c89-9733-8a8c45e0e3e3', '불 타입 포켓몬입니다.',
        FALSE, '2023-01-10'),
       ('모부기', 'turtwig', 'image/jpeg', 'bf3fa3d1-6fd1-48a9-b6e5-d97e3c9231e1', '풀 타입 포켓몬입니다.',
        FALSE, '2023-01-11'),
       ('팽도리', 'piplup', 'image/jpeg', 'fd9c2357-c6b1-4728-a939-4c8b8e3b1d4d', '물 타입 포켓몬입니다.',
        FALSE, '2023-01-12'),
       ('불꽃숭이', 'chimchar', 'image/jpeg', 'e0f3b487-a6bc-41e5-9372-b1fa67d5b4f7', '불 타입 포켓몬입니다.',
        FALSE, '2023-01-13'),
       ('피츄', 'pichu', 'image/jpeg', 'bb8f91e5-5c9c-4d4e-8175-91f8b2a9d3d8',
        '전기 타입 포켓몬의 진화 전 단계입니다.', FALSE, '2023-01-14'),
       ('이브이', 'eevee', 'image/jpeg', 'd7b6a94e-2a5f-42f9-8be9-71f5d3c5a8f4', '진화 옵션이 다양한 포켓몬입니다.',
        FALSE, '2023-01-15');

INSERT INTO project_participant(user_id, project_id, is_deleted, created_at, is_owner)
VALUES (2, 1, 0, NOW(), true);
INSERT INTO project_participant(user_id, project_id, is_deleted, created_at, is_owner)
VALUES (2, 2, 0, NOW(), true);
INSERT INTO project_participant (user_id, project_id, is_deleted, created_at, is_owner)
VALUES (3, 3, 0, NOW(), TRUE),
       (4, 4, 0, NOW(), TRUE),
       (5, 5, 0, NOW(), TRUE),
       (6, 6, 0, NOW(), TRUE),
       (7, 7, 0, NOW(), TRUE),
       (8, 8, 0, NOW(), TRUE),
       (9, 9, 0, NOW(), TRUE),
       (10, 10, 0, NOW(), TRUE),
       (11, 11, 0, NOW(), TRUE),
       (12, 12, 0, NOW(), TRUE),
       (13, 13, 0, NOW(), TRUE),
       (14, 14, 0, NOW(), TRUE),
       (15, 15, 0, NOW(), TRUE),
       (16, 16, 0, NOW(), TRUE),
       (17, 17, 0, NOW(), TRUE),
       (18, 1, 0, NOW(), FALSE),
       (19, 2, 0, NOW(), FALSE),
       (20, 3, 0, NOW(), FALSE),
       (21, 4, 0, NOW(), FALSE),
       (22, 5, 0, NOW(), FALSE),
       (23, 6, 0, NOW(), FALSE),
       (24, 7, 0, NOW(), FALSE),
       (25, 8, 0, NOW(), FALSE),
       (26, 9, 0, NOW(), FALSE),
       (27, 10, 0, NOW(), FALSE),
       (28, 11, 0, NOW(), FALSE),
       (29, 12, 0, NOW(), FALSE),
       (30, 13, 0, NOW(), FALSE),
       (31, 14, 0, NOW(), FALSE),
       (32, 15, 0, NOW(), FALSE),
       (1, 16, 0, NOW(), FALSE),
       (2, 17, 0, NOW(), FALSE),
       (3, 1, 0, NOW(), FALSE),
       (4, 2, 0, NOW(), FALSE),
       (5, 3, 0, NOW(), FALSE),
       (6, 4, 0, NOW(), FALSE),
       (7, 5, 0, NOW(), FALSE),
       (8, 6, 0, NOW(), FALSE),
       (9, 7, 0, NOW(), FALSE),
       (10, 8, 0, NOW(), FALSE),
       (11, 9, 0, NOW(), FALSE),
       (12, 10, 0, NOW(), FALSE),
       (13, 11, 0, NOW(), FALSE),
       (14, 12, 0, NOW(), FALSE),
       (15, 13, 0, NOW(), FALSE),
       (16, 14, 0, NOW(), FALSE),
       (17, 15, 0, NOW(), FALSE),
       (18, 16, 0, NOW(), FALSE),
       (19, 17, 0, NOW(), FALSE);

INSERT INTO domain (api_domain_id, project_id, domain_name, domain_description, created_at,
                    modified_at, is_deleted)
VALUES (16, 1, '프로젝트1 도메인7', '프로젝트1 관련 도메인 설명입니다', '2024-11-04 18:04:01', '2024-11-04 18:27:01', 0),
       (17, 1, '프로젝트1 도메인9', '프로젝트1 관련 도메인 설명입니다', '2024-11-04 17:40:01', '2024-11-04 18:20:01', 0),
       (18, 1, '프로젝트1 도메인6', '프로젝트1 관련 도메인 설명입니다', '2024-11-04 18:08:01', '2024-11-04 18:35:01', 0),
       (19, 1, '프로젝트1 도메인5', '프로젝트1 관련 도메인 설명입니다', '2024-11-04 17:51:01', '2024-11-04 18:42:01', 0),
       (20, 1, '프로젝트1 도메인10', '프로젝트1 관련 도메인 설명입니다', '2024-11-04 18:07:01', '2024-11-04 18:20:01',
        0),
       (21, 1, '프로젝트1 도메인5', '프로젝트1 관련 도메인 설명입니다', '2024-11-04 18:03:01', '2024-11-04 18:24:01', 0),
       (22, 2, '프로젝트2 도메인5', '프로젝트2 관련 도메인 설명입니다', '2024-11-04 18:24:01', '2024-11-04 18:58:01', 0),
       (23, 2, '프로젝트2 도메인9', '프로젝트2 관련 도메인 설명입니다', '2024-11-04 17:33:01', '2024-11-04 18:11:01', 0),
       (24, 3, '테스트 도메인7', '테스트 관련 도메인 설명입니다', '2024-11-06 02:07:12', '2024-11-06 03:00:12', 0),
       (25, 3, '테스트 도메인1', '테스트 관련 도메인 설명입니다', '2024-11-06 01:44:12', '2024-11-06 02:16:12', 0),
       (26, 3, '테스트 도메인6', '테스트 관련 도메인 설명입니다', '2024-11-06 01:57:12', '2024-11-06 02:31:12', 0),
       (27, 12, 'fdsafsafa 도메인7', 'fdsafsafa 관련 도메인 설명입니다', '2024-11-07 06:26:45',
        '2024-11-07 07:00:45', 0),
       (28, 12, 'fdsafsafa 도메인8', 'fdsafsafa 관련 도메인 설명입니다', '2024-11-07 07:12:45',
        '2024-11-07 08:02:45', 0),
       (29, 12, 'fdsafsafa 도메인6', 'fdsafsafa 관련 도메인 설명입니다', '2024-11-07 06:28:45',
        '2024-11-07 06:50:45', 0),
       (30, 12, 'fdsafsafa 도메인9', 'fdsafsafa 관련 도메인 설명입니다', '2024-11-07 07:10:45',
        '2024-11-07 07:30:45', 0),
       (31, 12, 'fdsafsafa 도메인9', 'fdsafsafa 관련 도메인 설명입니다', '2024-11-07 06:35:45',
        '2024-11-07 07:18:45', 0),
       (32, 13, 'projecttest2 도메인2', 'projecttest2 관련 도메인 설명입니다', '2024-11-07 08:16:10',
        '2024-11-07 09:16:10', 0),
       (33, 13, 'projecttest2 도메인8', 'projecttest2 관련 도메인 설명입니다', '2024-11-07 08:44:10',
        '2024-11-07 09:03:10', 0),
       (34, 13, 'projecttest2 도메인10', 'projecttest2 관련 도메인 설명입니다', '2024-11-07 08:05:10',
        '2024-11-07 08:48:10', 0),
       (35, 16, 'pikachu 도메인7', 'pikachu 관련 도메인 설명입니다', '2023-01-01 00:53:00',
        '2023-01-01 01:25:00', 0),
       (36, 16, 'pikachu 도메인4', 'pikachu 관련 도메인 설명입니다', '2023-01-01 00:47:00',
        '2023-01-01 00:58:00', 0),
       (37, 16, 'pikachu 도메인1', 'pikachu 관련 도메인 설명입니다', '2023-01-01 00:26:00',
        '2023-01-01 00:51:00', 0),
       (38, 16, 'pikachu 도메인10', 'pikachu 관련 도메인 설명입니다', '2023-01-01 00:57:00',
        '2023-01-01 01:23:00', 0),
       (39, 16, 'pikachu 도메인6', 'pikachu 관련 도메인 설명입니다', '2023-01-01 00:12:00',
        '2023-01-01 00:21:00', 0),
       (40, 17, 'squirtle 도메인6', 'squirtle 관련 도메인 설명입니다', '2023-01-02 00:12:00',
        '2023-01-02 00:41:00', 0),
       (41, 17, 'squirtle 도메인7', 'squirtle 관련 도메인 설명입니다', '2023-01-02 00:37:00',
        '2023-01-02 01:22:00', 0),
       (42, 17, 'squirtle 도메인8', 'squirtle 관련 도메인 설명입니다', '2023-01-02 00:18:00',
        '2023-01-02 00:19:00', 0),
       (43, 17, 'squirtle 도메인2', 'squirtle 관련 도메인 설명입니다', '2023-01-02 00:33:00',
        '2023-01-02 01:04:00', 0),
       (44, 17, 'squirtle 도메인10', 'squirtle 관련 도메인 설명입니다', '2023-01-02 00:42:00',
        '2023-01-02 00:49:00', 0);


INSERT INTO api (api_id, api_domain_id, api_manager_id, api_title, api_description, method, url,
                 example_url, example_content, created_at, modified_at, is_real_server, is_secure,
                 is_deleted, test_status)
VALUES
-- �꾨줈�앺듃 1踰� �곗씠�� (api_manager_id: 1, 18, 35 / api_domain_id: 16, 17, 18, 19, 20, 21)
(1, 16, 1, 'API Title 1', 'Description for API 1', 'GET', '/api/eggs/{eggId}',
 'https://www.example.com/api/eggs/3?type=scrambled', '{
  "param": "value"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'YET'),
(2, 17, 18, 'API Title 2', 'Description for API 2', 'POST', '/api/toast',
 'https://www.example.com/api/toast', '{
  "type": "butter"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'SUCCESS'),
(3, 18, 35, 'API Title 3', 'Description for API 3', 'DELETE', '/api/coffee/{coffeeId}',
 'https://www.example.com/api/coffee/3', '{
  "flavor": "bitter"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'FAIL'),
(4, 19, 1, 'API Title 4', 'Description for API 4', 'PATCH', '/api/tea',
 'https://www.example.com/api/tea', '{
  "type": "green"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'YET'),
(5, 20, 18, 'API Title 5', 'Description for API 5', 'PUT', '/api/eggs',
 'https://www.example.com/api/eggs?order=boiled', '{
  "quantity": 12
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'SUCCESS'),
(6, 21, 35, 'API Title 6', 'Description for API 6', 'GET', '/api/sandwich/{sandwichId}',
 'https://www.example.com/api/sandwich/7', '{
  "size": "large"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'FAIL'),

-- �꾨줈�앺듃 2踰� �곗씠�� (api_manager_id: 2, 19, 36 / api_domain_id: 22, 23)
(7, 22, 2, 'API Title 7', 'Description for API 7', 'POST', '/api/pancakes/{pancakeId}',
 'https://www.example.com/api/pancakes/5?flavor=maple', '{
  "toppings": "syrup"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'SUCCESS'),
(8, 23, 19, 'API Title 8', 'Description for API 8', 'DELETE', '/api/waffles',
 'https://www.example.com/api/waffles', '{
  "serving": "two"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'YET'),
(9, 22, 36, 'API Title 9', 'Description for API 9', 'PUT', '/api/fries/{fryId}',
 'https://www.example.com/api/fries/8?style=curly', '{
  "sauce": "ketchup"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'SUCCESS'),
(10, 23, 2, 'API Title 10', 'Description for API 10', 'PATCH', '/api/burger',
 'https://www.example.com/api/burger?cheese=extra', '{
  "extra": "bacon"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'FAIL'),

-- �꾨줈�앺듃 3踰� �곗씠�� (api_manager_id: 3, 20, 37 / api_domain_id: 24, 25, 26)
(11, 24, 3, 'API Title 11', 'Description for API 11', 'GET', '/api/sushi/{sushiId}',
 'https://www.example.com/api/sushi/4', '{
  "type": "salmon"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'YET'),
(12, 25, 20, 'API Title 12', 'Description for API 12', 'DELETE', '/api/tacos',
 'https://www.example.com/api/tacos', '{
  "spiceLevel": "hot"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'SUCCESS'),
(13, 26, 37, 'API Title 13', 'Description for API 13', 'POST', '/api/pasta/{pastaId}',
 'https://www.example.com/api/pasta/6?sauce=alfredo', '{
  "pastaType": "fettuccine"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'FAIL'),
(14, 24, 3, 'API Title 14', 'Description for API 14', 'PATCH', '/api/pizza',
 'https://www.example.com/api/pizza?size=large', '{
  "toppings": "pepperoni"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'SUCCESS'),
(15, 25, 20, 'API Title 15', 'Description for API 15', 'PUT', '/api/ramen',
 'https://www.example.com/api/ramen', '{
  "broth": "spicy"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'YET'),

-- 異붽��� �곗씠��: 媛숈� api_domain_id�� �щ윭 �덉퐫�� 異붽�
(16, 22, 3, 'API Title 16', 'Description for API 16', 'GET', '/api/waffles/{waffleId}',
 'https://www.example.com/api/waffles/9', '{
  "type": "blueberry"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'SUCCESS'),
(17, 23, 19, 'API Title 17', 'Description for API 17', 'POST', '/api/waffles/{waffleId}',
 'https://www.example.com/api/waffles/10?size=large', '{
  "toppings": "cream"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'FAIL'),
(18, 22, 36, 'API Title 18', 'Description for API 18', 'PUT', '/api/pancakes',
 'https://www.example.com/api/pancakes?flavor=blueberry', '{
  "quantity": 8
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'SUCCESS'),
(19, 23, 2, 'API Title 19', 'Description for API 19', 'PATCH', '/api/burger/{burgerId}',
 'https://www.example.com/api/burger/5', '{
  "extra": "cheese"
}', '2024-11-10', NOW(), FLOOR(RAND() * 2), FLOOR(RAND() * 2), FLOOR(RAND() * 2), 'YET');



INSERT INTO api_test_case (api_test_case_id, api_id, test_title, http_status_code, test_case_status,
                           modified_at, is_deleted, created_at)
VALUES
-- api_id 1
(1, 1, 'Test Case 1', 200, 'SUCCESS', '2024-11-11 10:12:45', 0, '2024-11-11'),
(2, 1, 'Test Case 2', 400, 'FAIL', '2024-11-11 10:13:30', 0, '2024-11-11'),
(3, 1, 'Test Case 3', 200, 'YET', '2024-11-11 10:14:10', 0, '2024-11-11'),

-- api_id 2
(4, 2, 'Test Case 4', 200, 'SUCCESS', '2024-11-11 10:15:05', 0, '2024-11-11'),
(5, 2, 'Test Case 5', 404, 'FAIL', '2024-11-11 10:15:45', 0, '2024-11-11'),
(6, 2, 'Test Case 6', 200, 'YET', '2024-11-11 10:16:30', 0, '2024-11-11'),

-- api_id 3
(7, 3, 'Test Case 7', 500, 'FAIL', '2024-11-11 10:17:00', 0, '2024-11-11'),
(8, 3, 'Test Case 8', 200, 'SUCCESS', '2024-11-11 10:17:50', 0, '2024-11-11'),
(9, 3, 'Test Case 9', 200, 'YET', '2024-11-11 10:18:30', 0, '2024-11-11'),

-- api_id 4
(10, 4, 'Test Case 10', 200, 'SUCCESS', '2024-11-11 10:19:00', 0, '2024-11-11'),
(11, 4, 'Test Case 11', 403, 'FAIL', '2024-11-11 10:19:40', 0, '2024-11-11'),

-- api_id 5
(12, 5, 'Test Case 12', 404, 'FAIL', '2024-11-11 10:20:20', 0, '2024-11-11'),
(13, 5, 'Test Case 13', 200, 'SUCCESS', '2024-11-11 10:21:00', 0, '2024-11-11'),
(14, 5, 'Test Case 14', 200, 'YET', '2024-11-11 10:21:40', 0, '2024-11-11'),

-- api_id 6
(15, 6, 'Test Case 15', 200, 'SUCCESS', '2024-11-11 10:22:10', 0, '2024-11-11'),
(16, 6, 'Test Case 16', 500, 'FAIL', '2024-11-11 10:22:50', 0, '2024-11-11'),
(17, 6, 'Test Case 17', 200, 'YET', '2024-11-11 10:23:30', 0, '2024-11-11'),

-- api_id 7
(18, 7, 'Test Case 18', 200, 'SUCCESS', '2024-11-11 10:24:00', 0, '2024-11-11'),
(19, 7, 'Test Case 19', 400, 'FAIL', '2024-11-11 10:24:40', 0, '2024-11-11'),

-- api_id 8
(20, 8, 'Test Case 20', 200, 'SUCCESS', '2024-11-11 10:25:10', 0, '2024-11-11'),
(21, 8, 'Test Case 21', 500, 'FAIL', '2024-11-11 10:25:50', 0, '2024-11-11'),
(22, 8, 'Test Case 22', 200, 'YET', '2024-11-11 10:26:30', 0, '2024-11-11'),

-- api_id 9
(23, 9, 'Test Case 23', 200, 'SUCCESS', '2024-11-11 10:27:00', 0, '2024-11-11'),
(24, 9, 'Test Case 24', 404, 'FAIL', '2024-11-11 10:27:40', 0, '2024-11-11'),

-- api_id 10
(25, 10, 'Test Case 25', 200, 'SUCCESS', '2024-11-11 10:28:10', 0, '2024-11-11'),
(26, 10, 'Test Case 26', 403, 'FAIL', '2024-11-11 10:28:50', 0, '2024-11-11'),

-- api_id 11
(27, 11, 'Test Case 27', 200, 'SUCCESS', '2024-11-11 10:29:20', 0, '2024-11-11'),
(28, 11, 'Test Case 28', 500, 'FAIL', '2024-11-11 10:30:00', 0, '2024-11-11'),
(29, 11, 'Test Case 29', 200, 'YET', '2024-11-11 10:30:40', 0, '2024-11-11'),

-- api_id 12
(30, 12, 'Test Case 30', 404, 'FAIL', '2024-11-11 10:31:10', 0, '2024-11-11'),
(31, 12, 'Test Case 31', 200, 'SUCCESS', '2024-11-11 10:31:50', 0, '2024-11-11'),

-- api_id 13
(32, 13, 'Test Case 32', 200, 'SUCCESS', '2024-11-11 10:32:20', 0, '2024-11-11'),
(33, 13, 'Test Case 33', 500, 'FAIL', '2024-11-11 10:33:00', 0, '2024-11-11'),

-- api_id 14
(34, 14, 'Test Case 34', 200, 'SUCCESS', '2024-11-11 10:33:30', 0, '2024-11-11'),
(35, 14, 'Test Case 35', 400, 'FAIL', '2024-11-11 10:34:10', 0, '2024-11-11'),

-- api_id 15
(36, 15, 'Test Case 36', 200, 'SUCCESS', '2024-11-11 10:34:40', 0, '2024-11-11'),
(37, 15, 'Test Case 37', 500, 'FAIL', '2024-11-11 10:35:20', 0, '2024-11-11'),

-- api_id 16
(38, 16, 'Test Case 38', 200, 'SUCCESS', '2024-11-11 10:35:50', 0, '2024-11-11'),
(39, 16, 'Test Case 39', 404, 'FAIL', '2024-11-11 10:36:30', 0, '2024-11-11'),

-- api_id 17
(40, 17, 'Test Case 40', 200, 'SUCCESS', '2024-11-11 10:37:00', 0, '2024-11-11'),
(41, 17, 'Test Case 41', 403, 'FAIL', '2024-11-11 10:37:40', 0, '2024-11-11'),

-- api_id 18
(42, 18, 'Test Case 42', 200, 'SUCCESS', '2024-11-11 10:38:10', 0, '2024-11-11'),
(43, 18, 'Test Case 43', 404, 'FAIL', '2024-11-11 10:38:50', 0, '2024-11-11'),

-- api_id 19
(44, 19, 'Test Case 44', 200, 'SUCCESS', '2024-11-11 10:39:20', 0, '2024-11-11'),
(45, 19, 'Test Case 45', 400, 'FAIL', '2024-11-11 10:40:00', 0, '2024-11-11');



INSERT INTO api_test_case_request (api_test_request_id, api_test_case_id, type, content)
VALUES
-- For api_test_request_id 1 and api_test_case_id 1
(1, 1, 'JSON',
 '{"params": {"param1": ["value1", "true", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 2 and api_test_case_id 2
(2, 2, 'MULTIPART',
 '{"params": {"param1": ["value1", "false", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 3 and api_test_case_id 3
(3, 3, 'JSON',
 '{"params": {"param1": ["value1", "true", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 4 and api_test_case_id 4
(4, 4, 'MULTIPART',
 '{"params": {"param1": ["value1", "true", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 5 and api_test_case_id 5
(5, 5, 'JSON',
 '{"params": {"param1": ["value1", "false", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 6 and api_test_case_id 6
(6, 6, 'MULTIPART',
 '{"params": {"param1": ["value1", "true", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 7 and api_test_case_id 7
(7, 7, 'JSON',
 '{"params": {"param1": ["value1", "false", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 8 and api_test_case_id 8
(8, 8, 'MULTIPART',
 '{"params": {"param1": ["value1", "true", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 9 and api_test_case_id 9
(9, 9, 'JSON',
 '{"params": {"param1": ["value1", "true", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 10 and api_test_case_id 10
(10, 10, 'MULTIPART',
 '{"params": {"param1": ["value1", "false", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 11 and api_test_case_id 11
(11, 11, 'JSON',
 '{"params": {"param1": ["value1", "true", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 12 and api_test_case_id 12
(12, 12, 'MULTIPART',
 '{"params": {"param1": ["value1", "true", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 13 and api_test_case_id 13
(13, 13, 'JSON',
 '{"params": {"param1": ["value1", "false", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 14 and api_test_case_id 14
(14, 14, 'MULTIPART',
 '{"params": {"param1": ["value1", "true", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 15 and api_test_case_id 15
(15, 15, 'JSON',
 '{"params": {"param1": ["value1", "false", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 16 and api_test_case_id 16
(16, 16, 'MULTIPART',
 '{"params": {"param1": ["value1", "true", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 17 and api_test_case_id 17
(17, 17, 'JSON',
 '{"params": {"param1": ["value1", "false", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 18 and api_test_case_id 18
(18, 18, 'MULTIPART',
 '{"params": {"param1": ["value1", "true", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 19 and api_test_case_id 19
(19, 19, 'JSON',
 '{"params": {"param1": ["value1", "true", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}'),

-- For api_test_request_id 20 and api_test_case_id 20
(20, 20, 'MULTIPART',
 '{"params": {"param1": ["value1", "false", "description"], "param2": "value2"}, "headers": {"Authorization": "Bearer 123213123123132131323132"}, "pathvariable": {"path1": "value1"}, "requestbody": {"body key1": "value1"}, "form-data": {"datas": {"key1": "value1", "key2": "value2"}}}');



INSERT INTO api_test_log (api_test_log_id, project_participant_id, api_test_case_id, is_success,
                          http_status, http_body, http_header, created_at, is_deleted)
VALUES (UNHEX('00000000000000000000000000000001'), 2, 1, 0, 404, '{
  "message": "response 1"
}', '{
  "header-1": "value-1"
}', '2024-11-11 10:00:00', 0),
       (UNHEX('00000000000000000000000000000002'), 3, 2, 1, 200, '{
         "message": "response 2"
       }', '{
         "header-2": "value-2"
       }', '2024-11-11 10:01:00', 0),
       (UNHEX('00000000000000000000000000000003'), 4, 3, 0, 404, '{
         "message": "response 3"
       }', '{
         "header-3": "value-3"
       }', '2024-11-11 10:02:00', 0),
       (UNHEX('00000000000000000000000000000004'), 5, 4, 1, 200, '{
         "message": "response 4"
       }', '{
         "header-4": "value-4"
       }', '2024-11-11 10:03:00', 0),
       (UNHEX('00000000000000000000000000000005'), 6, 5, 0, 404, '{
         "message": "response 5"
       }', '{
         "header-5": "value-5"
       }', '2024-11-11 10:04:00', 0),
       (UNHEX('00000000000000000000000000000006'), 7, 6, 1, 200, '{
         "message": "response 6"
       }', '{
         "header-6": "value-6"
       }', '2024-11-11 10:05:00', 0),
       (UNHEX('00000000000000000000000000000007'), 8, 7, 0, 404, '{
         "message": "response 7"
       }', '{
         "header-7": "value-7"
       }', '2024-11-11 10:06:00', 0),
       (UNHEX('00000000000000000000000000000008'), 9, 8, 1, 200, '{
         "message": "response 8"
       }', '{
         "header-8": "value-8"
       }', '2024-11-11 10:07:00', 0),
       (UNHEX('00000000000000000000000000000009'), 10, 9, 0, 404, '{
         "message": "response 9"
       }', '{
         "header-9": "value-9"
       }', '2024-11-11 10:08:00', 0),
       (UNHEX('0000000000000000000000000000000A'), 1, 10, 1, 200, '{
         "message": "response 10"
       }', '{
         "header-10": "value-10"
       }', '2024-11-11 10:09:00', 0),
       (UNHEX('0000000000000000000000000000000B'), 2, 11, 0, 404, '{
         "message": "response 11"
       }', '{
         "header-11": "value-11"
       }', '2024-11-11 10:10:00', 0),
       (UNHEX('0000000000000000000000000000000C'), 3, 12, 1, 200, '{
         "message": "response 12"
       }', '{
         "header-12": "value-12"
       }', '2024-11-11 10:11:00', 0),
       (UNHEX('0000000000000000000000000000000D'), 4, 13, 0, 404, '{
         "message": "response 13"
       }', '{
         "header-13": "value-13"
       }', '2024-11-11 10:12:00', 0),
       (UNHEX('0000000000000000000000000000000E'), 5, 14, 1, 200, '{
         "message": "response 14"
       }', '{
         "header-14": "value-14"
       }', '2024-11-11 10:13:00', 0),
       (UNHEX('0000000000000000000000000000000F'), 6, 15, 0, 404, '{
         "message": "response 15"
       }', '{
         "header-15": "value-15"
       }', '2024-11-11 10:14:00', 0),
       (UNHEX('00000000000000000000000000000010'), 7, 16, 1, 200, '{
         "message": "response 16"
       }', '{
         "header-16": "value-16"
       }', '2024-11-11 10:15:00', 0),
       (UNHEX('00000000000000000000000000000011'), 8, 17, 0, 404, '{
         "message": "response 17"
       }', '{
         "header-17": "value-17"
       }', '2024-11-11 10:16:00', 0),
       (UNHEX('00000000000000000000000000000012'), 9, 18, 1, 200, '{
         "message": "response 18"
       }', '{
         "header-18": "value-18"
       }', '2024-11-11 10:17:00', 0),
       (UNHEX('00000000000000000000000000000013'), 10, 19, 0, 404, '{
         "message": "response 19"
       }', '{
         "header-19": "value-19"
       }', '2024-11-11 10:18:00', 0),
       (UNHEX('00000000000000000000000000000014'), 1, 20, 1, 200, '{
         "message": "response 20"
       }', '{
         "header-20": "value-20"
       }', '2024-11-11 10:19:00', 0);



