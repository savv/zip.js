(()=>{"use strict";const t="Invalid signature";class e{constructor(){this.crc=-1,this.table=(()=>{const t=[];for(let e=0;e<256;e++){let n=e;for(let t=0;t<8;t++)1&n?n=n>>>1^3988292384:n>>>=1;t[e]=n}return t})()}append(t){const e=this.table;let n=0|this.crc;for(let p=0,r=0|t.length;p<r;p++)n=n>>>8^e[255&(n^t[p])];this.crc=n}get(){return~this.crc}}const n={init:function(t){t.scripts&&t.scripts.length>0&&(t.scripts=t.scripts.filter((t=>!p.includes(t))),p.splice(0,0,...t.scripts),t.scripts.length&&importScripts.apply(void 0,t.scripts),s||"function"!=typeof createShimCodecs||(s=!0,createShimCodecs()));const n=t.options;r={codecType:n.codecType,outputSigned:n.outputSigned,outputCompressed:n.outputCompressed,outputEncrypted:n.outputEncrypted,outputPassword:n.outputPassword,inputSigned:n.inputSigned,inputSignature:n.inputSignature,inputCompressed:n.inputCompressed,inputEncrypted:n.inputEncrypted,inputPassword:n.inputPassword,inputCrc32:n.inputSigned&&new e,outputCrc32:n.outputSigned&&new e,deflater:"deflate"==n.codecType&&new ZipDeflater,inflater:"inflate"==n.codecType&&new ZipInflater,decrypt:n.inputEncrypted&&new ZipDecrypt(n.inputPassword,n.inputSigned),encrypt:n.outputEncrypted&&new ZipEncrypt(n.outputPassword)}},append:async function(t){const e=new Uint8Array(t.data);let n=e;r.inputEncrypted&&(n=await r.decrypt.append(n));r.inputCompressed&&n.length&&(n=await r.inflater.append(n));!r.inputEncrypted&&r.inputSigned&&r.inputCrc32.append(n);r.outputCompressed&&n.length&&(n=await r.deflater.append(e));r.outputEncrypted?n=await r.encrypt.append(n):r.outputSigned&&r.outputCrc32.append(e);return{data:n}},flush:async function(){let e,n=new Uint8Array(0);if(r.inputEncrypted){const e=await r.decrypt.flush();if(!e.valid)throw new Error(t);n=e.data}else if(r.inputSigned){const n=new DataView(new Uint8Array(4).buffer);if(e=r.inputCrc32.get(),n.setUint32(0,e),r.inputSignature!=n.getUint32(0))throw new Error(t)}r.inputCompressed&&(n.length&&(n=await r.inflater.append(n)),await r.inflater.flush());r.outputCompressed&&(n=await r.deflater.flush());if(r.outputEncrypted){n=await r.encrypt.append(n);const t=await r.encrypt.flush();e=t.signature;const p=new Uint8Array(n.length+t.data.length);p.set(n,0),p.set(t.data,n.length),n=p}else r.outputSigned&&(e=r.outputCrc32.get());return{data:n,signature:e}}},p=[];let r,s;addEventListener("message",(async t=>{const e=t.data,p=e.type,r=n[p];if(r)try{const t=await r(e)||{};if(t.type=e.type,t.data)try{postMessage(t,[t.data.buffer])}catch(e){postMessage(t)}else postMessage(t)}catch(t){postMessage({type:p,error:{message:t.message,stack:t.stack}})}}))})();
!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).createShimCodecs=t()}(this,(function(){"use strict";function e(e){return class{constructor(t){const n=e=>this.pendingData=new Uint8Array(e);if(this.codec=new e,"function"==typeof this.codec.onData)this.codec.onData=n;else if("function"==typeof this.codec.on)this.codec.on("data",n);else{if(!t.registerCallbackFunction)throw new Error("Cannot register the callback function.");t.registerCallbackFunction(this.codec,n)}}async append(e){return this.codec.push(e),t(this)}async flush(){return this.codec.push(new Uint8Array(0),!0),t(this)}};function t(e){if(e.pendingData){const t=e.pendingData;return e.pendingData=null,t}return new Uint8Array(0)}}return()=>{const{ZipDeflater:t,ZipInflater:n}={ZipDeflater:e((i=zlib).Deflate),ZipInflater:e(i.Inflate)};var i;self.ZipDeflater=t,self.ZipInflater=n}}));