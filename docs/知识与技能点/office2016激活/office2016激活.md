---
title: office2016激活
---

# 1、查看Office2016安装目录

如果是默认安装，没有修改路径，是在C:Program FilesMicrosoft OfficeOffice16目录下，64位系统装32位office路径是C:Program Files  (x86)Microsoft OfficeOffice16，具体路径还得自行查看；

# 2、进入安装目录

【Windows PowerShell(管理员)】，或者【命令提示符(管理员)】进入office2016安装路径，如果你不是在这个目录，需手动修改，目录错误，后面就无法执行激活操作；

1. 32位系统装32位office或者64位系统装64位office命令：

   ```
   cd C:Program FilesMicrosoft  OfficeOffice16
   ```

2. 64位系统装32位office命令：

   ```
   cd C:Program Files (x86)Microsoft  OfficeOffice16
   ```

# 3、执行命令

接着复制下面这个命令，在命令窗口鼠标右键自动粘贴命令，按回车执行，安装office2016专业增强版密钥，如果提示无法找到脚本文件，说明第3步打开的路径错误，需要执行另一个命令；

```
cscript ospp.vbs  /inpkey:XQNVK-8JYDB-WJ9W3-YJ8YR-WFG99

【Office Professional  Plus 2016：XQNVK-8JYDB-WJ9W3-YJ8YR-WFG99】
【Office Standard 2016：JNRGM-WHDWX-FJJG3-K47QV-DRTFM】
```

# 4、设置kms服务器

`````
cscript ospp.vbs /sethst:kms.03k.org
`````

# 5、激活office2016

```
cscript ospp.vbs /act
```

# 6、查询office2016激活状态

```
cscript ospp.vbs /dstatus
```