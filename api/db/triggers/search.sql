/* POST */
CREATE TRIGGER posts_after_insert
AFTER INSERT ON posts FOR EACH ROW
BEGIN
END;

CREATE TRIGGER posts_after_update
AFTER UPDATE ON posts FOR EACH ROW
BEGIN
END;

CREATE TRIGGER posts_after_delete
AFTER DELETE ON posts FOR EACH ROW
BEGIN
END;

/* TAGS **/
CREATE TRIGGER tags_after_insert
AFTER INSERT ON tags FOR EACH ROW
BEGIN
END;

CREATE TRIGGER tags_after_delete
AFTER DELETE ON tags FOR EACH ROW
BEGIN
END;

/* LINKS **/
CREATE TRIGGER links_after_insert
AFTER INSERT ON links FOR EACH ROW
BEGIN
END;

CREATE TRIGGER links_after_update
AFTER UPDATE ON links FOR EACH ROW
BEGIN
END;

CREATE TRIGGER links_after_delete
AFTER DELETE ON links FOR EACH ROW
BEGIN
END;

/* COMMENTS **/
CREATE TRIGGER comments_after_insert
AFTER INSERT ON comments FOR EACH ROW
BEGIN
END;

CREATE TRIGGER comments_after_update
AFTER UPDATE ON comments FOR EACH ROW
BEGIN
END;

CREATE TRIGGER comments_after_delete
AFTER DELETE ON comments FOR EACH ROW
BEGIN
END;
