!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t(require("vue")):"function"==typeof define&&define.amd?define(["vue"],t):(e="undefined"!=typeof globalThis?globalThis:e||self)["re-time-picker"]=t(e.Vue)}(this,(function(e){"use strict";function t(t){return"function"==typeof t?t():e.unref(t)}const n="undefined"!=typeof window&&"undefined"!=typeof document,o=Object.prototype.toString,l=e=>"[object Object]"===o.call(e),a=()=>{},r=i();function i(){var e;return n&&(null==(e=null==window?void 0:window.navigator)?void 0:e.userAgent)&&/iP(ad|hone|od)/.test(window.navigator.userAgent)}function s(e){var n;const o=t(e);return null!=(n=null==o?void 0:o.$el)?n:o}const c=n?window:void 0;function u(...n){let o,r,i,u;if("string"==typeof n[0]||Array.isArray(n[0])?([r,i,u]=n,o=c):[o,r,i,u]=n,!o)return a;Array.isArray(r)||(r=[r]),Array.isArray(i)||(i=[i]);const m=[],d=()=>{m.forEach((e=>e())),m.length=0},p=e.watch((()=>[s(o),t(u)]),(([e,t])=>{if(d(),!e)return;const n=l(t)?{...t}:t;m.push(...r.flatMap((t=>i.map((o=>((e,t,n,o)=>(e.addEventListener(t,n,o),()=>e.removeEventListener(t,n,o)))(e,t,o,n))))))}),{immediate:!0,flush:"post"}),f=()=>{p(),d()};var h;return h=f,e.getCurrentScope()&&e.onScopeDispose(h),f}let m=!1;const d="object"==typeof global&&global&&global.Object===Object&&global;var p="object"==typeof self&&self&&self.Object===Object&&self;const f=d||p||Function("return this")();const h=f.Symbol;var v=Object.prototype,y=v.hasOwnProperty,g=v.toString,_=h?h.toStringTag:void 0;var k=Object.prototype.toString;var w="[object Null]",E="[object Undefined]",T=h?h.toStringTag:void 0;function B(e){return null==e?void 0===e?E:w:T&&T in Object(e)?function(e){var t=y.call(e,_),n=e[_];try{e[_]=void 0;var o=!0}catch(a){}var l=g.call(e);return o&&(t?e[_]=n:delete e[_]),l}(e):function(e){return k.call(e)}(e)}var x="[object Symbol]";var S=/\s/;var V=/^\s+/;function b(e){return e?e.slice(0,function(e){for(var t=e.length;t--&&S.test(e.charAt(t)););return t}(e)+1).replace(V,""):e}function A(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}var C=NaN,N=/^[-+]0x[0-9a-f]+$/i,M=/^0b[01]+$/i,H=/^0o[0-7]+$/i,D=parseInt;function I(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return null!=e&&"object"==typeof e}(e)&&B(e)==x}(e))return C;if(A(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=A(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=b(e);var n=M.test(e);return n||H.test(e)?D(e.slice(2),n?2:8):N.test(e)?C:+e}const j=function(){return f.Date.now()};var L=Math.max,P=Math.min;function O(e,t,n){var o,l,a,r,i,s,c=0,u=!1,m=!1,d=!0;if("function"!=typeof e)throw new TypeError("Expected a function");function p(t){var n=o,a=l;return o=l=void 0,c=t,r=e.apply(a,n)}function f(e){var n=e-s;return void 0===s||n>=t||n<0||m&&e-c>=a}function h(){var e=j();if(f(e))return v(e);i=setTimeout(h,function(e){var n=t-(e-s);return m?P(n,a-(e-c)):n}(e))}function v(e){return i=void 0,d&&o?p(e):(o=l=void 0,r)}function y(){var e=j(),n=f(e);if(o=arguments,l=this,s=e,n){if(void 0===i)return function(e){return c=e,i=setTimeout(h,t),u?p(e):r}(s);if(m)return clearTimeout(i),i=setTimeout(h,t),p(s)}return void 0===i&&(i=setTimeout(h,t)),r}return t=I(t)||0,A(n)&&(u=!!n.leading,a=(m="maxWait"in n)?L(I(n.maxWait)||0,t):a,d="trailing"in n?!!n.trailing:d),y.cancel=function(){void 0!==i&&clearTimeout(i),c=0,o=s=l=i=void 0},y.flush=function(){return void 0===i?r:v(j())},y}const z=/([0-9]{1,2}:[0-9]{1,2})/,R=/([0-9]{1,2}:[0-9]{1,2}:[0-9]{1,2})/,$=/([H|h]{1,2}:[m]{1,2})/,F=/([H|h]{1,2}:[m]{1,2}:[s]{1,2})/,W=/([0-9]{1,2}):([0-9]{1,2})/,Z=/([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})/,U=/[H|h|m|s|A|a]{1,2}/g,G={am:"AM",pm:"PM",hour:"Hour",min:"Min",sec:"Sec",apm:"AM/PM"},J={hour:["H","HH","hh","h"],min:["mm","m"],sec:["ss","s"],amp:["A","a"]},Q={h:{min:0,max:23},m:{min:0,max:59},s:{min:0,max:59}},Y=(e,t,n)=>{let o=0;o="h"===e?"12h"===t?12:24:60;const l=[],a=e=>{e>=0&&e<o&&l.push(e)};return n.forEach((e=>{const t=(e=>{try{if(Array.isArray(e)){const[t,n]=e;if("number"==typeof t&&"number"==typeof n&&n>t)return!0}return!1}catch{return!1}})(e);if("number"==typeof e)a(e);else if(t)for(let n=e[0];n<=e[1];n++)a(n)})),l},q=e=>e.every((e=>Array.isArray(e)?q(e):"number"==typeof e)),X=(e,t,n,o,l)=>{const a=((e,t)=>{let n=[],o=!1;return Array.isArray(t)&&t.length>0&&(o=q(t)),n=o?t:((e,t)=>{const n=[];for(let o=e;o<=t;o++)n.push(o);return n})(Q[e].min,Q[e].max),n})(e,t);let r=Y(e,n,a);const i=null==l?void 0:l.interval;i&&(r=r.filter((e=>e%i==0)));const s=[],c=["","",""];s.push(...c);for(let u=0;u<r.length;u++){let e=r[u].toString();r[u]<10&&(e=`0${e}`),s.push(e)}return s.push(...c),s},K="HH:mm:ss A",ee=["","","","am","pm","","",""],te={class:"time-list"},ne={key:0,class:"time-range"},oe={class:"time-range__header"},le={class:"time-range"},ae={class:"time-range__header"},re={class:"time-range"},ie={class:"time-range__header"},se={key:1,class:"time-range"},ce={class:"time-range__header"},ue={key:2,class:"time-range"},me={class:"time-range__header"},de=30,pe=(e,t)=>{const n=e.__vccOpts||e;for(const[o,l]of t)n[o]=l;return n},fe=pe(e.defineComponent({__name:"TimeList",props:{timeData:{},timeString:{},show:{type:Boolean},isValidAType:{type:Boolean,default:!1},formatType:{default:"HMS"},apmColumnPlacement:{},customText:{},isValidModelValue:{type:Boolean,default:!1},showHeader:{type:Boolean,default:!0},hourRange:{default:()=>[]},minRange:{default:()=>[]},secRange:{default:()=>[]},hMode:{}},emits:["updateTime"],setup(t,{emit:n}){const o=t,l=n,a=e.computed((()=>o.isValidAType&&"HMS"===o.formatType?["25","50","75"]:o.isValidAType||"HM"!==o.formatType?["33.333333","66.666667"]:["50"])),r=e.ref(),i=e.ref(),s=e.ref(),c=e.ref(),u=e.computed((()=>({h:X("h",o.hourRange,o.hMode,o.showHeader,{isValidAType:o.isValidAType}),m:X("m",o.minRange,o.hMode,o.showHeader,{}),s:X("s",o.secRange,o.hMode,o.showHeader,{}),apm:ee}))),m=e.computed((()=>({am:o.customText.am,pm:o.customText.pm}))),d=(e,t)=>{const n=e.replace("tl",""),a=t/de,r=u.value[n][a+3],{h:i,m:s,s:c,apm:d}=o.timeData,p={h:"h"===n?r:i,m:"m"===n?r:s,s:"s"===n?r:c,apm:"apm"===n?m.value[r]:d};l("updateTime",p)},p=(e,t)=>{"tlh"===e&&(r.value.scrollTop=t),"tlm"===e&&(i.value.scrollTop=t),"tls"===e&&"HMS"===o.formatType&&(s.value.scrollTop=t),"tlapm"===e&&o.isValidAType&&(c.value.scrollTop=t)},f=e=>{const t=(e=>"tlh"===e?r.value.scrollTop:"tlm"===e?i.value.scrollTop:"tls"===e&&"HMS"===o.formatType?s.value.scrollTop:"tlapm"===e&&o.isValidAType?c.value.scrollTop:void 0)(e);if(t/de!=0){const n=t%de;let o=Math.floor(t/de);n>15&&(o+=1);const l=o*de;return p(e,l),void d(e,l)}d(e,t)},h=O((e=>{f(e)}),100),v=async()=>{if(!o.isValidModelValue)return;await e.nextTick();const t=u.value.h.findIndex((e=>e===o.timeData.h))-3,n=u.value.m.findIndex((e=>e===o.timeData.m))-3,l=u.value.s.findIndex((e=>e===o.timeData.s))-3,a=u.value.apm.findIndex((e=>""!==e&&o.customText[e]===o.timeData.apm))-3;p("tlh",(t>0?t:0)*de),p("tlm",(n>0?n:0)*de),p("tls",(l>0?l:0)*de),p("tlapm",(a>0?a:0)*de)};return e.watch((()=>[o.show,o.isValidModelValue,o.timeString]),(e=>{e[0]&&e[1]&&v()})),v(),(t,n)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["re-time-list",{"re-time-list--show-header":t.showHeader}])},[e.createElementVNode("div",te,[t.isValidAType&&"first"===t.apmColumnPlacement?(e.openBlock(),e.createElementBlock("div",ne,[e.createElementVNode("span",oe,e.toDisplayString(t.customText.apm),1),e.createElementVNode("div",{ref_key:"tlapm",ref:c,class:"time-range__list",onScroll:n[0]||(n[0]=()=>e.unref(h)("tlapm"))},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(u).apm,(n=>(e.openBlock(),e.createElementBlock("span",{key:n,class:"time-range__list__item"},e.toDisplayString(""===n?n:t.customText[n]),1)))),128))],544)])):e.createCommentVNode("",!0),e.createElementVNode("div",le,[e.createElementVNode("span",ae,e.toDisplayString(t.customText.hour),1),e.createElementVNode("div",{ref_key:"tlh",ref:r,class:"time-range__list",onScroll:n[1]||(n[1]=()=>e.unref(h)("tlh"))},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(u).h,((t,n)=>(e.openBlock(),e.createElementBlock("span",{key:t+n,class:"time-range__list__item"},e.toDisplayString(t),1)))),128))],544)]),e.createElementVNode("div",re,[e.createElementVNode("span",ie,e.toDisplayString(t.customText.min),1),e.createElementVNode("div",{ref_key:"tlm",ref:i,class:"time-range__list",onScroll:n[2]||(n[2]=()=>e.unref(h)("tlm"))},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(u).m,((t,n)=>(e.openBlock(),e.createElementBlock("span",{key:t+n,class:"time-range__list__item"},e.toDisplayString(t),1)))),128))],544)]),"HMS"===t.formatType?(e.openBlock(),e.createElementBlock("div",se,[e.createElementVNode("span",ce,e.toDisplayString(t.customText.sec),1),e.createElementVNode("div",{ref_key:"tls",ref:s,class:"time-range__list",onScroll:n[3]||(n[3]=()=>e.unref(h)("tls"))},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(u).s,((t,n)=>(e.openBlock(),e.createElementBlock("span",{key:t+n,class:"time-range__list__item"},e.toDisplayString(t),1)))),128))],544)])):e.createCommentVNode("",!0),t.isValidAType&&"last"===t.apmColumnPlacement?(e.openBlock(),e.createElementBlock("div",ue,[e.createElementVNode("span",me,e.toDisplayString(t.customText.apm),1),e.createElementVNode("div",{ref_key:"tlapm",ref:c,class:"time-range__list",onScroll:n[4]||(n[4]=()=>e.unref(h)("tlapm"))},[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(u).apm,(n=>(e.openBlock(),e.createElementBlock("span",{key:n,class:"time-range__list__item"},e.toDisplayString(n?t.customText[n]:n),1)))),128))],544)])):e.createCommentVNode("",!0)]),(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(e.unref(a),(t=>(e.openBlock(),e.createElementBlock("div",{key:t,class:"divider-line divider-line--25",style:e.normalizeStyle({left:`${t}%`})},null,4)))),128))],2))}}),[["__scopeId","data-v-bbb19562"]]),he={class:"re-field-shell__content"},ve={key:0,class:"re-field-shell__content__prefix"},ye={class:"re-field-shell__content__default"},ge={key:1,class:"re-field-shell__content__suffix"},_e=e.defineComponent({__name:"FieldShell",props:{disabled:{type:Boolean,default:!1},placeholder:{default:"placeholder ..."}},setup(t){const n=e.useSlots();return(t,o)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["re-field-shell",{"re-field-shell--disabled":t.disabled}])},[e.createElementVNode("div",he,[e.unref(n).prefix?(e.openBlock(),e.createElementBlock("div",ve,[e.renderSlot(t.$slots,"prefix")])):e.createCommentVNode("",!0),e.createElementVNode("div",ye,[e.renderSlot(t.$slots,"default")]),e.unref(n).suffix?(e.openBlock(),e.createElementBlock("div",ge,[e.renderSlot(t.$slots,"suffix")])):e.createCommentVNode("",!0)])],2))}}),ke=e.defineComponent({__name:"WrapTransition",props:{show:{type:Boolean,default:!1},border:{type:Boolean,default:!0},whiteBg:{type:Boolean,default:!0}},setup:t=>(t,n)=>(e.openBlock(),e.createBlock(e.Transition,{mode:"out-in"},{default:e.withCtx((()=>[e.withDirectives(e.createElementVNode("div",{class:e.normalizeClass(["re-collapse-transition",{"re-collapse-transition--border":t.border,"re-collapse-transition--white-bg":t.whiteBg}])},[e.renderSlot(t.$slots,"default")],2),[[e.vShow,t.show]])])),_:3}))}),we={key:0,class:"field-shell-expand-transition__uppper"},Ee=pe(e.defineComponent({__name:"FieldShellExpandTransition",props:{show:{type:Boolean,default:!1},getAnchorElement:{}},setup(t){const n=t,o=e.useSlots(),{showPosition:l,calcShowPosition:a}=(t=>{const n=e.ref("bottom");return{calcShowPosition:()=>{const e=t();window.innerHeight-e.getBoundingClientRect().bottom>200?n.value="bottom":n.value="top"},showPosition:n}})(n.getAnchorElement);return e.watch((()=>n.show),(()=>{a()})),(t,n)=>(e.openBlock(),e.createElementBlock("div",{class:e.normalizeClass(["field-shell-expand-transition",[`field-shell-expand-transition--position--${e.unref(l)}`]])},[e.createVNode(ke,{show:t.show,positon:e.unref(l)},{default:e.withCtx((()=>[e.unref(o).upper?(e.openBlock(),e.createElementBlock("div",we,[e.renderSlot(t.$slots,"upper",{},void 0,!0)])):e.createCommentVNode("",!0),e.unref(o).default?e.renderSlot(t.$slots,"default",{key:1,show:t.show},void 0,!0):e.createCommentVNode("",!0)])),_:3},8,["show","positon"])],2))}}),[["__scopeId","data-v-7f0f2668"]]),Te=["value","placeholder"];return pe(e.defineComponent({__name:"TimePicker",props:{modelValue:{default:"00:00:00"},format:{default:()=>K},disabled:{type:Boolean,default:!1},placeholder:{default:""},apmColumnPlacement:{default:"last"},customText:{default:()=>({})},showIcon:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},hourRange:{default:()=>[]},minRange:{default:()=>[]},secRange:{default:()=>[]}},emits:["update:modelValue","open","close","change"],setup(t,{emit:n}){const o=t,l=n,i=e.useSlots(),d=e.ref(o.format),p=e.ref(!1),f=e.ref({h:"00",m:"00",s:"00",apm:"AM"}),h=e.ref(),v=e.ref(),y=e.reactive({h:"HH",m:"mm",s:"ss",amp:"A"}),g=e.ref("24h"),_=e.computed((()=>!!J.amp.some((e=>d.value.includes(e))))),k=e.computed((()=>{let e=null;const t=J.hour.some((e=>d.value.includes(e))),n=J.min.some((e=>d.value.includes(e)));return t&&n&&(e="HM"),J.sec.some((e=>d.value.includes(e)))&&(e="HMS"),e})),w=e.computed((()=>({...G,...o.customText}))),{isExpand:E,handleExpandStatus:T}=((t={})=>{const n=e.ref(!1);return{isExpand:n,handleExpandStatus:(e=!0,o=!1)=>{t.getDisabled&&t.getDisabled()||(n.value=e?!n.value:o,n.value&&t.afterOpen&&t.afterOpen(),n.value||t.afterClose&&t.afterClose())}}})({afterClose:()=>{l("close")},afterOpen:()=>{l("open")},getDisabled:()=>o.disabled}),B=e.ref(o.modelValue),x=e=>{const t=(e=>{const{h:t,m:n,s:o}=e,l=e.apm,a=+t,r=+t>12?+t-12:+t;return{HH:+a<10?"0"+ +a:`${a}`,H:""+ +a,hh:+r<10?"0"+ +r:`${r}`,h:""+ +r,mm:+n<10?"0"+ +n:n,m:n,ss:+o<10?"0"+ +o:o,s:o,A:/[a-zA-Z]/g.test(l)?l.toUpperCase():l,a:/[a-zA-Z]/g.test(l)?l.toLowerCase():l}})(e),n=d.value.replace(U,(e=>t[e])),{m:o,s:l}=t;f.value={h:t[y.h],m:o,s:l,apm:t[y.amp]},B.value=n},S=async t=>{x(t),l("update:modelValue",B.value),l("change",B.value),await e.nextTick()};return(()=>{p.value=!1;const e=(()=>{const e=e=>{const t=e.replace(/\s/g,"");return!!["a","A",""].includes(t)};if(F.test(d.value))return e(d.value.replace(F,""));if($.test(d.value))return e(d.value.replace($,""));return!1})(),[t,n]=(()=>{if(R.test(o.modelValue)){let e=o.modelValue.replace(R,"");if(e=e.replace(/\s/g,""),""===e)return["hms",""];const{am:t,pm:n}=w.value;if([t,n].includes(e))return["hms",e]}if(z.test(o.modelValue)){let e=o.modelValue.replace(z,"");if(e=e.replace(/\s/g,""),""===e)return["hm",""];const{am:t,pm:n}=w.value;if([t,n].includes(e))return["hm",e]}return[null,""]})();if(t&&e){const e=((e,t="")=>{["a","A"].includes(t)&&(y.amp=t);let n={h:"",m:"",s:"",apm:""};if("hms"===e){const e=o.modelValue.match(Z);n={h:(null==e?void 0:e[1])||"",m:(null==e?void 0:e[2])||"",s:(null==e?void 0:e[3])||"",apm:t}}if("hm"===e){const e=o.modelValue.match(W);n={h:(null==e?void 0:e[1])||"",m:(null==e?void 0:e[2])||"",s:"",apm:t}}return n})(t,n);x(e)}else{const e=(d.value=K,{h:"00",m:"00",s:"00",apm:G.am});x(e)}(()=>{const e=d.value.match(/h/)||d.value.match(/hh/),t=d.value.match(/H/)||d.value.match(/HH/);e&&(g.value="12h"),t&&(g.value="24h")})(),p.value=!0})(),e.watch((()=>o.modelValue),(()=>{})),function(e,t,n={}){const{window:o=c,ignore:l=[],capture:i=!0,detectIframe:d=!1}=n;if(!o)return;r&&!m&&(m=!0,Array.from(o.document.body.children).forEach((e=>e.addEventListener("click",a))),o.document.documentElement.addEventListener("click",a));let p=!0;const f=e=>l.some((t=>{if("string"==typeof t)return Array.from(o.document.querySelectorAll(t)).some((t=>t===e.target||e.composedPath().includes(t)));{const n=s(t);return n&&(e.target===n||e.composedPath().includes(n))}})),h=[u(o,"click",(n=>{const o=s(e);o&&o!==n.target&&!n.composedPath().includes(o)&&(0===n.detail&&(p=!f(n)),p?t(n):p=!0)}),{passive:!0,capture:i}),u(o,"pointerdown",(t=>{const n=s(e);n&&(p=!t.composedPath().includes(n)&&!f(t))}),{passive:!0}),d&&u(o,"blur",(n=>{setTimeout((()=>{var l;const a=s(e);"IFRAME"!==(null==(l=o.document.activeElement)?void 0:l.tagName)||(null==a?void 0:a.contains(o.document.activeElement))||t(n)}),0)}))].filter(Boolean)}(v,(()=>T(!1))),(t,n)=>(e.openBlock(),e.createElementBlock("div",{ref_key:"reTimePickerRef",ref:v,class:"re-time-picker"},[e.createVNode(_e,{disabled:t.disabled},e.createSlots({default:e.withCtx((()=>[e.createElementVNode("div",{class:"time-picker",onClick:n[0]||(n[0]=()=>e.unref(T)(!0))},[e.createElementVNode("input",{value:e.unref(B),class:"time-picker__field",readonly:"",placeholder:t.placeholder},null,8,Te)])])),suffix:e.withCtx((()=>[e.renderSlot(t.$slots,"suffix",{},(()=>[t.showIcon?(e.openBlock(),e.createElementBlock("img",{key:0,class:e.normalizeClass(["drop-icon",{"drop-icon--active":e.unref(E)}]),src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBmaWxsPSJjdXJyZW50Q29sb3IiIGQ9Ik0xMiAyMGM0LjQgMCA4LTMuNiA4LThzLTMuNi04LTgtOHMtOCAzLjYtOCA4czMuNiA4IDggOG0wLTE4YzUuNSAwIDEwIDQuNSAxMCAxMHMtNC41IDEwLTEwIDEwUzIgMTcuNSAyIDEyUzYuNSAyIDEyIDJtNSA5LjVWMTNoLTZWN2gxLjV2NC41SDE3WiIvPjwvc3ZnPg=="},null,2)):e.createCommentVNode("",!0)]),!0)])),_:2},[e.unref(i).prefix?{name:"prefix",fn:e.withCtx((()=>[e.renderSlot(t.$slots,"prefix",{},void 0,!0)])),key:"0"}:void 0]),1032,["disabled"]),e.createVNode(Ee,{show:e.unref(E),"get-anchor-element":()=>e.unref(v)},{upper:e.withCtx((()=>[e.renderSlot(t.$slots,"upper",{},void 0,!0)])),default:e.withCtx((({show:n})=>[e.createVNode(fe,{ref_key:"timeListRef",ref:h,"time-data":e.unref(f),"time-string":e.unref(B),"is-valid-model-value":e.unref(p),show:n,"show-header":t.showHeader,"is-valid-a-type":e.unref(_),"format-type":e.unref(k),"apm-column-placement":t.apmColumnPlacement,"custom-text":e.unref(w),"hour-range":t.hourRange,"min-range":t.minRange,"sec-range":t.secRange,"h-mode":e.unref(g),onUpdateTime:S},null,8,["time-data","time-string","is-valid-model-value","show","show-header","is-valid-a-type","format-type","apm-column-placement","custom-text","hour-range","min-range","sec-range","h-mode"])])),_:3},8,["show","get-anchor-element"])],512))}}),[["__scopeId","data-v-92236f71"]])}));
