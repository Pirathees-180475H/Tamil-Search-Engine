# Tamil-Metophor Search Engine - IR Project

This project was created using React and ElasticSearch

## `1.Install Elastic search and do following steps `
1. Install Elastic search

2. In the local machine's /elasticsearch/config folder, create a folder called analyzers.

3. Transfer the three.txt files (custom analyzers) from the analyzer folder in this repository to your own computer's elasticsearch/config/analyzers directory.

4. Create an Index called "tamilsongs" in Elastic search using mapping.json file

7. Insert song.json(corpus) to elastic search with help of Elastic search Bulk Document Insert.py file Or other methods

8. Allow any origin to make request to elastic search server by configuring the elasticsearch.yaml

9. Start Elastic search

## Steps to run the react application

1. Clone/download The Repo

2. In React-app folder, execute npm install  to install required dependencies

3. Now you can able to run the react application using npm start

## Structure of the react application

1. I used Axios as REST Client(to communicate with elastic search)

2. React-app/src/components contains Three .js files 

    1. HomePage.JS -> Welcome Page of the application

    2. searchPage-> contain UI components and search functionality handlers.

    3. ParamProvider -> provides the request body for elastic search queries based on your input.
