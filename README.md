docker exec -it 99d48107c999 sh
docker ps -a 
docker logs -f --tail 10000 c53e35ef9ebf

docker-compose -f docker-compose.yml up --build -d


docker exec -it 07f453e3cfaa sh


mongo --host localhost --port 27017 -u "root" -p "root123" --authenticationDatabase "admin"


ssh root@64.227.98.132