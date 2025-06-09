# SpringDataJPA-开篇

## 1.入门概念

### 1.1什么是JPA

JPA 是"Java Persistence Api"简称，中文译作"Java 持久化编程接口"，Java EE8开始重命名"JakartaPersistence Api";
JPA并不是一个框架而是一个规范，知名的 Hibernate 便是JPA的一个具体实现;Spring DataJPA是Spring框架提供的一种数据库访问的方式，是在 Hibermate 基础之上的封装实现

### 1.2为什么需要JPA

对比知名的 MyBatis(莲城的老李 MyBatis)，JPA优点表现在:

1. 自动生成SQL语句，减少了开发工作量
2. 与spring集成良好

3. JPA统一了不同数据库的访问方式，使得所采用的数据库可自由切换

总结:JPA适合快速开发、简单的CRUD操作的项目

引入lombok 依赖

```java
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>
```


## 2.2 application.yml
数据源配置

```yaml
spring:
    # 数据源
    datasource: 
    driver-class-name: com.mysql.cj.jdbc.Driver
    url:jdbc: mysql://localhost:3306/jpa_db
	username: root
    password: 123456
    type: com.alibaba.druid.pool.DruidDataSource
```

2.3创建库表

```sql
--使用jpa_db数据库
use jpa_db;
--删除已存在的库表
drop table if exists tbl_deposit;
--创建存款类型表(tbl_deposit)
create table tbl_deposit
(
    saving_id int not null auto_increment comment'存款类型id',
    saving_name varchar(20) not null comment'存款类型名',
    descrip varchar(20) comment'存款类型描述',
    primary key(saving_id)
)
--存款类型表(tbl_deposit)测试数据
INSERT INTO tbl_deposit(saving_name,descrip) VALUES('活期','按存款日结算利息');
INSERT INTO tbl_deposit(saving_name,descrip) VALUES('定期一年','存款期是1年');
INSERT INTO tbl_deposit(saving_name,descrip) VALUES('定期二年','存款期是2年');
INSERT INTO tbl_deposit(saving_name,descrip) VALUES('定期三年','存款期是3年');
INSERT INTO tbl_deposit(saving_name) VALUES('定活两便');
INSERT INTO tbl_deposit(saving_name,descrip) VALUES('零存整取一年','存款期是1年');
INSERT INTO tbl_deposit(saving name,descrip) VALUES('零存整取二年','存款期是2年');
INSERT INTO tbl_deposit(saving_name,descrip) VALUES('零存整取三年','存款期是3年');
INSERT INTO tbl_deposit(saving_name,descrip) VALUES('存本取息五年','按月支取利息');
--查看表
select *from tbl_deposit;
```

## 2.4创建实体类

此处仅描述"用户实体类"的创建，作入门举例。

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tbl_deposit")
public class Deposit{ //未指定name属性，默认的表名是类名(小写)
    @Id
    @Column(name = "saving_id")
    private Integer savingId; //存款类型id
    @Column(name ="saving_name")
    private string savingName; //存款类型名
    private string descrip; //存款类型描述
}
```

注意事项:

1. @Entity 注解用于标识 Java 实体类与数据库表的映射关系，name 属性用于标识库中的表名。不指定则使用实体类名(小写)作为表名进行映射;

2. @Id 注解用于标识表的主键与实体的哪个屈性产生映射关系;
3. @Column 注解用于标识表的字段与实体属性的映射关系，name 属性用于标识表的字段名;
4. SpringDataJPA 无需任何配置自动完成从下划线到驼峰命名的转换。

## 2.5 自定义JPA操作接口

这里的操作接口，对等的概念就是 MyBatis 的 mapper 接口，JPA 习惯保存于"repository"包。

```java
/**
 * 用户Repository
 */
public interface UserRepository extends JpaRepository<user,Integer>{}
```

注意事项
1.JpaRepository 接口是 Spring Data JPA 提供的接口,可帮助快速地对数据库进行增删改查操作，通常会成为自定义JPA接口的父接口;

2.JpaRepository 接口指定的第一个泛型表示实体类的类型，第二个泛型表示实体类主键的类型;

3.@Column 注解用于标识表的字段与实体属性的映射关系，name 属性用于标识表的字段名;

4.JpaRepository 接口的默认实现类 SimpleJpaRepository 中的 EntityManager 负责处理实体与数据库之间的交互。

# SpringDataJPA-反向建表

## 1.什么是反向建表

正向建表：在数据库中使用 SQL命令或工具菜单创建表，供Java程序访问与操作

```sql
--创建银行卡信息表(tbl_cardinfo)
create table tbl cardinfo
(
    card_id varchar(50) not null comment '卡号',
    saving_id int comment'存款类型id',
    cust_id int comment'用户id',
    cur_value varchar(10) not null default 'RMB' comment '币种',
    open_date datetime not null default CURRENT_TIMESTAMP comment '开户日期',
    open_money decimal(12,2) not null comment '开户金额',
    balance decimal(12,2) not null comment '当前余额',
    pass char(50) not null comment '密码',
    is_reportloss bit not null default 0 comment '是否挂失',
    primary key(card_id)
)
```


反向建表：在Java程序中创建与表映射的实体类，启动时自动在数据库中创建表格

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
    public class Card{
    private Integer cardId;
    private Integer savingId;
    private Integer custId;
    private String curValue;
    private Date openDate;
    private Double openMoney;
    private Double balance;
    private String pass;
    private Boolean isReportloss;
}
```

## 2.反向建表相关注解

### 2.1 @Entity

作用：让 JPA 知晓这是一个和数据表映射的实体类常用属件:
name：实体类名，缺省则默认为实体类名单词的全小写形式。

### 2.2 @Table

作用：指定和哪个表映射
常用属性：
name：表名，缺省则表名默认为@Entity注解的name

### 2.3 @Column

作用：指定实体属性和表字段的映射
常用属性:

1. name：字段名，缺省则默认字段名为实体屈性名(全小写+下划线)
2. nullable：字段可允许null，默认true
3. unique：字段唯一标记，默认false
4. length：字段长度，当字段的类型为varchar时，该属性才有效，默认为255个字符
5. precision和scale：表示精度，当实体属性类型为BigDecimal时，precision表示总长度(默认38)，scale表示小数点的位数(默认2)，注意scale属性不支持实体属性类型Double与Float。
6. columnDefinition：字段定义，包含类型、长度、默认值和注释等等，类比建表的sq1中字段定义的部分

## 2.4@Id

作用：指定作为主键的实体属性

## 2.5 @GeneratedValue

作用：指定作为自增列的实体属性

## 3.反向建表的启动配置

除了上述各注解配置好以外，反向建表还需要在application.yml文件中配置启动选型:

```yaml
spring:
    # JPA配管
    jpa :
        hibernate:
        # create - 每次运行都会先删除表，然后新建(表数据每次清空)
        # update - 每次运行都会先检查，无表会新建表，有表则更新表
        # create-drop - 运行时采用create方式，结束运行后自动drop表
        ddl-auto: update
```

## 4.查看SQL语句
可以在application.yml文件中配置 SpringDataJPA 执行操作时显示对应的SQL命令

```yaml
spring:
    # JPA配置
    jpa :
        # 显示SQL命令
        show-sql:true
```

## 5.创建表索引

在前面 @Table 注解中，包含一项属性 indexes 用于创建表格索引

```java
@Table(name ="tbl_cardinfo",indexes={
    @Index(name = "custId index",columnList = "custId,openDate desc"),
})
```

注意:name指定索引名字，columnList指定索引列，asc、desc指定排序规则。

# SpringDataJPA-动态更新

## 1.save方法

SpringDataJPA 中使用 save()方法实现数据的新增和更新，源码分析如下:

```java
@NoRepositoryBean
public interface CrudRepository<T, ID> extends Repository<T, ID>{
    <S extends T>s save(S entity);
    // ... 其他方法<略>
}
```

Repository继承情况

```
CrudRepository 接口
	ListCrudRepository 接口
		JpaRepository 接口
			simpleJpaRepository实现类
```

SimpleJpaRepository 实现类中对 CrudRepository 父接口的 save()方法实现如下:

```java
@Transactiona1
@0verride
public <s extends T>s save(s entity){
    //实体的非空校验
	Assert.notNull(entity,"Entity must not be null");
    //如果查询实体是一个全新的实体
    if(entityInformation.isNew(entity)){
        // 执行新增
		entityManager.persist(entity);
        return entity;
    }else {
        //执行合并(更新)
        return entityManager.merge(entity);
    }
}
```

总结：默认情况，save()执行的是一种全量更新

## 2.局部更新

区别于save()的全量更新，局部更新指的是按自定义的 SQL语句去更新，在自定义SQL,命令中指定需要更新的字段。

### 2.1自定义更新方法

```java
/**
 * 根据存款类型Id修改存款类型名
 * @param savingld 存款类型Id
 * mparam savingName 存款类型名
 * @return 受影响行数
 */
int updateDeposit(Integer savingId,String savingName);
```

### 2.2 @Query注解

作用:自定义操作方法的SQL命令

语法:

```java
@Query(value ="JPQL命令或者SQL命令",nativeQuery = true|false(*))
```

注意事项：
1. JPQL全称Java Persistence Query Language，中文详作"Java持久化查询语言"

2. nativeQuery设置true，代表使用原生SQL命令，否则使用JPQL命令，默认值false
3. 如果执行 update 或 delete 命令，还需搭配 @Modifying 注解，否则出现"Statement,executeQuery()cannot issue statements.."
4. 如果执行 update 或 delete 命令，还需搭配 @Transactional 注解，因为jpa要求没有事务支持，不能执行更新和制除操作

问题:
借助自定义操作方法实现了局部更新，但被更新字段需要明确的指定，适合于确定的更新场景。如果被更新的字段无法明确指定，这种方式就不适合了。

## 3.动态更新

所谓动态更新，就是可根据被更新的字段，动态的生成update指令，主要体现在 set 子句部分

```sql
--更新 savingName
update tbl_deposit set saving_name=? where saving id=?
--更新 savingName 和 descrip
update tbl_deposit set saving_name=?, descrip=? where saving_id=?
```


### 3.1 @DynamicUpdate

作用:让 save()方法支持动态更新
类型:类级别的注解
实现原理:找出字段原值与本次更新的属性值的差异、将有差异的字段进行更新，没有差异的字段不做更新
问题:
某些允许Null的字段，在编码时因不想更新而忽略了set方法，实际结果是该字段原值被Null覆盖

### 3.2完善动态更新

首先，以数据库中找出待更新实体的原值

```java
Optional<Deposit> optional = depositRepository.findById(deposit.getsavingId());
optional.ifPresentOrElse(
    optionalDeposit->{
        //后续的修改操作。。。
    },
	()>system.out.println("未查找!")
);
```

接着，找出待更新的实体对象中，哪些屈性忽略了set方法的设置

```java
Beanwrapper wrapper =new BeanwrapperImpl(deposit);
String[] isNullProperties = Stream.of(wrapper.getPropertyDescriptors())
       .map(PropertyDescriptor::getName)
       .filter(propertyName>wrapper.getPropertyValue(propertyName)== nu1l)
       .toArray(String[]::new);
```

然后，把待更新的实体对象中非Null的属性值复制给数据库中找到的实体

```java
BeanUtils.copyProperties(deposit,optionalDeposit,isNullProperties);
```


最后，使用 save()方法实现更新，参数注意使用数据库中找到的实体

# SpringDataJPA-删除表数据

## 1.常规删除操作

### 1.1 按ID删除

按对象Id删除，直角调用 deleteByld()方法进行删除，是使用最为频繁的删除方式

```java
Integer id = 9;
depositRepository.deleteById(id);
```

### 1.2 按对象删除

按对象删除，通常会根据Id 事先查询出待删除对象，然后调用 delete()方法进行删除

```java
Integer id = 9;
Optional<Deposit> optional = depositRepository.findById(id);
optional.ifPresentorElse(
	deposit-> depositRepository.delete(deposit),
    ()-> System.out.println("未找到!")
)
```

### 1.3全表删除

```java
deleteAll()
deleteAlInBatch()
```

deleteAll()首先通过 findAll()查找所有需要删除的实体对象，然后逐条删除并提交事务，这意味着它会执行多条SQL语句米完成删除操作。这种方式虽然简单，但效率相对较低，因为它涉及到多次数据库交互和事务提交。

deleteAllInBatch()则只执行一条S0L语句来制除所有实体对象，这意味着它通过一条命令完成所有实体的删除，从而大大减少了数据库交互的次数，提高了制除操作的效率。这种方式更适合于需要大量删除操作的情况，因为它能够显普减少数据库负载和提高性能。

## 2.批量删除操作

批量删除语句不同的删除条件，又分成:

### 2.1按ID批量删除

```java
Iterable<Integer> ids = Arrays.asList(1,2,3,4);
depositRepository.deleteAllById(ids);// where id =?
depositRepository.deleteAllByIdInBatch(ids); // where id in (?,?,?,?)
```

### 2.2 按对象集合批量删除

```java
Iterable<Integer> ids =Arrays.asList(1,2,3,4);
List<Deposit> depositList = depositRepository.findAllById(ids);
depositRepository.deleteAll(depositList);//where id = ?
depositRepository.deleteAllInBatch(depositList);// where id =? or id = ?
```

## 3.自定义删除操作

当前面所讲解的删除接口无法满足实际开发需求时，可以自定义删除

## 3.1自定义删除方法

这里谈到的自定义删除SQL，需要使用 @Transactional+ @Modifying+ @Query 三个注解搭配完成

```java
/**
 * 存款类型的Repository
 */
@Transactional
public interface DepositRepository extends JpaRepository<Deposit, Integer>{
    @Modifying
    @0uery(value= "delete from tbl_deposit where saving_name like %:like%", native0uery =true)
	int deleteByCustermize(String like);
}
```





## 3.2 声明式删除方法

SpringDataJPA提供了一种声明式的删除方法，允许开发者通过方法名来定义删除逻辑。方法底层的SQL语句由Spring Data JPA 自动生成，要求方法名需要以delete或remove开头。

```
1.deleteByXxx:删除Xxx属性等于某个指定值的数据
2.deleteByXxxNot:删除Xxx属性不等于某个指定值的数据

3.deleteByXxxLessThan(Equal):删除Xxx属性值小于(等于)某个指定值的数据
4.deleteByXxxGreaterThan(Equal):删除Xxx属性值大于(等于)某个指定值的数据，
5.dleleteByXxxBetween:根据Xxx属性值的范围删除数据

6.deleteByXxxLike:删除Xxx属性值模糊匹配某个指定值(%值%)的数据
7.deleteByxxxNotLike:册除Xxx属性值模糊匹配某个指定值以外的数据

8.deleteByXxxIsNu11:册除Xxx属性值为Null的数据
9.deleteByXxxIsNOtNu11:删除Xxx属性值不为Null的数据

10.deleteByXxxIn:删除Xxx属性值在某个集合中的数据
11.deleteByXxxNotIn:删除Xxx属性值不在某个集合中的数据

12.deleteByXxxAndYyy:根据Xxx属性值和Yyy属性值删除数据
13.deleteByxxx0rYyy:根据Xxx属性值或Yyy属性值删除数据
```


注意:上述所有自定义的删除方法，均需要与 @Transactional+ @Modifying 两个注解搭配使用

# SpringDataJPA-逻辑删除

## 1.逻辑删除

### 1.1表结构的更改

前面的讲解中，所使用的数据表结构

| 字段名      | 说明         | 备注       |
| ----------- | ------------ | ---------- |
| saving_id   | 存款类型id   | 自增、主键 |
| saving_name | 存款类型名字 | 非空       |
| descerip    | 存款类型描述 | 允许空     |

本集对表结构进行更改，添加逻辑删除的标记字段"is_deleted"

| 字段名      | 说明         | 备注                     |
| ----------- | ------------ | ------------------------ |
| saving_id   | 存款类型id   | 自增、主键               |
| saving_name | 存款类型名字 | 非空                     |
| descerip    | 存款类型描述 | 允许空                   |
| is_deleted  | 是否已删除   | 0-未删除，默认；1-已删除 |

相应地，程序中的实体类也要添加属性"isDeleted"

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name ="tbl_deposit")
public class Deposit{
    @Id
    @Generatedvalue(strategy = GenerationType.IDENTITY)
    private Integer savingId;//存款类型id
    private string savingName;//存款类型名
    private string descrip;//存款类型描述
    private Boolean isDeleted;//逻辑删除标记(默认false)
}
```

## 1.2 @SQLDelete

作用：将 SpringDataJPA 自动生成的删除语句替换为自定义的语句

类型：TYPE,FIELD,METHOD

```java
@SQLDelete(sql ="update tbl deposit set is deleted=1 where saving_id=?")
public class Deposit{
    @Id
    @GeneratedValue(strategy= GenerationType .IDENTITY)
    private Integer savingId;//存款类型id
    private string savingName;//存款类型名
    private string descrip;//存款类型描述
    private Boolean isDeleted://逻辑删除标记(默认false) 
}
```

## 1.3 测试逻辑删除

```java
//CrudRdpository-> deleteById(id)
depositRepository.deleteById(1):
//crudRepository-> delete(entity)
depositRepository.delete(depositRepository.findById(1).get());
// CrudRepository-> deleteAl1()
depositRepository.deleteAll();
//CrudRepository-> deleteAllById(ids)
depositRepository.deleteAllById(Arrays.asList(1,2,3,4));
//CrudRepository> deleteAll(entities)
depositRepository.deleteAll(depositRepository.findAll());
//声明式删除
depositRepository.deleteBySavingNameAndDescrip("存本取息五年","按月支取利息");
```

## 2.物理删除

如果是开发者自定义SQL删除，还是会执行物理删除，这时候会将数据真正从数据表中清理掉。

### 2.1 自定义SQL删除

```java
@Modifying
@Query(value = "delete from tbl_deposit where saving_id=%:savingId%", nativeQuery =true)
int deleteBysavingId(Integer savingId);
```


对于批量删除操作(InBatch方法)，是为了高效地处理大量数据的物理删除，而不是逻辑删除。

### 2.2 InBatch删除

```java
depositRepository.deleteAllInBatch();
depositRepository.deleteAllByIdInBatch(Arrays.asList(1,2,3 4));
depositRepository.deleteAllInBatch(depositRepository.findAll());
```

## 3.逻辑删除的影响

这里所讲的删除删除影响，指的是逻辑删除对查询操作、修改操作、甚至对于删除操作本身都会有影响。这些影响集中体现在被逻辑删除的记录不应再被查询、被修改和被删除了。

### 3.1对查询的影响

被逻辑删除的记录，使用查询操作时不应该查询出来，对应的查询命令要添加"限制条件"

```sql
--查询全表
select *from tbl_deposit
--查询全表
select *from tbl_deposit where is_deleted = 0
```

通过 @SQLRestriction 注解可在 SpringDataJPA 自动生成的查询语句上添加"限制条件"

```java
@SQLRestriction("is_deleted = 0")
public class Deposit{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer savingId;//存款类型id
    private String savingName;//存款类型名
    private string descrip;//存款类型描述
    private Boolean isDeleted;//逻辑删除标记(默认false)
}
```

## 3.2 对修改的影响

记录行逻辑删除之前可正常修改;一旦某些记录被逻辑删除了，理论上来说是不可再修改了;

但实际上 SpringDataJPA 并不会阻止对已逻辑删除的记录再次修改(例如:撤销删除)，只是结果会变成新增记录。

```java
//逻辑删除 id =9 的记录行
depositRepository.deleteById(9);
//对 id= 9 的记录撤销删除
Deposit deposit = new Deposit(9,"存本取息五年","按月支取利息",false);
depositRepository.save(deposit);
```

如果需要撤销删除，可以使用自定义SQL去实现

```java
@Modifying
@Query(value = "update tbl_deposit set is_deleted=0 where saving_id=:savingId",nativeQuery =true)
int cancelDeletedById(Integer savingId);
```

## 3.3 @PreRemove

当一个实体被删除之前，会调用被 @PreRemove 注解标记的方法

```java
public class Deposit{
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Integer savingId;//存款类型id
    private String savingName;//存款类型名
    private String descrip;//存款类型描述
    private Boolean isDeleted;//逻辑删除标记(默认false)
    @PreRemove
    public void deleteDeposit(){
        this.isDeleted = true;//逻辑删除字段状态的变更(false变true)
    }
}
```


由于 @SQLDelete 注解的原理是对默认的 delete 命令进行替换，因此 SpringDataJPA并不知道操作实体的相应字段发生了改变，除非 flush 到数据库中，否则这样的"不知情"状态会一直保持在当前会话之中。为避免带来负面影响，可通过上面的 @PreRemove 注解，提前更新实体的字段状态。

# SpringDataJPA-查询表数据

## 1.查询方式分类

SpringDataJPA 提供了四种查询的方式，分别是

1. 继承 JpaRepository 接囗
2. 使用 JPQL 实现查询
3. 使用原生 SQL 实现查询
4. 使用"声明式"方法实现查询

## 2.继承JpaRepository 接口

只需要开发自定义的数据访问层接口，实现对JpaRepository 接口的继承。这种方式也是使用频率最高的

```java
/**
 * 用户信息的Repository<实体类型，实体类主键类型>
 */
public interface UserRepository extends JpaRepository<User, Integer> {
}
```

```java
/**
 * 根据实体类的ID获取实体的引用，而不是立即加载实体
 * 方法返回一个实体的代理对象,当实际访问实体属性时，代理对象才真正加载实体(懒加载机制)
 */
T getReferenceById(ID id):
```

SpringDataJPA 的"懒加载机制"需要事务的支持，以确保数据的一致性和完整性:

```java
@Transactional
@Test
public void testJpaRepository(){
	User user = userRepository.getReferenceById(1);
    System.out.println("user ="+ user);
}
```

```yaml
spring:
    # JPA配置
    jpa:
        properties:
            hibernate:
                #允许没有事务的懒加载，不要在生产环境中使用!
                enable_lazy_load_no_trans:true
```

JpaRepository 接口本身继承了三个父接口，分别是:

1. ListCrudRepository接口：在CrudRepository接口基础上扩展了一些特定于列表的方法。
2. ListPagingAndsortingRepository接口：一个用于支持分页和排序功能的接口。
3. QueryByExampleExecutor接口：简称QBE接口，根据查询条件(Example对象)来执行复杂的查询操作。

### 2.1 ListCrudRepository接口

ListCrudRepository的父接口是 CrudRepository，在 CrudRepository父接口中查询相关的方法包括

```java
//查询全部实体集合
Iterable<T> findAll()-> List<T> findAll();
//根据ids查询实体集合
Iterable<T> findAllById(Iterable<ID> ids)-> List<T> findAllById(Iterable<ID> ids)
//根据id查询单个实体(定义在父接口crudRepository中)
0ptional<T> findById(ID id):
//根据id查询单个实体是否存在(定义在父接口crudRepository中)
boolean existsById(ID id);
```

### 2.2 ListPagingAndSortingRepository接口

ListPagingAndSortingRepository 的父接口是 PagingAndSortingRepository，在父接口中查询相关的方法包括

```java
//排序查询全部实体集合
Iterable<T> findAll(Sort sort);-> List<T> findAll(Sort sort);
// 分页查询(本集暂不讨论)
Page<T> findAll(Pageable pageable);
//按照实体属性cusId(不是表字段)降序
Sort sort1 = Sort.by(sort.Direction.DESC,"cusId");
//按照实体属性cusName(不是表字段)升序
Sort sort2 = Sort.by(sort.Direction.ASC,"cusName" );
//按照sort1(主)、sort2(从)联合排序
Sort sort=sort1.and(sort2);
```

### 2.3 QueryByExampleExecutor接囗

QueryByExampleExecutor接口用于按特定的示例条件实现数据查询。
这个接口的方法与"动态查询"的主题关联，将会在后面的视频中去讲解实现，本集不讨论。

```java
public interface QueryByExampleExecutor<T>{
    //根据示例查询条件，查找单个对象(返回多个对象引发异常)
    <S extends T> optional<S> findOne(Example<S> example);
    //根据示例查询条件，查找多个对象
    <S extends T> Iterable<S> findAll(Example<S> example);
    //根据示例查询条件，查找多个对象并排序显示
    <S extends T> Iterable<S> findAll(Example<S> example, Sort sort);
    //根据示例查询条件，查找多个对象并分页显示
    <S extends T> Page<s> findAll(Example<s>example, Pageable pageable);
    //根据示例查询条件，查找符合条件的对象个数
    <S extends T> long count(Example<S> example);
    //根据示例查询条件，查找对象是否存在
    <S extends T> boolean exists(Example<S> example);
    //根据自定义查询函数执行复杂查询
    <S extends T,R>R findBy(Example<s> example...
}
```

# 3.使用JPQL实现查询

## 3.1什么是JPQL

定义：JPQL的全称是"Java Persistence Query Language"，中文译作"]ava持久化查沟语言"。这是一种以面向对象的方式操作数据库的语言。
原理：JPQL的特征与原生SQL语句类似，但完全面向对象，通过类名和属性访问，而不是使用表名和表的字段。这种语言最终会被编译成针对不同底层数据库的SQL查询，从而屏蔽了不同数据库之间的差异。
注意：JPQL 不支持使用INSERT，对于 UPDATE、DELETE操作，必须使用注解@Modifying。

## 3.2定义JPQL查询方法

查询"湖南"的用户列表

```java
@Query(value = "from User where cusAdd like %:address%")
List<User> getUserListByAddress(String address);
```

注意事项:

```java
from 实体名。实体类的名字参照 @Entity(name=“实体名”)
where 属性名。属性名参照实体类中的属性命名
```

## 4.使用原生 SQL实现查询

```java
@Query(value = "select * from tbl_userinfo where cus_add like %:address%",nativeQuery =true)
List<User> getUserListByAddress(string address);
```

注意事项:

```
value中的语句采用原生sq1
设置 nativeouery = true
```

## 5.使用"声明式"方法实现查询

声明式杏询方法，仅需方法名字按指定规范，方法所采用的SQL命令会自动构建
查询方法以find或者get开头，其余规则如下:

```java
findByXxx:查询Xxx屈性等于某个指定值的数据
findByXxxNot:査询Xxx属性不等于某个指定值的数据
    
findByXxxLessThan(Equal):查询Xxx属性值小于(等于)某个指定值的数据
findByxxxGreaterThan(Equal):查询Xxx属性值大于(等于)某个指定值的数据
findByXxxBetween:根据Xxx屆性值的范围查询数据
    
findByXxxLike:查询xxx届性值模湖匹配某个指定值(%值%)的数据
findByXxxNotLike:查询Xxx屆性值模糊匹配某个指定值以外的数据
    
findByXxXISNull:香询xxx届性值为Null的数据
findByXxxIsNotNull:查询Xxx属性值不为Null的数据
    
findByXxxIn:查询xxx屈性值在某个集合中的数据
findByXxxNotn:查询Xxx属性值不在某个集合中的数据
    
findByXxxAndYyy:根据Xxx屆性值和Yyy居性值查询数据
findByXxx0rYyy:根据Xxx属性值或Yyy属性值查询数据
```

# SpringDataJPA-动态查询

## 1.动态查询的含义

在进行数据库查询时，我们通常会遇到两种类型的查询：静态查询和动态查询。静态查询是指在编译时确定的查询，而动态查询则是在运行时构建的查询。例如:

```sql
--根据部门查询员工列表
select * from emp where deptNo = ?
--根据部门、年酸查询员工列表
select * from emp where deptNo= ? and empAge > ?
--根据部门、年龄和入职日期查询员工列表
select * from emp where deptNo = ? and empAge > ? and empJoinData > ?
```

## 2.QueryByExampleExecutor接口

### 2.1接口概述

QueryByExampleExecutor 接口用于按特定的"示例条件"实现数据的查询，通常也简称为"QBE"查询。
接口中声明了7个方法，如下:

```java
public interface QueryByExampleExecutor<T>{
    // 查找单个对象(返回多个对象引发异常)
    <s extends T> optional<S> findone(Example<S> example);
    // 查找多个对象
    <S extends T> Iterable<S> findAll(Example<S> example);
    // 查找多个对象并排序显示
    <S extends T> Iterable<S> findAll(Example<S> example, Sort sort);
    // 查找多个对象并分页显示
    <S extends T> Page<S> findAll(Example<S> example, Pageable pageable);
    //统计符合条件的对象个数
    <S extends T> long count(xample<S> example);
    //查找符合条件的对象是否存在
    <S extends T> boolean exists(Example<S> example);
    //根据自定义查询函数执行查询
    <S extends T,R> R findBy(Example<S> example,Function<FluentQuery.FetchableFluentQuery<S>，R>queryFunction);
}
```

"QBE"查询的三要素

1. 封装查询条件的实体：当前被查询的数据表映射的实体对象，根据属性值是否NuLL决定查询的字段
2. ExampleMatcher：查询示例的匹配器，提供的匹配API包括matching()、matchingAny()等等
3. 封装1和2的Example对象：通过Example.of(Bean,ExampleMatcher)构建Example对象

## 2.2基本使用

1.精确查询

```java
//1.构建(封装了查询条件的)实体
User searchUser =new User();
searchUser.setCusId(1)
//2.构建Example对象
Example<user> example = Example.of(searchuser,ExampleMatcher .matching());
//3.执行查询
List<User> userList = userRepository.findAll(example);
```

2.区分大小写的查询默认情况下，MySql是不区分大小写的，如果需要指定某个表区分大小写，如下:

```sql
create table tbl_userinfo
(
	--字段定义<略>
)collate utf8mb4_bin;--区分大小写的字符集 utf8mb4_bin

```

实现所有属性都不区分大小写的查询

```java
Example<User> example = Example.of(searchUser,ExampleMatcher.matching().withIgnoreCase());
```

实现指定属性不区分大小写的查询

```java
ExamplecUser> example = Example.of(searchUser.ExampleMatcher.matching().withIgnoreCase("cusName"));
```

3.模糊查询

```java
// 包含指定字符串的模糊査询
Example<User> example = Example.of(searchUser,ExampleMatcher.matching().withStringMatcher(ExampleMatcher.stringMatcher.CONTAINING));
//指定字符中开头的模糊查询
Example<User> example= Example.of(searchUser,ExampleMatcher .matching().withStringMatcher(ExampleMatcher.StringMatcher.STARTING));
//指定宁符串结尾的模糊查询
Example<User>example= Example,of(searchUser, ExampleMatcher.matching().withstringMatcher(ExampleMatcher.stringMatcher.ENBING));
```

注意:不指定 withStringMatcher()时默认精确匹配

4.Null 值属性作为查询条件
在 searchUser 对象中值为 Null 的属性，可控制(不)出现在查询的条件中。

```java
//忽略NULL值的居性(默认)
Example<User> example = Example.of(searchUser,ExampleMatcher.matching().withIgnoreNullvalues());
//NULL值居性作为查询条件
Example<User> example = Example.of(searchUser, ExampleMatcher .matching().withIncludeNullvalues());
```

5.忽略指定的屈性不作为查询条件

在 searchUser 对象中的属性，可排除在查询的条件外。

```java
//忽路cusName属性
Example<User> example= Example.of(searchUser,ExampleMatcher .matching().withIgnorePaths("cusName"));
```

6.Null值查询

```java
//1.构建(封装了查询条件的)实体
User searchUser=new User();
searchUser.setCusAdd(null);
//2.构建Example对象
Example<User>example = xample.of(searchUser, ExampleMatcher.matching().withIncludeNullValues().withIgnorePaths(JPAUtils.isNullProperties(searchUser,"cusAdd" )));
//注:JPAUtils.isNullProperties(searchUser,"cusAdd")用于忽略其他null的属性查询条件
```

## 2.3动态查询

动态查询的条件，在 QueryByExarmpleExecutor 接口中可通过如下两种方式连接起来

```markdown
or -> ExampleMatcher.matchingAny()
and -> ExampleMatcher.matching()、ExampleMatcher.matchingAll()
```

```java
//1.构建(封装了查询条件的)实体
User searchUser=new User();
searchUser.setCusName("andy");
searchUser.setCusAdd("湖南长沙");
//2.构建Example对象
Example<user> example = Example.of(searchuser,ExampleMatcher.matching());
//3.执行查询
List<User> userList = userRepository.findAll(example);
```

动态查询的条件，还可分别指定匹配的方式，然后再使用 or、and 连接起来

```java
//1.构建(封装了查询条件的)实体
User searchUuser=new User();
searchUser.setCusId(1):
searchUser.setCusName("andy" );
searchUser.setcusAdd("湖南");
//2.构建Example对象
Example<User> example = Example.of(
    searchUser,
    ExampleMatcher.matching()
    .withMatcher("cusId",matcher -> matcher.exact())
    .withMatcher("cusName",matcher -> matcher.exact())
    .withMatcher("cusAdd",matcher -> matcher.contains())
);
//3.执行查询
List<User> userList = userRepository.findAll(example):
```

## 2.4接口小结

"QBE"查询的优点:

1. 适合字符串类型的查询匹配(精确匹配、模糊匹配)
2. 简单易用，学习成本低。通过修改实体的屈性即轻松实现"动态查询"
3. 不需要写复杂的SQL或者JPQL查询，减少了对查询语言的依赖

"QBE"查询的不足:

1. 不适合数字类型的大小比较```(>、<、>=、<=)```
2. 不适合 ```between...and、in、is null``` 等形式的查询
3. 常用来处理简单的查询，不支持复杂的连接查询、嵌套查询、分组查询等

## 3.JpaSpecifcationExecutor接口

## 3.1接口概述

JpaSpecificationExecutor是 Spring DataJPA 提供的一个接口，它允许执行复杂的查询逻辑，特别是基于Specification 的动态查询。

```java
public interface JpaspecificationExecutor<T>{
    // 查找单个对象(返回多个对象引发异常)
    0ptional<T> findone(specificationsT> spec);
    // 查找多个对象
    List<T> findAll(specification<T> spec);
    // 查找多个对象并排序显示
    List<T> findAll(Specification<T> spec, Sort sort);
    // 在找多个对象并分贞显示
    Page<T> findAll(Specification<T> spec, Pageable pageable);
    // 统计符合条件的对象个数
    long count(Specification<T> spec);
    // 查找符合条件的对象是否存在
    boolean exists(Specification<T> spec);
    // 根据自定义查询函数执行查询
    <S extends T,R> R findBy(Specification<T> spec,Function<FluentQuery.FetchableFluentQuery<S>,R>queryFunction);
    // 删除符合条件的对象
    long delete(Specification<T> spec);
}
```

Specification 接口未提供默认实现的方法 toPredicate(root,query,criteriaBuilder)，源码如下:

```java
//root:查询的根对象(root可访问实体的属性)
//CriteriaQuery:顶层查询对象，自定义查询方式(了查询)//criteriaBuilder:查询的构造器，封装了很多的查询的操作(equa1、like、lt、gt、….)
Predicate toPredicate(Root<T> root, CriteriaQuery<?> query, CriteriaBuildercriteriaBuilder);
```

toPredicate()方法中的第2、第3个参数的类型都与"Criteria(标准)"有关，这种基于"Criteria"去构建条件的查询，通常也简称为"QBC(QueryByCriteria)"查询。
自定义的数据访问接口继承JpaSpecificationExecutor 接口示例:

```java
/*
 * 用户的Repository
 */
public interface UserRepository extends JpaRepository<User,Integer>,JpaSpecificationExecutor<User>{
    
}
//注意:必须继承父接口 JpaRepository，否则无法注入 UserRepository 的 Bean 对象
```

## 3.2基本使用

先从最基本的查询开始:

```java
// 1.构建 specification(匿名内部类)
Specification<User> specification = new Specification<User>(){
    @Override
    public Predicate toPredicate(Root<User> root, CriteriaQuery<?> query, CriteriaBuilder cb){
        return cb.equal(root.get("cusId"),1);
    }
};
//2.执行查询
List<User> userList = userRepository.findAll(specification);
```

更多的查询示例:

```java
// cusAdd like'%湖南%
cb.like(root.get("cusAdd")，"%湖南%");
// cusId !=1
cb.not(cb.equal(root.get("cusId"),1));
cb.equal(root.get("cusId"),1).not();
// cusId < 3
cb.lessThan(root.get("cusId"),3);
cb.lt(root.get("cusId"),3);
// cusId >1
cb.greaterThan(root.get("cusId"),1);
cb.gt(root.get("cusId"),1);
//cusId <= 3
cb.lessThanOrEqualTo(root.get("cusId"),3);
cb.le(root.get("cusId"),3);
//cusId >= 3
cb.greaterThanOrEqualTo(root.get("cusId"),3);
cb.ge(root.get("cusId"),3);
//cusId >= 1 and cusId <= 3
cb.between(root.get("cusId"),1,3);
//cusId in(1,2,3)
cb.in(root.get("cusId")).value(Arrays.asList(1,2,3));
//cusAdd == nul1
cb.isNull(root.get("cusAdd"));
// cusAdd != nul1
cb.isNotNull(root.get("cusAdd"));
//isDeleted == false
cb.isFalse(root.get("isDeleted"));
// isDeleted == true
cb.isTrue(root.get("isDeleted"));
```

## 3.3动态查询

动态查询的条件，在JpaSpecificationExecutor接口中可通过如下式连接起来

```java
//1.构建(封装了查询条件的)实体
User userParam =new User();
userParam.setCusId(1);
userParam.setCusName("andy" );
userParam.setCusAdd("湖南");
//2.执行查询
List<user> userList = userRepository.findAll((root,query,cb)->{
    //动态查询的多个条件集合
    List<Predicate> predicateList = new ArrayList<Predicate>();
    if(userParam.getCusId()!= null){
        //cusId 精匹配
		predicateList.add(cb,equal(root.get("cusId"),userParam.getCusId()));
    }
	if(userParam.getCusName()!=null){
        //cusName 精确匹配
		predicateList.add(cb,equal(root .get("cusName"),userParam.getCusName()));
    }
	if(userParam.getCusAdd()!= null){
        //cusAdd 模糊匹配
        predicateList.add(cb.like(root.get("cusAdd"),"%"+ userParam.getcusAdd()+"%"));
    }
	return cb.and(predicateList.toArray(new Predicate[0]));
});
```

## 3.4接口小结

"QBC"查询的优点：适用范围广，几乎可以实现所有查询的场景
"QBC"查询的不足：每个查询都需要手动构建Specification，提高了复杂度、增加了代码量

## 4.QueryDSL

4.1框架概述
QueryDSL是一个通用查询框架。通过JavaAPI构建类型安全的SQL查询。QueryDSL 代码可读性非常强并与JPA 高度集成。

```yaml
<!--querydsl-jpa 依赖-->
<dependency>
    <groupId>com.querydsl</groupId>
    <artifactId>querydsl-ipa</artifactId>
    <!--JDK17后，由"javax.persistence"更名为"jakarta.persistence" -->
    <classifier>iakarta</classifier>
    <versi0n>5.0.0</version>
</dependency>
```

QueryDSL,框架通过使用插件，为配置了@Entity 注解的实体自动创建 QBean(命名:"Q"+实体名)
QBean 是查询时的必要辅助类，可以通过面向对象的方式生成查询条件Predicate。

```yaml
<bui1d>
    <plugins>
        <!--添加QueryDSL插件支持-->
        <plugin>
            <groupId>com.mysema.maven</groupId>
            <artifactId>apt.maven-plugin</artifactId>
            <version>1.1.3</version>
            <executions>
            	<execution>
                    <phase>generate-sources</phase>
                    <goals>
                        <goal>process</goal>
                    </goals>
                    <configuration>
                        <!--QBean生成的路径需要加入"Resources"-->
                        <outputDirectory>target/generated-sources/qbean</outputDirectory>
                        <processor>com.querydsl.apt.jpa.JPAAnnotationProcessor</processor>
                        <log0nlyOnError>true</log0nlyOnError>
                    </configuration>
            	</execution>
            </executions>
            <dependencies>
                <dependency>
                    <groupId>com.querydsl</groupId>
                    cartifactId>querydsl-apt</artifactId>
                    <!--JDK17后，由"javax.persistence"更名为"jakarta.persistence"-->
                    <classifier>iakarta</classifier><version>5.0.0</version>
                </dependency>
            </dependencies>
        </plugin>
    </plugins>
</build>
```

配置好插件后，可执行maven的"compile"自动生成QBean类

## 4.2基本使用

将自定义的数据访问接口继承 QuerydslPredicateExecutor接口，就可开始使用 QueryDSL 了。

```java
/**
 * 用户的Repository
 */
public interface UserRepository extends JpaRepository<User,Integer>,QuerydslPredicateExecutor<User>{
//注意:必须继承父接口 JpaRepository，否则无法注入 UserRepository 的 Bean 对象
}
//创建QBean对象
QUser user = QUser.user;
//创建查询依据(条件)
Predicate predicate =null;
//按id精确查询
predicate = user.cusId.eg(1);
optional<User> optional = userRepository.findone(predicate);
//按 cusId in(1,2)查询
predicate = user.cusId.in(1,2);
List<User> userList = (List<user>) userRepository.findAll(predicate);
//查询"湖南"的用户
predicate =user.cusAdd,like("%湖南%");
List<User> userList = (List<User>) userRepository.findAll(predicate);
//按 cusId >= 3 的用户
predicate = user.cusId.goe(3);
List<User> userList = (List<User>) userRepository.findAll(predicate);
//查询"0731"区号的用户
predicate =user.cusTel.startswith("0731");
List<User> userList = (List<User>) userRepository.findAll(predicate);
//联系地址为 null 的用户
predicate = user.cusAdd.isNull();
List<User> userList = (List<User>) userRepository.findAll(predicate);
```

## 4.3动态查询

```java
// 创建QBean对象
QUser user = QUser.user:
// 模拟前端的查询参数
User userParam =new User();
userParam.setCusId(1);
userParam.setCusName("andy"):
userParam.setCusAdd("湖南长沙”);
//动态构造查询条件
BooleanBuilder builder = new BooleanBuilder();
if (userParam.getCusId()!=null){
	builder.and(user.cusId.eq(userParam.getCusId()));
}
if(userParam.getCusName()!=nu11){
    builder.and(user.cusName.eq(userParam.getcusName()));
}
if(userParam.getCusAdd()!=null){
	builder.or(user.cusAdd.eq(userParam.getCusAdd()));
}
//实现查询
List<User> userList =(List<user>)userRepository.findAll(builder);
//输出
userList.forEach(System.out::println);
```

## 4.4框架小结

优势:

1. 类型安全的査询构建：QueryDSL 使用 Java 来构建査询，可在编译时捕获到语法错误，避免了传统字符中查询的运行时异常。
2. 简洁和直观的査询语法：使用 QueryDSL 可以将复杂的查询逻辑直观地表达为 Java 代码，提高了代码的可读性和可维护性。
3. 支持多种持久化框架:QueryDSL 可以与多种主流的持久化框架集成，如 JPA、Hibernate、JDO 等，提供了统一的查询方式
4. 动态查询的灵活性:可以根据不同的业务需求动态构建查询条件，使得查询逻辑更加灵活和可扩展。

不足:

1. 需额外的引入依赖、插件
2. 借助QBean实现，增加了代码量

# SpringDataJPA-分页查询

## 1.分页查询的含义

分页查询将结果集分成多个贞面，每个贞面包含一定数量的数据记录;分贞查询的主要目的是在处理大量数据时提高查询性能，给用户提供一种逐页查看数据的方式。

分页查询涉及的相关概念:

1. 页尺寸(pagesize)：即每一页显示的数据行数，通常由开发者人为确定
2. 总数据量(total)：(指定条件下的)数据总行数
3. 总页数(totalPages)：总页数需要通过计算，计算公式如: 总页数 = ceil(总数据量 / 页尺寸
4. 当前页(pageNumber)：即当前展示的数据属于哪个页码

## 2.QueryBykxamplekxecutor接口

### 2.1分页方法概述

QueryByExampleExecutor接口有关分页查询的方法，源码如下

```java
public interface ueryByExampleExecutor<T>{
    //查找多个对象并分页显示
	<S extends T> Page<S> findAll(Example<S> example, Pageable pageable);
    //其他方法<略>
}
```

说明如下:

1. examgle用于控制分页查询的条件，该参数不允许null
2. pageable用于控制分页规格相关的参数，例如:页尺寸、当前页码(默认0)、上一页、下一页等
3. 返回的对象用于获取分页查询相关的数据，例如:总数据量、总页数、当前页的数据集合、页尺寸等



### 2.2分页查询条件

example用于控制分页查询的条件，当无条件查询全表数据时，可以

```java
Example<Deposit> example = Example.of(new Deposit());
Page<Deposit> page = depositRepository.findAll(example, pageable);
```

如果需要指定查询的条件，可以

```java
Deposit searchDeposit = new Deposit();
searchDeposit.setDescrip("存款期");// 描述中以"存款期"开头的
Example<Deposit> example = Example.of(
    searchDeposit,
    ExampleMatcher.matching()
	.withstringMatcher(ExampleMatcher.stringMatcher.STARTING)
);
Page<Deposit> page = depositRepository.findAll(example, pageable);
```

## 2.3 控制分页规格

分页规格通常包含:页尺寸，当前页码，(是否有)上一页、(是否有)下一页、首尾页判断等方面
Pageable 接口提供了方法控制上述的各规格参数

```java
//构建包含页尺寸与当前页的Pageable对象
Pageable pageable=Pageable.ofsize(2).withPage(0);
//切换当前页
pageable =pageable.first();// 将当前页切换至第一页
pageable = pageable.previousOrFirst();//将当前贞切换至上一页或第一页
pageable = pageable.next();//将当前页切换至下一页
// 是否存在上一页?
boolean previous = pageable.hasPrevious();
//获取当前页码
int pageNumber = pageable.getPageNumber();
// 获取页尺寸
int pagesize = pageable.getPagesize();
```

动态查询的条件，还可分别指定匹配的方式，然后再使用 or、and连接起来

```java
//1.构建(封装了查询条件的)实体
User searchUser=new User();
```

## 2.4 获得查询数据

分页查询的数据，包含:当前页面的数据集合、总页数、总数据量、页尺寸等
Page 接口提供了方法获取上述各项数据

```java
// 执行分页查询
Page<Deposit> page = depositRepository,findAll(example, pageable);
//获取当前页面的数据集合
List<Deposit>depositList = page.getcontent();
// 获取总页数
int totalPages = page.getTotalPages();
// 获取总数据量
long totalElements = page.getTotalElements();
// 获取页尺寸
int size = page.getsize();
```

## 3.JpaSpecifcationExecutor接口

JpaSpecificationExecutor 提供的分页查询方法，与前面讲述的QueryByExampleExecutor 接口提供的分页查询方法几乎一样，区别就在于查询条件使用"QBC"方式构建。

```java
public interface JpaspecificationExecutor<T>{
    //查找多个对象并分页显示
    Page<T> findAll(Specification<T> spec,Pageable pageable);
}
```

分页查询的操作演示如下:

```java
//1.构建分页查询的条件
Specification<Deposit> spec = new specification<Deposit>(){
    @override
    public Predicate toPredicate(Root<Deposit> root, CriteriaQuery<?> query,CriteriaBuilder cb){
		return cb.and();//相当于 where 1=1
	}
};
//2.构建分页规则相关参数(页尺寸、当前页)
Pageable pageable=Pageable.ofsize(2).withPage(0);
//3.执行分贞查询，获取分贞数据
Page<Deposit> page = depositRepository.findAll(spec, pageable);
// 4.获取当前页面的数据集合
List<Deposit> depositList = page.getContent();
depositList.forEach(System.out::println);
```

## 4.QueryDsL

QueryDSL,是一个通用查询框架。使用它需要的依赖:

```yaml
<!--querydsl-jpa 依赖-->
<dependency>
    <groupId>com.querydsl</groupId>
    <artifactId>querydsl-jpa</artifactId>
    <!--JDK17后，由"javax.persistence"更名为"jakarta.persistence"-->
    <classifier>jakarta</classifier>
    <version>5.0.0</version>
</dependency>
```

QueryDSL查询框架还需要配置一个插件，用于生成QBean(构建查询条件的Q类)。

配置好插件后，可执行 maven 的"compile"自动生成QBean类。
使用 QueryDSL 实现分页查询，与前面所讲解的几乎无异，区别也在于查询条件的构建过程

```java
//1.构建分页查询的条件
0Deposit deposit = QDeposit.deposit;
com.querydsl.core.types.Predicate predicate = deposit .descrip.like("%" );
//2.构建分页规则相关参数(页尺寸、当前页)
Pageable pageable = Pageable.ofsize(2).withPage(0);
//3.执行分页查询，获取分页数据
Page<Deposit> page = depositRepository.findAll(predicate, pageable);
//4 获取当前页面的数据集合
List<Deposit> depositList = page.getcontent);
depositList.forEach(System.out::println);
```

# SpringDataJPA-多表关联

## 1.多表关联的含义

在二维关系数据库中，数据表之间的关系是十分重要的概念，分成如下四种关系的类型:

1. OneToOne:一对一关系。例如:一个国家一个首都、一夫一妻、一人一证等
2. OneToMany:一对多关系。例如:一个部门多个员工
3. ManyToOne:多对一关系，即一对多关系的反面。
4. ManyToMany:多对多关系。例如:用户与订单、学生与选课等

## 2.数据库表介绍

本集使用的相关数据表，描述如下:
1.部门信息表(tbl_dept)

| id     | dept_name |
| ------ | --------- |
| 部门id | 部门名字  |

2.入职信息表(tbl_join)

| id     | join_date |
| ------ | --------- |
| 入职id | 入职日期  |

3.员工信息表(tbl_emp)

| id     | emp_name | emp_gender | dept_id | join_id | emp_age  |
| ------ | -------- | ---------- | ------- | ------- | -------- |
| 员工id | 员工姓名 | 员工性别   | 部门id  | 入职id  | 员工年龄 |

4.任务信息表(tbl job)

| id     | job_name |
| ------ | -------- |
| 任务id | 任务名字 |

5.员工-任务关系衣(tbl_emp_job)

| id     | emp_id | job_id |
| ------ | ------ | ------ |
| 关系id | 任务id | 员工id |

各表之间的关联关系

1. 一对一关系:员工信息表 vs 入职信息表
2. 一对多关系:部门信息表 vs 员工信息表
3. 多对一关系:员工信息表 vs 部门信息表
4. 多对多关系:员工信息表 vs 任务信息表d

## 3.一对一关系

表A中的一行记录，在表B中只能找到唯一关联的一行记录，而不是多行记录，这就是一对一。

关联关系中的两张表，通常会划分成"主控方"和"被控方"，以免两方都去维护关系导致冲突。

本集设计一对一关系的两张表，以及他们的"主、被控方"地位如下:

1. 主控方：员工信息表(tbl_emp) -> 关联字段(join_id)
2. 被控方：入职信息表(tbl join) -> 关联字段(id)

## 3.1 @JoinColumn

@JoinColumn 用于设置表的关联字段，通常在“主控方”的实体中使用。语法如:

```java
@JoinColumn(name ="主控方关联字段或命名正确的关联属性",referencedcolumnName="被控方的关联属性(默认为被控方主键)")
```

由于注解能自动生成关联字段，原来实体类中手动添加的关联属性需要注释，否则会引发字段的异常!

```java
public class Employe {
    //...其他属性<略>..
    
    //private Integer joinId;  //入职信息id(此属性需要手动注释掉)
    
    @JoinColumn(name ="joinId",referencedColumnName = "id")
    private JoinInfo join;//入职信息
}
```

## 3.2 @OneToOne

@OneToOne 注解用于定义两个实体之间的一对一关系，可在关系的双方编写或其中一方编写,具体的编写位置是在实体的关联属性上。

## 3.3 单向关联与双向关联

单向和双向关联的区别就在于,两个表的数掘是否需要互相知道;

单向关联仅支持单向的数据引用，即通过查询表A的数据可查到关联的表B数据，反过来却不行;

双向关联则更进一步，不仅支持双向的数据引用，还能确保两个表之问的数据同步变化。

```java
//单向一对一关联示例
public class Employe {
    //...其他属性<略>..
    @OneToOne //员工与入职是一对一的关系
    @JoinColumn(name ="joinId",referencedcolumnName = "id")
    private JoinInfo join; //入职信息
}
```

## 3.4 双向关联的循环引用问题

在处理双向关联时可能会导致循环引用,从而引发 StackOverflowError(堆栈溢出)的错误，如:

```java
Optional<Employe>optional1 = employeRespository.findById(1);
//查询员工的同时查询关联的入职信息
optional1.ifpresent(emp->system.out.printn("emp ="+ emp));
```

错误原因在对象的输出语句上。因 Employe 实体类的 @Data 注解帮助自动生成了 toString()方法，而该方法中包含输出关联对象join，而在输出关联 join 时又会要求输出其反向关联的对象emp，从而导致循环引用的问题。

解决办法:自定义 toString()方法，将其中一方(或双方)的输出语句中去掉关联对象的输出!

另外，为避免双向关联的循环引用导致序列化时的错误，在主控方、被控方的关联属性上分别使用@JsonManagedReferénce 注解和 @JsonBackReference 注解，例如:

```java
//双向一对一关联示例
public class Employe {
//...其他属性<略>...
@OneToOne
@JoinColumn(name ="joinId",referencedcolumnName = "id")
@JsonManagedReference //主控方
```

## 4.多对一/一对多

### 4.1 @ManyToOne

员工与部门，是属于多对一的关系

```java
// 单向多对一关联示例
public class Employe {
    //...其他属性<略>..
    //private Integer deptId; // 部门id需注释掉
    @ManyToOne
    @JoinColumn(name ="deptId",referencedColumnName ="id")
    private Department department;//部门信息
}
```

## 4.2 @OneToMany

部门与员工，是属于一对多的关系

```java
// 双向多对一、一对多关联示例
public class Employe {
    //...其他属性<略>...
    @ManyToone//员工与部门是多对一的关系
    @Joincolumn(name ="deptId",referencedcolumnName = "id")
    private Department department;//部门信息
}
public class Department{
    //...其他属性<略>..
    @oneToMany(mappedBy ="department")//部门与员工是一对多的关系
    private List<Employe> employeList;//员工信息
}
```

注意事项:

1. 双向关联的循环引用问题
2. 通过部门查询员工集合时(一对多的多方)，由于员工集合的数掘会延迟加载，为保证数据一致性,需要在方法上加上事务控制。

## 5.多对多关系

### 5.1 @ManyToMany

员工与任务，是属于多对多的关系。多对多关系设计通常是专门创建一个表来阐述关系。

tbl_emp_job表

| id   | emp_id | job_id |
| ---- | ------ | ------ |
| 1    | 1      | 1      |
| 2    | 1      | 2      |
| 3    | 2      | 3      |
| 4    | 3      | 3      |
| 5    | 4      | 4      |

```java
// 多对多关联示例
public class Employe {
    //...其他属性<略>...
    @мanyToMany
    private List<Job> jobList;//任务信息
}
public class Job{
    //...其他属性<略>.
    @мanyToMany(mappedBy ="jobList")
    private List<Employe> jobList;//员工信息
}
```

## 5.2 @JoinTable

在 @ManyToMany 关系中，@JoinTable 注解用于指定关系表，以及关联的字段

```java
public class Employe{
    //...其他属性<略>..
	@ManyToMany
    @JoinTable(
    name ="tbl_emp_job",
    joinColumns = @Joincolumn(name ="emp_id"),
    inverseJoincolumns = @JoinColumn(name ="job_id")
    private List<Job> jobList;//任务信息
}
```

注意事项:

1. 双向关联的循环引用问题
2. 数据延迟加载，需要在方法上加上事务控制。

