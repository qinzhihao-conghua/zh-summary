"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[4324],{6878:(n,e,t)=>{t.r(e),t.d(e,{assets:()=>l,contentTitle:()=>i,default:()=>d,frontMatter:()=>o,metadata:()=>a,toc:()=>c});const a=JSON.parse('{"id":"angular/Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6/Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6","title":"Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6","description":"--\x3e","source":"@site/docs/angular/Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6/Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6.md","sourceDirName":"angular/Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6","slug":"/","permalink":"/zh-summary/docs/","draft":false,"unlisted":false,"editUrl":"https://github.com/qinzhihao-conghua/docs/angular/Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6/Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6.md","tags":[],"version":"current","frontMatter":{"title":"Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6","slug":"/"},"sidebar":"tutorialSidebar","next":{"title":"Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6","permalink":"/zh-summary/docs/angular/Angular\u8def\u7531\u590d\u7528\u7b56\u7565/"}}');var r=t(4848),s=t(8453);const o={title:"Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6",slug:"/"},i=void 0,l={},c=[];function u(n){const e={code:"code",p:"p",pre:"pre",...(0,s.R)(),...n.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(e.p,{children:"1 \u65b0\u5efa\u4e00\u4e2a\u666e\u901a\u7684\u7ec4\u4ef6"}),"\n",(0,r.jsxs)(e.p,{children:["2 \u5728\u7ec4\u4ef6\u7684",(0,r.jsx)(e.code,{children:"@Component"}),"\u88c5\u9970\u5668\u4e2d\u6dfb\u52a0",(0,r.jsx)(e.code,{children:"providers:[]"}),"\uff0c\u503c\u4e3a\uff1a"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"{\n\tprovide:NG_VALUE_ACCRSSOR,\n\t// forwardRef\u91cc\u7684\u503c\u8fd4\u56de\u7684\u662f\u5f53\u524d\u7ec4\u4ef6\n\tuseExisting:forwardRef(()=>DemoComponent),\n\tmulti:true\n}\n"})}),"\n",(0,r.jsxs)(e.p,{children:["3 \u7ec4\u4ef6\u5b9e\u73b0",(0,r.jsx)(e.code,{children:"ControlValueAccessor"}),"\u63a5\u53e3\uff0c\u63a5\u53e3\u8981\u5b9e\u73b0\u65b9\u6cd5\u6709\u4ee5\u4e0b"]}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"export class DemoComponent implements OnInit, ControlValueAccessor{\n    writeValue(obj: any): void // \u5f53 model \u53d1\u751f\u6539\u53d8\u65f6\uff0c\u89e6\u53d1\u8be5\u65b9\u6cd5\u3002\n\tregisterOnChange(fn: any): void // \u6ce8\u518c onChange \u4e8b\u4ef6\u3002\n\tregisterOnTouched(fn: any): void // \u6ce8\u518c onTouched \u4e8b\u4ef6\n\tsetDisabledState?(isDisabled: boolean): void // \u8bbe\u7f6e\u7ec4\u4ef6\u7684\u7981\u7528\u72b6\u6001\uff0c\u53ef\u9009\u5b9e\u73b0\u3002 \n}\n"})}),"\n",(0,r.jsx)(e.p,{children:"4 \u5b9e\u73b0\u5185\u5bb9\u53c2\u8003"}),"\n",(0,r.jsx)(e.pre,{children:(0,r.jsx)(e.code,{className:"language-javascript",children:"value: string = '0'\nisDisabled = false\n\nonChange = (value: string) => {}\nonTouched = () => {}\n// \u5f53ngModel\u503c\u53d8\u5316\u7684\u65f6\u5019\u4f1a\u81ea\u52a8\u6267\u884c\u8be5\u65b9\u6cd5\uff0c\u7ec4\u4ef6\u521d\u59cb\u5316\u4e4b\u540e\u4f1a\u6267\u884c\u4e24\u6b21\uff0c\u7b2c\u4e00\u6b21value\u662fnull\uff0c\u662f\u4e2abug\uff0c\u5b98\u65b9\u4e0d\u4fee\u590d\nwriteValue(value: any): void {\n\tthis.value = value\n}\n\nregisterOnChange(fn: any): void {\n\tthis.onChange = fn\n}\n\nregisterOnTouched(fn: any): void {\n\tthis.onTouched = fn\n}\n\nsetDisabledState?(isDisabled: boolean): void {\n\tthis.isDisabled = isDisabled\n}\n"})})]})}function d(n={}){const{wrapper:e}={...(0,s.R)(),...n.components};return e?(0,r.jsx)(e,{...n,children:(0,r.jsx)(u,{...n})}):u(n)}},8453:(n,e,t)=>{t.d(e,{R:()=>o,x:()=>i});var a=t(6540);const r={},s=a.createContext(r);function o(n){const e=a.useContext(s);return a.useMemo((function(){return"function"==typeof n?n(e):{...e,...n}}),[e,n])}function i(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(r):n.components||r:o(n.components),a.createElement(s.Provider,{value:e},n.children)}}}]);