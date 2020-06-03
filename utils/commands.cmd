pipenv shell
pipenv install django djangorestframwork django-rest-knox

django-admin startproject leadmanager
python.exe .\manage.py startapp leads
python .\manage.py makemigrations leads
python .\manage.py migrate