DROP TABLE IF EXISTS vote;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS tree;
DROP TABLE IF EXISTS profile;

CREATE TABLE IF NOT EXISTS profile (
    profile_id UUID NOT NULL PRIMARY KEY,
    profile_activation_token CHAR(32) NOT NULL,
    profile_email VARCHAR (128) NOT NULL,
    profile_activation_token CHAR(96) NOT NULL,
    profile_email VARCHAR (128) NOT NULL UNIQUE,
    profile_hash CHAR (97) NOT NULL,
    profile_join_date DATE NOT NULL,
    profile_name VARCHAR (96) NOT NULL
);

CREATE TABLE IF NOT EXISTS tree (
    tree_id UUID NOT NULL PRIMARY KEY,
    tree_profile_id UUID NOT NULL,
    tree_address VARCHAR (128) NOT NULL,
    tree_end_date DATE NOT NULL,
    tree_date DATE NOT NULL,
    tree_image VARCHAR(128) NOT NULL,
    tree_info VARCHAR (1024) NOT NULL,
    tree_lat VARCHAR(96) NOT NULL,
    tree_lng VARCHAR (96) NOT NULL,
    tree_title VARCHAR (96) NOT NULL,
    tree_species VARCHAR (96) NOT NULL,

    FOREIGN KEY (tree_profile_id) REFERENCES profile(profile_id)
);

CREATE INDEX ON tree(tree_profile_id);

CREATE TABLE IF NOT EXISTS comment (

);

CREATE TABLE IF NOT EXISTS image (

);

CREATE TABLE IF NOT EXISTS vote (

);
