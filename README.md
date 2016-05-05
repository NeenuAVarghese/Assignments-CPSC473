# Assignments-CPSC473

####Assignment 6 - README
1. Start the redis server: `./redis/src/redis-server`
2. Make a directory in the nodebox-Virtual Machine: mkdir test
3. `cd test`
4. Download the files in the Assignment 6 Directory into this directory
5. Install all dependencies: `npm install`
6. Run Server: `nodemon server`
7. API will start a server on http:\\localhost:3000
8. API can be tested using cUrl commands or Postman for HTTP Requests.


####Assignment 7 - README
1. Start the nodebox- Virtual Machine
2. `mkdir -p ./mongodb/data`
3. Start mongod `./mongodb/bin/mongod --dbpath=$HOME/mongodb/data`
4. Open different terminal of the virtual box.
5. Run following command in the \home\vagrant directory  `cd test`
6. Download the files in the Assignment 7 Directory into the 'test' directory
7. Install all dependencies: `nm install`
8. Run Server: `nodemon server`
9. API will start a server on http:\\localhost:3000
10. API can be tested using cUrl commands or Postman for HTTP Requests.
11. Following cURl commands can be used for Post Requests:
  `curl --silent --request POST --header 'Content-Type: application/json' --data '{"title": "Google","link" : "http://www.google.com"}' 'http://localhost:3000/links' | python -m json.tool`
12. For get requests http:\\localhost:3000\links can be used
13. For increasing the count variable and redirection: http:\\localhost:3000\click\Facebook can be used
 
####Assignment 8
1. Present Directory should be /home/vagrant in the node-box vagrant machine
2. 'git clone https://github.com/NeenuAVarghese/Assignments-CPSC473.git'
3. `cd Assignments-CPSC473/`
3. 'cd Assignment8'
4. 'cd Amazeriffic'
5. 'npm install'
6. 'foreman start -f Procfile'
7. Access application on localhost port 3000


####Assignment 9
#####Part 1
1. Present Directory should be /home/vagrant in the node-box vagrant machine
2. `git clone https://github.com/NeenuAVarghese/Assignments-CPSC473.git`
3. `cd Assignments-CPSC473/`
4. `cd Assignment9`
5. `cd Part1`
6. Open the index.html file in a browser to view the application

#####Part 2
1. Present Directory should be /home/vagrant in the node-box vagrant machine
2. `git clone https://github.com/NeenuAVarghese/Assignments-CPSC473.git`
3. `cd Assignments-CPSC473/`
4. `cd Assignment9`
5. `cd Amazeriffic`
6. 'foreman start -f Procfile'
7. Access application on localhost port 3000



