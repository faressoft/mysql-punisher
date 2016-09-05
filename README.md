# MySQL Punisher

[![npm](https://img.shields.io/npm/v/mysql-punisher.svg)](https://www.npmjs.com/package/mysql-punisher)
[![npm](https://img.shields.io/npm/l/mysql-punisher.svg)](https://github.com/faressoft/mysql-punisher/blob/master/LICENSE)

![Logo](/logo.png?raw=true)

Watch and kill active mysql queries that exeeded a specefic timeout.

# Needs
If you have a limited mysql connection pool and you are not sure if you may have unexpected queries that may take a really long time and allocate the pool for this time. So use the `mysql-punisher` to watch the exceeded execution time for the active query processes, killed them, log them and let your app work as expected for all end users.

# Installation

To use the mysql-punisher from you command line interface, you have to

```
npm install mysql-punisher -g
```

### Usage

```
mysql-punisher -h <hostname> -u <username> [-p <password>] -t <timeout> -i <interval>
```

or

```
mpun -h <hostname> -u <username> [-p <password>] -t <timeout> -i <interval>
```

### Options

* -h, --host <host> **host name**
* -u, --user <user> **user name**
* -p, --password <password> **password**
* -t, --timeout <seconds> **timeout in seconds**
* -i, --interval <millisecond> **timer's interval in millisecond**

# License

This project is under the MIT license.
