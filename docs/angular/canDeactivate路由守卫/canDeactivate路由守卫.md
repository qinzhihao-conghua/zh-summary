---
title: canDeactivate路由守卫
---

一：定义守卫文件，注册到对应的module中

```javascript
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

/**定义个接口，由需要使用守卫的组件去实现 */
export interface CanComponentDeactivate {
    canDeactivate: () => Observable<boolean>;
}

@Injectable()
export class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {

    constructor() { }

    canDeactivate(component: CanComponentDeactivate): Observable<boolean> {
        return component.canDeactivate();
    }
}
```

二：在需要确认的组件里编写确认逻辑，返回值可以是```Observable<boolean> | Promise<boolean> | boolean;```

```javascript
@HostListener('window:beforeunload')
canDeactivate(): Observable<boolean> {
    const result = this.checkSchedulePerson();
    if (result) {
        const obs: any = new Subject();
        const modal = this.modalService.create({
            nzTitle: '确认是否离开',
            nzContent: this.scheduleTemp,
            nzOnCancel: () => {
                obs.next(false);
            },
            nzOnOk: () => obs.next(true)
        });
        return obs;
    } else {
        return of(true);
    }
}
```

三：在对应的路由加上守卫

```javascript
{
    path: 'xxx-path',
    component: xxxComponent,
    canDeactivate: [CanDeactivateGuardService],
}
```

