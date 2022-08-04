CREATE TABLE fcm_job (
	id BIGINT auto_increment NOT NULL PRIMARY KEY,
	identifier varchar(32) NULL,
	deliverAt DATETIME DEFAULT CURRENT_TIMESTAMP NULL
);