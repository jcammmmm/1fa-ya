pipenv shell
pipenv install django djangorestframwork django-rest-knox

django-admin startproject leadmanager
python.exe .\manage.py startapp leads
python .\manage.py makemigrations leads
python .\manage.py migrate

npm i redux react-redux redux-thunk redux-devtools-extension
npm i axios

npm install @material-ui/core
npm install @material-ui/icons

npm install react-router-dom


docker run -d --name postgresdb -e POSTGRES_PASSWORD=pass -p 2345:5432 postgres
psql -U postgres --port 2345
CREATE DATABASE unfaya;