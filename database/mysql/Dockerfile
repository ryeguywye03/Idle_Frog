FROM mysql

# Setup database
RUN mkdir -p /images/
COPY ../images /images

# Default values for passwords and database name. Can be overridden on docker run
ENV MYSQL_USER ryandbuser
ENV MYSQL_PASSWORD ryandbpass
ENV MYSQL_DB ryan_db