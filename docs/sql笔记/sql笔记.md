USE 库名;在哪个数据库下执行

USE student;

别名，两种方式

select name AS 姓名;

select name 姓名;

去重distinct

select distinct department_id from employee;

字符拼接 concat

将两个字段拼接

select concat(name,age) as 总共 from student;

显示表结构

DESC 表名;

IFNULL(字段名称,替换的值);判断是否为null

条件运算符

```< 、>、 =、 <>、>=、<=```

逻辑运算符

```&&、|| ！```

```and、or、not```

模糊查询

```like、between and、in、is null```

```select * from student where name like '%浩%';百分号是通配符```

```select * from student where name like ' _ _ 浩 _ %'; _ 是顺序占位，可以转义"\\_"```

between and之间不能随意换顺序

```select * from student where age between 18 and 20```



in 判断某字段的值是否属于in列表中的某一项



<=>这个是安全等于=，能够进行=null判断

