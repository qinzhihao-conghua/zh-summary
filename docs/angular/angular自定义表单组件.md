---
title: angular自定义表单组件
# 默认选中的意思
slug: /
---
# angular自定义表单组件
<iframe height="400px" width="100%" src="https://www.bilibili.com/"></iframe>
1 新建一个普通的组件

2 在组件的@Component装饰器中添加providers:[]，值为：

```typescript
{
	provide:NG_VALUE_ACCRSSOR,
	// forwardRef里的值返回的是当前组件
	useExisting:forwardRef(()=>demoComponent),
	multi:true
}
```

3 组件实现```ControlValueAccessor```接口，接口要实现方法有以下

```typescript
writeValue(obj: any): void // 当 model 发生改变时，触发该方法。
registerOnChange(fn: any): void // 注册 onChange 事件。
registerOnTouched(fn: any): void // 注册 onTouched 事件
setDisabledState?(isDisabled: boolean): void // 设置组件的禁用状态，可选实现。
```

4 实现内容参考

```typescript
value: string = '0'
isDisabled = false

onChange = (value: string) => {}
onTouched = () => {}

// 有输入值得时候会自动触发这个方法
writeValue(value: string): void {
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

