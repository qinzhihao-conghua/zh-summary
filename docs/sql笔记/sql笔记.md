---
title: sql笔记
---

```sql
-- 切换到哪个数据库
grant all on schema ds_sdms to ds_task_sdms;
-- 将视图授权给哪个用户
grant all on schema ds_task_hz to ds_task_sdms;
-- 加权限
grant all PRIVILEGES on table "v_onduty_xq" to dsecs;
-- 修改表，加字段
alter table 表名 add 字段名 varchar(100);
-- 修改表，删除字段
alter table 表名 drop column 字段名;
-- 插入数据
insert into 表名(mno,mname) values(1,'软件工程');
-- 删除数据
delete from 表名 where 要满足的条件;
-- 删除数据，有外键

--更新数据
update 表名 set 字段名=value where 要满足的条件;

--删除模式
DROP SCHEMA IF EXISTS 模式名称; 
--删除用户拥有的数据库对象
DROP OWNED BY db_mark_v1; 
--删除用户
DROP USER IF EXISTS 用户名称; 
--删除角色
DROP role IF EXISTS 角色; 
```

USE 库名;在哪个数据库下执行

```sql
USE student;
```

别名，两种方式

```sql
select name AS 姓名;
select name 姓名;
```

去重distinct

```sql
select distinct department_id from employee;
```

字符拼接 concat

```sql
--将两个字段拼接
select concat(name,age) as 总共 from student;
```

显示表结构

```sql
DESC 表名;
```

```sql
--判断是否为null
IFNULL(字段名称,替换的值);
```

条件运算符

```sql
< 、>、 =、 <>、>=、<=
<=>这个是安全等于=，能够进行=null判断
```

逻辑运算符

```sql
&&、|| ！
and、or、not
```

模糊查询

```sql
like、between and、in、is null
in 判断某字段的值是否属于in列表中的某一项
```

```sql
select * from student where name like '%浩%';百分号是通配符
```

```sql
select * from student where name like ' _ _ 浩 _ %'; _ 是顺序占位，可以转义"\\_"
```

between and之间不能随意换顺序

```sql
select * from student where age between 18 and 20
```

排序

```sql
--asc表示升序，desc表示降序，不写默认是升序
select 查询列表 from 表 where 筛选条件 order by 排序列表 asc|desc

--order by 子句中可以支持单个字段、多个字段、表达式、函数、别名
select * from employee order by age desc, score asc;
```

常用函数

```sql
--length:返回字节长度
length('张三hhh');

--concat：拼接字符串
select concat(last_name,'_',first_name) 姓名 from employee;

--upper、lower 大小写转换
select concat(upper(lase_name),lower(first_name)) 姓名 from employees;

--substr:字符切割
select substr('一二三四五'，3) 结果;四五
select substr('一二三四五'，1,3) 结果;一二三

--instr:返回子串第一次出现的索引，如果找不到返回0
select instr('周瑜打黄盖，一个愿打一个愿挨','打') as 结果;3

--trim:去掉前后空格或者指定字符
select trim('     测试      ') 结果; 测试
select trim('a' from 'aaaa测aa试aaaaa'      ) 结果; 测aa试

--lpad 左填充
select lpad('测试',10,'-');-------测试

--rpad 又填充
select rpad('测试',10,'-');测试-------

--replace 替换 结果;张三愿打张三愿挨
select replace('一个愿打一个愿挨','一个','张三') 
```

demo

```sql
--等值查询
select stu.*,sc.* from stu,sc where stu.sno=sc.sno
select * from stu,sc where stu.sno=sc.sno

select * from stu,sc where stu.sno=sc.sno and sc.cno='20201'

--多表查询
select * from stu,sc,cou where stu.sno=sc.sno and sc.cno=cou.cno

--左外连接
--保留左表内数据，进行两表连接
--查询所有学生的信息和选课信息，但是没有选秀的学生也要显示出来
select * from stu left outer join sc
on stu.sno=sc.sno
--查询每个专业的人数，假设每个专业都有人
select mno,count(sno) from stu group by mno having mno between 1 and 4
--查询每个专业的人数，但是有的专业可能没有人
--需要保留major表，左外连接
insert into major values(5,'test')
select major.mno,count(sno) from major left outer join stu
on major.mno=stu.mno
group by major.mno

--嵌套查询
--①不相关的嵌套查询（子查询不依赖父查询）
--查询选修'20201'的学生姓名sname
select sname from stu,sc where cno='20201' and stu.sno=sc.sno
select sname from stu where sno 
in (select sno from sc where cno='20201')

--选修'20202'的学生的姓名
--建议用in而不是=
--in	返回多个结果
--=		返回一个结果
select sname from stu where sno = (
select sno from sc where cno='20202')

--②相关嵌套查询（将连接放在子查询里面）
--查询选修'20201'学生的姓名sname
select sname from stu,sc where cno='20201' and stu.sno=sc.sno
select sname from stu where '20201' 
in (select cno from sc where stu.sno=sc.sno)
--查询选修了c语言课程的学生学号
select sno from cou,sc where cou.cno=sc.cno  and cou.cname='C语言'
select sno from sc where 'C语言' 
in (select cname from cou where sc.cno=cou.cno)
--查询每个学生超过他平均分的课程号 第二种方法用派生表实现
select sno,cno from sc x where grade
>(select avg(grade) from sc y group by sno having x.sno=y.sno)

select sno,cno 
from sc,(select sno,avg(grade) from sc group by sno) as avg_sc(avg_sno,avg_grade)
where sc.sno=avg_sc.avg_sno and grade>avg_grade

--带有exists
--查询选修'20201'学生的姓名
select sname from stu,sc where stu.sno=sc.sno and cno='20201'
select sname from stu where exists(
	select * from sc where cno='20201' and stu.sno=sc.sno
)
--返回true or false，每次取一个sno连接

--集合查询union并 intersect交 except
--查询年龄是18且mno=1的学生学号
select sno from stu where age=18 and mno=1
select sno from stu where age=18 intersect select sno from stu where mno=1
select sno from stu where age=18 except select sno from stu where mno!=1

--查询选修'20201'号课程或'20203'的学生学号
select distinct sno from sc where cno in('20201','20203')
select sno from sc where cno='20201' union select sno from sc where cno='20203'

```







