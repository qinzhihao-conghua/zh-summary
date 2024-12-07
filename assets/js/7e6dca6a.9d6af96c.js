"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[9494],{8705:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>d,frontMatter:()=>u,metadata:()=>r,toc:()=>i});const r=JSON.parse('{"id":"angular/Angular\u8def\u7531\u590d\u7528\u7b56\u7565/Angular\u8def\u7531\u590d\u7528\u7b56\u7565","title":"Angular\u8def\u7531\u590d\u7528\u7b56\u7565","description":"\u8def\u7531\u590d\u7528\u7b56\u7565\u4e3b\u8981\u4f9d\u636e\u5feb\u7167\u65b9\u5f0f\uff0c\u5fc5\u8981\u65f6\u5019\u9700\u8981\u624b\u52a8\u6e05\u7406\u5feb\u7167\u7f13\u5b58\uff0c\u5176\u6b21\u9700\u8981\u5728\u6839\u6a21\u5757\u8fdb\u884cprovide","source":"@site/docs/angular/Angular\u8def\u7531\u590d\u7528\u7b56\u7565/Angular\u8def\u7531\u590d\u7528\u7b56\u7565.md","sourceDirName":"angular/Angular\u8def\u7531\u590d\u7528\u7b56\u7565","slug":"/angular/Angular\u8def\u7531\u590d\u7528\u7b56\u7565/","permalink":"/zh-summary/docs/angular/Angular\u8def\u7531\u590d\u7528\u7b56\u7565/","draft":false,"unlisted":false,"editUrl":"https://github.com/qinzhihao-conghua/docs/angular/Angular\u8def\u7531\u590d\u7528\u7b56\u7565/Angular\u8def\u7531\u590d\u7528\u7b56\u7565.md","tags":[],"version":"current","frontMatter":{"title":"Angular\u8def\u7531\u590d\u7528\u7b56\u7565"},"sidebar":"tutorialSidebar","previous":{"title":"Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6","permalink":"/zh-summary/docs/"},"next":{"title":"angular\u5de5\u4f5c\u533a","permalink":"/zh-summary/docs/angular/angular\u5de5\u4f5c\u533a/"}}');var a=n(4848),o=n(8453);const u={title:"Angular\u8def\u7531\u590d\u7528\u7b56\u7565"},s=void 0,l={},i=[];function c(e){const t={code:"code",p:"p",pre:"pre",...(0,o.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.p,{children:"\u8def\u7531\u590d\u7528\u7b56\u7565\u4e3b\u8981\u4f9d\u636e\u5feb\u7167\u65b9\u5f0f\uff0c\u5fc5\u8981\u65f6\u5019\u9700\u8981\u624b\u52a8\u6e05\u7406\u5feb\u7167\u7f13\u5b58\uff0c\u5176\u6b21\u9700\u8981\u5728\u6839\u6a21\u5757\u8fdb\u884cprovide"}),"\n",(0,a.jsx)(t.p,{children:"1\u3001class \u5b9e\u73b0RouteReuseStrategy"}),"\n",(0,a.jsx)(t.p,{children:"2\u3001\u6839\u6a21\u5757provide\u8def\u7531\u590d\u7528\u7b56\u7565"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-javascript",children:"providers: [\n    { provide: RouteReuseStrategy, useClass: CustomerReuseStrategy }\n],\n"})}),"\n",(0,a.jsx)(t.p,{children:"3\u3001\u5bf9\u8981\u8fdb\u884c\u8def\u7531\u590d\u7528\u7684\u8def\u7531\u8fdb\u884c\u6807\u8bb0\uff0c\u8fd9\u91cc\u662fkeepalive"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-javascript",children:"{ path: 'xxx', component: xxxComponent, data: { keepalive: true } },\n"})}),"\n",(0,a.jsx)(t.p,{children:"\u5b9e\u73b0\u4ee3\u7801\u5982\u4e0b\uff0c\u53ef\u6839\u636e\u4e1a\u52a1\u60c5\u51b5\u8c03\u6574"}),"\n",(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:"language-javascript",children:'import { ActivatedRouteSnapshot, DetachedRouteHandle, Route, RouteReuseStrategy } from "@angular/router";\n\nexport class CustomerReuseStrategy implements RouteReuseStrategy {\n    static handlers: Map<Route, DetachedRouteHandle> = new Map();\n    // \u662f\u5426\u5141\u8bb8\u590d\u7528\u8def\u7531\n    shouldDetach(route: ActivatedRouteSnapshot): boolean {\n        // return !route.firstChild;\n        return Boolean(route.data["keepalive"]);\n    }\n    // \u662f\u5426\u5141\u8bb8\u8fd8\u539f\u8def\u7531\n    shouldAttach(route: ActivatedRouteSnapshot): boolean {\n        return !!CustomerReuseStrategy.handlers.has(route.routeConfig);\n    }\n    // \u76f8\u540c\u8def\u7531\u662f\u5426\u590d\u7528(\u8def\u7531\u8fdb\u5165\u89e6\u53d1)\n    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot) {\n        return curr.routeConfig === future.routeConfig;\n    }\n    // \u83b7\u53d6\u5b58\u50a8\u8def\u7531\n    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle {\n        // return CustomerReuseStrategy.handlers.get(route.routeConfig);\n        if (Boolean(route.data["keepalive"])) {\n            return CustomerReuseStrategy.handlers.get(route.routeConfig);\n        } else {\n            return false;\n        }\n    }\n    // \u5b58\u5165\u8def\u7531(\u8def\u7531\u79bb\u5f00\u51fa\u53d1)\n    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {\n        CustomerReuseStrategy.handlers.set(route.routeConfig, handle);\n    }\n}\n'})})]})}function d(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(c,{...e})}):c(e)}},8453:(e,t,n)=>{n.d(t,{R:()=>u,x:()=>s});var r=n(6540);const a={},o=r.createContext(a);function u(e){const t=r.useContext(o);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(a):e.components||a:u(e.components),r.createElement(o.Provider,{value:t},e.children)}}}]);