(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{"1Gz7":function(e,n,t){"use strict";t.d(n,"a",function(){return r});var a=t("mrSG"),i=t("1EZ0"),u=t("CcnG"),r=function(){function e(e){if(this.commonservice=e,void 0===window.ethereum)this.commonservice.alertmessage("error","Non-Ethereum browser detected. Connect MetaMask");else{localStorage.getItem("Wallettype"),window.web3=window.web3.currentProvider,window.web3=new window.Web3(window.ethereum);var n=this;window.ethereum.on("accountsChanged",function(e){n.commonservice.alertmessage("info","Metamask Account has been changed ! ")})}}return e.prototype.getAmountsIn=function(e,n,t,i){return a.b(this,void 0,void 0,function(){var u=this;return a.e(this,function(r){return[2,new Promise(function(r,s){return a.b(u,void 0,void 0,function(){var u=this;return a.e(this,function(s){switch(s.label){case 0:return void 0===window.web3?[3,2]:[4,new window.web3.eth.Contract(n,e).methods.getAmountsIn(t,i).call(function(e,n){return a.b(u,void 0,void 0,function(){return a.e(this,function(t){return r(n?{status:!0,message:"GetamountsInresult Result",resultamount:n}:{status:!1,message:"Got error",data:e}),[2]})})})];case 1:return s.sent(),[3,3];case 2:r({status:!1,message:"Metamask extension not added on your browser"}),s.label=3;case 3:return[2]}})})})]})})},e.prototype.getAmountsOut=function(e,n,t,i){return a.b(this,void 0,void 0,function(){var u=this;return a.e(this,function(r){return[2,new Promise(function(r,s){return a.b(u,void 0,void 0,function(){var u=this;return a.e(this,function(s){switch(s.label){case 0:return void 0===window.web3?[3,2]:[4,new window.web3.eth.Contract(n,e).methods.getAmountsOut(t,i).call(function(e,n){return a.b(u,void 0,void 0,function(){return a.e(this,function(t){return r(n?{status:!0,message:"getamountsOutresult Result",resultamount:n}:{status:!1,message:"Got error",data:e}),[2]})})})];case 1:return s.sent(),[3,3];case 2:r({status:!1,message:"Metamask extension not added on your browser"}),s.label=3;case 3:return[2]}})})})]})})},e.prototype.swapExactTokensForETH=function(e,n,t,i,u,r,s){return a.b(this,void 0,void 0,function(){var o=this;return a.e(this,function(p){return[2,new Promise(function(p,y){return a.b(o,void 0,void 0,function(){var o;return a.e(this,function(y){return void 0!==window.web3?(o=+this.commonservice.simpleUserStorage.userSlippageTolerance/100,window.web3.eth.getGasPrice(function(y,d){return a.b(this,void 0,void 0,function(){var m,l=this;return a.e(this,function(c){switch(c.label){case 0:return d?(m=+d,m=Math.ceil(m+m*(+o/100)).toString(),[4,new window.web3.eth.Contract(n,e).methods.swapExactTokensForBNB(t,i,u,r,s).send({from:r,gasPrice:m}).on("transactionHash",function(e){}).on("receipt",function(e){return a.b(l,void 0,void 0,function(){return a.e(this,function(n){return p({status:!0,message:"Successfully swap",result:e}),[2]})})}).on("confirmation",function(e,n){}).on("error",function(e){return a.b(l,void 0,void 0,function(){return a.e(this,function(n){switch(n.label){case 0:return[4,p({status:!1,message:e.message,data:e})];case 1:return n.sent(),[2]}})})})]):[3,2];case 1:return c.sent(),[3,4];case 2:return[4,p({status:!1,message:"Please try again later",result:y})];case 3:c.sent(),c.label=4;case 4:return[2]}})})})):p({status:!1,message:"Metamask extension not added on your browser"}),[2]})})})]})})},e.prototype.swapExactETHForTokens=function(e,n,t,i,u,r,s){return a.b(this,void 0,void 0,function(){var o=this;return a.e(this,function(p){return[2,new Promise(function(p,y){return a.b(o,void 0,void 0,function(){var o;return a.e(this,function(y){return void 0!==window.web3?(o=+this.commonservice.simpleUserStorage.userSlippageTolerance/100,window.web3.eth.getGasPrice(function(y,d){return a.b(this,void 0,void 0,function(){var m,l=this;return a.e(this,function(c){switch(c.label){case 0:return d?(m=+d,m=Math.ceil(m+m*(+o/100)).toString(),[4,new window.web3.eth.Contract(n,e).methods.swapExactBNBForTokens(i,u,r,s).send({from:r,value:t,gasPrice:m}).on("transactionHash",function(e){}).on("receipt",function(e){return a.b(l,void 0,void 0,function(){return a.e(this,function(n){return p({status:!0,message:"Successfully swap",result:e}),[2]})})}).on("confirmation",function(e,n){}).on("error",function(e){return a.b(l,void 0,void 0,function(){return a.e(this,function(n){switch(n.label){case 0:return[4,p({status:!1,message:e.message,data:e})];case 1:return n.sent(),[2]}})})})]):[3,2];case 1:return c.sent(),[3,4];case 2:return[4,p({status:!1,message:"Please try again later",result:y})];case 3:c.sent(),c.label=4;case 4:return[2]}})})})):p({status:!1,message:"Metamask extension not added on your browser"}),[2]})})})]})})},e.prototype.swapExactTokensForTokens=function(e,n,t,i,u,r,s){return a.b(this,void 0,void 0,function(){var o=this;return a.e(this,function(p){return[2,new Promise(function(p,y){return a.b(o,void 0,void 0,function(){var o;return a.e(this,function(y){return void 0!==window.web3?(o=+this.commonservice.simpleUserStorage.userSlippageTolerance/100,window.web3.eth.getGasPrice(function(y,d){return a.b(this,void 0,void 0,function(){var m,l=this;return a.e(this,function(c){switch(c.label){case 0:return d?(m=+d,m=Math.ceil(m+m*(+o/100)).toString(),[4,new window.web3.eth.Contract(n,e).methods.swapExactTokensForTokens(t,i,u,r,s).send({from:r,gasPrice:m}).on("transactionHash",function(e){}).on("receipt",function(e){return a.b(l,void 0,void 0,function(){return a.e(this,function(n){return p({status:!0,message:"Successfully swap",result:e}),[2]})})}).on("confirmation",function(e,n){}).on("error",function(e){return a.b(l,void 0,void 0,function(){return a.e(this,function(n){switch(n.label){case 0:return[4,p({status:!1,message:e.message,data:e})];case 1:return n.sent(),[2]}})})})]):[3,2];case 1:return c.sent(),[3,4];case 2:return[4,p({status:!1,message:"Please try again later",result:y})];case 3:c.sent(),c.label=4;case 4:return[2]}})})})):p({status:!1,message:"Metamask extension not added on your browser"}),[2]})})})]})})},e.prototype.sleep=function(e){return new Promise(function(n){return setTimeout(n,e)})},e.ngInjectableDef=u.Y({factory:function(){return new e(u.cb(i.a))},token:e,providedIn:"root"}),e}()},"3bqL":function(e,n,t){"use strict";t.d(n,"a",function(){return a});var a={router_contract:"0x6cf0503c56a641d104618145f71da8776778d997",WBNB_contract:"0xc778417e063141139fce010982780140aa0cd5ab",factory_contract:"0x19818b0dc8245ed2f970a5b6aedbee65d1da82e2",root_stack_contract:"0x50186a21F9bA08E9FC9B646E23A91E5152Cc37d2",own_token_contract:"0xFda5b02Dec916bc5a00D5bAec3B85bbC5BF8A54E"}},CSeC:function(e,n,t){"use strict";t.d(n,"a",function(){return a});var a=[{inputs:[{internalType:"address",name:"_factory",type:"address"},{internalType:"address",name:"_WBNB",type:"address"}],stateMutability:"nonpayable",type:"constructor"},{inputs:[],name:"WBNB",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"address",name:"tokenA",type:"address"},{internalType:"address",name:"tokenB",type:"address"},{internalType:"uint256",name:"amountADesired",type:"uint256"},{internalType:"uint256",name:"amountBDesired",type:"uint256"},{internalType:"uint256",name:"amountAMin",type:"uint256"},{internalType:"uint256",name:"amountBMin",type:"uint256"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"addLiquidity",outputs:[{internalType:"uint256",name:"amountA",type:"uint256"},{internalType:"uint256",name:"amountB",type:"uint256"},{internalType:"uint256",name:"liquidity",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"amountTokenDesired",type:"uint256"},{internalType:"uint256",name:"amountTokenMin",type:"uint256"},{internalType:"uint256",name:"amountBNBMin",type:"uint256"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"addLiquidityBNB",outputs:[{internalType:"uint256",name:"amountToken",type:"uint256"},{internalType:"uint256",name:"amountBNB",type:"uint256"},{internalType:"uint256",name:"liquidity",type:"uint256"}],stateMutability:"payable",type:"function"},{inputs:[],name:"factory",outputs:[{internalType:"address",name:"",type:"address"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"amountOut",type:"uint256"},{internalType:"uint256",name:"reserveIn",type:"uint256"},{internalType:"uint256",name:"reserveOut",type:"uint256"}],name:"getAmountIn",outputs:[{internalType:"uint256",name:"amountIn",type:"uint256"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"uint256",name:"amountIn",type:"uint256"},{internalType:"uint256",name:"reserveIn",type:"uint256"},{internalType:"uint256",name:"reserveOut",type:"uint256"}],name:"getAmountOut",outputs:[{internalType:"uint256",name:"amountOut",type:"uint256"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"uint256",name:"amountOut",type:"uint256"},{internalType:"address[]",name:"path",type:"address[]"}],name:"getAmountsIn",outputs:[{internalType:"uint256[]",name:"amounts",type:"uint256[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"amountIn",type:"uint256"},{internalType:"address[]",name:"path",type:"address[]"}],name:"getAmountsOut",outputs:[{internalType:"uint256[]",name:"amounts",type:"uint256[]"}],stateMutability:"view",type:"function"},{inputs:[{internalType:"uint256",name:"amountA",type:"uint256"},{internalType:"uint256",name:"reserveA",type:"uint256"},{internalType:"uint256",name:"reserveB",type:"uint256"}],name:"quote",outputs:[{internalType:"uint256",name:"amountB",type:"uint256"}],stateMutability:"pure",type:"function"},{inputs:[{internalType:"address",name:"tokenA",type:"address"},{internalType:"address",name:"tokenB",type:"address"},{internalType:"uint256",name:"liquidity",type:"uint256"},{internalType:"uint256",name:"amountAMin",type:"uint256"},{internalType:"uint256",name:"amountBMin",type:"uint256"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"removeLiquidity",outputs:[{internalType:"uint256",name:"amountA",type:"uint256"},{internalType:"uint256",name:"amountB",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"liquidity",type:"uint256"},{internalType:"uint256",name:"amountTokenMin",type:"uint256"},{internalType:"uint256",name:"amountBNBMin",type:"uint256"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"removeLiquidityBNB",outputs:[{internalType:"uint256",name:"amountToken",type:"uint256"},{internalType:"uint256",name:"amountBNB",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"liquidity",type:"uint256"},{internalType:"uint256",name:"amountTokenMin",type:"uint256"},{internalType:"uint256",name:"amountBNBMin",type:"uint256"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"removeLiquidityBNBSupportingFeeOnTransferTokens",outputs:[{internalType:"uint256",name:"amountBNB",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"liquidity",type:"uint256"},{internalType:"uint256",name:"amountTokenMin",type:"uint256"},{internalType:"uint256",name:"amountBNBMin",type:"uint256"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"},{internalType:"bool",name:"approveMax",type:"bool"},{internalType:"uint8",name:"v",type:"uint8"},{internalType:"bytes32",name:"r",type:"bytes32"},{internalType:"bytes32",name:"s",type:"bytes32"}],name:"removeLiquidityBNBWithPermit",outputs:[{internalType:"uint256",name:"amountToken",type:"uint256"},{internalType:"uint256",name:"amountBNB",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"token",type:"address"},{internalType:"uint256",name:"liquidity",type:"uint256"},{internalType:"uint256",name:"amountTokenMin",type:"uint256"},{internalType:"uint256",name:"amountBNBMin",type:"uint256"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"},{internalType:"bool",name:"approveMax",type:"bool"},{internalType:"uint8",name:"v",type:"uint8"},{internalType:"bytes32",name:"r",type:"bytes32"},{internalType:"bytes32",name:"s",type:"bytes32"}],name:"removeLiquidityBNBWithPermitSupportingFeeOnTransferTokens",outputs:[{internalType:"uint256",name:"amountBNB",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"address",name:"tokenA",type:"address"},{internalType:"address",name:"tokenB",type:"address"},{internalType:"uint256",name:"liquidity",type:"uint256"},{internalType:"uint256",name:"amountAMin",type:"uint256"},{internalType:"uint256",name:"amountBMin",type:"uint256"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"},{internalType:"bool",name:"approveMax",type:"bool"},{internalType:"uint8",name:"v",type:"uint8"},{internalType:"bytes32",name:"r",type:"bytes32"},{internalType:"bytes32",name:"s",type:"bytes32"}],name:"removeLiquidityWithPermit",outputs:[{internalType:"uint256",name:"amountA",type:"uint256"},{internalType:"uint256",name:"amountB",type:"uint256"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"amountOut",type:"uint256"},{internalType:"address[]",name:"path",type:"address[]"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"swapBNBForExactTokens",outputs:[{internalType:"uint256[]",name:"amounts",type:"uint256[]"}],stateMutability:"payable",type:"function"},{inputs:[{internalType:"uint256",name:"amountOutMin",type:"uint256"},{internalType:"address[]",name:"path",type:"address[]"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"swapExactBNBForTokens",outputs:[{internalType:"uint256[]",name:"amounts",type:"uint256[]"}],stateMutability:"payable",type:"function"},{inputs:[{internalType:"uint256",name:"amountOutMin",type:"uint256"},{internalType:"address[]",name:"path",type:"address[]"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"swapExactBNBForTokensSupportingFeeOnTransferTokens",outputs:[],stateMutability:"payable",type:"function"},{inputs:[{internalType:"uint256",name:"amountIn",type:"uint256"},{internalType:"uint256",name:"amountOutMin",type:"uint256"},{internalType:"address[]",name:"path",type:"address[]"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"swapExactTokensForBNB",outputs:[{internalType:"uint256[]",name:"amounts",type:"uint256[]"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"amountIn",type:"uint256"},{internalType:"uint256",name:"amountOutMin",type:"uint256"},{internalType:"address[]",name:"path",type:"address[]"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"swapExactTokensForBNBSupportingFeeOnTransferTokens",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"amountIn",type:"uint256"},{internalType:"uint256",name:"amountOutMin",type:"uint256"},{internalType:"address[]",name:"path",type:"address[]"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"swapExactTokensForTokens",outputs:[{internalType:"uint256[]",name:"amounts",type:"uint256[]"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"amountIn",type:"uint256"},{internalType:"uint256",name:"amountOutMin",type:"uint256"},{internalType:"address[]",name:"path",type:"address[]"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"swapExactTokensForTokensSupportingFeeOnTransferTokens",outputs:[],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"amountOut",type:"uint256"},{internalType:"uint256",name:"amountInMax",type:"uint256"},{internalType:"address[]",name:"path",type:"address[]"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"swapTokensForExactBNB",outputs:[{internalType:"uint256[]",name:"amounts",type:"uint256[]"}],stateMutability:"nonpayable",type:"function"},{inputs:[{internalType:"uint256",name:"amountOut",type:"uint256"},{internalType:"uint256",name:"amountInMax",type:"uint256"},{internalType:"address[]",name:"path",type:"address[]"},{internalType:"address",name:"to",type:"address"},{internalType:"uint256",name:"deadline",type:"uint256"}],name:"swapTokensForExactTokens",outputs:[{internalType:"uint256[]",name:"amounts",type:"uint256[]"}],stateMutability:"nonpayable",type:"function"},{stateMutability:"payable",type:"receive"}]}}]);