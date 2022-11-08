---
title: Angular自定义表单组件
# 默认选中的意思
slug: /
author: 覃智浩
---

<iframe height="400px" width="100%" src="https://www.bilibili.com/"></iframe>
1 新建一个普通的组件

2 在组件的```@Component```装饰器中添加```providers:[]```，值为：

```javascript
{
	provide:NG_VALUE_ACCRSSOR,
	// forwardRef里的值返回的是当前组件
	useExisting:forwardRef(()=>DemoComponent),
	multi:true
}
```

3 组件实现```ControlValueAccessor```接口，接口要实现方法有以下

```javascript
export class DemoComponent implements OnInit, ControlValueAccessor{
    writeValue(obj: any): void // 当 model 发生改变时，触发该方法。
	registerOnChange(fn: any): void // 注册 onChange 事件。
	registerOnTouched(fn: any): void // 注册 onTouched 事件
	setDisabledState?(isDisabled: boolean): void // 设置组件的禁用状态，可选实现。 
}
```

4 实现内容参考

```javascript
value: string = '0'
isDisabled = false

onChange = (value: string) => {}
onTouched = () => {}
// 当ngModel值变化的时候会自动执行该方法，组件初始化之后会执行两次，第一次value是null，是个bug，官方不修复
writeValue(value: any): void {
	this.value = value
}

registerOnChange(fn: any): void {
	this.onChange = fn
}

registerOnTouched(fn: any): void {
	this.onTouched = fn
}

setDisabledState?(isDisabled: boolean): void {
	this.isDisabled = isDisabled
}
```

