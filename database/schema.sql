create extension if not exists "uuid-ossp";

create type user_role as enum ('admin', 'user', 'auditor');

create table users (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text unique not null,
  password_hash text not null,
  role user_role default 'user',
  
  login_attempts int default 0,
  lock_until timestamp, 
  
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);