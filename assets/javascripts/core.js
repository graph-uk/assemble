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
}(this,"APP"));
// ^^^^^^^^^^^^^^^^^^^^^
// change namespace here
