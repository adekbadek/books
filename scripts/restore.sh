cd backup
# get the most recent file
dump_file=$(ls -t . | head -1 )

printf "\nrestoring from "$dump_file"\n\n"

egrep -v '^(CREATE|DROP) ROLE postgres;' $dump_file | docker-compose exec postgres psql -U postgres
