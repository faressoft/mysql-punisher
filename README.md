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
mysql-punisher -h <hostname> -u <username> -p <password>
```

or

```
mpun -h <hostname> -u <username> [-p <password>]
```

### Using PM2 (Recommended)

PM2 is a process manager for Node.js applications.

```
npm install -g pm2
pm2 start mysql-punisher -- -h <hostname> -u <username> -p <password>
pm2 startup
pm2 save
```

### Options

* --help **output usage information**
* -h, --host &lt;host&gt; **host name (default: 'localhost')**
* -u, --user &lt;user&gt; **user name (default: 'root')**
* -p, --password &lt;password&gt; **password (default: '')**
* -t, --timeout &lt;seconds&gt; **timeout in seconds (default: 30)**
* -i, --interval &lt;millisecond&gt; **timer's interval in millisecond (default: 1000)**
* --watch-database &lt;database&gt; **watch a specefic database processes (default: 'all')**
* --watch-host &lt;host&gt; **watch a specefic host's processes (default: 'all')**
* --watch-user &lt;user&gt; **watch a specefic user's processes (default: 'all')**

# License

This project is under the MIT license.
