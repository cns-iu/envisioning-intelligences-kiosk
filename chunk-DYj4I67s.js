import {U as Uj,E as El,l as Bj,m as g,t as ti,P as Pw,ab as Ha,B as BV,X as Xn,s as fm,u as PC,x as xb,i as iI,L as LC,d as Fb,aa as Vj,K as Ke,ac as RS,ad as wH,ae as ya,af as Da,ag as ui,ah as ae,W as Wg,a as Es,p as pl,G as Gg,o as om,C as Co,ai as Hj,h as hl,aj as Jg,g as gl,ak as zg,a2 as QC,a3 as Ab,al as qC,_ as Xg,S as Sb,Q as Qe,am as en,an as RT,ao as Nl,ap as Fg,N as Nf,aq as xf,ar as Yg,as as ob,at as Ps,au as gb,av as em,aw as tb,ax as nb,ay as I,f as VT,az as Ub,aA as yf,aB as vf,aC as bh}from'./main-QNBEHQUS.js';import {t}from'./chunk-DdPovlrn.js';var P=class n{videoUrl=Uj.required();thumbnailUrl=Uj.required({transform:r=>t(r,720)});loop=Uj(false,{transform:Co});loadingError=Hj();static \u0275fac=function(e){return new(e||n)};static \u0275cmp=Pw({type:n,selectors:[["app-embedded-video"]],inputs:{videoUrl:[1,"videoUrl"],thumbnailUrl:[1,"thumbnailUrl"],loop:[1,"loop"]},outputs:{loadingError:"loadingError"},decls:2,vars:3,consts:[["autoplay","","controls","","disablepictureinpicture",""],["type","video/mp4",3,"error"]],template:function(e,i){e&1&&(hl(0,"video",0)(1,"source",1),Jg("error",function(){return i.loadingError.emit()}),gl()()),e&2&&(zg("loop",i.loop()?"":null)("poster",i.thumbnailUrl()),iI(),zg("src",i.videoUrl()));},styles:["[_nghost-%COMP%]{display:block;max-height:calc(100% - 2rem);margin:0 auto;padding:1rem;aspect-ratio:16/9}[_nghost-%COMP%]   video[_ngcontent-%COMP%]{object-fit:cover;width:100%;height:100%}"]})};var Me=["determinateSpinner"];function Ce(n,r){if(n&1&&(Nf(),Es(0,"svg",11),Wg(1,"circle",12),pl()),n&2){let e=QC();zg("viewBox",e._viewBox()),iI(),Ps("stroke-dasharray",e._strokeCircumference(),"px")("stroke-dashoffset",e._strokeCircumference()/2,"px")("stroke-width",e._circleStrokeWidth(),"%"),zg("r",e._circleRadius());}}var Pe=new I("mat-progress-spinner-default-options",{providedIn:"root",factory:()=>({diameter:_e})}),_e=100,we=10,ve=(()=>{class n{_elementRef=g(Qe);_noopAnimations;get color(){return this._color||this._defaultColor}set color(e){this._color=e;}_color;_defaultColor="primary";_determinateCircle;constructor(){let e=g(Pe),i=en(),t=this._elementRef.nativeElement;this._noopAnimations=i==="di-disabled"&&!!e&&!e._forceAnimations,this.mode=t.nodeName.toLowerCase()==="mat-spinner"?"indeterminate":"determinate",!this._noopAnimations&&i==="reduced-motion"&&t.classList.add("mat-progress-spinner-reduced-motion"),e&&(e.color&&(this.color=this._defaultColor=e.color),e.diameter&&(this.diameter=e.diameter),e.strokeWidth&&(this.strokeWidth=e.strokeWidth));}mode;get value(){return this.mode==="determinate"?this._value:0}set value(e){this._value=Math.max(0,Math.min(100,e||0));}_value=0;get diameter(){return this._diameter}set diameter(e){this._diameter=e||0;}_diameter=_e;get strokeWidth(){return this._strokeWidth??this.diameter/10}set strokeWidth(e){this._strokeWidth=e||0;}_strokeWidth;_circleRadius(){return (this.diameter-we)/2}_viewBox(){let e=this._circleRadius()*2+this.strokeWidth;return `0 0 ${e} ${e}`}_strokeCircumference(){return 2*Math.PI*this._circleRadius()}_strokeDashOffset(){return this.mode==="determinate"?this._strokeCircumference()*(100-this._value)/100:null}_circleStrokeWidth(){return this.strokeWidth/this.diameter*100}static \u0275fac=function(i){return new(i||n)};static \u0275cmp=Pw({type:n,selectors:[["mat-progress-spinner"],["mat-spinner"]],viewQuery:function(i,t){if(i&1&&em(Me,5),i&2){let s;tb(s=nb())&&(t._determinateCircle=s.first);}},hostAttrs:["role","progressbar","tabindex","-1",1,"mat-mdc-progress-spinner","mdc-circular-progress"],hostVars:18,hostBindings:function(i,t){i&2&&(zg("aria-valuemin",0)("aria-valuemax",100)("aria-valuenow",t.mode==="determinate"?t.value:null)("mode",t.mode),gb("mat-"+t.color),Ps("width",t.diameter,"px")("height",t.diameter,"px")("--mat-progress-spinner-size",t.diameter+"px")("--mat-progress-spinner-active-indicator-width",t.diameter+"px"),om("_mat-animation-noopable",t._noopAnimations)("mdc-circular-progress--indeterminate",t.mode==="indeterminate"));},inputs:{color:"color",mode:"mode",value:[2,"value","value",Nl],diameter:[2,"diameter","diameter",Nl],strokeWidth:[2,"strokeWidth","strokeWidth",Nl]},exportAs:["matProgressSpinner"],decls:14,vars:11,consts:[["circle",""],["determinateSpinner",""],["aria-hidden","true",1,"mdc-circular-progress__determinate-container"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__determinate-circle-graphic"],["cx","50%","cy","50%",1,"mdc-circular-progress__determinate-circle"],["aria-hidden","true",1,"mdc-circular-progress__indeterminate-container"],[1,"mdc-circular-progress__spinner-layer"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-left"],[3,"ngTemplateOutlet"],[1,"mdc-circular-progress__gap-patch"],[1,"mdc-circular-progress__circle-clipper","mdc-circular-progress__circle-right"],["xmlns","http://www.w3.org/2000/svg","focusable","false",1,"mdc-circular-progress__indeterminate-circle-graphic"],["cx","50%","cy","50%"]],template:function(i,t){if(i&1&&(Fg(0,Ce,2,8,"ng-template",null,0,Ub),Es(2,"div",2,1),Nf(),Es(4,"svg",3),Wg(5,"circle",4),pl()(),xf(),Es(6,"div",5)(7,"div",6)(8,"div",7),Yg(9,8),pl(),Es(10,"div",9),Yg(11,8),pl(),Es(12,"div",10),Yg(13,8),pl()()()),i&2){let s=ob(1);iI(4),zg("viewBox",t._viewBox()),iI(),Ps("stroke-dasharray",t._strokeCircumference(),"px")("stroke-dashoffset",t._strokeDashOffset(),"px")("stroke-width",t._circleStrokeWidth(),"%"),zg("r",t._circleRadius()),iI(4),Gg("ngTemplateOutlet",s),iI(2),Gg("ngTemplateOutlet",s),iI(2),Gg("ngTemplateOutlet",s);}},dependencies:[RT],styles:[`.mat-mdc-progress-spinner {
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
`],encapsulation:2})}return n})();var fe={progress:100,done:true},w=class n{url=Uj.required();loadingDurationMs=Uj(0,{transform:r=>r??0});iframeUrl=Ke(()=>this.#t.bypassSecurityTrustResourceUrl(this.url()));isLoading=Ke(()=>!this.#e.value().done);loadingProgress=Ke(()=>this.#e.value().progress);#t=g(RS);#e=wH({params:()=>({shouldLoad:this.url()!==""&&this.loadingDurationMs()>0,durationMs:this.loadingDurationMs()}),stream:({params:r})=>this.#i(r.shouldLoad,r.durationMs),defaultValue:fe});#i(r,e){if(!r)return ya(fe);let i=100,t=Math.ceil(e/i);return Da(0,i).pipe(ui(t),ae(s=>{let xe=Math.round(100*(s+1)/t),ye=s+1>=t;return {progress:xe,done:ye}}))}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=Pw({type:n,selectors:[["app-embedded-visualization"]],hostAttrs:[1,"app-embedded-visualization"],inputs:{url:[1,"url"],loadingDurationMs:[1,"loadingDurationMs"]},decls:4,vars:4,consts:[["width","100%","height","100%","sandbox","allow-forms allow-same-origin allow-scripts",1,"app-embedded-visualization--iframe",3,"src"],[1,"app-embedded-visualization--overlay"],[1,"app-embedded-visualization-overlay-content"],["mode","determinate","diameter","180",3,"value"]],template:function(e,i){e&1&&(Wg(0,"iframe",0),Es(1,"div",1)(2,"div",2),Wg(3,"mat-progress-spinner",3),pl()()),e&2&&(Gg("src",i.iframeUrl(),bh),iI(),om("app-embedded-visualization--overlay-active",i.isLoading()),iI(2),Gg("value",i.loadingProgress()));},dependencies:[ve],styles:["[_nghost-%COMP%]{display:block;position:relative;height:100%}[_nghost-%COMP%]   .app-embedded-visualization--iframe[_ngcontent-%COMP%]{outline:none;border:none;z-index:0}[_nghost-%COMP%]   .app-embedded-visualization--overlay[_ngcontent-%COMP%]{display:flex;position:absolute;inset:0;width:100%;height:100%;justify-content:center;align-items:center;pointer-events:none;opacity:0;background-color:#0006;-webkit-backdrop-filter:blur(2px);backdrop-filter:blur(2px);transition:opacity .3s ease-in-out;z-index:1}[_nghost-%COMP%]   .app-embedded-visualization--overlay.app-embedded-visualization--overlay-active[_ngcontent-%COMP%]{opacity:1;pointer-events:auto}[_nghost-%COMP%]   .app-embedded-visualization--overlay[_ngcontent-%COMP%]   .app-embedded-visualization-overlay-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;gap:1rem}[_nghost-%COMP%]   .app-embedded-visualization--overlay[_ngcontent-%COMP%]   .app-embedded-visualization-overlay-content[_ngcontent-%COMP%]   mat-progress-spinner[_ngcontent-%COMP%]{width:50px;height:50px;color:#fff}"]})};function Oe(n,r){if(n&1&&Wg(0,"app-embedded-visualization",0),n&2){QC();let e=Ab(0);Gg("url",r)("loadingDurationMs",e.visualizationLoadingDurationMs);}}function ke(n,r){if(n&1){let e=qC();Es(0,"app-embedded-video",3),Xg("loadingError",function(){yf(e);let t=QC();return vf(t.hasError.set(true))}),pl();}if(n&2){QC();let e=Ab(0);Gg("videoUrl",r)("thumbnailUrl",e.thumbnailUrl)("loop",e.loopVideo);}}function Ee(n,r){if(n&1&&(Es(0,"div",2),Wg(1,"img",4),Es(2,"div",5)(3,"h2",6),Sb(4,"Exhibit piece unavailable"),pl(),Es(5,"p",7),Sb(6," This exhibit piece is currently unavailable. Please try again later. "),pl(),Es(7,"a",8),Sb(8,"Back to gallery"),pl()()()),n&2){QC();let e=Ab(0);iI(),Gg("ngSrc",e.thumbnailUrl);}}var E=class n{exhibit=Uj.required();hasError=El({source:this.exhibit,computation:()=>false});#t=Bj(()=>import('./chunk-CB62Yooq.js'),{prefetch:Vj});constructor(){g(ti).on("open-about",()=>this.#e());}async#e(){(await this.#t()).open(this.exhibit());}static \u0275fac=function(e){return new(e||n)};static \u0275cmp=Pw({type:n,selectors:[["app-exhibit-page"]],inputs:{exhibit:[1,"exhibit"]},features:[Fb([{provide:VT,useValue:({src:r,width:e})=>t(r,e)}])],decls:4,vars:2,consts:[[3,"url","loadingDurationMs"],[3,"videoUrl","thumbnailUrl","loop"],[1,"app-exhibit-page--unavailable-container"],[3,"loadingError","videoUrl","thumbnailUrl","loop"],["alt","","draggable","false","fill","","priority","","ngSrcset","360w, 720w, 1080w","sizes","100vw",1,"app-exhibit-page--unavailable-thumbnail",3,"ngSrc"],[1,"app-exhibit-page--unavailable-content"],[1,"app-exhibit-page--unavailable-title"],[1,"app-exhibit-page--unavailable-description"],["matButton","","routerLink","/",1,"app-exhibit-page--unavailable-button"]],template:function(e,i){if(e&1&&(fm(0),PC(1,Oe,1,2,"app-embedded-visualization",0)(2,ke,1,3,"app-embedded-video",1)(3,Ee,9,1,"div",2)),e&2){let t,s=xb(i.exhibit());iI(),LC((t=!i.hasError()&&s.visualizationAvailable!==false&&s.visualizationUrl)?1:(t=!i.hasError()&&s.videoUrl)?2:3,t);}},dependencies:[w,P,Ha,BV,Xn],styles:["[_nghost-%COMP%]{display:block;height:100%;overflow:hidden;background:var(--mat-sys-surface)}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]{position:relative;width:100%;height:100%}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-thumbnail[_ngcontent-%COMP%]{object-fit:cover;opacity:.28;z-index:0}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:280px;max-width:560px;width:calc(100% - 48px);background-color:var(--mat-sys-surface-container-highest);box-shadow:1px 4px 16px #00000029;border-radius:16px;z-index:1}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-title[_ngcontent-%COMP%]{padding:24px 24px 0;font:var(--mat-sys-headline-small);letter-spacing:var(--mat-sys-headline-small-tracking);color:var(--mat-sys-on-surface)}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-description[_ngcontent-%COMP%]{padding:0 24px;font:var(--mat-sys-body-medium);letter-spacing:var(--mat-sys-body-medium-tracking);color:var(--mat-sys-on-surface-variant)}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-button[_ngcontent-%COMP%]{align-self:end;margin:20px 24px 20px 0;--mat-button-text-container-height: 48px;--mat-button-text-horizontal-padding: 20px;--mat-button-text-touch-target-size: 48px;--mat-button-text-label-text-font: var(--mat-sys-label-medium-font);--mat-button-text-label-text-size: var(--mat-sys-label-medium-size);--mat-button-text-label-text-weight: var(--mat-sys-label-medium-weight);--mat-button-text-label-text-tracking: var(--mat-sys-label-medium-tracking)}@media print,screen and (min-width:1280px){[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-title[_ngcontent-%COMP%]{padding:32px 32px 0;font:var(--mat-sys-headline-medium);letter-spacing:var(--mat-sys-headline-medium-tracking)}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-description[_ngcontent-%COMP%]{padding:0 32px;font:var(--mat-sys-body-large);letter-spacing:var(--mat-sys-body-large-tracking)}[_nghost-%COMP%]   .app-exhibit-page--unavailable-container[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-content[_ngcontent-%COMP%]   .app-exhibit-page--unavailable-button[_ngcontent-%COMP%]{--mat-button-text-container-height: 68px;--mat-button-text-horizontal-padding: 32px;--mat-button-text-touch-target-size: 68px;--mat-button-text-label-text-font: var(--mat-sys-label-large-font);--mat-button-text-label-text-size: var(--mat-sys-label-large-size);--mat-button-text-label-text-weight: var(--mat-sys-label-large-weight);--mat-button-text-label-text-tracking: var(--mat-sys-label-large-tracking)}}"]})};export{E as default};