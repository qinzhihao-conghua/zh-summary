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



```<=>```这个是安全等于=，能够进行=null判断



排序

select 查询列表 from 表 where 筛选条件 order by 排序列表 asc|desc

asc表示升序，desc表示降序，不写默认是升序

order by 子句中可以支持单个字段、多个字段、表达式、函数、别名

select * from employee order by age desc, score asc;

常用函数

length:返回字节长度

length('张三hhh');

concat：拼接字符串

select concat(last_name,'_',first_name) 姓名 from employee;

upper、lower 大小写转换

select concat(upper(lase_name),lower(first_name)) 姓名 from employees;

substr:字符切割

select substr('一二三四五'，3) 结果;四五

select substr('一二三四五'，1,3) 结果;一二三

instr:返回子串第一次出现的索引，如果找不到返回0

select instr('周瑜打黄盖，一个愿打一个愿挨','打') as 结果;3

trim:去掉前后空格或者指定字符

select trim(‘     测试‘      ) 结果; 测试

select trim(‘a’ from ‘aaaa测aa试aaaaa‘      ) 结果; 测aa试

lpad 左填充

select lpad('测试',10,'-');-------测试

rpad 又填充

select rpad('测试',10,'-');测试-------

replace 替换

select replace('一个愿打一个愿挨','一个','张三') 结果;张三愿打张三愿挨





