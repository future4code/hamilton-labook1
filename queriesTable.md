CREATE TABLE labook1_User (
	id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE labook1_Friendship (
	id_user1 VARCHAR(255) NOT NULL,
    id_user2 VARCHAR(255) NOT NULL,
    FOREIGN KEY(id_user1) REFERENCES labook1_User (id),
    FOREIGN KEY(id_user2) REFERENCES labook1_User (id)
);

CREATE TABLE labook1_Post (
	id VARCHAR(255) PRIMARY KEY,
	photo VARCHAR(255),
    description VARCHAR(255) NOT NULL,
    creationDate VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    author_Id VARCHAR(255),
    FOREIGN KEY(author_Id) REFERENCES labook1_User (id)
);