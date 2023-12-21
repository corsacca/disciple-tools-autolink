/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=window,Y=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,j=Symbol(),Q=new WeakMap;let pt=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==j)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Y&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=Q.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Q.set(e,t))}return t}toString(){return this.cssText}};const At=s=>new pt(typeof s=="string"?s:s+"",void 0,j),Et=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((i,r,n)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[n+1],s[0]);return new pt(e,s,j)},wt=(s,t)=>{Y?s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),r=O.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)})},X=Y?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return At(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var z;const N=window,tt=N.trustedTypes,kt=tt?tt.emptyScript:"",et=N.reactiveElementPolyfillSupport,q={toAttribute(s,t){switch(t){case Boolean:s=s?kt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},ft=(s,t)=>t!==s&&(t==t||s==s),I={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:ft},J="finalized";let g=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const r=this._$Ep(i,e);r!==void 0&&(this._$Ev.set(r,i),t.push(r))}),t}static createProperty(t,e=I){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Object.defineProperty(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(r){const n=this[t];this[e]=r,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||I}static finalize(){if(this.hasOwnProperty(J))return!1;this[J]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const r of i)this.createProperty(r,e[r])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)e.unshift(X(r))}else t!==void 0&&e.push(X(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return wt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=I){var r;const n=this.constructor._$Ep(t,i);if(n!==void 0&&i.reflect===!0){const o=(((r=i.converter)===null||r===void 0?void 0:r.toAttribute)!==void 0?i.converter:q).toAttribute(e,i.type);this._$El=t,o==null?this.removeAttribute(n):this.setAttribute(n,o),this._$El=null}}_$AK(t,e){var i;const r=this.constructor,n=r._$Ev.get(t);if(n!==void 0&&this._$El!==n){const o=r.getPropertyOptions(n),l=typeof o.converter=="function"?{fromAttribute:o.converter}:((i=o.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?o.converter:q;this._$El=n,this[n]=l.fromAttribute(e,o.type),this._$El=null}}requestUpdate(t,e,i){let r=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||ft)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):r=!1),!this.isUpdatePending&&r&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((r,n)=>this[n]=r),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(r=>{var n;return(n=r.hostUpdate)===null||n===void 0?void 0:n.call(r)}),this.update(i)):this._$Ek()}catch(r){throw e=!1,this._$Ek(),r}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var r;return(r=i.hostUpdated)===null||r===void 0?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};g[J]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},et==null||et({ReactiveElement:g}),((z=N.reactiveElementVersions)!==null&&z!==void 0?z:N.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var L;const H=window,b=H.trustedTypes,it=b?b.createPolicy("lit-html",{createHTML:s=>s}):void 0,Z="$lit$",v=`lit$${(Math.random()+"").slice(9)}$`,vt="?"+v,St=`<${vt}>`,m=document,S=()=>m.createComment(""),C=s=>s===null||typeof s!="object"&&typeof s!="function",yt=Array.isArray,Ct=s=>yt(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",B=`[ 	
\f\r]`,E=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rt=/-->/g,st=/>/g,y=RegExp(`>|${B}(?:([^\\s"'>=/]+)(${B}*=${B}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),nt=/'/g,ot=/"/g,$t=/^(?:script|style|textarea|title)$/i,Pt=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),U=Pt(1),_=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),at=new WeakMap,$=m.createTreeWalker(m,129,null,!1);function mt(s,t){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return it!==void 0?it.createHTML(t):t}const xt=(s,t)=>{const e=s.length-1,i=[];let r,n=t===2?"<svg>":"",o=E;for(let l=0;l<e;l++){const a=s[l];let d,c,h=-1,p=0;for(;p<a.length&&(o.lastIndex=p,c=o.exec(a),c!==null);)p=o.lastIndex,o===E?c[1]==="!--"?o=rt:c[1]!==void 0?o=st:c[2]!==void 0?($t.test(c[2])&&(r=RegExp("</"+c[2],"g")),o=y):c[3]!==void 0&&(o=y):o===y?c[0]===">"?(o=r??E,h=-1):c[1]===void 0?h=-2:(h=o.lastIndex-c[2].length,d=c[1],o=c[3]===void 0?y:c[3]==='"'?ot:nt):o===ot||o===nt?o=y:o===rt||o===st?o=E:(o=y,r=void 0);const f=o===y&&s[l+1].startsWith("/>")?" ":"";n+=o===E?a+St:h>=0?(i.push(d),a.slice(0,h)+Z+a.slice(h)+v+f):a+v+(h===-2?(i.push(void 0),l):f)}return[mt(s,n+(s[e]||"<?>")+(t===2?"</svg>":"")),i]};class P{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let n=0,o=0;const l=t.length-1,a=this.parts,[d,c]=xt(t,e);if(this.el=P.createElement(d,i),$.currentNode=this.el.content,e===2){const h=this.el.content,p=h.firstChild;p.remove(),h.append(...p.childNodes)}for(;(r=$.nextNode())!==null&&a.length<l;){if(r.nodeType===1){if(r.hasAttributes()){const h=[];for(const p of r.getAttributeNames())if(p.endsWith(Z)||p.startsWith(v)){const f=c[o++];if(h.push(p),f!==void 0){const bt=r.getAttribute(f.toLowerCase()+Z).split(v),T=/([.?@])?(.*)/.exec(f);a.push({type:1,index:n,name:T[2],strings:bt,ctor:T[1]==="."?Ut:T[1]==="?"?Dt:T[1]==="@"?Nt:M})}else a.push({type:6,index:n})}for(const p of h)r.removeAttribute(p)}if($t.test(r.tagName)){const h=r.textContent.split(v),p=h.length-1;if(p>0){r.textContent=b?b.emptyScript:"";for(let f=0;f<p;f++)r.append(h[f],S()),$.nextNode(),a.push({type:2,index:++n});r.append(h[p],S())}}}else if(r.nodeType===8)if(r.data===vt)a.push({type:2,index:n});else{let h=-1;for(;(h=r.data.indexOf(v,h+1))!==-1;)a.push({type:7,index:n}),h+=v.length-1}n++}}static createElement(t,e){const i=m.createElement("template");return i.innerHTML=t,i}}function A(s,t,e=s,i){var r,n,o,l;if(t===_)return t;let a=i!==void 0?(r=e._$Co)===null||r===void 0?void 0:r[i]:e._$Cl;const d=C(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==d&&((n=a==null?void 0:a._$AO)===null||n===void 0||n.call(a,!1),d===void 0?a=void 0:(a=new d(s),a._$AT(s,e,i)),i!==void 0?((o=(l=e)._$Co)!==null&&o!==void 0?o:l._$Co=[])[i]=a:e._$Cl=a),a!==void 0&&(t=A(s,a._$AS(s,t.values),a,i)),t}class Tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:r}=this._$AD,n=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:m).importNode(i,!0);$.currentNode=n;let o=$.nextNode(),l=0,a=0,d=r[0];for(;d!==void 0;){if(l===d.index){let c;d.type===2?c=new x(o,o.nextSibling,this,t):d.type===1?c=new d.ctor(o,d.name,d.strings,this,t):d.type===6&&(c=new Ht(o,this,t)),this._$AV.push(c),d=r[++a]}l!==(d==null?void 0:d.index)&&(o=$.nextNode(),l++)}return $.currentNode=m,n}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class x{constructor(t,e,i,r){var n;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cp=(n=r==null?void 0:r.isConnected)===null||n===void 0||n}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=A(this,t,e),C(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==_&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Ct(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&C(this._$AH)?this._$AA.nextSibling.data=t:this.$(m.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:r}=t,n=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=P.createElement(mt(r.h,r.h[0]),this.options)),r);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===n)this._$AH.v(i);else{const o=new Tt(n,this),l=o.u(this.options);o.v(i),this.$(l),this._$AH=o}}_$AC(t){let e=at.get(t.strings);return e===void 0&&at.set(t.strings,e=new P(t)),e}T(t){yt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const n of t)r===e.length?e.push(i=new x(this.k(S()),this.k(S()),this,this.options)):i=e[r],i._$AI(n),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class M{constructor(t,e,i,r,n){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,r){const n=this.strings;let o=!1;if(n===void 0)t=A(this,t,e,0),o=!C(t)||t!==this._$AH&&t!==_,o&&(this._$AH=t);else{const l=t;let a,d;for(t=n[0],a=0;a<n.length-1;a++)d=A(this,l[i+a],e,a),d===_&&(d=this._$AH[a]),o||(o=!C(d)||d!==this._$AH[a]),d===u?t=u:t!==u&&(t+=(d??"")+n[a+1]),this._$AH[a]=d}o&&!r&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ut extends M{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const Ot=b?b.emptyScript:"";class Dt extends M{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,Ot):this.element.removeAttribute(this.name)}}class Nt extends M{constructor(t,e,i,r,n){super(t,e,i,r,n),this.type=5}_$AI(t,e=this){var i;if((t=(i=A(this,t,e,0))!==null&&i!==void 0?i:u)===_)return;const r=this._$AH,n=t===u&&r!==u||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,o=t!==u&&(r===u||n);n&&this.element.removeEventListener(this.name,this,r),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class Ht{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){A(this,t)}}const lt=H.litHtmlPolyfillSupport;lt==null||lt(P,x),((L=H.litHtmlVersions)!==null&&L!==void 0?L:H.litHtmlVersions=[]).push("2.8.0");const Rt=(s,t,e)=>{var i,r;const n=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let o=n._$litPart$;if(o===void 0){const l=(r=e==null?void 0:e.renderBefore)!==null&&r!==void 0?r:null;n._$litPart$=o=new x(t.insertBefore(S(),l),l,void 0,e??{})}return o._$AI(s),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var V,F;class k extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return _}}k.finalized=!0,k._$litElement$=!0,(V=globalThis.litElementHydrateSupport)===null||V===void 0||V.call(globalThis,{LitElement:k});const dt=globalThis.litElementPolyfillSupport;dt==null||dt({LitElement:k});((F=globalThis.litElementVersions)!==null&&F!==void 0?F:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt=s=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(s,t):((e,i)=>{const{kind:r,elements:n}=i;return{kind:r,elements:n,finisher(o){customElements.define(e,o)}}})(s,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zt=(s,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,s)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,s)}},It=(s,t,e)=>{t.constructor.createProperty(e,s)};function W(s){return(t,e)=>e!==void 0?It(s,t,e):zt(s,t)}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var K;((K=window.HTMLSlotElement)===null||K===void 0?void 0:K.prototype.assignedElements)!=null;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Lt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Bt=s=>(...t)=>({_$litDirective$:s,values:t});class Vt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class G extends Vt{constructor(t){if(super(t),this.et=u,t.type!==Lt.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===u||t==null)return this.ft=void 0,this.et=t;if(t===_)return t;if(typeof t!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.et)return this.ft;this.et=t;const e=[t];return e.raw=e,this.ft={_$litType$:this.constructor.resultType,strings:e,values:[]}}}G.directiveName="unsafeHTML",G.resultType=1;const Ft=Bt(G);function Wt(s,t,e,i){var r=_t();if(i)for(var n=0;n<i.length;n++)r=i[n](r);var o=t(function(d){r.initializeInstanceElements(d,l.elements)},e),l=r.decorateClass(Jt(o.d.map(Kt)),s);return r.initializeClassElements(o.F,l.elements),r.runClassFinishers(o.F,l.finishers)}function _t(){_t=function(){return s};var s={elementsDefinitionOrder:[["method"],["field"]],initializeInstanceElements:function(t,e){["method","field"].forEach(function(i){e.forEach(function(r){r.kind===i&&r.placement==="own"&&this.defineClassElement(t,r)},this)},this)},initializeClassElements:function(t,e){var i=t.prototype;["method","field"].forEach(function(r){e.forEach(function(n){var o=n.placement;if(n.kind===r&&(o==="static"||o==="prototype")){var l=o==="static"?t:i;this.defineClassElement(l,n)}},this)},this)},defineClassElement:function(t,e){var i=e.descriptor;if(e.kind==="field"){var r=e.initializer;i={enumerable:i.enumerable,writable:i.writable,configurable:i.configurable,value:r===void 0?void 0:r.call(t)}}Object.defineProperty(t,e.key,i)},decorateClass:function(t,e){var i=[],r=[],n={static:[],prototype:[],own:[]};if(t.forEach(function(l){this.addElementPlacement(l,n)},this),t.forEach(function(l){if(!w(l))return i.push(l);var a=this.decorateElement(l,n);i.push(a.element),i.push.apply(i,a.extras),r.push.apply(r,a.finishers)},this),!e)return{elements:i,finishers:r};var o=this.decorateConstructor(i,e);return r.push.apply(r,o.finishers),o.finishers=r,o},addElementPlacement:function(t,e,i){var r=e[t.placement];if(!i&&r.indexOf(t.key)!==-1)throw new TypeError("Duplicated element ("+t.key+")");r.push(t.key)},decorateElement:function(t,e){for(var i=[],r=[],n=t.decorators,o=n.length-1;o>=0;o--){var l=e[t.placement];l.splice(l.indexOf(t.key),1);var a=this.fromElementDescriptor(t),d=this.toElementFinisherExtras((0,n[o])(a)||a);t=d.element,this.addElementPlacement(t,e),d.finisher&&r.push(d.finisher);var c=d.extras;if(c){for(var h=0;h<c.length;h++)this.addElementPlacement(c[h],e);i.push.apply(i,c)}}return{element:t,finishers:r,extras:i}},decorateConstructor:function(t,e){for(var i=[],r=e.length-1;r>=0;r--){var n=this.fromClassDescriptor(t),o=this.toClassDescriptor((0,e[r])(n)||n);if(o.finisher!==void 0&&i.push(o.finisher),o.elements!==void 0){t=o.elements;for(var l=0;l<t.length-1;l++)for(var a=l+1;a<t.length;a++)if(t[l].key===t[a].key&&t[l].placement===t[a].placement)throw new TypeError("Duplicated element ("+t[l].key+")")}}return{elements:t,finishers:i}},fromElementDescriptor:function(t){var e={kind:t.kind,key:t.key,placement:t.placement,descriptor:t.descriptor},i={value:"Descriptor",configurable:!0};return Object.defineProperty(e,Symbol.toStringTag,i),t.kind==="field"&&(e.initializer=t.initializer),e},toElementDescriptors:function(t){if(t!==void 0)return Gt(t).map(function(e){var i=this.toElementDescriptor(e);return this.disallowProperty(e,"finisher","An element descriptor"),this.disallowProperty(e,"extras","An element descriptor"),i},this)},toElementDescriptor:function(t){var e=String(t.kind);if(e!=="method"&&e!=="field")throw new TypeError(`An element descriptor's .kind property must be either "method" or "field", but a decorator created an element descriptor with .kind "`+e+'"');var i=gt(t.key),r=String(t.placement);if(r!=="static"&&r!=="prototype"&&r!=="own")throw new TypeError(`An element descriptor's .placement property must be one of "static", "prototype" or "own", but a decorator created an element descriptor with .placement "`+r+'"');var n=t.descriptor;this.disallowProperty(t,"elements","An element descriptor");var o={kind:e,key:i,placement:r,descriptor:Object.assign({},n)};return e!=="field"?this.disallowProperty(t,"initializer","A method descriptor"):(this.disallowProperty(n,"get","The property descriptor of a field descriptor"),this.disallowProperty(n,"set","The property descriptor of a field descriptor"),this.disallowProperty(n,"value","The property descriptor of a field descriptor"),o.initializer=t.initializer),o},toElementFinisherExtras:function(t){var e=this.toElementDescriptor(t),i=ht(t,"finisher"),r=this.toElementDescriptors(t.extras);return{element:e,finisher:i,extras:r}},fromClassDescriptor:function(t){var e={kind:"class",elements:t.map(this.fromElementDescriptor,this)},i={value:"Descriptor",configurable:!0};return Object.defineProperty(e,Symbol.toStringTag,i),e},toClassDescriptor:function(t){var e=String(t.kind);if(e!=="class")throw new TypeError(`A class descriptor's .kind property must be "class", but a decorator created a class descriptor with .kind "`+e+'"');this.disallowProperty(t,"key","A class descriptor"),this.disallowProperty(t,"placement","A class descriptor"),this.disallowProperty(t,"descriptor","A class descriptor"),this.disallowProperty(t,"initializer","A class descriptor"),this.disallowProperty(t,"extras","A class descriptor");var i=ht(t,"finisher"),r=this.toElementDescriptors(t.elements);return{elements:r,finisher:i}},runClassFinishers:function(t,e){for(var i=0;i<e.length;i++){var r=(0,e[i])(t);if(r!==void 0){if(typeof r!="function")throw new TypeError("Finishers must return a constructor.");t=r}}return t},disallowProperty:function(t,e,i){if(t[e]!==void 0)throw new TypeError(i+" can't have a ."+e+" property.")}};return s}function Kt(s){var t=gt(s.key),e;s.kind==="method"?e={value:s.value,writable:!0,configurable:!0,enumerable:!1}:s.kind==="get"?e={get:s.value,configurable:!0,enumerable:!1}:s.kind==="set"?e={set:s.value,configurable:!0,enumerable:!1}:s.kind==="field"&&(e={configurable:!0,writable:!0,enumerable:!0});var i={kind:s.kind==="field"?"field":"method",key:t,placement:s.static?"static":s.kind==="field"?"own":"prototype",descriptor:e};return s.decorators&&(i.decorators=s.decorators),s.kind==="field"&&(i.initializer=s.value),i}function qt(s,t){s.descriptor.get!==void 0?t.descriptor.get=s.descriptor.get:t.descriptor.set=s.descriptor.set}function Jt(s){for(var t=[],e=function(o){return o.kind==="method"&&o.key===r.key&&o.placement===r.placement},i=0;i<s.length;i++){var r=s[i],n;if(r.kind==="method"&&(n=t.find(e)))if(ct(r.descriptor)||ct(n.descriptor)){if(w(r)||w(n))throw new ReferenceError("Duplicated methods ("+r.key+") can't be decorated.");n.descriptor=r.descriptor}else{if(w(r)){if(w(n))throw new ReferenceError("Decorators can't be placed on different accessors with for the same property ("+r.key+").");n.decorators=r.decorators}qt(r,n)}else t.push(r)}return t}function w(s){return s.decorators&&s.decorators.length}function ct(s){return s!==void 0&&!(s.value===void 0&&s.writable===void 0)}function ht(s,t){var e=s[t];if(e!==void 0&&typeof e!="function")throw new TypeError("Expected '"+t+"' to be a function");return e}function gt(s){var t=Zt(s,"string");return typeof t=="symbol"?t:String(t)}function Zt(s,t){if(typeof s!="object"||!s)return s;var e=s[Symbol.toPrimitive];if(e!==void 0){var i=e.call(s,t||"default");if(typeof i!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(t==="string"?String:Number)(s)}function Gt(s){return Xt(s)||Qt(s)||jt(s)||Yt()}function Yt(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function jt(s,t){if(s){if(typeof s=="string")return ut(s,t);var e=Object.prototype.toString.call(s).slice(8,-1);if(e==="Object"&&s.constructor&&(e=s.constructor.name),e==="Map"||e==="Set")return Array.from(s);if(e==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return ut(s,t)}}function ut(s,t){(t==null||t>s.length)&&(t=s.length);for(var e=0,i=new Array(t);e<t;e++)i[e]=s[e];return i}function Qt(s){if(typeof Symbol<"u"&&s[Symbol.iterator]!=null||s["@@iterator"]!=null)return Array.from(s)}function Xt(s){if(Array.isArray(s))return s}function D(){return typeof Reflect<"u"&&Reflect.get?D=Reflect.get.bind():D=function(t,e,i){var r=te(t,e);if(r){var n=Object.getOwnPropertyDescriptor(r,e);return n.get?n.get.call(arguments.length<3?t:i):n.value}},D.apply(this,arguments)}function te(s,t){for(;!Object.prototype.hasOwnProperty.call(s,t)&&(s=R(s),s!==null););return s}function R(s){return R=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},R(s)}Wt([Mt("admin-training-videos-field")],function(s,t){class e extends t{constructor(){super(),s(this),this.internals=this.attachInternals()}}return{F:e,d:[{kind:"field",static:!0,key:"styles",value(){return Et`
      .button,
      button {
        display: inline-block;
        text-decoration: none;
        cursor: pointer;
        border-width: 1px;
        border-style: solid;
        -webkit-appearance: none;
        border-radius: 3px;
        white-space: nowrap;
        box-sizing: border-box;
        padding: 0 14px;
        line-height: 2.71428571;
        font-size: 14px;
        vertical-align: middle;
        min-height: 40px;
        margin-bottom: 4px;
        color: #2271b1;
        border-color: #2271b1;
      }

      input[type="text"], textarea {
        -webkit-appearance: none;
        padding: 3px 10px;
        min-height: 40px;
        word-wrap: break-word;
        font-size: 16px;
        box-shadow: 0 0 0 transparent;
        border-radius: 4px;
        border: 1px solid #aeb0b6;
        background-color: #fff;
        color: #2c3338;
        width: 100%;
        box-sizing: border-box;
      }

      textarea {
        height: 60px;
      }

      .embed iframe {
        aspect-ratio: 16 / 9;
        height: 100%;
        width: 100%;
      }

      .video {
        padding: 5px;
        border: solid #C3C4C7 1px;
      }

      .button--success {
        color: #35b122;
        border-color: #35b122;
      }

      .button--danger {
        color: #b12222;
        border-color: #b12222;
      }
    `}},{kind:"field",key:"internals",value:void 0},{kind:"field",decorators:[W({type:Array,reflect:!0})],key:"value",value(){return[]}},{kind:"field",decorators:[W({type:Array})],key:"default",value(){return[]}},{kind:"field",decorators:[W({type:Object})],key:"translations",value(){return{title:"Title",embed:"Embed",reset:"Reset",add:"Add",remove:"Remove",resetConfirm:"Are you sure you want to revert to default content?",removeConfirm:"Are you sure you want to remove this video?",up:"Up",down:"Down"}}},{kind:"get",static:!0,key:"formAssociated",value:function(){return!0}},{kind:"method",key:"updated",value:function(r){if(r.has("value")){const n=JSON.stringify(this.value);this.internals.setFormValue(n),this.dispatchEvent(new CustomEvent("change",{detail:{value:n}}))}D(R(e.prototype),"updated",this).call(this,r)}},{kind:"method",key:"render",value:function(){const{translations:r}=this;return U`
            <table style="width: 100%;">
                <thead>
                <tr>
                    <th style="width: 99%;"></th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                ${this.value.map((n,o)=>this.renderVideoFields(n,o))}
                <tbody>
            </table>

            <button @click="${this.add}" class="button button--success" aria-label="${r.add}">+</button>
            <button @click="${this.reset}" class="button button--danger" aria-label="${r.reset}">
                ${r.reset}
            </button>
        `}},{kind:"method",key:"renderVideoFields",value:function(r,n){const{translations:o}=this;return U`
            <tr>
                <td>
                    <table style="width: 100%;" class="video">
                        <tr>
                            <td>
                                <input type="text"
                                       name="videos[${n}][title]"
                                       value="${r.title}"
                                       placeholder="${o.title}"
                                       @input="${this.handleInput}"
                                >
                            </td>
                        <tr>
                        <tr>
                            <td>
                                <textarea name="videos[${n}][embed]"
                                          @input="${this.handleInput}"
                                          placeholder="${o.embed}"
                                >${r.embed}</textarea>
                                <div class="embed">
                                    ${Ft(r.embed)}
                                </div>
                            </td>
                        </tr>
                    </table>
                </td>
                <td valign="top">
                    ${n>0?U`
                        <button @click="${()=>this.up(n)}" class="button"
                                aria-label="${o.up}">↑
                        </button>
                    `:""}
                    <button @click="${()=>this.remove(n)}" class="button button--danger"
                            aria-label="${o.remove}">x
                    </button>
                    ${n<this.value.length-1?U`
                        <button @click="${()=>this.down(n)}" class="button"
                                aria-label="${o.down}">↓
                        </button>
                    `:""}
                </td>
            </tr>
        `}},{kind:"method",key:"add",value:function(){this.value=[...this.value,{title:"",link:""}]}},{kind:"method",key:"remove",value:function(r){const{translations:n}=this;window.confirm(n.removeConfirm)&&(this.value=this.value.filter((l,a)=>a!==r))}},{kind:"method",key:"reset",value:function(){const{translations:r}=this;window.confirm(r.resetConfirm)&&(this.value=this.default)}},{kind:"method",key:"move",value:function(r,n){const o=[...this.value],[l]=o.splice(r,1);o.splice(r+n,0,l),this.value=o}},{kind:"method",key:"up",value:function(r){this.move(r,-1)}},{kind:"method",key:"down",value:function(r){this.move(r,1)}},{kind:"method",key:"handleInput",value:function(r){const{target:n}=r,{name:o,value:l}=n,[a,d,c]=o.match(/videos\[(\d+)\]\[(\w+)\]/);console.log(l),this.value[d][c]=l,this.value=[...this.value]}}]}},k);
//# sourceMappingURL=admin-d055abc8.js.map
