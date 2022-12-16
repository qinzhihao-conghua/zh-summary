---
title: Angular自定义表单组件
author: 覃智浩
---

路由复用策略主要依据快照方式，必要时候需要手动清理快照缓存，其次需要在根模块进行provide

1、class 实现RouteReuseStrategy

2、根模块provide路由复用策略

```javascript
providers: [
    { provide: RouteReuseStrategy, useClass: CustomerReuseStrategy }
],
```

3、对要进行路由复用的路由进行标记，这里是keepalive

```javascript
{ path: 'xxx', component: xxxComponent, data: { keepalive: true } },
```

实现代码如下，可根据业务情况调整

```javascript
import { ActivatedRouteSnapshot, DetachedRouteHandle, Route, RouteReuseStrategy } from "@angular/router";

export class CustomerReuseStrategy implements RouteReuseStrategy {
    static handlers: Map<Route, DetachedRouteHandle> = new Map();
    // 是否允许复用路由
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        // return !route.firstChild;
        return Boolean(route.data["keepalive"]);
    }
    // 是否允许还原路由
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return !!CustomerReuseStrategy.handlers.has(route.routeConfig);
    }
    // 相同路由是否复用(路由进入触发)
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {
        return curr.routeConfig === future.routeConfig;
    }
    // 获取存储路由
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {
        // return CustomerReuseStrategy.handlers.get(route.routeConfig);
        if (Boolean(route.data["keepalive"])) {
            return CustomerReuseStrategy.handlers.get(route.routeConfig);
        } else {
            return false;
        }
    }
    // 存入路由(路由离开出发)
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        CustomerReuseStrategy.handlers.set(route.routeConfig, handle);
    }
}
```



