---
title: nginx配置
---

nginx配置文件相关解读与注意事项

```nginx
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;
	log_format my_test_log escape=json '$request_filename $http_x_forwarded_for $fastcgi_script_name $document_root $request_body';
    server {
        listen       4500;
        server_name  127.0.0.1;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;
		
		
		location / {
			root   D:/offline-map;
			index  index.html index.htm;
            # 添加CORS头
            add_header Access-Control-Allow-Origin *;  # 允许所有域进行跨域请求
            # 如果你只想允许特定的域，可以将'*'替换为具体的域名，例如：
            # add_header Access-Control-Allow-Origin http://example.com;
        }
		location /offline-map {
            # 请求URI中的/offline-map/会被去掉
            # Nginx首先会找到匹配请求URI的location块。在例子中，
            # 如果请求URI是/offline-map/something.html，那么它会匹配到location /offline-map/这个块。
            # 一旦找到匹配的location块，Nginx会去掉URI中与location指令匹配的部分
            #（在这个例子中是/offline-map/），然后在root指令指定的目录下查找剩余路径对应的文件。
            # 假设root指令指定的是D:/，并且请求URI是/offline-map/something.html，
            # 那么Nginx会在D:/offline-map/目录下查找something.html文件。

			# root   D:/;
            
            # alias指令指定的路径应该是一个实际存在的文件系统路径，
            # 并且该路径应该以斜杠（/）结尾，以避免路径解析错误。
            # 在location块中使用alias时，Nginx不会将location中匹配的部分
            #（在本例中是/offline-map/）附加到alias指定的路径上。
            # 相反，它会直接使用alias指定的路径来替换请求的URI。
            # 指定实际的文件系统路径，注意末尾的斜杠
            alias D:/offline-map/;
			index index.html index.htm;
        }
		
    }


}

```



