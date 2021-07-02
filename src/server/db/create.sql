create database if not exists avocardo;
use avocardo;

/* answers from people to the questions */ 
create table if not exists answers (
  id bigint not null auto_increment,
  fingerprint varchar(128) not null, 
  question_id bigint not null,
  assesment varchar(64) not null,
  answered_time datetime not null,
  primary key (id)
);

/* quizzes with questions, answers and alternatives */ 
create table if not exists quizzes (
  id bigint not null auto_increment,
  question json,
  answer json,
  alternatives json,
  variant varchar(64) not null,
  created_time datetime not null,
  primary key (id)
);

/* feedback about the quizzes */ 
create table if not exists feedback (
  id bigint not null auto_increment,
  fingerprint varchar(128) not null, 
  quiz_id bigint not null,
  feedback varchar(64) not null,
  created_time datetime not null,
  primary key (id)
);