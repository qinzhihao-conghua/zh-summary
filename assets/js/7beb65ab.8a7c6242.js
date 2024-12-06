"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[6143],{5912:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>i,contentTitle:()=>s,default:()=>d,frontMatter:()=>o,metadata:()=>t,toc:()=>l});const t=JSON.parse('{"id":"angular/canDeactivate\u8def\u7531\u5b88\u536b/canDeactivate\u8def\u7531\u5b88\u536b","title":"canDeactivate\u8def\u7531\u5b88\u536b","description":"\u4e00\uff1a\u5b9a\u4e49\u5b88\u536b\u6587\u4ef6\uff0c\u6ce8\u518c\u5230\u5bf9\u5e94\u7684module\u4e2d","source":"@site/docs/angular/canDeactivate\u8def\u7531\u5b88\u536b/canDeactivate\u8def\u7531\u5b88\u536b.md","sourceDirName":"angular/canDeactivate\u8def\u7531\u5b88\u536b","slug":"/angular/canDeactivate\u8def\u7531\u5b88\u536b/","permalink":"/zh-summary/docs/angular/canDeactivate\u8def\u7531\u5b88\u536b/","draft":false,"unlisted":false,"editUrl":"https://github.com/qinzhihao-conghua/docs/angular/canDeactivate\u8def\u7531\u5b88\u536b/canDeactivate\u8def\u7531\u5b88\u536b.md","tags":[],"version":"current","frontMatter":{"title":"canDeactivate\u8def\u7531\u5b88\u536b"},"sidebar":"tutorialSidebar","previous":{"title":"Angular\u81ea\u5b9a\u4e49\u8868\u5355\u7ec4\u4ef6","permalink":"/zh-summary/docs/angular/Angular\u8def\u7531\u590d\u7528\u7b56\u7565/"},"next":{"title":"\u901a\u7528\u7ec4\u4ef6\u65f6\u7684\u6269\u5c55\u6027","permalink":"/zh-summary/docs/angular/\u901a\u7528\u7ec4\u4ef6\u65f6\u7684\u6269\u5c55\u6027/"}}');var c=a(4848),r=a(8453);const o={title:"canDeactivate\u8def\u7531\u5b88\u536b"},s=void 0,i={},l=[];function u(e){const n={code:"code",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(n.p,{children:"\u4e00\uff1a\u5b9a\u4e49\u5b88\u536b\u6587\u4ef6\uff0c\u6ce8\u518c\u5230\u5bf9\u5e94\u7684module\u4e2d"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-javascript",children:"import { CanDeactivate } from '@angular/router';\nimport { Injectable } from '@angular/core';\nimport { Observable, of } from 'rxjs';\n\n/**\u5b9a\u4e49\u4e2a\u63a5\u53e3\uff0c\u7531\u9700\u8981\u4f7f\u7528\u5b88\u536b\u7684\u7ec4\u4ef6\u53bb\u5b9e\u73b0 */\nexport interface CanComponentDeactivate {\n    canDeactivate: () => Observable<boolean>;\n}\n\n@Injectable()\nexport class CanDeactivateGuardService implements CanDeactivate<CanComponentDeactivate> {\n\n    constructor() { }\n\n    canDeactivate(component: CanComponentDeactivate): Observable<boolean> {\n        return component.canDeactivate();\n    }\n}\n"})}),"\n",(0,c.jsxs)(n.p,{children:["\u4e8c\uff1a\u5728\u9700\u8981\u786e\u8ba4\u7684\u7ec4\u4ef6\u91cc\u7f16\u5199\u786e\u8ba4\u903b\u8f91\uff0c\u8fd4\u56de\u503c\u53ef\u4ee5\u662f",(0,c.jsx)(n.code,{children:"Observable<boolean> | Promise<boolean> | boolean;"})]}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-javascript",children:"@HostListener('window:beforeunload')\ncanDeactivate(): Observable<boolean> {\n    const result = this.checkSchedulePerson();\n    if (result) {\n        const obs: any = new Subject();\n        const modal = this.modalService.create({\n            nzTitle: '\u786e\u8ba4\u662f\u5426\u79bb\u5f00',\n            nzContent: this.scheduleTemp,\n            nzOnCancel: () => {\n                obs.next(false);\n            },\n            nzOnOk: () => obs.next(true)\n        });\n        return obs;\n    } else {\n        return of(true);\n    }\n}\n"})}),"\n",(0,c.jsx)(n.p,{children:"\u4e09\uff1a\u5728\u5bf9\u5e94\u7684\u8def\u7531\u52a0\u4e0a\u5b88\u536b"}),"\n",(0,c.jsx)(n.pre,{children:(0,c.jsx)(n.code,{className:"language-javascript",children:"{\n    path: 'xxx-path',\n    component: xxxComponent,\n    canDeactivate: [CanDeactivateGuardService],\n}\n"})})]})}function d(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(u,{...e})}):u(e)}},8453:(e,n,a)=>{a.d(n,{R:()=>o,x:()=>s});var t=a(6540);const c={},r=t.createContext(c);function o(e){const n=t.useContext(r);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function s(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(c):e.components||c:o(e.components),t.createElement(r.Provider,{value:n},e.children)}}}]);