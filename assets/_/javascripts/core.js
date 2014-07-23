/*! template-project 2014-07-23 */

// set flag for javascript-enabled environment
(function(d,c,r){d[c]=d[c][r]("no-js", "js")}(document.documentElement,"className","replace"));

(function(window,NS) {
// global namespace
window[NS] = {};
/*!
 * Application namespace and defaults
 * @see https://github.com/mistakster/app-skeleton
 */
(function(f,k){function l(c){return"undefined"===typeof c||null===c}var m=f[k]=f[k]||{},n=Object.prototype.toString;(function(){function c(a,b,e){var d,c;if(a)for(a=a.split("."),d=a[0]===k?1:0;d<a.length;d+=1){c=e[a[d]]||{};var f=a[d],g;if(d===a.length-1&&b){g=b;var h=void 0;for(h in c)!l(c[h])&&l(g[h])&&(g[h]=c[h])}else g=c;e=e[f]=g}return e}var p={};m.namespace=function(a,b){return c(a,b,f[k])};m.defaults=function(a,b,e){if(b&&"[object Object]"===n.apply(b))e=c(a,b,p);else{a=c(a,{},p);var d;if(!l(b))for(d=(""+b).split("."),b=0;b<d.length;b+=1)if(a&&"[object Object]"===n.apply(a)&&a.hasOwnProperty(d[b]))a=a[d[b]];else{a=e;break}e=a}return e}})()})(window,NS);
/*!
 * Sugared DOM
 * @see https://gist.github.com/1532562
 * @see https://github.com/mistakster/sugared-dom
 */
window[NS].el=function(){var j=document,k=Object.prototype.toString,o={"class":"className",className:"className",defaultValue:"defaultValue","for":"htmlFor",html:"innerHTML",text:"textContent",value:"value"},p={checked:1,defaultChecked:1,disabled:1,multiple:1,selected:1},l=function(d,b){var f,c,a;f=0;for(c=b.length;f<c;f+=1)if(a=b[f])"[object Array]"===k.apply(a)?l(d,a):("string"===typeof a&&(a=j.createTextNode(a)),d.appendChild(a))},m=/#|\./;return function(d,b,f){"[object Array]"===k.apply(b)&&(f=b,b= null);var c,a,e,g,n,h,i;if(m.test(d)){c=d;a=c.split(m);d=a[0];b||(b={});h=0;g=1;for(n=a.length;g<n;g++)e=a[g],h=c.indexOf(e,h+1),"#"===c.charAt(h-1)?b.id=e:b.className=b.className?b.className+" "+e:e}d=j.createElement(d);if(b)for(i in b){c=d;a=i;e=b[i];if("style"===a)throw Error("Incompatible attribute 'style'");(g=o[a])?c[g]=null==e?"":""+e:p[a]?c[a]=!!e:null==e?c.removeAttribute(a):c.setAttribute(a,""+e)}f&&l(d,f);return d}}();
}(this,"App"));
// ^^^^^^^^^^^^^^^^^^^^^
// change namespace here


;App.defaults("App.SVG", {elements:
'<svg xmlns="http://www.w3.org/2000/svg" width="0" height="0"><defs><path id="nav-down" d="M0 1l5 5 5'+
'-5-1-1-4 4-4-4-1 1z"></path><path id="nav-up" d="M10 5l-5-5-5 5 1 1 4-4 4 4 1-1z"></path><polygon id'+
'="icon-arrow-right" points="15,7 11,11 20,20 11,29 15,33 28,20"></polygon><polygon id="icon-arrow-le'+
'ft" points="25,33 29,29 20,20 29,11 25,7 12,20"></polygon><path id="icon-circle-arrow-right" d="M20 '+
'10c5.5 0 10 4.5 10 10s-4.5 10-10 10-10-4.5-10-10 4.5-10 10-10zm-2.8 13.5c-.3.3-.3.8 0 1l1 1c.3.3.7.3'+
' 1 0l4.8-5c.3-.3.3-.8 0-1l-4.9-5.1c-.3-.3-.7-.3-1 0l-1 1c-.3.3-.3.8 0 1l3.4 3.5-3.3 3.6z"></path><pa'+
'th id="icon-circle-arrow-left" d="M20 10c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z'+
'm2.8 13.5c.3.3.3.8 0 1l-1 1c-.3.3-.7.3-1 0l-4.8-5c-.3-.3-.3-.8 0-1l4.9-5.1c.3-.3.7-.3 1 0l1 1c.3.3.3'+
'.8 0 1l-3.4 3.6 3.3 3.5z"></path><path id="icon-play" d="M20 5c-8.3 0-15 6.7-15 15s6.7 15 15 15 15-6'+
'.7 15-15-6.7-15-15-15zm0 27c-6.6 0-12-5.4-12-12s5.4-12 12-12 12 5.4 12 12-5.4 12-12 12zm-3-6l9-6-9-6'+
'v12z"></path><filter id="filter-shadow"><feOffset dx="0" dy="1"></feOffset><feGaussianBlur stdDeviat'+
'ion="1"></feGaussianBlur><feColorMatrix type="matrix" values="0 0 0 .75 0, 0 0 0 .75 0, 0 0 0 .75 0,'+
' 0 0 0 .75 0" result="shadow"></feColorMatrix><feMerge><feMergeNode in="shadow"></feMergeNode><feMer'+
'geNode in="SourceGraphic"></feMergeNode></feMerge></filter></defs></svg>'
});