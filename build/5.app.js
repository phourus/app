webpackJsonp([5],{1073:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(2),u=i(s),c=n(1100),f=i(c),d=n(1169),p=i(d),m=n(1206),h=i(m),g=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={mode:"monthly"},n}return l(t,e),r(t,[{key:"render",value:function(){var e=this.state.mode;return u["default"].createElement("div",{className:h["default"].pricing},u["default"].createElement("div",{className:h["default"].squeeze},u["default"].createElement("h2",null,"Pricing Options"),u["default"].createElement("a",{href:"javascript:void(0)",className:"monthly"===e?h["default"].linkSelected:h["default"].link,onClick:this.setMode.bind(this,"monthly")},"Monthly"),u["default"].createElement("span",{className:"separator"},"|"),u["default"].createElement("a",{href:"javascript:void(0)",className:"annual"===e?h["default"].linkSelected:h["default"].link,onClick:this.setMode.bind(this,"annual")},"Annual"),u["default"].createElement("div",{className:h["default"].slider},u["default"].createElement("img",{src:"/assets/slider.png",className:h["default"].slide})),u["default"].createElement(f["default"],null),u["default"].createElement("h2",{className:h["default"].title},"A Message from the Team")),u["default"].createElement(p["default"],null))}},{key:"setMode",value:function(e){this.setState({mode:e})}}]),t}(u["default"].Component);t["default"]=g},1079:function(e,t,n){t=e.exports=n(20)(),t.push([e.i,"._1e-S0BQ-DHtcLuVPKGI1Tn {\n  margin: auto;\n  text-align: left;\n}\n\n._336Pc1O8chXE6ObgKdkam7 {\n  text-align: left;\n}\n\n._2YH0zOAoaR_s87etFVzZ99 {\n  font-size: 2em;\n  font-style: italic;\n  color: #777;\n  margin-bottom: 60px;\n}\n\n.k36bCrbzV7463hue18zTe {\n  display: none;\n}\n\n.Ge-ov-YVTnTf4Pb9dBnKq {\n  clear: both;\n  padding: 20px;\n  margin-bottom: 0px;\n  text-align: left;\n}\n\n._17Bu8onCeVmg095EoxUqos {\n  border-left: solid 1px #000;\n}\n\n._3T8-yAmg83uc8CYpYfww5E {\n  font-size: 1.5em;\n  line-height: 1.2em;\n  text-align: left;\n}\n\n.ZBX124knjJyyZPjheh8vh {\n  color: #000;\n}\n\n._2t2IKlfI7qFFBt7-_RMHNm {\n  font-size: 1em;\n}\n\n._1e7t_0y2CC0pU9_5Mtbr57 {\n  font-style: italic;\n  font-size: 0.9em;\n  display: none;\n}\n\n@media (min-width: 500px) {\n\n    .Ge-ov-YVTnTf4Pb9dBnKq {\n      text-align: left;\n    }\n\n    ._1z8iUIe7TA_3QjE2tD3b61 {\n      width: 40%;\n    }\n\n    .k36bCrbzV7463hue18zTe {\n      display: inline-block;\n    }\n}\n\n@media (min-width: 800px) {\n\n  .ybSip_vDTioCfdJwmb4A7 {\n    display: inline-block;\n    width: 60%;\n  }\n\n  ._1z8iUIe7TA_3QjE2tD3b61 {\n    vertical-align: top;\n    display: inline-block;\n    width: 40%;\n  }\n\n  .k36bCrbzV7463hue18zTe {\n    width: 90%;\n    max-width: 300px\n  }\n}\n",""]),t.locals={"blue-light":"'#000'",features:"_1e-S0BQ-DHtcLuVPKGI1Tn",heading:"_336Pc1O8chXE6ObgKdkam7",subtitle:"_2YH0zOAoaR_s87etFVzZ99",img:"k36bCrbzV7463hue18zTe",slide:"Ge-ov-YVTnTf4Pb9dBnKq",slideSelected:"_17Bu8onCeVmg095EoxUqos Ge-ov-YVTnTf4Pb9dBnKq",title:"_3T8-yAmg83uc8CYpYfww5E",titleSelected:"ZBX124knjJyyZPjheh8vh _3T8-yAmg83uc8CYpYfww5E",text:"_2t2IKlfI7qFFBt7-_RMHNm",usage:"_1e7t_0y2CC0pU9_5Mtbr57",post:"_1z8iUIe7TA_3QjE2tD3b61",list:"ybSip_vDTioCfdJwmb4A7"}},1100:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(2),u=i(s),c=n(1125),f=i(c),d=[{title:"Surface Important Content & Ideas",text:"Flatten organizational hierarchies and eliminate the political effect hindering progressive growth.",usage:"Phourus uses a unique algorithm called Influence that offsets the popularity of individual users to ensure valuable content gets the visibility it deserves, not because of who said it."},{title:"Capture Intellectual Capital",text:"Are you capturing the full capabilities of the people you invest significant time and effort recruiting and retaining?",usage:"Use Subjects & Questions on Phourus to enable Subject Matter Experts (SMEs) to create content in their area of expertise for the benefit of the entire organization."},{title:"Embrace Real Culture & Diversity",text:"True culture is not about blue jeans and ping-pong tables. It is about the diverse cultural and socioeconomic backgrounds of each and every employee.",usage:"Use Beliefs, Debates and other tools of expression built into Phourus to unite and educate a diverse workplace."},{title:"Enhance Vision & Engagement",text:"Each employee of a business has his or her own idea of what your company is and where is it going. The vision and mission of a business should be an ongoing evolution involving employees and customers alike.",usage:"Use Beliefs and Quotes to better define your mission and objective, while also engaging employees and acknowledging their contribution to the vision of your business."}],p=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={selected:0},n}return l(t,e),r(t,[{key:"componentDidMount",value:function(){var e=this;this.timeout=setInterval(function(){var t=e.state.selected;t<3?t++:t=0,e.setState({selected:t})},3e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timeout)}},{key:"render",value:function(){var e=this;return u["default"].createElement("div",{className:f["default"].features},u["default"].createElement("div",{className:f["default"].list},d.map(function(t,n){return u["default"].createElement("div",{key:n,className:n===e.state.selected?f["default"].slideSelected:f["default"].slide},u["default"].createElement("span",{className:n===e.state.selected?f["default"].titleSelected:f["default"].title},t.title),u["default"].createElement("p",{className:f["default"].text},t.text),u["default"].createElement("p",{className:f["default"].usage},t.usage))})),u["default"].createElement("div",{className:f["default"].post},u["default"].createElement("img",{src:"/assets/product/post.png",className:f["default"].img})))}}]),t}(u["default"].Component);t["default"]=p},1117:function(e,t,n){t=e.exports=n(20)(),t.push([e.i,"._2csb6yG8mg1TcmoV_UHIQo {\n  padding: 0 !important;\n  margin: 0 !important;\n  width: 100% !important;\n  max-width: 100% !important;\n}\n\n._-NVRuqwi9CS3VNU-uiTXi {\n  width: 90%;\n  margin: auto;\n  padding-top: 20px;\n}\n\n._1-3rlRMUSEHwj5zemtUnpA {\n  margin: 0px 10px 0px 10px;\n  display: inline-block;\n  color: #666;\n}\n\n._2ybUDRqwIezWdBvxbf7TZu {\n  letter-spacing: 2px;\n}\n\n._2yW9fr_qRAOcKwIFlQmdFi {\n  color: #aaa;\n}\n\n._2zfjuw7vtKlZXVSQNsJZ_3 {\n  width: 90%;\n}\n\n._2iSjoxcvkImi-IGb7OA90x {\n  width: 100%;\n}\n\n._U8NA5WgvEp7hUI30WkiB {\n  display: none;\n}\n\n._16dn2YBsTecX8D_70AuKyP {\n  text-align: center;\n  width: 100%;\n}\n\n@media (min-width: 800px) {\n  ._U8NA5WgvEp7hUI30WkiB {\n    display: block;\n  }\n}\n",""]),t.locals={pricing:"_2csb6yG8mg1TcmoV_UHIQo",squeeze:"_-NVRuqwi9CS3VNU-uiTXi",separator:"_1-3rlRMUSEHwj5zemtUnpA",link:"_2ybUDRqwIezWdBvxbf7TZu",linkSelected:"_2yW9fr_qRAOcKwIFlQmdFi",slider:"_2zfjuw7vtKlZXVSQNsJZ_3",slide:"_2iSjoxcvkImi-IGb7OA90x",features:"_U8NA5WgvEp7hUI30WkiB",title:"_16dn2YBsTecX8D_70AuKyP"}},1118:function(e,t,n){t=e.exports=n(20)(),t.push([e.i,"._2D5Zu0DM_8sLDICzFN7ukU {\n  background-color: #4D4D4D;\n  min-height: 400px;\n  color: #fff;\n  margin-top: 100px;\n}\n\n._2FjZviJwRUJ6EpvVsBcyBE {\n  width: 100px;\n  display: block;\n}\n\n._3fug-7zx-OvOKTQufg4kpQ {\n  width: 80%;\n  margin: auto;\n  font-size: 1.1em;\n  letter-spacing: 2px;\n  font-style: italic;\n  line-height: 2em;\n}\n\n.cR82CSsUMhNty8Lmyx-R9 {\n  font-style: normal;\n  text-align: right;\n  font-size: 0.9em;\n  margin-top: 40px;\n}\n\n._2UZ2-2Zwo0gy4RsiGiCCjK {\n  color: #eee;\n  line-height: 1em;\n}\n\n._3UJBR7QK3CG9D-7tbZkUmd {\n  font-size: 0.8em;\n  color: #ccc;\n}\n\n@media (min-width: 500px) {\n\n  ._1_LsJWqDUdCaFiTvmtsqm {\n    width: 80%;\n    margin: auto;\n    position: relative;\n    top: -50px;\n    text-align: center;\n  }\n\n  ._2FjZviJwRUJ6EpvVsBcyBE {\n    display: inline-block;\n    cursor: pointer;\n    width: 80px;\n    opacity: 0.8;\n    margin-right: 20px;\n  }\n\n  ._2FjZviJwRUJ6EpvVsBcyBE:hover {\n    opacity: 1;\n  }\n\n  ._3SEeP5TrxphFE5nPEEjhte {\n    opacity: 1;\n  }\n}\n",""]),t.locals={team:"_2D5Zu0DM_8sLDICzFN7ukU",img:"_2FjZviJwRUJ6EpvVsBcyBE",quote:"_3fug-7zx-OvOKTQufg4kpQ",signature:"cR82CSsUMhNty8Lmyx-R9",name:"_2UZ2-2Zwo0gy4RsiGiCCjK",position:"_3UJBR7QK3CG9D-7tbZkUmd",photos:"_1_LsJWqDUdCaFiTvmtsqm",imgSelected:"_3SEeP5TrxphFE5nPEEjhte _2FjZviJwRUJ6EpvVsBcyBE"}},1125:function(e,t,n){var i=n(1079);"string"==typeof i&&(i=[[e.i,i,""]]);var a=n(21)(i,{sourcemap:!0});i.locals&&(e.exports=i.locals),i.locals||e.hot.accept(1079,function(){var t=n(1079);"string"==typeof t&&(t=[[e.i,t,""]]),a(t)}),e.hot.dispose(function(){a()})},1169:function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}(),s=n(2),u=i(s),c=n(1207),f=i(c),d=[{name:"Jen Wong",position:"UI/UX",quote:"Phourus is the ideal way to organize information for groups and organizations of all sizes",img:"jen"},{name:"Matt Leddy",position:"Sales",quote:"Department heads can get a real pulse on their team they would otherwise struggle to get without Phourus",img:"matt"},{name:"Edwin Chu",position:"Business Development",quote:"Training and onboarding employees is so much simpler and more intuitive with Phourus",img:"edwin"},{name:"Jesse Drelick",position:"Tech",quote:"Managing vast amounts of technical data and specifications is much easier with Phourus than the alternatives",img:"jesse"},{name:"Gina Chavez",position:"Marketing",quote:"Centralizing marketing materials and opening up strategy debates is an excellent way to improve efficiency",img:"jennie"}],p=function(e){function t(e){a(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={index:0},n}return l(t,e),r(t,[{key:"componentDidMount",value:function(){var e=this;this.timeout=setInterval(function(){var t=e.state.index;t<4?t++:t=0,e.setState({index:t})},4e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timeout)}},{key:"render",value:function(){var e=this,t=this.state.index,n=d[t];return u["default"].createElement("div",{className:f["default"].team},u["default"].createElement("div",{className:f["default"].photos},d.map(function(n,i){return u["default"].createElement("img",{src:"/assets/avatars/"+n.img+".png",key:i,onMouseOver:e.change.bind(e,i),className:t===i?f["default"].imgSelected:f["default"].img})})),u["default"].createElement("div",{className:f["default"].quote},u["default"].createElement("p",null,'"'+n.quote+'"'),u["default"].createElement("div",{className:f["default"].signature},u["default"].createElement("div",{className:f["default"].name},n.name),u["default"].createElement("div",{className:f["default"].position},n.position))))}},{key:"change",value:function(e){this.setState({index:e})}}]),t}(u["default"].Component);t["default"]=p},1206:function(e,t,n){var i=n(1117);"string"==typeof i&&(i=[[e.i,i,""]]);var a=n(21)(i,{sourcemap:!0});i.locals&&(e.exports=i.locals),i.locals||e.hot.accept(1117,function(){var t=n(1117);"string"==typeof t&&(t=[[e.i,t,""]]),a(t)}),e.hot.dispose(function(){a()})},1207:function(e,t,n){var i=n(1118);"string"==typeof i&&(i=[[e.i,i,""]]);var a=n(21)(i,{sourcemap:!0});i.locals&&(e.exports=i.locals),i.locals||e.hot.accept(1118,function(){var t=n(1118);"string"==typeof t&&(t=[[e.i,t,""]]),a(t)}),e.hot.dispose(function(){a()})}});