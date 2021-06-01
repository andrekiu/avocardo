When updating the schema of the table remember to update this script to load the first set of bigrams

OSX:
brew install mysql-connector-c

Config:
Set mysql_options.cnf as
"""
[client]
password="<PASSWORD>"
database="avocardo"
"""

Run:
python3 load_rows.py < <path_to_bigrams.json>