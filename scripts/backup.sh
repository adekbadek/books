mkdir -p backup

_now=$(date +"%m_%d_%Y"_"%H_%M_%S")
_file="backup/data_$_now.sql"

# using `--inserts` to avoid '\N' problems https://stackoverflow.com/a/37531223/3772847
docker-compose exec postgres sh -c 'pg_dumpall --inserts -c -U postgres' > $_file
