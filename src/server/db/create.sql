create database if not exists avocardo;
use avocardo;

create table if not exists answers (
  id bigint not null auto_increment,
  fingerprint varchar(128) not null, 
  question_id bigint not null,
  assesment varchar(64) not null,
  answered_time datetime not null,
  primary key (id)
);

create table if not exists quizzes (
  id bigint not null auto_increment,
  question json,
  answer json,
  alternatives json,
  variant varchar(64) not null,
  created_time datetime not null,
  primary key (id)
);