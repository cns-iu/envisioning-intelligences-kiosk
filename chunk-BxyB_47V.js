import {t}from'./chunk-DdPovlrn.js';import {E as Eg,O as xl,V as Vj,h,a as ti,U as Ue,H as Hj,g as ge,T as Uj,Y as v,i as ie,Z as vC,o as ot,a0 as QT,a1 as DH,a2 as Pr,a3 as Pa,a4 as Xn,a5 as Q,a6 as jt,a7 as zm,a8 as Bt,a9 as Hm,l as Eo,aa as QI,ab as Ro,ac as km,R as Rs,ad as Kf,j as jm,w as wl,ae as Qf,af as Vm,ag as Tw,ah as To,ai as Gs,k as Pm,aj as Cl,ak as kn,al as Gm,am as _w,an as ww,ao as K$,P as P2,d as Xn$1,z as ng,C as Co,K as Kw,S as So,p as ig,B as iT,D as bw,F as Qw,ap as gw,b as $m,f as Ww,aq as aI,ar as Pf,as as jf,at as kh}from'./main-BGIWLCP3.js';var P=class n{videoUrl=Eg.required();thumbnailUrl=Eg.required({transform:r=>t(r,720)});loop=Eg(false,{transform:ge});loadingError=Uj();static \u0275fac=function(e){return new(e||n)};static \u0275cmp=Ue({type:n,selectors:[["app-embedded-video"]],inputs:{videoUrl:[1,"videoUrl"],thumbnailUrl:[1,"thumbnailUrl"],loop:[1,"loop"]},outputs:{loadingError:"loadingError"},decls:2,vars:3,consts:[["controls","","disablepictureinpicture","",3,"loop","poster"],["type","video/mp4",3,"error","src"]],template:function(e,i){e&1&&(jt(0,"video",0)(1,"source",1),zm("error",function(){return i.loadingError.emit()}),Bt()()),e&2&&(Hm("loop",i.loop())("poster",i.thumbnailUrl()),Eo(),Hm("src",i.videoUrl()));},styles:["[_nghost-%COMP%]{display:block;max-height:calc(100% - 2rem);margin:0 auto;padding:1rem;aspect-ratio:16/9}[_nghost-%COMP%]   video[_ngcontent-%COMP%]{object-fit:cover;width:100%;height:100%}"]})};var Ce=["determinateSpinner"];function Pe(n,r){if(n&1&&(Kf(),Rs(0,"svg",11),jm(1,"circle",12),wl()),n&2){let e=bw();To("viewBox",e._viewBox()),Eo(),Gs("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeCircumference()/2,"px")("stroke-width",e._circleStrokeWidth(),"%"),To("r",e._circleRadius());}}var we=new v("mat-progress-spinner-default-options",{providedIn:"root",factory:()=>({diameter:ve})}),ve=100,Oe=10,fe=(()=>{class n{_elementRef=h(ie);_noopAnimations;get color(){return this._color||this._defaultColor}set color(e){this._color=e;}_color;_defaultColor="primary";_determinateCircle;constructor(){let e=h(we),i=vC(),t=this._elementRef.nativeElement;this._noopAnimations=i==="di-disabled"&&!!e&&!e._forceAnimations,this.mode=t.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",!this._noopAnimations&&i==="reduced-motion"&&t.classList.add("mat-progress-spinner-reduced-motion"),e&&(e.color&&(this.color=this._defaultColor=e.color),e.diameter&&(this.diameter=e.diameter),e.strokeWidth&&(this.strokeWidth=e.strokeWidth));}mode;get value(){return this.mode==="determinate"?this._value:0}set value(e){this._value=Math.max(0,Math.min(100,e||0));}_value=0;get diameter(){return this._diameter}set diameter(e){this._diameter=e||0;}_diameter=ve;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(e){this._strokeWidth=e||0;}_strokeWidth;_circleRadius(){return (this.diameter-Oe)/2}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return `0 0 ${e} ${e}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=Ue({type:n,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(i,t){if(i&1&&Gm(Ce,5),i&2){let s;_w(s=ww())&&(t._determinateCircle=s.first);}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(i,t){i&2&&(To("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",t.mode==="determinate"?t.value:null)("mode",t.mode),Cl("mat-"+t.color),Gs("width",t.diameter,"px")("height",t.diameter,"px")("--mat-progress-spinner-size",t.diameter+"px")("--mat-progress-spinner-active-indicator-width",t.diameter+"px"),kn("_mat-animation-noopable",t._noopAnimations)("mdc-circular-progress--indeterminate",t.mode==="indeterminate"));},inputs:{color:"color",mode:"mode",value:[2,"value","value",Ro],diameter:[2,"diameter","diameter",Ro],strokeWidth:[2,"strokeWidth","strokeWidth",Ro]},exportAs:["matProgressSpinner"],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(i,t){if(i&1&&(km(0,Pe,2,8,"ng-template",null,0,aI),Rs(2,"div",2,1),Kf(),Rs(4,"svg",3),jm(5,"circle",4),wl()(),Qf(),Rs(6,"div",5)(7,"div",6)(8,"div",7),Vm(9,8),wl(),Rs(10,"div",9),Vm(11,8),wl(),Rs(12,"div",10),Vm(13,8),wl()()()),i&2){let s=Tw(1);Eo(4),To("viewBox",t._viewBox()),Eo(),Gs("stroke-dasharray",t._strokeCircumference(),"px")("stroke-dashoffset",t._strokeDashOffset(),"px")("stroke-width",t._circleStrokeWidth(),"%"),To("r",t._circleRadius()),Eo(4),Pm("ngTemplateOutlet",s),Eo(2),Pm("ngTemplateOutlet",s),Eo(2),Pm("ngTemplateOutlet",s);}},dependencies:[QI],styles:[`.mat-mdc-progress-spinner {
  --mat-progress-spinner-animation-multiplier: 1;
  display: block;
  overflow: hidden;
  line-height: 0;
  position: relative;
  direction: ltr;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.6, 1);
}
.mat-mdc-progress-spinner circle {
  stroke-width: var(--mat-progress-spinner-active-indicator-width, 4px);
}
.mat-mdc-progress-spinner._mat-animation-noopable, .mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__determinate-circle {
  transition: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-circle-graphic,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__spinner-layer,
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container {
  animation: none !important;
}
.mat-mdc-progress-spinner._mat-animation-noopable .mdc-circular-progress__indeterminate-container circle {
  stroke-dasharray: 0 !important;
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic,
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle {
    stroke: currentColor;
    stroke: CanvasText;
  }
}

.mat-progress-spinner-reduced-motion {
  --mat-progress-spinner-animation-multiplier: 1.25;
}

.mdc-circular-progress__determinate-container,
.mdc-circular-progress__indeterminate-circle-graphic,
.mdc-circular-progress__indeterminate-container,
.mdc-circular-progress__spinner-layer {
  position: absolute;
  width: 100%;
  height: 100%;
}

.mdc-circular-progress__determinate-container {
  transform: rotate(-90deg);
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__determinate-container {
  opacity: 0;
}

.mdc-circular-progress__indeterminate-container {
  font-size: 0;
  letter-spacing: 0;
  white-space: nowrap;
  opacity: 0;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__indeterminate-container {
  opacity: 1;
  animation: mdc-circular-progress-container-rotate calc(1568.2352941176ms * var(--mat-progress-spinner-animation-multiplier)) linear infinite;
}

.mdc-circular-progress__determinate-circle-graphic,
.mdc-circular-progress__indeterminate-circle-graphic {
  fill: transparent;
}

.mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
.mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
  stroke: var(--mat-progress-spinner-active-indicator-color, var(--mat-sys-primary));
}
@media (forced-colors: active) {
  .mat-mdc-progress-spinner .mdc-circular-progress__determinate-circle,
  .mat-mdc-progress-spinner .mdc-circular-progress__indeterminate-circle-graphic {
    stroke: CanvasText;
  }
}

.mdc-circular-progress__determinate-circle {
  transition: stroke-dashoffset 500ms cubic-bezier(0, 0, 0.2, 1);
}

.mdc-circular-progress__gap-patch {
  position: absolute;
  top: 0;
  left: 47.5%;
  box-sizing: border-box;
  width: 5%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress__gap-patch .mdc-circular-progress__indeterminate-circle-graphic {
  left: -900%;
  width: 2000%;
  transform: rotate(180deg);
}
.mdc-circular-progress__circle-clipper .mdc-circular-progress__indeterminate-circle-graphic {
  width: 200%;
}
.mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  left: -100%;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-left .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-left-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}
.mdc-circular-progress--indeterminate .mdc-circular-progress__circle-right .mdc-circular-progress__indeterminate-circle-graphic {
  animation: mdc-circular-progress-right-spin calc(1333ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

.mdc-circular-progress__circle-clipper {
  display: inline-flex;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;
}

.mdc-circular-progress--indeterminate .mdc-circular-progress__spinner-layer {
  animation: mdc-circular-progress-spinner-layer-rotate calc(5332ms * var(--mat-progress-spinner-animation-multiplier)) cubic-bezier(0.4, 0, 0.2, 1) infinite both;
}

@keyframes mdc-circular-progress-container-rotate {
  to {
    transform: rotate(360deg);
  }
}
@keyframes mdc-circular-progress-spinner-layer-rotate {
  12.5% {
    transform: rotate(135deg);
  }
  25% {
    transform: rotate(270deg);
  }
  37.5% {
    transform: rotate(405deg);
  }
  50% {
    transform: rotate(540deg);
  }
  62.5% {
    transform: rotate(675deg);
  }
  75% {
    transform: rotate(810deg);
  }
  87.5% {
    transform: rotate(945deg);
  }
  100% {
    transform: rotate(1080deg);
  }
}
@keyframes mdc-circular-progress-left-spin {
  from {
    transform: rotate(265deg);
  }
  50% {
    transform: rotate(130deg);
  }
  to {
    transform: rotate(265deg);
  }
}
@keyframes mdc-circular-progress-right-spin {
  from {
    transform: rotate(-265deg);
  }
  50% {
    transform: rotate(-130deg);
  }
  to {
    transform: rotate(-265deg);
  }
}
`],encapsulation:2})}return n})();var xe={progress:100,done:true},w=class n{url=Eg.required();loadingDurationMs=Eg(0,{transform:r=>r??0});iframeUrl=ot(()=>this.#t.bypassSecurityTrustResourceUrl(this.url()));isLoading=ot(()=>!this.#e.value().done);loadingProgress=ot(()=>this.#e.value().progress);#t=h(QT);#e=DH({params:()=>({shouldLoad:this.url()!==""&&this.loadingDurationMs()>0,durationMs:this.loadingDurationMs()}),stream:({params:r})=>this.#i(r.shouldLoad,r.durationMs),defaultValue:xe});#i(r,e){if(!r)return Pr(xe);let i=100,t=Math.ceil(e/i);return Pa(0,i).pipe(Xn(t),Q(s=>{let ye=Math.round(100*(s+1)/t),Me=s+1>=t;return {progress:ye,done:Me}}))}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=Ue({type:n,selectors:[["app-embedded-visualization"]],hostAttrs:[1,"app-embedded-visualization"],inputs:{url:[1,"url"],loadingDurationMs:[1,"loadingDurationMs"]},decls:4,vars:4,consts:[["width","100%","height","100%","sandbox","allow-forms allow-same-origin allow-scripts",1,"app-embedded-visualization--iframe",3,"src"],[1,"app-embedded-visualization--overlay"],[1,"app-embedded-visualization-overlay-content"],["mode","determinate","diameter","180",3,"value"]],template:function(e,i){e&1&&(jm(0,"iframe",0),Rs(1,"div",1)(2,"div",2),jm(3,"mat-progress-spinner",3),wl()()),e&2&&(Pm("src",i.iframeUrl(),kh),Eo(),kn("app-embedded-visualization--overlay-active",i.isLoading()),Eo(2),Pm("value",i.loadingProgress()));},dependencies:[fe],styles:["[_nghost-%COMP%]{display:block;position:relative;height:100%}[_nghost-%COMP%]   .app-embedded-visualization--iframe[_ngcontent-%COMP%]{outline:none;border:none;z-index:0}[_nghost-%COMP%]   .app-embedded-visualization--overlay[_ngcontent-%COMP%]{display:flex;position:absolute;inset:0;width:100%;height:100%;justify-content:center;align-items:center;pointer-events:none;opacity:0;background-color:#0006;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);transition:opacity .3s ease-in-out;z-index:1}[_nghost-%COMP%]   .app-embedded-visualization--overlay.app-embedded-visualization--overlay-active[_ngcontent-%COMP%]{opacity:1;pointer-events:auto}[_nghost-%COMP%]   .app-embedded-visualization--overlay[_ngcontent-%COMP%]   .app-embedded-visualization-overlay-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:1rem}[_nghost-%COMP%]   .app-embedded-visualization--overlay[_ngcontent-%COMP%]   .app-embedded-visualization-overlay-content[_ngcontent-%COMP%]   mat-progress-spinner[_ngcontent-%COMP%]{width:50px;height:50px;color:#fff}"]})};function ke(n,r){if(n&1&&jm(0,"app-embedded-visualization",0),n&2){bw();let e=Qw(0);Pm("url",r)("loadingDurationMs",e.visualizationLoadingDurationMs);}}function Ee(n,r){if(n&1){let e=gw();Rs(0,"app-embedded-video",3),$m("loadingError",function(){Pf(e);let t=bw();return jf(t.hasError.set(true))}),wl();}if(n&2){bw();let e=Qw(0);Pm("videoUrl",r)("thumbnailUrl",e.thumbnailUrl)("loop",e.loopVideo);}}function Se(n,r){if(n&1&&(Rs(0,"div",2),jm(1,"img",4),Rs(2,"div",5)(3,"h2",6),Ww(4,"Exhibit piece unavailable"),wl(),Rs(5,"p",7),Ww(6," This exhibit piece is currently unavailable. Please try again later. "),wl(),Rs(7,"a",8),Ww(8,"Back to gallery"),wl()()()),n&2){bw();let e=Qw(0);Eo(),Pm("ngSrc",e.thumbnailUrl);}}var S=class n{exhibit=Eg.required();hasError=xl({source:this.exhibit,computation:()=>false});#t=Vj(()=>import('./chunk-KGhIOWN_.js'),{prefetch:Hj});constructor(){h(ti).on("open-about",()=>this.#e());}async#e(){(await this.#t()).open(this.exhibit());}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=Ue({type:n,selectors:[["app-exhibit-page"]],inputs:{exhibit:[1,"exhibit"]},features:[ig([{provide:iT,useValue:({src:r,width:e})=>t(r,e)}])],decls:4,vars:2,consts:[[3,"url","loadingDurationMs"],[3,"videoUrl","thumbnailUrl","loop"],[1,"app-exhibit-page--unavailable-container"],[3,"loadingError","videoUrl","thumbnailUrl","loop"],["alt","","draggable","false","fill","","priority","","ngSrcset","360w, 720w, 1080w","sizes","100vw",1,"app-exhibit-page--unavailable-thumbnail",3,"ngSrc"],[1,"app-exhibit-page--unavailable-content"],[1,"app-exhibit-page--unavailable-title"],[1,"app-exhibit-page--unavailable-description"],["matButton","","routerLink","/",1,"app-exhibit-page--unavailable-button"]],template:function(e,i){if(e&1&&(ng(0),Co(1,ke,1,2,"app-embedded-visualization",0)(2,Ee,1,3,"app-embedded-video",1)(3,Se,9,1,"div",2)),e&2){let t,s=Kw(i.exhibit());Eo(),So((t=!i.hasError()&&s.visualizationAvailable!==false&&s.visualizationUrl)?1:(t=!i.hasError()&&s.videoUrl)?2:3,t);}},dependencies:[w,P,K$,P2,Xn$1],styles:["[_nghost-%COMP%]{display:block;height:100%;overflow:hidden;background:var(--mat-sys-surface)}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]{position:relative;width:100%;height:100%}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-thumbnail[_ngcontent-%COMP%]{object-fit:cover;opacity:.28;z-index:0}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:280px;max-width:560px;width:calc(100% - 48px);background-color:var(--mat-sys-surface-container-highest);box-shadow:1px 4px 16px #00000029;border-radius:16px;z-index:1}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-title[_ngcontent-%COMP%]{padding:24px 24px 0;font:var(--mat-sys-headline-small);letter-spacing:var(--mat-sys-headline-small-tracking);color:var(--mat-sys-on-surface)}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-description[_ngcontent-%COMP%]{padding:0 24px;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);color:var(--mat-sys-on-surface-variant)}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-button[_ngcontent-%COMP%]{align-self:end;margin:20px 24px 20px 0;--mat-button-text-container-height: 48px;--mat-button-text-horizontal-padding: 20px;--mat-button-text-touch-target-size: 48px;--mat-button-text-label-text-font: var(--mat-sys-label-medium-font);--mat-button-text-label-text-size: var(--mat-sys-label-medium-size);--mat-button-text-label-text-weight: var(--mat-sys-label-medium-weight);--mat-button-text-label-text-tracking: var(--mat-sys-label-medium-tracking)}@media print,screen and (min-width:1280px){[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-title[_ngcontent-%COMP%]{padding:32px 32px 0;font:var(--mat-sys-headline-medium);letter-spacing:var(--mat-sys-headline-medium-tracking)}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-description[_ngcontent-%COMP%]{padding:0 32px;font:var(--mat-sys-body-large);letter-spacing:var(--mat-sys-body-large-tracking)}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-button[_ngcontent-%COMP%]{--mat-button-text-container-height: 68px;--mat-button-text-horizontal-padding: 32px;--mat-button-text-touch-target-size: 68px;--mat-button-text-label-text-font: var(--mat-sys-label-large-font);--mat-button-text-label-text-size: var(--mat-sys-label-large-size);--mat-button-text-label-text-weight: var(--mat-sys-label-large-weight);--mat-button-text-label-text-tracking: var(--mat-sys-label-large-tracking)}}"]})};export{S as default};