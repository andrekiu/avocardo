To initialize run:

python3 -m venv env
source env/bin/activate
pip freeze > requirements.txt
deactivate

To install run:

pip install -r requirements.txt

After adding a new dependency run

pip freeze > requirements.txt
