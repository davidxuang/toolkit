(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[441],{8375:function(a,b,c){(window.__NEXT_P=window.__NEXT_P||[]).push(["/timetable-export",function(){return c(7930)}])},7930:function(a,b,c){"use strict";c.r(b),c.d(b,{default:function(){return L}});var d=c(7568),e=c(828),f=c(9815),g=c(4051),h=c.n(g),i=c(5893),j=c(9669),k=c.n(j),l=c(1011),m=c.n(l),n=c(7294),o=c(7157),p=c(8007),q=c(5290),r=c(2670),s=c(7596),t=c.n(s),u=c(2165),v=function(a,b){return(0,r.Z)(a,Array)?a.length==b.length&&0==a.filter(function(a,c){return!v(a,b[c])}).length:a===b},w=function(a){var b=!0;return(a.forEach(function(a){a.length>1&&a.slice(1).forEach(function(c){v(a[0],c)||(console.log("---"),console.log(a[0]),console.log(c),b=!1)})}),b)?new Map(Array.from(a.entries()).map(function(a){var b=(0,e.Z)(a,2),c=b[0],d=b[1];return[c,[d[0]]]})):a},x=function(a){var b=arguments.length>1&& void 0!==arguments[1]?arguments[1]:0;return(0,r.Z)(a,Array)?"{ ".concat(a.map(function(a){return x(a,b)}).join(", ")," }"):(0,u.Z)(b,"'".concat(a,"'"))},y=function(a,b){return a=w(a),"		{ \n			stations = ".concat(x((0,f.Z)(a.keys())),",\n").concat(Array.from(a).map(function(a){var c=(0,e.Z)(a,2),d=c[0],f=c[1];return"			".concat((0,u.Z)("['".concat(d,"']"),b)," = ").concat(x(f,7),",")}).join("\n"),"\n		}")},z={CRT:function(a){var b;return Array.from(null===(b=a.querySelector("div.result-line-list"))|| void 0===b?void 0:b.childNodes).filter(function(a){return a.id}).map(function(a){return[a.id.substring(9),a.innerText.trim()]})}},A=function(a,b){var c=arguments.length>2&& void 0!==arguments[2]?arguments[2]:0,d=arguments.length>3?arguments[3]:void 0;return(0,r.Z)(b,Array)?b.map(function(b){return a[b+c].innerHTML.trim().replace("--",d?"-":"")}):a[b+c].innerHTML.trim().replace("--",d?"-":"")},B={CRT:function(a,b){var c=a.querySelector("div.result-line-time-list > table#clay10_"+b),d=(0,e.Z)([0,1,2].map(function(a){return(0,f.Z)(c.tHead.rows[a].querySelectorAll("th.bg-f7f7f7")).filter(function(a){return a.innerHTML.trim().length>2}).map(function(a){return a})}),3),g=d[0],h=d[1],i=d[2];if(0==g.length&&((g=[document.createElement("th")])[0].colSpan=h.map(function(a){return a.colSpan}).reduce(function(a,b){return a+b},0)),console.log(g.length),[1,2].includes(g.length)){if(h.length%g.length!=0||h.length<2)throw h.length;if(i.length%g.length!=0||i.length<2)throw i.length}else throw g.length;for(var j=g[0].colSpan,k=[],l=0;l<g.length;l++)t()(g[l].colSpan==j),k.push(l*j);var m=[[],[],[],[]];if(h.length/g.length==2&&i.length/h.length==2)m=[1,2,3,4];else if(h.length/g.length>=2){var n=0,o=g[0].colSpan,p=!0,q=!1,r=void 0;try{for(var s,u=h[Symbol.iterator]();!(p=(s=u.next()).done);p=!0){var v=s.value,w=v.colSpan;if(v.innerHTML.trim().startsWith("首班车"))for(var x=0;x<w;x++){var y=i[n+x].innerHTML.trim();y.includes("↓")||y.includes("内环")?m[0].push(n+x+1):m[1].push(n+x+1)}else for(var z=0;z<w;z++){var B=i[n+z].innerHTML.trim();B.includes("↓")||B.includes("内环")?m[2].push(n+z+1):m[3].push(n+z+1)}if((n+=w)>=o)break}}catch(C){q=!0,r=C}finally{try{p||null==u.return||u.return()}finally{if(q)throw r}}for(var D=0;D<m.length;D++)m[D]=1==m[D].length?m[D][0]:m[D]}else throw h.length;var E=(0,f.Z)(c.tBodies[0].rows).map(function(a){return(0,f.Z)(a.cells)}),F=new Map,G=!0,H=!1,I=void 0;try{for(var J,K=function(a,b){var c=b.value,d=c[0].innerHTML.trim();if(!d||"--"==d)return"break";F.set(c[0].innerHTML.trim(),k.map(function(a){var b=0==c.slice(1).filter(function(a){return a.innerHTML.trim().length>2}).length;return[[A(c,m[0],a,b),A(c,m[1],a,b),],[A(c,m[2],a,b),A(c,m[3],a,b),],]}))},L=E[Symbol.iterator]();!(G=(J=L.next()).done);G=!0){var M=K(L,J);if("break"===M)break}}catch(N){H=!0,I=N}finally{try{G||null==L.return||L.return()}finally{if(H)throw I}}return F}},C=c(5227),D={foreground:"var(--colorNeutralForeground2)",background:"var(--colorNeutralBackground2)",gray:"var(--colorPaletteAnchorBorderActive)",lightGray:"var(--colorPalettePlatinumBorderActive)",red:"var(--colorPaletteRedBorder2)",lightRed:"var(--colorPaletteRedBorder2)",orange:"var(--colorPalettePumpkinBorderActive)",lightOrange:"var(--colorPalettePumpkinBorderActive)",yellow:"var(--colorPaletteGoldBorderActive)",lightYellow:"var(--colorPaletteGoldBorderActive)",green:"var(--colorPaletteForestBorderActive)",lightGreen:"var(--colorPaletteForestBorderActive)",teal:"var(--colorPaletteSteelBorderActive)",lightTeal:"var(--colorPaletteSteelBorderActive)",blue:"var(--colorPaletteRoyalBlueBorderActive)",lightBlue:"var(--colorPaletteRoyalBlueBorderActive)",purple:"var(--colorPaletteGrapeBorderActive)",lightPurple:"var(--colorPaletteGrapeBorderActive)"},E={'pre[class*="language-"]':{color:D.foreground,fontFamily:"monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"2",OTabSize:"2",tabSize:"2",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none",padding:"1em",margin:".5em 0",overflow:"auto",background:D.background},'code[class*="language-"]':{color:D.foreground,fontFamily:"monospace",direction:"ltr",textAlign:"left",whiteSpace:"pre",wordSpacing:"normal",wordBreak:"normal",wordWrap:"normal",lineHeight:"1.5",MozTabSize:"2",OTabSize:"2",tabSize:"2",WebkitHyphens:"none",MozHyphens:"none",msHyphens:"none",hyphens:"none"},':not(pre) > code[class*="language-"]':{padding:".1em",borderRadius:".3em",background:D.background},keyword:{color:D.purple},builtin:{color:D.lightGreen},"class-name":{color:D.lightRed},"maybe-class-name":{color:D.red},function:{color:D.orange},boolean:{color:D.teal},number:{color:D.blue},string:{color:D.lightGreen},char:{color:D.lightBlue},symbol:{color:D.lightBlue},regex:{color:D.lightGreen},url:{color:D.lightPurple},operator:{color:D.purple},variable:{color:D.blue},constant:{color:D.foreground},property:{color:D.gray},"property-access":{color:D.blue},punctuation:{opacity:.75},important:{color:D.gray},comment:{color:D.lightGray},tag:{color:D.blue},"attr-name":{color:D.yellow},"attr-value":{color:D.lightGreen},namespace:{color:D.red},prolog:{color:D.lightGray},doctype:{color:D.lightGray},cdata:{color:D.lightGray},entity:{color:D.purple},atrule:{color:D.purple},selector:{color:D.blue},inserted:{color:D.lightTeal},deleted:{color:D.lightRed}},F=function(a){var b=a.language,c=a.children;return(0,i.jsx)(C.Z,{language:b,style:E,children:c})},G=F,H=c(9008),I=c.n(H),J=(0,o.Z)({main:{marginInline:"auto",paddingBlock:"2rem",maxWidth:"64rem",minHeight:"100vh",backgroundColor:"var(--colorNeutralBackground2)"},actionsBar:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center","> span":{flexGrow:.05},"> div":{flexGrow:.05},"> button":{flexGrow:.05}}}),K=function(){var a,b,c,g=J(),j=(0,n.useState)("CRT"),l=j[0],o=j[1],r=(0,n.useState)(),s=r[0],t=r[1],u=(0,n.useState)(),v=u[0],w=u[1],x=(0,n.useState)(""),A=x[0],C=x[1],D=(0,n.useState)(""),E=D[0],F=D[1],H={CRT:"https://www.cqmetro.cn/riding-guide.html"},K=["https://api.allorigins.win/get?url=","https://corsproxy.io/?",],L=(a=(0,d.Z)(h().mark(function a(b){return h().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:o(b.target.value),w([]);case 2:case"end":return a.stop()}},a)})),function(b){return a.apply(this,arguments)}),M=(b=(0,d.Z)(h().mark(function a(){return h().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:Promise.any(K.map(function(a){return k().get(a+encodeURIComponent(H[l]))})).then(function(a){c=a.headers["content-type"].startsWith("application/json")?new DOMParser().parseFromString(a.data.contents,"text/html"):new DOMParser().parseFromString(a.data,"text/html"),t(c);var b,c,d,e=z[l](c);w(e),C(null!==(d=null==e?void 0:null===(b=e[0])|| void 0===b?void 0:b[0])&& void 0!==d?d:"")});case 1:case"end":return a.stop()}},a)})),function(){return b.apply(this,arguments)}),N=(c=(0,d.Z)(h().mark(function a(){var b,c,d;return h().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:c=B[l](s,A),d=(b=Math).max.apply(b,(0,f.Z)((0,f.Z)(c.keys()).map(function(a){return m()(a)})))+4,F(y(c,d));case 4:case"end":return a.stop()}},a)})),function(){return c.apply(this,arguments)});return(0,i.jsxs)("div",{children:[(0,i.jsx)(I(),{children:(0,i.jsx)("title",{children:"Wikipedia时刻表导出"})}),(0,i.jsxs)("main",{className:g.main,children:[(0,i.jsxs)("div",{className:g.actionsBar,children:[(0,i.jsx)(q.P,{onChange:L,children:(0,i.jsx)("option",{value:"CRT",children:"重庆轨道交通"})}),(0,i.jsx)("div",{}),(0,i.jsx)(p.z,{onClick:M,children:"下载"}),(0,i.jsx)("div",{}),(0,i.jsx)(q.P,{onChange:function(a){return C(a.target.value)},children:null==v?void 0:v.map(function(a){var b=(0,e.Z)(a,2),c=b[0],d=b[1];return(0,i.jsx)("option",{value:c,children:d},c)})}),(0,i.jsx)("div",{}),(0,i.jsx)(p.z,{onClick:N,disabled:void 0==s,children:"导出"})]}),(0,i.jsx)(G,{language:"lua",children:E})]})]})},L=K}},function(a){a.O(0,[945,551,728,774,888,179],function(){var b;return a(a.s=8375)}),_N_E=a.O()}])