(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"1yRt":function(e,t,n){"use strict";n.d(t,"a",function(){return u});var r=n("mrSG"),o=n("1EZ0"),s=n("V75R"),i=n("CcnG"),u=function(){function e(e,t){if(this.commonservice=e,this.commonmetamaskservice=t,void 0===window.ethereum)this.commonservice.alertmessage("error","Non-Ethereum browser detected. Connect MetaMask");else{localStorage.getItem("Wallettype"),window.web3=window.web3.currentProvider,window.web3=new window.Web3(window.ethereum);var n=this;window.ethereum.on("accountsChanged",function(e){n.commonservice.alertmessage("info","Metamask Account has been changed ! ")})}}return e.prototype.GetReserves=function(e,t,n,o){return r.b(this,void 0,void 0,function(){var s=this;return r.e(this,function(i){return[2,new Promise(function(i,u){return r.b(s,void 0,void 0,function(){var s,u=this;return r.e(this,function(a){switch(a.label){case 0:return void 0===window.web3?[3,2]:[4,(s=new window.web3.eth.Contract(t,e)).methods.getReserves().call({from:n},function(e,t){return r.b(u,void 0,void 0,function(){var n,u,a;return r.e(this,function(r){switch(r.label){case 0:return t?[4,s.methods.token0().call()]:[3,2];case 1:return n=r.sent(),u=0,a=0,n.toLowerCase()==o.fromCurrency_address.toLowerCase()?(u=t[0],a=t[1]):(u=t[1],a=t[0]),i({status:!0,message:"Getreserves Result",resultamount:t,from_amount:u,to_amount:a}),[3,3];case 2:i({status:!1,message:"Got error",data:e}),r.label=3;case 3:return[2]}})})})];case 1:return a.sent(),[3,3];case 2:i({status:!1,message:"Metamask extension not added on your browser"}),a.label=3;case 3:return[2]}})})})]})})},e.prototype.Addliquditytoken_to_token=function(e,t,n,o,s,i,u,a,c,d){return r.b(this,void 0,void 0,function(){var f=this;return r.e(this,function(w){return[2,new Promise(function(w,l){return r.b(f,void 0,void 0,function(){var f;return r.e(this,function(l){return void 0!==window.web3?(f=+this.commonservice.simpleUserStorage.userSlippageTolerance/100,window.web3.eth.getGasPrice(function(l,v){return r.b(this,void 0,void 0,function(){var h,m=this;return r.e(this,function(b){switch(b.label){case 0:return v?(h=+v,h=Math.ceil(h+h*(+f/100)).toString(),[4,new window.web3.eth.Contract(t,e).methods.addLiquidity(n,o,s,i,u,a,c,d).send({from:c,gasPrice:h}).on("transactionHash",function(e){}).on("receipt",function(e){return r.b(m,void 0,void 0,function(){return r.e(this,function(t){return w({status:!0,message:"Successfully approved",result:e}),[2]})})}).on("confirmation",function(e,t){}).on("error",function(e){return r.b(m,void 0,void 0,function(){return r.e(this,function(t){switch(t.label){case 0:return[4,w({status:!1,message:e.message,data:e})];case 1:return t.sent(),[2]}})})})]):[3,2];case 1:return b.sent(),[3,4];case 2:return[4,w({status:!1,message:"Please try again later",result:l})];case 3:b.sent(),b.label=4;case 4:return[2]}})})})):w({status:!1,message:"Metamask extension not added on your browser"}),[2]})})})]})})},e.prototype.Addliquditycoin_to_token=function(e,t,n,o,s,i,u,a,c){return r.b(this,void 0,void 0,function(){var d=this;return r.e(this,function(f){return[2,new Promise(function(f,w){return r.b(d,void 0,void 0,function(){var d;return r.e(this,function(w){return void 0!==window.web3?(d=+this.commonservice.simpleUserStorage.userSlippageTolerance/100,window.web3.eth.getGasPrice(function(w,l){return r.b(this,void 0,void 0,function(){var v,h=this;return r.e(this,function(m){switch(m.label){case 0:return l?(v=+l,v=Math.ceil(v+v*(+d/100)).toString(),[4,new window.web3.eth.Contract(t,e).methods.addLiquidityBNB(o,s,i,u,a,c).send({from:a,value:n,gasPrice:v}).on("transactionHash",function(e){}).on("receipt",function(e){return r.b(h,void 0,void 0,function(){return r.e(this,function(t){return f({status:!0,message:"Successfully approved",result:e}),[2]})})}).on("confirmation",function(e,t){}).on("error",function(e){return r.b(h,void 0,void 0,function(){return r.e(this,function(t){switch(t.label){case 0:return[4,f({status:!1,message:e.message,data:e})];case 1:return t.sent(),[2]}})})})]):[3,2];case 1:return m.sent(),[3,4];case 2:return[4,f({status:!1,message:"Please try again later",result:w})];case 3:m.sent(),m.label=4;case 4:return[2]}})})})):f({status:!1,message:"Metamask extension not added on your browser"}),[2]})})})]})})},e.prototype.Removeliquditycoin_to_token=function(e,t,n,o,s,i,u,a){return r.b(this,void 0,void 0,function(){var c=this;return r.e(this,function(d){return[2,new Promise(function(d,f){return r.b(c,void 0,void 0,function(){var c;return r.e(this,function(f){return void 0!==window.web3?(c=+this.commonservice.simpleUserStorage.userSlippageTolerance/100,window.web3.eth.getGasPrice(function(f,w){return r.b(this,void 0,void 0,function(){var l,v=this;return r.e(this,function(h){switch(h.label){case 0:return w?(l=+w,l=Math.ceil(l+l*(+c/100)).toString(),[4,new window.web3.eth.Contract(t,e).methods.removeLiquidityBNB(n,o,s,i,u,a).send({from:u,gasPrice:l}).on("transactionHash",function(e){}).on("receipt",function(e){return r.b(v,void 0,void 0,function(){return r.e(this,function(t){return d({status:!0,message:"Successfully approved",result:e}),[2]})})}).on("confirmation",function(e,t){}).on("error",function(e){return r.b(v,void 0,void 0,function(){return r.e(this,function(t){switch(t.label){case 0:return[4,d({status:!1,message:e.message,data:e})];case 1:return t.sent(),[2]}})})})]):[3,2];case 1:return h.sent(),[3,4];case 2:return[4,d({status:!1,message:"Please try again later",result:f})];case 3:h.sent(),h.label=4;case 4:return[2]}})})})):d({status:!1,message:"Metamask extension not added on your browser"}),[2]})})})]})})},e.prototype.Removeliquditytoken_to_token=function(e,t,n,o,s,i,u,a,c){return r.b(this,void 0,void 0,function(){var d=this;return r.e(this,function(f){return[2,new Promise(function(f,w){return r.b(d,void 0,void 0,function(){var d;return r.e(this,function(w){return void 0!==window.web3?(d=+this.commonservice.simpleUserStorage.userSlippageTolerance/100,window.web3.eth.getGasPrice(function(w,l){return r.b(this,void 0,void 0,function(){var v,h=this;return r.e(this,function(m){switch(m.label){case 0:return l?(v=+l,v=Math.ceil(v+v*(+d/100)).toString(),[4,new window.web3.eth.Contract(t,e).methods.removeLiquidity(n,o,s,i,u,a,c).send({from:a,gasPrice:v}).on("transactionHash",function(e){}).on("receipt",function(e){return r.b(h,void 0,void 0,function(){return r.e(this,function(t){return f({status:!0,message:"Successfully approved",result:e}),[2]})})}).on("confirmation",function(e,t){}).on("error",function(e){return r.b(h,void 0,void 0,function(){return r.e(this,function(t){switch(t.label){case 0:return[4,f({status:!1,message:e.message,data:e})];case 1:return t.sent(),[2]}})})})]):[3,2];case 1:return m.sent(),[3,4];case 2:return[4,f({status:!1,message:"Please try again later",result:w})];case 3:m.sent(),m.label=4;case 4:return[2]}})})})):f({status:!1,message:"Metamask extension not added on your browser"}),[2]})})})]})})},e.prototype.InfoReserves=function(e,t,n){return r.b(this,void 0,void 0,function(){var o=this;return r.e(this,function(s){return[2,new Promise(function(s,i){return r.b(o,void 0,void 0,function(){var o,i=this;return r.e(this,function(u){switch(u.label){case 0:return void 0===window.web3?[3,2]:[4,(o=new window.web3.eth.Contract(t,e)).methods.getReserves().call({},function(e,t){return r.b(i,void 0,void 0,function(){var i,u,a;return r.e(this,function(r){switch(r.label){case 0:return t?[4,o.methods.token0().call()]:[3,2];case 1:return i=r.sent(),u=0,a=0,i.toLowerCase()==n.fromCurrency_address.toLowerCase()?(u=t[0],a=t[1]):(u=t[1],a=t[0]),s({status:!0,message:"Getreserves Result",resultamount:t,from_amount:u,to_amount:a}),[3,3];case 2:s({status:!1,message:"Got error",data:e}),r.label=3;case 3:return[2]}})})})];case 1:return u.sent(),[3,3];case 2:s({status:!1,message:"Metamask extension not added on your browser"}),u.label=3;case 3:return[2]}})})})]})})},e.ngInjectableDef=i.Y({factory:function(){return new e(i.cb(o.a),i.cb(s.a))},token:e,providedIn:"root"}),e}()}}]);