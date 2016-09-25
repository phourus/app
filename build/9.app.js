webpackJsonp([9],{1047:function(e,t,n){"use strict";function r(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t["default"]=e,t}function o(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(2),d=o(c),p=n(465),s=o(p),f=n(1117),m=r(f),b=function(e){function t(){return a(this,t),u(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"componentDidMount",value:function(){var e=this.props.org;this.props.dispatch(m.collection(e.id))}},{key:"render",value:function(){var e=this,t=this.props.members;return d["default"].createElement("div",{className:"members"},d["default"].createElement("h2",null,"Manage Users"),t.map(function(t){return d["default"].createElement("div",null,d["default"].createElement(s["default"],{img:t.img,id:t.id,type:"user",name:t.username}),d["default"].createElement("div",{className:"profile"},d["default"].createElement("strong",null,t.first," ",t.last),d["default"].createElement("div",null,t.occupation),d["default"].createElement("a",{href:"mailto:"+t.email+"&Subject=Phourus"},t.email)),d["default"].createElement("div",{className:"manage"},t.admin?d["default"].createElement("button",{id:t.memberId,className:"button blue inverted",onClick:e._revoke},"Revoke Admin"):d["default"].createElement("button",{id:t.memberId,className:"button blue",onClick:e._admin},"Make Admin"),t.approved?d["default"].createElement("button",{id:t.memberId,className:"button green inverted",onClick:e._deny},"Remove Member"):d["default"].createElement("button",{id:t.memberId,className:"button green",onClick:e._approve},"Approve Member")))}))}},{key:"_approve",value:function(e){this.props.dispatch(m.approve(e.currentTarget.id))}},{key:"_admin",value:function(e){this.props.dispatch(m.admin(e.currentTarget.id))}},{key:"_revoke",value:function(e){this.props.dispatch(m.revoke(e.currentTarget.id))}},{key:"_deny",value:function(e){this.props.dispatch(m.deny(e.currentTarget.id))}}]),t}(d["default"].Component);t["default"]=b},1117:function(e,t){"use strict";function n(e){return{type:"MEMBERS_COLLECTION",id:e}}function r(e){return{type:"MEMBERS_REQUEST",orgId:e}}function o(e){return{type:"MEMBERS_APPROVE",id:e}}function a(e){return{type:"MEMBERS_ADMIN",id:e}}function u(e){return{type:"MEMBERS_REVOKE",id:e}}function i(e){return{type:"MEMBERS_DENY",id:e}}function l(e){return{type:"MEMBERS_REMOVE",orgId:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.collection=n,t.request=r,t.approve=o,t.admin=a,t.revoke=u,t.deny=i,t.remove=l}});