DROP TABLE IF EXISTS profile;
DROP TABLE IF EXISTS tree;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS vote;

CREATE TABLE IF NOT EXISTS profile (
    profile_id UUID NOT NULL PRIMARY KEY,
    profile_activation_token CHAR(96) NOT NULL,
    profile_email VARCHAR (128) NOT NULL,
    profile_hash CHAR (97) NOT NULL,
    profile_join_date DATE NOT NULL,
    profile_name VARCHAR (96) NOT NULL,
    UNIQUE(profile_email)
);

CREATE TABLE IF NOT EXISTS tree (

);

CREATE TABLE IF NOT EXISTS comment (

);

CREATE TABLE IF NOT EXISTS image (

);

CREATE TABLE IF NOT EXISTS vote (

);
