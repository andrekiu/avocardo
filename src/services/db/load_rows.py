from MySQLdb.times import TimestampFromTicks
import MySQLdb
import fileinput
import json
import time

def gen_db():
  return MySQLdb.connect(read_default_file="./mysql_options.cnf", read_default_group="client")

def select_all(db): 
  cursor = db.cursor()
  cursor.execute("""SELECT * FROM quizzes""")
  results = cursor.fetchall()
  for row in results: 
    print(row)

def insert(db, rows):
  insert = db.cursor()
  insert.executemany(
    """INSERT INTO quizzes (question, answer, alternatives, variant, created_time) 
        values (%s, %s, %s, %s, %s)""",
    rows
  )
  db.commit()

def json_str(v): 
  return json.dumps(v)

def json_array_of_str(v):
  return json.dumps(v)

if __name__ == "__main__":
  json_blob = ""
  for line in fileinput.input():
    json_blob += line
  
  now = TimestampFromTicks(time.time()) 
  bigrams = json.loads(json_blob)
  rows = [
    (json_str(k), json_str(v[0]), json_array_of_str(v[1: -1]), json_str("PRONOUNS"), now) 
    for (k, v) in bigrams.items()
  ]
  db = gen_db()
  insert(db, rows)
  print("successfully inserting {} rows".format(len(rows)))