/*
 * Copyright (c) 2009 Simo Kinnunen.
 * Licensed under the MIT license.
 */
var Cufon=(function(){var L=function(){return L.replace.apply(null,arguments)};var W=L.DOM={ready:(function(){var b=false,d={loaded:1,complete:1};var a=[],c=function(){if(b){return}b=true;for(var e;e=a.shift();e()){}};if(document.addEventListener){document.addEventListener("DOMContentLoaded",c,false);window.addEventListener("pageshow",c,false)}if(!window.opera&&document.readyState){(function(){d[document.readyState]?c():setTimeout(arguments.callee,10)})()}if(document.readyState&&document.createStyleSheet){(function(){try{document.body.doScroll("left");c()}catch(f){setTimeout(arguments.callee,1)}})()}P(window,"load",c);return function(e){if(!arguments.length){c()}else{b?e():a.push(e)}}})()};var M=L.CSS={Size:function(b,a){this.value=parseFloat(b);this.unit=String(b).match(/[a-z%]*$/)[0]||"px";this.convert=function(c){return c/a*this.value};this.convertFrom=function(c){return c/this.value*a};this.toString=function(){return this.value+this.unit}},color:I(function(b){var a={};a.color=b.replace(/^rgba\((.*?),\s*([\d.]+)\)/,function(d,c,e){a.opacity=parseFloat(e);return"rgb("+c+")"});return a}),fontStretch:I(function(a){if(typeof a=="number"){return a}if(/%$/.test(a)){return parseFloat(a)/100}return{"ultra-condensed":0.5,"extra-condensed":0.625,condensed:0.75,"semi-condensed":0.875,"semi-expanded":1.125,expanded:1.25,"extra-expanded":1.5,"ultra-expanded":2}[a]||1}),getStyle:function(b){var a=document.defaultView;if(a&&a.getComputedStyle){return new A(a.getComputedStyle(b,null))}if(b.currentStyle){return new A(b.currentStyle)}return new A(b.style)},gradient:I(function(e){var f={id:e,type:e.match(/^-([a-z]+)-gradient\(/)[1],stops:[]},b=e.substr(e.indexOf("(")).match(/([\d.]+=)?(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)/ig);for(var d=0,a=b.length,c;d<a;++d){c=b[d].split("=",2).reverse();f.stops.push([c[1]||d/(a-1),c[0]])}return f}),quotedList:I(function(d){var c=[],b=/\s*((["'])([\s\S]*?[^\\])\2|[^,]+)\s*/g,a;while(a=b.exec(d)){c.push(a[3]||a[1])}return c}),recognizesMedia:I(function(g){var d=document.createElement("style"),c,b,a;d.type="text/css";d.media=g;try{d.appendChild(document.createTextNode("/**/"))}catch(f){}b=F("head")[0];b.insertBefore(d,b.firstChild);c=(d.sheet||d.styleSheet);a=c&&!c.disabled;b.removeChild(d);return a}),supports:function(c,b){var a=document.createElement("span").style;if(a[c]===undefined){return false}a[c]=b;return a[c]===b},textAlign:function(d,c,a,b){if(c.get("textAlign")=="right"){if(a>0){d=" "+d}}else{if(a<b-1){d+=" "}}return d},textDecoration:function(f,e){if(!e){e=this.getStyle(f)}var b={underline:null,overline:null,"line-through":null};for(var a=f;a.parentNode&&a.parentNode.nodeType==1;){var d=true;for(var c in b){if(!J(b,c)||b[c]){continue}if(e.get("textDecoration").indexOf(c)!=-1){b[c]=e.get("color")}d=false}if(d){break}e=this.getStyle(a=a.parentNode)}return b},textShadow:I(function(e){if(e=="none"){return null}var d=[],f={},a,b=0;var c=/(#[a-f0-9]+|[a-z]+\(.*?\)|[a-z]+)|(-?[\d.]+[a-z%]*)|,/ig;while(a=c.exec(e)){if(a[0]==","){d.push(f);f={};b=0}else{if(a[1]){f.color=a[1]}else{f[["offX","offY","blur"][b++]]=a[2]}}}d.push(f);return d}),textTransform:function(b,a){return b[{uppercase:"toUpperCase",lowercase:"toLowerCase"}[a.get("textTransform")]||"toString"]()},whiteSpace:(function(){var a={inline:1,"inline-block":1,"run-in":1};return function(d,b,c){if(a[b.get("display")]){return d}if(!c.previousSibling){d=d.replace(/^\s+/,"")}if(!c.nextSibling){d=d.replace(/\s+$/,"")}return d}})()};M.ready=(function(){var a=!M.recognizesMedia("all"),d=false;var c=[],g=function(){a=true;for(var j;j=c.shift();j()){}};var h=F("link"),i=F("style");function b(j){return j.disabled||f(j.sheet,j.media||"screen")}function f(m,p){if(!M.recognizesMedia(p||"all")){return true}if(!m||m.disabled){return false}try{var q=m.cssRules,o;if(q){search:for(var k=0,j=q.length;o=q[k],k<j;++k){switch(o.type){case 2:break;case 3:if(!f(o.styleSheet,o.media.mediaText)){return false}break;default:break search}}}}catch(n){}return true}function e(){if(document.createStyleSheet){return true}var k,j;for(j=0;k=h[j];++j){if(k.rel.toLowerCase()=="stylesheet"&&!b(k)){return false}}for(j=0;k=i[j];++j){if(!b(k)){return false}}return true}W.ready(function(){if(!d){d=M.getStyle(document.body).isUsable()}if(a||(d&&e())){g()}else{setTimeout(arguments.callee,10)}});return function(j){if(a){j()}else{c.push(j)}}})();function R(b){var a=this.face=b.face;this.glyphs=b.glyphs;this.w=b.w;this.baseSize=parseInt(a["units-per-em"],10);this.family=a["font-family"].toLowerCase();this.weight=a["font-weight"];this.style=a["font-style"]||"normal";this.viewBox=(function(){var d=a.bbox.split(/\s+/);var c={minX:parseInt(d[0],10),minY:parseInt(d[1],10),maxX:parseInt(d[2],10),maxY:parseInt(d[3],10)};c.width=c.maxX-c.minX;c.height=c.maxY-c.minY;c.toString=function(){return[this.minX,this.minY,this.width,this.height].join(" ")};return c})();this.ascent=-parseInt(a.ascent,10);this.descent=-parseInt(a.descent,10);this.height=-this.ascent+this.descent}function E(){var b={},a={oblique:"italic",italic:"oblique"};this.add=function(c){(b[c.style]||(b[c.style]={}))[c.weight]=c};this.get=function(g,h){var f=b[g]||b[a[g]]||b.normal||b.italic||b.oblique;if(!f){return null}h={normal:400,bold:700}[h]||parseInt(h,10);if(f[h]){return f[h]}var d={1:1,99:0}[h%100],j=[],e,c;if(d===undefined){d=h>400}if(h==500){h=400}for(var i in f){if(!J(f,i)){continue}i=parseInt(i,10);if(!e||i<e){e=i}if(!c||i>c){c=i}j.push(i)}if(h<e){h=e}if(h>c){h=c}j.sort(function(l,k){return(d?(l>h&&k>h)?l<k:l>k:(l<h&&k<h)?l>k:l<k)?-1:1});return f[j[0]]}}function Q(){function c(e,f){if(e.contains){return e.contains(f)}return e.compareDocumentPosition(f)&16}function a(g){var f=g.relatedTarget;if(!f||c(this,f)){return}b(this)}function d(f){b(this)}function b(e){setTimeout(function(){L.replace(e,D.get(e).options,true)},10)}this.attach=function(e){if(e.onmouseenter===undefined){P(e,"mouseover",a);P(e,"mouseout",a)}else{P(e,"mouseenter",d);P(e,"mouseleave",d)}}}function T(){var b=[],c={};function a(g){var d=[],f;for(var e=0;f=g[e];++e){d[e]=b[c[f]]}return d}this.add=function(e,d){c[e]=b.push(d)-1};this.repeat=function(){var d=arguments.length?a(arguments):b,e;for(var f=0;e=d[f++];){L.replace(e[0],e[1],true)}}}function Z(){var c={},a=0;function b(d){return d.cufid||(d.cufid=++a)}this.get=function(d){var e=b(d);return c[e]||(c[e]={})}}function A(a){var c={},b={};this.extend=function(d){for(var e in d){if(J(d,e)){c[e]=d[e]}}return this};this.get=function(d){return c[d]!=undefined?c[d]:a[d]};this.getSize=function(e,d){return b[e]||(b[e]=new M.Size(this.get(e),d))};this.isUsable=function(){return !!a}}function P(b,a,c){if(b.addEventListener){b.addEventListener(a,c,false)}else{if(b.attachEvent){b.attachEvent("on"+a,function(){return c.call(b,window.event)})}}}function U(b,a){var c=D.get(b);if(c.options){return b}if(a.hover&&a.hoverables[b.nodeName.toLowerCase()]){B.attach(b)}c.options=a;return b}function I(a){var b={};return function(c){if(!J(b,c)){b[c]=a.apply(null,arguments)}return b[c]}}function C(f,e){if(!e){e=M.getStyle(f)}var b=M.quotedList(e.get("fontFamily").toLowerCase()),d;for(var c=0,a=b.length;c<a;++c){d=b[c];if(H[d]){return H[d].get(e.get("fontStyle"),e.get("fontWeight"))}}return null}function F(a){return document.getElementsByTagName(a)}function J(b,a){return b.hasOwnProperty(a)}function G(){var a={},c,e;for(var d=0,b=arguments.length;c=arguments[d],d<b;++d){for(e in c){if(J(c,e)){a[e]=c[e]}}}return a}function N(d,n,b,o,e,c){var m=o.separate;if(m=="none"){return Y[o.engine].apply(null,arguments)}var k=document.createDocumentFragment(),g;var h=n.split(O[m]),a=(m=="words");if(a&&S){if(/^\s/.test(n)){h.unshift("")}if(/\s$/.test(n)){h.push("")}}for(var j=0,f=h.length;j<f;++j){g=Y[o.engine](d,a?M.textAlign(h[j],b,j,f):h[j],b,o,e,c,j<f-1);if(g){k.appendChild(g)}}return k}function K(b,j){var c,a,d,g,f,i;for(d=U(b,j).firstChild;d;d=f){g=d.nodeType;f=d.nextSibling;i=false;if(g==1){if(!d.firstChild){continue}if(!/cufon/.test(d.className)){arguments.callee(d,j);continue}else{i=true}}else{if(g!=3){continue}}if(!a){a=M.getStyle(b).extend(j)}if(!c){c=C(b,a)}if(!c){continue}if(i){Y[j.engine](c,null,a,j,d,b);continue}var h=M.whiteSpace(d.data,a,d);if(h===""){continue}var e=N(c,h,a,j,d,b);if(e){d.parentNode.replaceChild(e,d)}else{d.parentNode.removeChild(d)}}}var S=" ".split(/\s+/).length==0;var D=new Z();var B=new Q();var X=new T();var Y={},H={},V={enableTextDecoration:false,engine:null,forceHitArea:false,hover:false,hoverables:{a:true},printable:true,selector:(window.Sizzle||(window.jQuery&&function(a){return jQuery(a)})||(window.dojo&&dojo.query)||(window.$$&&function(a){return $$(a)})||(window.$&&function(a){return $(a)})||(document.querySelectorAll&&function(a){return document.querySelectorAll(a)})||(window.Ext&&Ext.query)||F),separate:"words",textShadow:"none"};var O={words:/[^\S\u00a0]+/,characters:""};L.now=function(){W.ready();return L};L.refresh=function(){X.repeat.apply(X,arguments);return L};L.registerEngine=function(b,a){if(!a){return L}Y[b]=a;return L.set("engine",b)};L.registerFont=function(c){var a=new R(c),b=a.family;if(!H[b]){H[b]=new E()}H[b].add(a);return L.set("fontFamily",'"'+b+'"')};L.replace=function(c,b,a){b=G(V,b);if(!b.engine){return L}if(b.hover){b.forceHitArea=true}if(typeof b.textShadow=="string"){b.textShadow=M.textShadow(b.textShadow)}if(typeof b.color=="string"&&/^-/.test(b.color)){b.textGradient=M.gradient(b.color)}if(!a){X.add(c,arguments)}if(c.nodeType||typeof c=="string"){c=[c]}M.ready(function(){for(var e=0,d=c.length;e<d;++e){var f=c[e];if(typeof f=="string"){L.replace(b.selector(f),b,true)}else{K(f,b)}}});return L};L.set=function(a,b){V[a]=b;return L};return L})();Cufon.registerEngine("canvas",(function(){var B=document.createElement("canvas");if(!B||!B.getContext||!B.getContext.apply){return}B=null;var A=Cufon.CSS.supports("display","inline-block");var E=!A&&(document.compatMode=="BackCompat"||/frameset|transitional/i.test(document.doctype.publicId));var F=document.createElement("style");F.type="text/css";F.appendChild(document.createTextNode((".cufon-canvas{text-indent:0;}@media screen,projection{.cufon-canvas{display:inline;display:inline-block;position:relative;vertical-align:middle;"+(E?"":"font-size:1px;line-height:1px;")+"}.cufon-canvas .cufon-alt{display:-moz-inline-box;display:inline-block;width:0;height:0;overflow:hidden;text-indent:-10000in;}"+(A?".cufon-canvas canvas{position:relative;}":".cufon-canvas canvas{position:absolute;}")+"}@media print{.cufon-canvas{padding:0;}.cufon-canvas canvas{display:none;}.cufon-canvas .cufon-alt{display:inline;}}").replace(/;/g,"!important;")));document.getElementsByTagName("head")[0].appendChild(F);function D(O,H){var M=0,L=0;var G=[],N=/([mrvxe])([^a-z]*)/g,J;generate:for(var I=0;J=N.exec(O);++I){var K=J[2].split(",");switch(J[1]){case"v":G[I]={m:"bezierCurveTo",a:[M+~~K[0],L+~~K[1],M+~~K[2],L+~~K[3],M+=~~K[4],L+=~~K[5]]};break;case"r":G[I]={m:"lineTo",a:[M+=~~K[0],L+=~~K[1]]};break;case"m":G[I]={m:"moveTo",a:[M=~~K[0],L=~~K[1]]};break;case"x":G[I]={m:"closePath"};break;case"e":break generate}H[G[I].m].apply(H,G[I].a)}return G}function C(K,J){for(var I=0,H=K.length;I<H;++I){var G=K[I];J[G.m].apply(J,G.a)}}return function(AH,a,z,W,e,AI){var I=(a===null);if(I){a=e.alt}var c=AH.viewBox;var K=z.getSize("fontSize",AH.baseSize);var v=z.get("letterSpacing");v=(v=="normal")?0:K.convertFrom(parseInt(v,10));var d=0,w=0,u=0,Y=0;var b=W.textShadow,s=[];if(b){for(var AG=b.length;AG--;){var m=b[AG];var r=K.convertFrom(parseFloat(m.offX));var p=K.convertFrom(parseFloat(m.offY));s[AG]=[r,p];if(p<d){d=p}if(r>w){w=r}if(p>u){u=p}if(r<Y){Y=r}}}var AL=Cufon.CSS.textTransform(a,z).split(""),U;var J=AH.glyphs,X,M,AC;var G=0,Q,h=[];for(var AG=0,AE=0,AB=AL.length;AG<AB;++AG){X=J[U=AL[AG]]||AH.missingGlyph;if(!X){continue}if(M){G-=AC=M[U]||0;h[AE-1]-=AC}G+=Q=h[AE++]=~~(X.w||AH.w)+v;M=X.k}if(Q===undefined){return null}w+=c.width-Q;Y+=c.minX;var V,L;if(I){V=e;L=e.firstChild}else{V=document.createElement("span");V.className="cufon cufon-canvas";V.alt=a;L=document.createElement("canvas");V.appendChild(L);if(W.printable){var AD=document.createElement("span");AD.className="cufon-alt";AD.appendChild(document.createTextNode(a));V.appendChild(AD)}}var AM=V.style;var o=L.style;var H=K.convert(c.height);var AK=Math.ceil(H);var t=AK/H;var n=t*Cufon.CSS.fontStretch(z.get("fontStretch"));var q=G*n;var AA=Math.ceil(K.convert(q+w-Y));var O=Math.ceil(K.convert(c.height-d+u));L.width=AA;L.height=O;o.width=AA+"px";o.height=O+"px";d+=c.minY;o.top=Math.round(K.convert(d-AH.ascent))+"px";o.left=Math.round(K.convert(Y))+"px";var T=Math.ceil(K.convert(q))+"px";if(A){AM.width=T;AM.height=K.convert(AH.height)+"px"}else{AM.paddingLeft=T;AM.paddingBottom=(K.convert(AH.height)-1)+"px"}var AJ=L.getContext("2d"),f=H/c.height;AJ.scale(f,f*t);AJ.translate(-Y,-d);AJ.lineWidth=AH.face["underline-thickness"];AJ.save();function N(i,g){AJ.strokeStyle=g;AJ.beginPath();AJ.moveTo(0,i);AJ.lineTo(G,i);AJ.stroke()}var P=W.enableTextDecoration?Cufon.CSS.textDecoration(AI,z):{};if(P.underline){N(-AH.face["underline-position"],P.underline)}if(P.overline){N(AH.ascent,P.overline)}function AF(){AJ.scale(n,1);for(var x=0,k=0,g=AL.length;x<g;++x){var y=J[AL[x]]||AH.missingGlyph;if(!y){continue}if(y.d){AJ.beginPath();if(y.code){C(y.code,AJ)}else{y.code=D("m"+y.d,AJ)}AJ.fill()}AJ.translate(h[k++],0)}AJ.restore()}if(b){for(var AG=b.length;AG--;){var m=b[AG];AJ.save();AJ.fillStyle=m.color;AJ.translate.apply(AJ,s[AG]);AF()}}var S=W.textGradient;if(S){var Z=S.stops,R=AJ.createLinearGradient(0,c.minY,0,c.maxY);for(var AG=0,AB=Z.length;AG<AB;++AG){R.addColorStop.apply(R,Z[AG])}AJ.fillStyle=R}else{AJ.fillStyle=z.get("color")}AF();if(P["line-through"]){N(-AH.descent,P["line-through"])}return V}})());Cufon.registerEngine("vml",(function(){if(!document.namespaces){return}if(document.namespaces.cvml==null){document.namespaces.add("cvml","urn:schemas-microsoft-com:vml")}var B=document.createElement("cvml:shape");B.style.behavior="url(#default#VML)";if(!B.coordsize){return}B=null;var F=(document.documentMode||0)<8;document.write(('<style type="text/css">.cufon-vml-canvas{text-indent:0;}@media screen{cvml\\:shape,cvml\\:rect,cvml\\:fill,cvml\\:shadow{behavior:url(#default#VML);display:block;antialias:true;position:absolute;}.cufon-vml-canvas{position:absolute;text-align:left;}.cufon-vml{display:inline-block;position:relative;vertical-align:'+(F?"middle":"text-bottom")+";}.cufon-vml .cufon-alt{position:absolute;left:-10000in;font-size:1px;}a .cufon-vml{cursor:pointer}}@media print{.cufon-vml *{display:none;}.cufon-vml .cufon-alt{display:inline;}}</style>").replace(/;/g,"!important;"));function C(G,H){return A(G,/(?:em|ex|%)$/i.test(H)?"1em":H)}function A(J,K){if(/px$/i.test(K)){return parseFloat(K)}var I=J.style.left,H=J.runtimeStyle.left;J.runtimeStyle.left=J.currentStyle.left;J.style.left=K.replace("%","em");var G=J.style.pixelLeft;J.style.left=I;J.runtimeStyle.left=H;return G}var E={};function D(L){var M=L.id;if(!E[M]){var J=L.stops,K=document.createElement("cvml:fill"),G=[];K.type="gradient";K.angle=180;K.focus="0";K.method="sigma";K.color=J[0][1];for(var I=1,H=J.length-1;I<H;++I){G.push(J[I][0]*100+"% "+J[I][1])}K.colors=G.join(",");K.color2=J[H][1];E[M]=K}return E[M]}return function(AI,f,AC,b,n,AJ,AA){var J=(f===null);if(J){f=n.alt}var h=AI.viewBox;var L=AC.computedFontSize||(AC.computedFontSize=new Cufon.CSS.Size(C(AJ,AC.get("fontSize"))+"px",AI.baseSize));var z=AC.computedLSpacing;if(z==undefined){z=AC.get("letterSpacing");AC.computedLSpacing=z=(z=="normal")?0:~~L.convertFrom(A(AJ,z))}var X,M;if(J){X=n;M=n.firstChild}else{X=document.createElement("span");X.className="cufon cufon-vml";X.alt=f;M=document.createElement("span");M.className="cufon-vml-canvas";X.appendChild(M);if(b.printable){var AF=document.createElement("span");AF.className="cufon-alt";AF.appendChild(document.createTextNode(f));X.appendChild(AF)}if(!AA){X.appendChild(document.createElement("cvml:shape"))}}var AO=X.style;var u=M.style;var H=L.convert(h.height),AL=Math.ceil(H);var y=AL/H;var s=y*Cufon.CSS.fontStretch(AC.get("fontStretch"));var x=h.minX,w=h.minY;u.height=AL;u.top=Math.round(L.convert(w-AI.ascent));u.left=Math.round(L.convert(x));AO.height=L.convert(AI.height)+"px";var Q=b.enableTextDecoration?Cufon.CSS.textDecoration(AJ,AC):{};var e=AC.get("color");var AN=Cufon.CSS.textTransform(f,AC).split(""),W;var K=AI.glyphs,c,N,AE;var G=0,o=[],v=0,S;var U,g=b.textShadow;for(var AH=0,AG=0,AD=AN.length;AH<AD;++AH){c=K[W=AN[AH]]||AI.missingGlyph;if(!c){continue}if(N){G-=AE=N[W]||0;o[AG-1]-=AE}G+=S=o[AG++]=~~(c.w||AI.w)+z;N=c.k}if(S===undefined){return null}var V=-x+G+(h.width-S);var AM=L.convert(V*s),AB=Math.round(AM);var r=V+","+h.height,I;var m="r"+r+"ns";var T=b.textGradient&&D(b.textGradient);for(AH=0,AG=0;AH<AD;++AH){c=K[AN[AH]]||AI.missingGlyph;if(!c){continue}if(J){U=M.childNodes[AG];while(U.firstChild){U.removeChild(U.firstChild)}}else{U=document.createElement("cvml:shape");M.appendChild(U)}U.stroked="f";U.coordsize=r;U.coordorigin=I=(x-v)+","+w;U.path=(c.d?"m"+c.d+"xe":"")+"m"+I+m;U.fillcolor=e;if(T){U.appendChild(T.cloneNode(false))}var AK=U.style;AK.width=AB;AK.height=AL;if(g){var P=g[0],O=g[1];var a=Cufon.CSS.color(P.color),Y;var q=document.createElement("cvml:shadow");q.on="t";q.color=a.color;q.offset=P.offX+","+P.offY;if(O){Y=Cufon.CSS.color(O.color);q.type="double";q.color2=Y.color;q.offset2=O.offX+","+O.offY}q.opacity=a.opacity||(Y&&Y.opacity)||1;U.appendChild(q)}v+=o[AG++]}var p=U.nextSibling,R,Z;if(b.forceHitArea){if(!p){p=document.createElement("cvml:rect");p.stroked="f";p.className="cufon-vml-cover";R=document.createElement("cvml:fill");R.opacity=0;p.appendChild(R);M.appendChild(p)}Z=p.style;Z.width=AB;Z.height=AL}else{if(p){M.removeChild(p)}}AO.width=Math.max(Math.ceil(L.convert(G*s)),0);if(F){var t=AC.computedYAdjust;if(t===undefined){var d=AC.get("lineHeight");if(d=="normal"){d="1em"}else{if(!isNaN(d)){d+="em"}}AC.computedYAdjust=t=0.5*(A(AJ,d)-parseFloat(AO.height))}if(t){AO.marginTop=Math.ceil(t)+"px";AO.marginBottom=t+"px"}}return X}})());