(this.webpackJsonpport=this.webpackJsonpport||[]).push([[0],{32:function(e,t,n){e.exports=n(45)},37:function(e,t,n){e.exports=n.p+"static/media/logo.5d5d9eef.svg"},38:function(e,t,n){},44:function(e,t,n){},45:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(18),i=n.n(o),c=n(9),l=n(10),s=n(12),p=n(11),d=n(13),m=(n(37),n(38),n(6)),v=n(16),u=function(){return r.a.createElement("div",{className:"navigation"},r.a.createElement(v.b,{className:"navigation-list",to:"/"},r.a.createElement("div",null,"Main")),r.a.createElement(v.b,{className:"navigation-list",to:"/about"},r.a.createElement("div",null,"About")),r.a.createElement(v.b,{className:"navigation-list",to:"/feedback"},r.a.createElement("div",null,"Feedback")))},g=function(e){return console.log("props.",e),r.a.createElement("video",{className:"videos",controls:!0,muted:!0,src:e.project.videoURL,onMouseEnter:function(t){var n=t.target.parentElement.nextElementSibling,a=t.target.parentElement.previousElementSibling,r=t.target.parentElement,o=t.target;e.onVideoEnter(e.project.id,n,a,r,o)},onMouseLeave:function(t){var n=t.target.parentElement.nextElementSibling,a=t.target.parentElement.previousElementSibling,r=t.target.parentElement,o=t.target;e.onVideoLeave(e.project.id,n,a,r,o)}},"Video Unavailable")},h=function(e){return r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){e.onThumbsUp(e.project.id)}},e.project.counts,"\u2728"))},j=function(e){return r.a.createElement("div",null,r.a.createElement("p",{className:"description"},e.project.description),r.a.createElement(h,{onThumbsUp:e.onThumbsUp,project:e.project}))},E=function(e){return r.a.createElement("p",{className:"title"},e.project.title)},f=function(e){return r.a.createElement("div",{className:"cinema"},r.a.createElement("div",{className:"sideBlock sideBlockLeft"},r.a.createElement(E,{project:e.project})),r.a.createElement("div",{className:"scene"},r.a.createElement(g,{onVideoLeave:e.onVideoLeave,onVideoEnter:e.onVideoEnter,project:e.project})),r.a.createElement("div",{className:"sideBlock sideBlockRight"},r.a.createElement(j,{project:e.project,onThumbsUp:e.onThumbsUp})))},b=[{id:1,title:"Wave Generator",description:"wave descrip",link:"/whatever",videoURL:"./vids/wavegenerator_0x_540p.mp4",counts:0},{id:2,title:"Alt Tage Generator",description:"temp",link:"/whatever",videoURL:"./vids/altgenerator_0x.mp4",counts:0},{id:3,title:"Wave Generator",description:"wave descrip",link:"/whatever",videoURL:"./vids/wavegenerator_0x_540p.mp4",counts:0},{id:4,title:"Alt Tage Generator",description:"temp",link:"/whatever",videoURL:"./vids/altgenerator_0x.mp4"},{id:5,title:"Wave Generator",description:"wave descrip",link:"/whatever",videoURL:"./vids/wavegenerator_0x_540p.mp4"},{id:6,title:"Alt Tage Generator",description:"temp",link:"/whatever",videoURL:"./vids/altgenerator_0x.mp4"},{id:7,title:"Wave Generator",description:"wave descrip",link:"/whatever",videoURL:"./vids/wavegenerator_0x_540p.mp4"},{id:8,title:"Alt Tage Generator",description:"temp",link:"/whatever",videoURL:"./vids/altgenerator_0x.mp4"},{id:9,title:"Wave Generator",description:"wave descrip",link:"/whatever",videoURL:"./vids/wavegenerator_0x_540p.mp4"},{id:10,title:"Alt Tage Generator",description:"temp",link:"/whatever",videoURL:"./vids/altgenerator_0x.mp4"},{id:11,title:"Wave Generator",description:"wave descrip",link:"/whatever",videoURL:"./vids/wavegenerator_0x_540p.mp4"},{id:12,title:"Alt Tage Generator",description:"temp",link:"/whatever",videoURL:"./vids/altgenerator_0x.mp4"},{id:13,title:"Wave Generator",description:"wave descrip",link:"/whatever",videoURL:"./vids/wavegenerator_0x_540p.mp4"},{id:14,title:"Alt Tage Generator",description:"temp",link:"/whatever",videoURL:"./vids/altgenerator_0x.mp4"}];var k=function(e,t,n,a,r){console.log(e,"projectid entering"),console.log(n,"sideBlockRight"),console.log(a,"scene"),console.log(t,"sideBlockLeft")},w=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(s.a)(this,Object(p.a)(t).call(this,e))).onThumbsUp=function(e){console.log(e),n.props.dispatch(function(e){return{type:"COUNT_UP",payload:{projectId:e}}}(e))},n.onVideoLeave=function(e,t,n,a,r){r.pause(),k(e,t,n,a);t.style.transform="rotateY(".concat(0,"deg)"),n.style.transform="rotateY(".concat(0,"deg)");a.style.transform="translateZ(-".concat(0,"px)"),t.style.marginLeft="0px",n.style.marginRight="0px"},n.onVideoEnter=function(e,t,n,a,r){k(e,t,n,a),r.play();t.style.transform="rotateY(-".concat(50,"deg)"),n.style.transform="rotateY(".concat(50,"deg)");var o=Math.sin(50*Math.PI/180)/Math.sin(90*Math.PI/180)*200;console.log(o),a.style.transform="translateZ(-".concat(o,"px)"),t.style.marginLeft="-70px",n.style.marginRight="-70px"},console.log(e," from main"),n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){var e=this;return console.log(this.props,"after"),console.log(this.state,"after state"),r.a.createElement("div",null,r.a.createElement("div",{className:"bar"}),r.a.createElement("div",null,this.props.projectsLength>0?r.a.createElement("div",null,this.props.projects.map((function(t){return r.a.createElement("div",{key:t.id},r.a.createElement(f,{key:t.id,project:t,projectsLength:e.props.projectsLength,onVideoLeave:e.onVideoLeave,onVideoEnter:e.onVideoEnter,onThumbsUp:e.onThumbsUp}),r.a.createElement("div",{className:"bar"}))}))):""))}}]),t}(a.Component);var L=Object(m.b)((function(e){var t=e.page;return{projects:t.projects,projectsLength:t.projectsLength}}))(w),O=function(e){function t(e){return Object(c.a)(this,t),Object(s.a)(this,Object(p.a)(t).call(this,e))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,"FeedBack component")}}]),t}(a.Component);var y=Object(m.b)((function(e){return{}}))(O),x=function(e){function t(e){return Object(c.a)(this,t),Object(s.a)(this,Object(p.a)(t).call(this,e))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return r.a.createElement("div",null,"About component")}}]),t}(a.Component);var U=Object(m.b)((function(e){return{}}))(x),_=function(e){return r.a.createElement("li",{className:"menuName"},r.a.createElement("a",{href:""},e.project.title))},N=function(e){return r.a.createElement("ul",null,e.projects.map((function(e){return r.a.createElement(_,{key:e.id,project:e})})))},R=n(14),T=[{id:1,title:"Wave Generator",description:"description",link:"/whatever",videoURL:"./assets/vids/2d3d_0x.mp4"},{id:2,title:"Alt Tage Generator",description:"temp",link:"/whatever",videoURL:"./assets/vids/altgenerator_0x.mp4"}],G=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(s.a)(this,Object(p.a)(t).call(this,e))).state={mockProjects:T},n}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){this.props.dispatch({type:"RECEIVE_ENTITIES",payload:{projects:b}}),console.log("dispatched?")}},{key:"render",value:function(){return console.log(this.props,"from app js"),console.log(this.states,"from app js"),r.a.createElement(v.a,null,r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"item-a header"},r.a.createElement("div",{className:"portfolioLogo"}),r.a.createElement("div",{className:"headerLogo"}),r.a.createElement(u,null)),r.a.createElement("div",{className:"item-c side middle"},r.a.createElement(N,{projects:this.props.projects})),r.a.createElement("div",{className:"item-b main middle"},r.a.createElement(R.a,{exact:!0,path:"/",component:L}),r.a.createElement(R.a,{exact:!0,path:"/about",component:U}),r.a.createElement(R.a,{exact:!0,path:"/feedback",component:y})),r.a.createElement("div",{className:"item-d footer"})))}}]),t}(a.Component);var V=Object(m.b)((function(e){console.log(e,"from reducer");var t=e.page;return{projects:t.projects,projectsLength:t.projectsLength}}))(G),I=(n(44),n(31)),W=n(24),A={projectsLength:0,projects:[]};function B(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:A,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"RECEIVE_ENTITIES":var n=t.payload.projects;return Object(W.a)({},e,{projects:n,projectsLength:n.length});case"COUNT_UP":console.log(e.projects);var a=e.projects,r=t.payload.projectId;if(a.length>0){var o=C(a,r);return console.log(o),a.forEach((function(e){e.id==r&&(e.counts+=1)})),Object(W.a)({},e,{projectsLength:a.length,projects:Object(I.a)(a)})}default:return e}}function C(e,t){var n=e.filter((function(e){return e.id===t}));return console.log(n,"matchingProject"),n[0]}var M=n(15),S=n(29),P=function(e){return function(t){return function(n){console.group(n.type),console.log("dispatching: ",n);var a=t(n);return console.log("next state: ",e.getState()),console.groupEnd(n.type),a}}},Y=n(30);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var D=Object(M.createStore)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1?arguments[1]:void 0;return{page:B(e.page,t)}}),Object(S.composeWithDevTools)(Object(M.applyMiddleware)(Y.a,P)));i.a.render(r.a.createElement(m.a,{store:D},r.a.createElement(V,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[32,1,2]]]);
//# sourceMappingURL=main.8b3694c2.chunk.js.map