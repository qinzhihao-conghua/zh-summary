---
title: react学习笔记
---

# 环境要求

```shell
1. npm install -g create-react-app
2. create-react-app my-app
3. npm install --save react-router
// 安装的时候最好使用yarn，使用npm安装不上路由，有node版本警告
yarn intall
// 注意不是react-router，这个很少用
// yarn add react-router
yarn add react-router-dom
```

文件结构

```
public静态资源文件夹
mainifest.json应用加壳，快应用，pwa，配置app的名字，图标，权限索取等信息
```



# jsx语法规则



1. 定义虚拟dom时不要写引号

```jsx
const vdom=<h1>虚拟dom</h1>; //正确
const vdom2='<h1>虚拟dom</h1>'; // 错误
```

2. 标签中混入js表达式时要用{ }包裹

3. 样式的类名指定不要用class，要用className

4. 内联样式要用```style={{key:value}}```的形式去写

5. 只有一个根标签

6. 标签必须闭合

react中如果标签首字母大写表示组件，首字母小写表示普通的html标签

# 关于组件

react组件有两种形式，一是函数式组件，适用于简单组件，二是类式组件(class)，适用于复杂组件，react组件有三大属性```state```、```props```、```refs```，还有```context```也重要

函数式组件定义

```jsx
function FunComp(){
	retrun <div>这里定义的是函数式组件</div>;
}
```

类式组件，类式组件需要继承```React.Component```

```jsx
class ClassComponent extends React.Component{
	render(){
		return <div>这里定义的是类式组件</div>;
    }
}
```

# state

state目前来看相当于angular中的变量集合，主要采用对象方式存储，要更改state中值，必须使用```setState({要修改的变量:新的变量值})```方法，每一次调用setState就触发一次render

```jsx
class ClassComponent extends React.Component{
    constructor(props){
        super(props);
        this.state={filed:'变量值1'};
    }
	render(){
		return <div>这里定义的是类式组件</div>;
    }
}
```

# 点击事件与this问题

react点击事件与原生dom事件名称基本一致，但是名称是小驼峰方式

```jsx
class ClassComponent extends React.Component{
    // 类中this的指向
 	// 正常情况下类中的this指向的是类的实例对象
    // 而onClick={this.test}这个方式其实是将test函数赋值给onClick
 	// 在点击的时候其实是直接调用了test方法，而不是一个实例对象调用test方法
 	// const p=new Person();
 	// p.test();this-->Person
	// const a=p.test;
	// a.test();this-->undefined
    constructor(props){
        super(props);
        this.state={filed:'变量值1'};
        // 如果不写这句，调用时候test中的this是undefined
        this.test=this.test.bind(this);
    }
	render(){
		// 注意，不能是onClick="test()"，需要的是表达式，不能是字符串
		// 也不能是onClick={test()}，这样写方法会被立即调用
		// onClick={this.test}，这样写方法中的this是undefined
		return <div onClick={this.test}>这里定义的是类式组件</div>;
    }
    test(){
    	consnle.log('点击了',this.state.filed);
    }
}   
```

   以上是为了证明this相关的知识，以下是实际使用
   ```jsx
class ClassComponent extends React.Component{
   	// 直接这里写相当于直接在这个类上面添加成员，等于在构造器中赋值
    state={filed:'变量值1'};
   	render(){
   		return <div onClick={this.test}>这里定义的是类式组件</div>;
    }
    // 这里使用的箭头函数，由于箭头函数自身没有this，会向外部寻找this
    test=()=>{
       	consnle.log('点击了',this.state.filed);
    }
}
   ```

# props

props用来接收传入组件内部的值，可以限制类型以及设置默认值，props既可以在类组件中使用，也可以在函数式组件中使用

1. 类式组件中使用props

```jsx
class ClassComponent extends React.Component{
    // 对标签属性进行类型、非必要性的限制
   	static propTypes={
        // 限制filed类型为string同时是必传属性
        // 关于PropTypes是15.5之后的东西，之前版本是React.PropTypes
        // 直接使用PropTypes要引入需要相应的包
        filed:PropTypes.string.isRequired
    };
	// 设置默认值
	static defaultProps={
        filed:'我是默认值'
    };
   	render(){
   		return <div>这里定义的是类式组件</div>;
    }
}
```

2. 函数式组件中

```jsx
function FunComp(props){
	const {filed1,filed2}=props;
	return(
		<div>{字段1的值:filed1}</div>
	);
}
// 函数式组件对props的限制形式
FunComp.propTypes={
	filed:PropTypes.string.isRequired
};
FunComp.defaultProps={
	filed:'我是默认值'
};
```



# 关于constructor

官网对于构造器有这么两句话，构造函数仅用于以下两种情况

```
通过给 this.state 赋值对象来初始化内部 state。
为事件处理函数绑定实例
```

```jsx
class ClassComponent extends React.Component{
    constructor(props){
     	// 这里的props不一定要接，但是如果要使用this.props，
        // 必须接收props并传入super，否则拿到的会是undefined
        super(props);
        this.state={filed:'变量值1'};
        this.test=this.test.bind(this);
    }
	render(){
		return <div>这里定义的是类式组件</div>;
    }
}
```

# refs

```ref```相当于angular中的模板引用变量```#demo```

字符串形式的ref

```jsx
class ClassComponent extends React.Component{
    test1=()=>{
        console.log('demo1',this.refs.demo1.value); // input中输入的值
    }
	render(){
		return(
            // 字符串形式的ref,已经不建议使用，效率问题？
        	<input type="text" ref="demo1"/>
            <button onClick={this.test1}>点击</button>
        )
    }
}
```

函数式ref

```jsx
class ClassComponent extends React.Component{
    test1=()=>{
        console.log('demo1',this.demo1.value); // input中输入的值
    };

    demo2=(e)=>{
        this.demo2=e;
        console.log('demo2',e.value); // input中输入的值
    };
    test2=(e)=>{
        console.log('demo2',this.demo2.value); // input中输入的值
    };

	demo3=React.createRef();
 	test3=(e)=>{
        console.log('demo3',this.demo3.current.value); // input中输入的值
    };
	render(){
		return(
            // 如果在这里直接写回调函数，这个函数会被调用两次
        	<input type="text" ref={v=>this.demo1=v}/>
            <button onClick={this.test1}>点击</button>
            // class绑定形式
            <input type="text" ref={this.demo2}/>
            <button onClick={this.test2}>点击</button>
            // 容器式
            <input type="text" ref={this.demo3}/>
            <button onClick={this.test3}>点击</button>
        )
    }
}
```

# 受控组件与非受控组件

受控组件与非受控组件的区别就是，在拥有输入形表单的组件中，表单的值存放在state中的称之为受控组件，反之为非受控组件，由于react是单向数据流，没有双向绑定的说法，所以要及时拿到表单中的值只能通过受控组件

```jsx
class ClassComponent extends React.Component{
	state={demo:''};
	submit=(event)=>{
		event.preventDefault();
		console.log(this.state.demo);
	};
	changeHandle=(e)=>{
		this.setState({demo:e.target.value});
	}
	render(){
		return(
            <form onSubmit={this.submit}>
        		<input type="text" onChange={this.changeHandle}/>
        	</form>
        )
    }
}
```

统一处理表单和函数柯里化

```jsx
class ClassComponent extends React.Component{
	state={name:'',age:0};
	submit=(event)=>{
		event.preventDefault();
		console.log(this.state.demo);
	};
	// 这种就是函数柯里化，通过函数调用继续返回函数的方式
	// 实现多次接收参数最后统一处理的函数编码形式
	changeHandle=(filed)=>{
		return (event)=>{
            this.setState({[filed]:event.target.value});
        }
	}
    getGender(filed,event){
        this.setState({[filed]:event.target.value});
    }
	render(){
		return(
            <form onSubmit={this.submit}>
                // changeHandle函数返回一个函数给onChange调用
        		<input type="text" onChange={this.changeHandle('name')}/>
                <input type="text" onChange={this.changeHandle('age')}/>
                // 同时获取event和值得写法
                <input type="text" onChange={(event)=>{this.getGender('gender',event)}}/>
        	</form>
        )
    }
}
```

# react生命周期

1. 17版本之前，不包括17

```constructor```构造器先执行

```componentWillmount```组件将要挂载

```render```初始化渲染，状态更新之后

componentDidMount组件挂载完毕，初始化

componentWillUnmount组件将要卸载，收尾

```unmountComponentAtNode```卸载组件

```setState```会调用```shouldComponentUpdate```，而```shouldComponentUpdate```先于```componentWillmount```执行

```forceUpdate```会调用```componentWillUpdate```，而```componentWillUpdate```先于```render```执行

```componentDidUpdate```组件更新之后

```componentWillReceiveProps```父组件render之后调用，注意，第一次render不算

2. 17版本之后

17版本以及之后，有三个生命周期钩子改名

```componentWillmount```改为```UNSAFE_componentWillmount```

```componentWillUpdate```改为```UNSAFE_componentWillUpdate```

```componentWillReceiveProps```改为```UNSAFE_componentWillReceiveProps```

新增两个钩子，极少用到

```getDerivedStateFromProps```

```getSnapshotBeforeUpdate```

# diff算法注意

当状态中的数据发生变化时，根据新数据生成新的虚拟dom，然后新虚拟dom与就虚拟dom进行比较，此时唯一key值就起重大作用了，如果使用循环时的index做key，此时有可能数组长度变化，下标还存在，但是值已经变化了，导致diff算法失败

# 样式冲突问题

由于都是js，如果没有隔离机制会产生样式覆盖的问题，似乎没有一个优美的方法，一个处理方法如下

```jsx
样式文件的名称中，.css的前缀添加module，例如demo.module.css
在引入的时候
import demo from ./demo.module.css
在使用的时候
<h1 class={demo.test}></h1>
```

# 组件间通讯

## 父子组件直接通过props传递

兄弟组件通过父组件桥接，父组件通过定义方法传递到子组件，子组件需要传递数据给父组件的时候直接调用这个方法

父组件中

```jsx
test=(data)=>{
	console.log('接收子组件传递的数据',data);
}
render(){
	return(
		<div>
			<Child reciveFun={this.test}></Child>
		</div>
	)
}
```

子组件中

```jsx
emitData=(){
	this.props.test('子组件中数据');
}
render(){
	return(
		<button onClick="{this.emitData}">向父组件传递信息</button>
	)
}
```

## 兄弟组件

兄弟组件之间通讯可以和angular那样通过父组件来桥接，但是在react的自由写法中似乎没必要那么麻烦，可以通过消息订阅-发布订阅机制来完成，依赖于```PubSubjs```，其实angular和vue也可以这样实现，但是这种方式有一个缺点就是订阅是异步的，如果数据有前后关系，这个方式就不太友好，所以通过父组件桥接仍然有存在的必要

安装pubsub-js之后，

```jsx
// 发布：
PubSub.publish('testMsg','消息内容')
// 接收：
PubSub.subscribe('testMsg',(msg,data)=>{
	console.log('接收到的数据',data);
})
```



# 关于数据请求

react没有针对数据请求进行相关的处理与封装相应的库，因此只能ajax，或者使用其他第三方库，如axios，通常使用axios，一是promise风格，二是可以在客户端和服务端(node)使用

另外提一个。window中不仅仅只有xhr能发送网络请求，fetch也是可以发送网络请求的，fetch也是promise风格，但是兼容性差

# 关于请求代理

src下新建setupProxy.js

```jsx
const proxy=require('http-proxy-middleware')
modile.expores=function(app){
	app.use(
		proxy('/api',{
			target:'http://localhost:3000',
			// 让服务端知道请求源 Host字段的值
			changeOrigin:true,
			// 将代理前缀去掉，还原真实的请求路径
			pathRewrite:{'^api':''}
		})
	)
}
```

# 路由

react的路由与ng和vue的路由不相同，react的路由分散在各个组件中，不利于统一管理维护

```shell
npm install react-router-dom
```

安装react-router-dom后

```jsx
improt {Link,BrowserRouter，Route} from 'react-router-dom';
// react中与路由相关的Link和Route需要包裹在BrowserRouter或HashRouter中
// 但是如果直接在各个页面中编写显得不明智，因此，通常是直接在index.js里包裹根组件(App)
// 路由类型
<BrowserRouter>
	<div>
        <Link to="/demo">demo</Link>
        <Link to="/test">test</Link>
	</div>
	<div>
		<Route path="/demo" component={Demo}></Route>
        <Route path="/test" component={Test}></Route>
	</div>
</BrowserRouter>
```

一般组件和路由组件的区别

一般组件传递什么就能接收什么，路由组件会接收到三个固定的属性，history、location、match

## 活动路由

```jsx
// NavLink也是路由包里的东西
<NavLink activeClassName="active" to="/demo">demo</NavLink>
```

标签体内容

```jsx
// 这里的‘测试’会被存放在props中的children属性中
// 如果写成自闭合标签，children属性和值可以写在标签上
<Demo>测试</Demo>
```

Switch组件

```jsx
// Switch组件的一个作用就是使相同路由下只展示第一个组件
// 如下，只会展示Demo组件
<Switch>
	<Route path="/demo" component={Demo}></Route>
	<Route path="/demo" component={Test}></Route>
</Switch>
```

多级路由下引用的样式在刷新时候失效的问题

history模式下的路由，如果写多级路由下，前面的路由path会被当做是请求路径，导致请求的数据与实际返回的数据MIME类型不符导致报警，从而样式失效

```jsx
// 如下这个路由，/test这一级路由会被当成请求路径，如果index.html中使用了
// link请求css，并且使用了相对路径，那么由于/test被加在了请求路径中，会导致
// 由于没有test这个文件夹，导致请求css样式失败，而请求失败的话，会返回index.html(webpack)
// 由于link返回的是html文件，所以MIME类型不符，从而报警
// 刷新浏览器的时候，css的请求路径时http://localhost:3000/test/css/xx.css
<link rel="stylesheet" href="./css/xx.css"/>
<Route path="/test/demo" component={Demo}></Route>
```

处理方法：

```jsx
// 1、将‘.’去掉，这以为着从根路径下的css文件夹下找
<link rel="stylesheet" href="/css/xx.css"/>
// 2、将‘.’替换为%PUBLIC_URL%，它代表public文件夹的根路径
<link rel="stylesheet" href="%PUBLIC_URL%/css/xx.css"/>
// 3、将路由模式改为hash模式
```

## 路由匹配方式

```jsx
// 这种路径也会展示Demo组件，属于模糊匹配，等于angular中的path等于'**'的部分
<NavLink activeClassName="active" to="/demo/xx/xx">demo</NavLink>
// 加上exact属性后就属于精确匹配，无法展示Demo组件
<NavLink exact={true} activeClassName="active" to="/demo/xx/xx">demo</NavLink>
<Route path="/demo" component={Demo}></Route>
```

## 路由重定向

```jsx
<NavLink activeClassName="active" to="/demo">demo</NavLink>
<Route path="/demo" component={Demo}></Route>
<Redirect to="/demo"></Redirect>
```

## 多级路由(子路由)

```Route```组件承担了路由出口的功能(ng的说法)，子路由需要带上父级的path

```jsx
<NavLink activeClassName="active" to="/demo/test">test</NavLink>
<Route path="/demo/test" component={Test}></Route>
<Redirect to="/demo/test"></Redirect>
```

## 路由传参

1、params方式传参

传参时，path上的形式与ng和vue一致

```jsx
<NavLink activeClassName="active" to={`/demo/test/${id}`}>test</NavLink>
<Route path="/demo/test/:id" component={Test}></Route>
```

接收参数：当路由路径携带了参数之后，路由组件自动会接收，数据存放在props下的match下的params中，为对象形式

2、query方式传参

```jsx
<NavLink activeClassName="active" to={`/demo/test/?id=${id}&name=${name}`}>test</NavLink>
<Route path="/demo/test" component={Test}></Route>
```

接收参数：query方式的传参，数据在props下的location下的search，是字符串形式，需要自己处理，node中有一个包叫做querystring，可以处理urlencoded形式的字符串```querystring.parse('{name=张三&id=1}')```会转成对象，需要先把'?'去掉

3、路由中的state参数

这种方式，参数不在url上出现，刷新也不会丢失，前提不清空缓冲，因为```BrowserRouter```下是操作history的

```jsx
<NavLink activeClassName="active" to={{pathname:`/demo/test`,state:{id:'xx',name:'xx'}}}>test</NavLink>
<Route path="/demo/test" component={Test}></Route>
```

接收参数：this.props.location.state

# 路由懒加载

```jsx
const Test=lazy(()=>import('./Test'))

<NavLink activeClassName="active" to="/demo/test">test</NavLink>
<Suspense fallback={<h1>路由加载失败</h1>}>
	<Route path="/demo/test" component={Test}></Route>
</Suspense>
```



# 编程式导航

1、路由组件中通过js编码导航

```jsx
// url参数
this.props.history.push(`/demo/test/${id}/${name}`);
// replace相当于无痕模式，会进行替换
this.props.history.replace(`/demo/test/${id}/${name}`);

// state参数
this.props.history.push(`/demo/test`,{id:'xx',name:'xx'});
// replace相当于无痕模式，会进行替换
this.props.history.replace(`/demo/test`,{id:'xx',name:'xx'});
```

2、一般组件中通过js导航

```jsx
import {widthRouter} from 'react-router-dom';
test=()=>{
    this.props.history.push(`/demo/test`,{id:'xx',name:'xx'});
}
render(){
    return(
    	<div>一般组件</div>
    )
}
// 将一般组件传入widthRouter方法，可以理解为将一般组件转换成路由组件
// 转换之后就可以与路由组件中一样操作history、location、match这三个属性了
export default widthRouter(Demo)
```

=BrowserRouter和HashRouter的区别

1、底层原理不同，BrowserRouter使用的是H5的history api，不兼容ie9及以下；HashRouter使用的是URL的哈希值。

2、url表现形式不一样，BrowserRouter没有'#'号，而HashRouter有

3、刷新后对路由state参数的影响不同，BrowserRouter没有任何影响，因为state保存在history对象中，而HashRouter刷新会导致路由state参数丢失

4、HashRouter可以用于解决一些路径错误相关的问题

# redux

redux是管理状态的js库，redux中的三个重要概念Action Creators，Store，Reducers，一般来说store只有用一个，然后不同组件不同reducers。

xxx_reducer.js

```jsx
import {ADD,DELETE} from ./constant.js
// reducer本质是一个函数，会接收到两个参数，分别为，之前的状态：preState，动作对象：action
export default function xxxReducer(preState,action){
	// action是一个对象，包含type和data
    const {type,data}=action;
    // 根据type执行相应的动作
    // 注意reducer干完活之后不会引起页面变化，因为这是react的活
	// 因此需要调用react的render更新页面变化
    if(type===ADD){
        return 结果
    }else if(type===DELETE){
        return 结果
    }else{
        return preState;
    }
}
```

action_creater.js

```jsx
import {ADD,DELETE} from ./constant.js
// action对象
exprot const createAction=(data)=>({type:ADD,data});
exprot const createAction2=(data)=>({type:DELETE,data});
```

constant.js

```jsx
// constant.js并不是必须的，只是为了防止action的type容易写错，统一在一处便于管理
exprot const ADD='add';
exprot const DELETE='delete';
exprot const REMOVE='remove';
```



store.js

```jsx
// 引入createStore创建store
import {createStore,combineReducers} from 'redux';
// 引入组件的reducer(打工人)
import xxxReducer from './xxxReducer';
// 引入组件的reducer(打工人)
import aaaReducer from './aaaReducer';

const myReducer=combineReducers({
    xxx:xxxReducer,
    aaa:aaaReducer
})
// 导出store,createStore接收两个参数，第一个是reducer,
// 第二个如果需要支持异步action，需要引入thunk并通过中间件连接，这里不写
export default createStore(myReducer);
```

使用

```jsx
import store from '../store';
import {createAction} from './action_creater';
// 通知reducer干活
store.dispatch(createAction('张三'));
// 获取
store.getState();

componentDidMount(){
    // 检测redux中的状态变化，只要变化就调用render
    store.subscribe(()=>{
        this.setState({});
    })
}
```

# react-redux

react-redux需要一个容易组件包裹实际的组件(ui组件)，react-redux能够监听数据的变化实时渲染

```jsx
import {connect} from 'react-redux';
import {store} from './store';

// 容器组件会传递给ui组件两个东西
// 一是redux中的所保存的状态，二是操作状态的方法
// 使用的时候重命名成组件的真是名称就可以了(语义化)
export default connet(
    // 映射状态
    // 这里的key作为传递给ui组件的props中的key
    // state.xxx的xxx是combineReducers中的key
	state=>({key:state.xxx}),
    // 映射操作状态的方法
    // props中的方法
	{key:xxxAction}
)(ui组件)
// ui组件通过this.props.xxxAction读取和操作状态
// 在入口中通过provider传递store
<Provider store={store}>
    <App/>
</Provider>
```

# Hook

hook是16.8.0之后的东西，可以是函数式组件中使用state以及其他特性

useState()

```jsx
//可以使用state
const [xxx,setXxx]=React.useState(initValue);
//useState参数是第一次初始化的值
//返回值是一个数组，第一个值是内部当前状态值，第二个是一个函数，用于操作更新状态值
//setXxx()可以直接传数据，也可以传方法
```

useEffect()

```jsx
// 可以使用生命周期钩子
// 第二个参数不传代表监测所有，传入空数组代表都不监测
// 传入某个变量代表监测这个变量
React.useEffect(()=>{
    console.log('执行');
},[])
```

useRef()

```jsx
// 可以使用ref,查找标签或数据
const ref=useRef();
```

# Fragment

Fragment的作用相当于ng-container用于包裹html，但是实际不生成标签，用于简化dom结构，因为每个组件必须有一个根标签，但是这个标签一般在dom是没有任何作用的

```jsx
<Fragment>
	<h1>只有这个标签</h1>
</Fragment>
// 也可以这样，使用空标签
<>
	<h1>只有这个标签</h1>
</>
```

