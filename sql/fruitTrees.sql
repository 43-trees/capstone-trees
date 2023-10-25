DROP TABLE IF EXISTS vote;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS tree;
DROP TABLE IF EXISTS profile;

CREATE TABLE IF NOT EXISTS profile (
    profile_id UUID NOT NULL PRIMARY KEY,
    profile_activation_token CHAR(32),
    profile_email VARCHAR (128) NOT NULL UNIQUE,
    profile_hash CHAR (97) NOT NULL,
    profile_image_url VARCHAR (256),
    profile_join_date DATE NOT NULL,
    profile_name VARCHAR (96) NOT NULL
);

CREATE TABLE IF NOT EXISTS tree (
    tree_id UUID NOT NULL PRIMARY KEY,
    tree_profile_id UUID NOT NULL,
    tree_address VARCHAR (128) NOT NULL,
    tree_end_date DATE NOT NULL,
    tree_date DATE NOT NULL,
    tree_image VARCHAR(268) NOT NULL,
    tree_info VARCHAR (1024) NOT NULL,
    tree_lat VARCHAR(96) NOT NULL,
    tree_lng VARCHAR (96) NOT NULL,
    tree_title VARCHAR (96) NOT NULL,
    tree_species VARCHAR (96) NOT NULL,

    FOREIGN KEY (tree_profile_id) REFERENCES profile(profile_id)
);

CREATE INDEX ON tree(tree_profile_id);

CREATE TABLE IF NOT EXISTS comment (
    comment_id UUID NOT NULL PRIMARY KEY,
    comment_profile_id UUID NOT NULL,
    comment_tree_id UUID NOT NULL,
    comment_content VARCHAR (512) NOT NULL,
    comment_date_time TIMESTAMPTZ NOT NULL,
    comment_image_url VARCHAR (256),

    FOREIGN KEY (comment_profile_id) REFERENCES profile(profile_id),
    FOREIGN KEY (comment_tree_id) REFERENCES tree(tree_id)
);

CREATE INDEX ON comment(comment_profile_id);
CREATE INDEX ON comment(comment_tree_id);

CREATE TABLE IF NOT EXISTS image (
    image_id UUID NOT NULL PRIMARY KEY,
    image_tree_id UUID NOT NULL,
    image_url VARCHAR (256),

    FOREIGN KEY (image_tree_id) REFERENCES tree(tree_id)
);

CREATE INDEX ON image(image_tree_id);


CREATE TABLE IF NOT EXISTS vote (
    vote_profile_id UUID NOT NULL,
    vote_tree_id UUID NOT NULL,
    vote_value VARCHAR (32) NOT NULL,

    FOREIGN KEY (vote_profile_id) REFERENCES profile(profile_id),
    FOREIGN KEY (vote_tree_id) REFERENCES tree(tree_id)
);

CREATE INDEX ON vote(vote_profile_id);
CREATE INDEX ON vote(vote_tree_id);