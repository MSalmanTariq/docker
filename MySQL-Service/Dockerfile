FROM mysql:latest
ENV MYSQL_ROOT_PASSWORD 123
ENV MYSQL_DATABASE docker
ENV MYSQL_USER salman
ENV MYSQL_PASSWORD 1234
ADD sqlconfig.sql /docker-entrypoint-initdb.d
EXPOSE 3306
