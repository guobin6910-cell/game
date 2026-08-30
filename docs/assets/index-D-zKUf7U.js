(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const i of o)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&s(d)}).observe(document,{childList:!0,subtree:!0});function e(o){const i={};return o.integrity&&(i.integrity=o.integrity),o.referrerPolicy&&(i.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?i.credentials="include":o.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function s(o){if(o.ep)return;o.ep=!0;const i=e(o);fetch(o.href,i)}})();const bt="zhufeng-v1",X=[{id:"weapon",name:"武器"},{id:"armor",name:"護甲"},{id:"helm",name:"頭盔"},{id:"boots",name:"靴"},{id:"acc",name:"飾品"}],F=[{id:"fan",name:"凡",color:"#8e8a84",rank:0},{id:"liang",name:"良",color:"#5dcc6a",rank:1},{id:"jing",name:"精",color:"#5ba3e0",rank:2},{id:"ji",name:"極",color:"#c084fc",rank:3},{id:"shen",name:"神",color:"#f5c542",rank:4}],yt={atk:"攻擊",def:"防禦",hp:"氣血",crit:"暴擊",aspd:"攻速",ls:"吸血"},w={atk:15,def:6,hp:125,crit:6,aspd:1,ls:0},I={atk:2.2,def:1.15,hp:16,crit:.15},J=[{id:"kaishan",name:"開山",type:"active",unlock:1,cd:5200,blurb:"額外一記重斬",desc(t){return`冷卻 5.2 秒，追加一擊造成攻擊力 ${80+t*12}% 傷害`},next(t){return`傷害 ${80+(t+1)*12}%`}},{id:"tiegu",name:"鐵骨",type:"passive",unlock:2,blurb:"氣血與防禦提升",desc(t){const n=Math.round((4+t*2.5)*10)/10,e=Math.round((3+t*2)*10)/10;return`氣血 +${n}%　防禦 +${e}%`},next(t){return`氣血 +${(4+(t+1)*2.5).toFixed(1)}%　防禦 +${(3+(t+1)*2).toFixed(1)}%`}},{id:"lianzhan",name:"連斬",type:"passive",unlock:4,blurb:"普攻有機率再砍一刀",desc(t){return`普攻 ${6+t*2}% 機率追加 70% 傷害`},next(t){return`機率 ${6+(t+1)*2}%`}},{id:"huichun",name:"回春",type:"active",unlock:6,cd:9e3,blurb:"戰鬥中自動回血",desc(t){return`冷卻 9 秒，回復最大氣血 ${10+t*2}%`},next(t){return`回復 ${10+(t+1)*2}%`}},{id:"pojia",name:"破甲",type:"active",unlock:8,cd:8e3,blurb:"削敵防，克首領",desc(t){return`冷卻 8 秒，使敵人防禦降低 ${10+t*3}%，持續 6 秒`},next(t){return`削防 ${10+(t+1)*3}%`}},{id:"jianyi",name:"劍意",type:"passive",unlock:10,blurb:"暴擊提升",desc(t){return`暴擊 +${3+t*1.6}%　暴擊傷害 +${8+t*2}%`},next(t){return`暴擊 +${(3+(t+1)*1.6).toFixed(1)}%`}}],D=[{id:"guandao",name:"官道",flavor:"驛路煙塵，刀光如線"},{id:"huangci",name:"荒祠",flavor:"殘香冷月，鬼刃出鞘"},{id:"zhandao",name:"棧道",flavor:"雲深鐵索，一鋒當關"},{id:"kuangkeng",name:"礦坑",flavor:"玄鐵地脈，錘聲不絕"},{id:"guancheng",name:"關城",flavor:"金戈鑄兵，關前問鋒"}],ct=[["官道口","驛亭","荒塚坡","盜魁寨","斷橋","密林岔","哨崗","官道霸主"],["山門","殘碑","香案","祠中鬼影","後殿","枯井","鐘樓","荒祠主祭"],["崖口","鐵索","雲棧","棧道匪首","險峰","風口","斷崖","棧道劍魔"],["坑口","礦道","廢井","礦奴頭目","深層","晶洞","熔爐","礦脈魔君"],["關外","吊橋","箭樓","守關校尉","內城","校場","帥帳","關城霸王"]],Tt=[["enrage","extra","heal","enrage","extra"],["heal","enrage","extra","heal","enrage"]],Ct=[["山賊","逃兵","刀客","伏路人","瘦狼","路匪"],["祠巫","紙人","陰卒","香客鬼","青燈影","掃殿僧"],["崖匪","索客","雲盜","風狼","棧卒","斷路人"],["礦奴","錘手","坑鬼","鐵鼠","爐工","挖角賊"],["關卒","弓手","刀衛","巡城兵","旗手","門吏"]],qt=[["瘦刀張","夜路七","疤臉王","獨眼侯","斷指劉"],["白面祭酒","燈下鬼","三更鐘","香灰娘","無頭祝"],["鐵索爺","雲裡刀","風口二","崖邊鬼","索命客"],["錘霸","赤爐王","鐵屑鬼","深坑老","玄鐵奴"],["校刀尉","金甲卒","門前虎","箭樓鷹","關西刀"]],Et={enrage:"狂怒：時限一至，攻勢暴漲",heal:"回春：時不時舔傷回血",extra:"連擊：每三刀必出第二刀"},k=[];for(let t=0;t<5;t++)for(let n=0;n<8;n++){const e=t*8+n,s=n===3||n===7,o=s?Tt[n===3?0:1][t]:null;k.push({index:e,map:t,local:n+1,name:ct[t][n],mapName:D[t].name,label:`${D[t].name} ${n+1}-${ct[t][n]}`,isBoss:s,mechanic:o,mechanicText:o?Et[o]:"",trashNames:Ct[t],namedPool:qt[t],waves:s||n<3&&t===0?3:4})}const jt={weapon:["鐵刀","樸刀","雁翎刀","環首刀","斬馬刀","玄鐵劍","龍泉","赤霄","霜刃","鑄鋒"],armor:["布衣","皮甲","鐵札","鎖子甲","魚鱗甲","玄甲","赤銅鎧","龍紋甲"],helm:["布巾","皮盔","鐵盔","兜鍪","鳳翅盔","獅吼盔","玄鐵盔"],boots:["草鞋","布靴","皮靴","鐵履","踏雲靴","追風靴","玄鐵靴"],acc:["銅環","玉佩","虎符","血珀","龍紋佩","鑄心鏡","刀穗"]},dt={fan:["粗打","焦黑","裂紋","尋常"],liang:["精鍛","開刃","勻火","穩鋒"],jing:["百煉","寒光","透骨","鳴鋒"],ji:["千錘","吞虹","裂金","霸鋒"],shen:["天鑄","焚世","無雙","帝鋒"]},Ht=[8,16,28,46,70,105,150,215],_=8,N=80,Bt={fan:2,liang:6,jing:16,ji:42,shen:96},At={fan:1,liang:1.38,jing:1.85,ji:2.55,shen:3.55};function G(t){return Math.round(42+t*34+t*t*2.2)}function It(t,n,e){const s=t+(n?3:0),o=e();let i;s<=2?i=[.72,.25,.03,0,0]:s<=7?i=[.42,.42,.16,0,0]:s<=15?i=[.12,.4,.38,.1,0]:s<=23?i=[0,.18,.42,.32,.08]:s<=31?i=[0,.05,.28,.45,.22]:i=[0,0,.12,.38,.5];let d=0;const u=["fan","liang","jing","ji","shen"];for(let f=0;f<5;f++)if(d+=i[f],o<=d)return u[f];return u[4]}function E(t){let n=t>>>0||1;return()=>(n=Math.imul(n,1664525)+1013904223>>>0,n/4294967296)}function j(t,n){return n[Math.floor(t()*n.length)%n.length]}function $(t){return Math.round(t*10)/10}let W=1;function gt(t=1){W=t}function V(){return"zf"+W++}function _t(t){return F.find(n=>n.id===t)||F[0]}function g(t,n){return n*(.88+t()*.24)}function Pt(t,n,e,s,o={}){const i=At[e]||1,d=Math.max(0,t),u=1+d,f={},p=(b,H)=>{const S=b==="aspd"||b==="crit"||b==="ls"?$(H):Math.max(1,Math.round(H));f[b]=(f[b]||0)+S};n==="weapon"?(p("atk",g(s,(9+d*1.22)*i)),s()<.55?p("crit",g(s,(2.2+d*.18)*i)):p("aspd",g(s,(.04+d*.004)*Math.min(i,2.2))),s()<.35&&p("ls",g(s,(1.2+d*.12)*i*.6))):n==="armor"?(p("hp",g(s,(22+d*4.4)*i)),p("def",g(s,(4+d*.85)*i)),s()<.3&&p("hp",g(s,(8+d*1.2)*i))):n==="helm"?(p("def",g(s,(3.2+d*.72)*i)),p("hp",g(s,(12+d*2.6)*i)),s()<.45&&p("crit",g(s,(1.8+d*.14)*i))):n==="boots"?(p("aspd",g(s,(.05+d*.005)*Math.min(i,2.4))),p("hp",g(s,(10+d*2.2)*i)),s()<.5&&p("def",g(s,(2+d*.45)*i))):(p("crit",g(s,(3+d*.22)*i)),s()<.5?p("ls",g(s,(2+d*.16)*i)):p("atk",g(s,(3.5+d*.7)*i)),s()<.35&&p("aspd",g(s,.03*Math.min(i,2))));const m=j(s,dt[e]||dt.fan),v=o.name||j(s,jt[n]);return{id:V(),slot:n,rarity:e,name:`${m}${v}`,stats:f,plus:0,ilvl:u}}function Nt(t=E(1)){const n={id:V(),slot:"weapon",rarity:"fan",name:"凡鐵刀",stats:{atk:10},plus:0,ilvl:1,bound:!0},e={id:V(),slot:"armor",rarity:"fan",name:"布衣",stats:{hp:24,def:4},plus:0,ilvl:1,bound:!0};return{weapon:n,armor:e}}function P(t){if(!t)return{};const n=t.plus||0,e=1+n*.09,s={};for(const[o,i]of Object.entries(t.stats||{}))o==="aspd"?s[o]=$(i*(1+n*.05)):o==="crit"||o==="ls"?s[o]=$(i*e):s[o]=Math.round(i*e);return s}function M(t){if(!t)return 0;const n=P(t),e=_t(t.rarity).rank;return(n.atk||0)*4.2+(n.def||0)*3.1+(n.hp||0)*.42+(n.crit||0)*8+(n.aspd||0)*55+(n.ls||0)*10+e*6+(t.plus||0)*8}function O(t){return t?t.plus?`${t.name} +${t.plus}`:t.name:"空"}function L(t){if(!t)return 0;const n=Bt[t.rarity]||2;return n+(t.plus||0)*Math.max(2,Math.round(n*.4))}function ut(t=E(Date.now())){gt(1);const n=Nt(t);return{version:1,name:"鑄鋒客",level:1,exp:0,gold:0,iron:14,skillPoints:0,skills:Object.fromEntries(J.map(e=>[e.id,0])),equipped:{weapon:n.weapon,armor:n.armor,helm:null,boots:null,acc:null},inventory:[],maxCleared:-1,wins:0,losses:0,nextId:10}}function Ot(t){t.nextId&&gt(t.nextId)}function zt(t){t.nextId=W}function pt(t=globalThis.localStorage){try{const n=t==null?void 0:t.getItem(bt);if(!n)return null;const e=JSON.parse(n);return!e||e.version!==1?null:(Ot(e),e)}catch{return null}}function Rt(t,n=globalThis.localStorage){zt(t);try{n==null||n.setItem(bt,JSON.stringify(t))}catch{}}function Y(t){const n=t.level||1,e={atk:w.atk+(n-1)*I.atk,def:w.def+(n-1)*I.def,hp:w.hp+(n-1)*I.hp,crit:w.crit+(n-1)*I.crit,aspd:w.aspd,ls:w.ls};for(const i of X){const d=t.equipped[i.id];if(!d)continue;const u=P(d);for(const[f,p]of Object.entries(u))e[f]=(e[f]||0)+p}const s=t.skills.tiegu||0;s>0&&(e.hp*=1+(.04+s*.025),e.def*=1+(.03+s*.02));const o=t.skills.jianyi||0;return o>0&&(e.crit+=3+o*1.6),e.atk=Math.round(e.atk),e.def=Math.round(e.def),e.hp=Math.round(e.hp),e.crit=Math.min(75,$(e.crit)),e.aspd=$(Math.min(2.2,Math.max(.7,e.aspd))),e.ls=Math.min(35,$(e.ls)),e.critDmg=1.55+(o>0?.08+o*.02:0),e.power=Math.round(e.atk*4+e.def*3.2+e.hp*.38+e.crit*7+e.aspd*40+e.ls*9),e}function Ft(t,n){t.exp+=n;let e=0;for(;t.exp>=G(t.level);)t.exp-=G(t.level),t.level+=1,t.skillPoints+=1,e+=1;return e}function kt(t){return Ht[t]||9999}function Dt(t,n){const e=t.equipped[n];if(!e)return{ok:!1,reason:"無裝備"};if((e.plus||0)>=_)return{ok:!1,reason:"已滿級"};const s=kt(e.plus||0);return t.iron<s?{ok:!1,reason:"精鐵不足"}:(t.iron-=s,e.plus=(e.plus||0)+1,{ok:!0,cost:s,plus:e.plus})}function Gt(t,n){const e=[];let s=0,o=0;for(const i of t.inventory)n(i)?(s+=L(i),o+=1):e.push(i);return t.inventory=e,t.iron+=s,{n:o,iron:s}}function Vt(t,n){const e=t.inventory.find(o=>o.id===n);if(!e)return{ok:!1};t.inventory=t.inventory.filter(o=>o.id!==n);const s=L(e);return t.iron+=s,{ok:!0,iron:s}}function Yt(t,n){const e=t.inventory.findIndex(i=>i.id===n);if(e<0)return{ok:!1};const s=t.inventory[e];t.inventory.splice(e,1);const o=t.equipped[s.slot];return t.equipped[s.slot]=s,o&&(t.inventory.length>=N?t.iron+=L(o):t.inventory.push(o)),{ok:!0,item:s}}function Ut(t,n){const e=[];for(const s of n){const o=t.equipped[s.slot];(!o||M(s)>M(o)+.5)&&(o?(Kt(t,s),e.push(s)):(t.equipped[s.slot]=s,e.push(s)))}return e}function Kt(t,n){const e=t.equipped[n.slot];return t.equipped[n.slot]=n,e&&(t.inventory.length>=N?t.iron+=L(e):t.inventory.push(e)),!0}function Xt(t,n){for(const e of n)t.inventory.length>=N?t.iron+=L(e):t.inventory.push(e)}function $t(t,n){return t.level>=n.unlock}function Jt(t,n){const e=J.find(o=>o.id===n);if(!e)return{ok:!1,reason:"無此技能"};if(!$t(t,e))return{ok:!1,reason:"等級不足"};const s=t.skills[n]||0;return s>=10?{ok:!1,reason:"已滿級"}:t.skillPoints<1?{ok:!1,reason:"技能點不足"}:(t.skillPoints-=1,t.skills[n]=s+1,{ok:!0,level:s+1})}function Wt(t,n){const e=Math.min(n,t.gold);if(e<10)return{ok:!1};const s=e-e%10,o=s/10;return t.gold-=s,t.iron+=o,{ok:!0,iron:o,gold:s}}function U(t,n){const e=t,s=1+Math.floor(e/8)*.32,o=n==="boss"?3.2:n==="named"?1.72:1,i=n==="boss"?1.38:n==="named"?1.14:1,d=n==="boss"?1.25:1;return{hp:Math.round((132+e*15.5+e*e*.55)*o*(1+Math.floor(e/8)*.1)),atk:$((7.3+e*2.05+e*e*.045)*i*s),def:$((1.4+e*.7)*d*s),crit:n==="boss"?8:4,aspd:n==="boss"?.78:n==="named"?.82:.74,ls:0}}function z(t,n,e={}){return{name:t,stats:{...n},hp:n.hp,maxHp:n.hp,atkCd:e.atkReady?180:420,shred:0,shredT:0,extra:e}}function Zt(t,n,e=E(Date.now())){const s=k[n];if(!s)throw new Error("no stage");const o=Y(t),i=z(t.name||"鑄鋒客",o,{atkReady:!0});i.skillCd={kaishan:400,huichun:2500,pojia:1800};const d=Math.max(1,s.waves-1),u=[];for(let m=0;m<d;m++){const v=U(n,"trash");u.push(z(j(e,s.trashNames),v))}const f=s.isBoss?"boss":"named",p=z(s.isBoss?s.name:j(e,s.namedPool),U(n,f),{isBoss:s.isBoss,mechanic:s.mechanic});return u.push(p),{stageIndex:n,stage:s,player:i,waves:u,waveIndex:0,enemy:u[0],t:0,done:!1,result:null,skillLv:{...t.skills},rng:e,drops:null,gold:0,exp:0,firstClear:t.maxCleared<n}}function Qt(t){const n=t.shred||0;return Math.max(0,t.stats.def*(1-n))}function K(t,n,e,s,o){const i=Qt(n);let d=Math.max(1,t-i*.48);const u=o()*100<e;return u&&(d*=s||1.55),d=Math.max(1,Math.round(d*(.94+o()*.12))),{dmg:d,crit:u}}function q(t,n,e,s,o={}){if(e.hp=Math.max(0,e.hp-s),o.ls&&n===t.player){const i=Math.round(s*(n.stats.ls||0)/100);if(i>0)return n.hp=Math.min(n.maxHp,n.hp+i),i}return 0}function te(t,n){const e=t.player,s=t.skillLv.kaishan||0,o=t.skillLv.huichun||0,i=t.skillLv.pojia||0,d=t.rng;if(s>0&&e.skillCd.kaishan<=0&&t.enemy.hp>0){e.skillCd.kaishan=5200;const u=.8+s*.12,{dmg:f,crit:p}=K(e.stats.atk*u,t.enemy,e.stats.crit,e.stats.critDmg,d),m=q(t,e,t.enemy,f,{ls:!0});n.push({type:"skill",who:"player",id:"kaishan",name:"開山"}),n.push({type:"dmg",who:"enemy",dmg:f,crit:p,skill:"開山"}),m&&n.push({type:"heal",who:"player",amount:m,via:"ls"});return}if(i>0&&e.skillCd.pojia<=0&&t.enemy.hp>0){e.skillCd.pojia=8e3;const u=(10+i*3)/100;t.enemy.shred=Math.max(t.enemy.shred||0,u),t.enemy.shredT=6e3,n.push({type:"skill",who:"player",id:"pojia",name:"破甲"}),n.push({type:"shred",value:u});return}if(o>0&&e.skillCd.huichun<=0&&e.hp<e.maxHp*.92){e.skillCd.huichun=9e3;const u=Math.round(e.maxHp*(.1+o*.02));e.hp=Math.min(e.maxHp,e.hp+u),n.push({type:"skill",who:"player",id:"huichun",name:"回春"}),n.push({type:"heal",who:"player",amount:u})}}function ee(t,n,e){var i;const s=t.enemy,o=(i=s.extra)==null?void 0:i.mechanic;if(o&&(s.extra.mT=(s.extra.mT||0)+e,o==="enrage"&&!s.extra.enraged&&s.extra.mT>=1e4&&(s.extra.enraged=!0,s.stats.atk=$(s.stats.atk*1.42),n.push({type:"mechanic",name:"狂怒",text:"敵鋒暴漲！"})),o==="heal"&&s.extra.mT>=8e3)){s.extra.mT=0;const d=Math.round(s.maxHp*.1);s.hp=Math.min(s.maxHp,s.hp+d),n.push({type:"mechanic",name:"回血",text:"敵舔傷回血"}),n.push({type:"heal",who:"enemy",amount:d})}}function se(t,n){var d;if(t.done)return[];const e=[],s=t.rng;t.t+=n;const o=t.player,i=t.enemy;if(o.atkCd-=n,i.atkCd-=n,o.skillCd)for(const u of Object.keys(o.skillCd))o.skillCd[u]-=n;if(i.shredT>0&&(i.shredT-=n,i.shredT<=0&&(i.shred=0)),ee(t,e,n),te(t,e),i.hp<=0)return ft(t,e);if(o.atkCd<=0&&i.hp>0&&o.hp>0){o.atkCd=1e3/(o.stats.aspd||1);const{dmg:u,crit:f}=K(o.stats.atk,i,o.stats.crit,o.stats.critDmg,s),p=q(t,o,i,u,{ls:!0});e.push({type:"atk",who:"player",dmg:u,crit:f}),e.push({type:"dmg",who:"enemy",dmg:u,crit:f}),p&&e.push({type:"heal",who:"player",amount:p,via:"ls"});const m=t.skillLv.lianzhan||0;if(m>0&&i.hp>0&&s()*100<6+m*2){const v=Math.max(1,Math.round(u*.7));q(t,o,i,v,{ls:!0}),e.push({type:"atk",who:"player",dmg:v,crit:!1,double:!0}),e.push({type:"dmg",who:"enemy",dmg:v,crit:!1,double:!0})}}if(i.hp<=0)return ft(t,e);if(i.atkCd<=0&&o.hp>0&&i.hp>0){i.atkCd=1e3/(i.stats.aspd||.75);const{dmg:u,crit:f}=K(i.stats.atk,o,i.stats.crit||4,1.45,s);if(q(t,i,o,u),e.push({type:"atk",who:"enemy",dmg:u,crit:f}),e.push({type:"dmg",who:"player",dmg:u,crit:f}),((d=i.extra)==null?void 0:d.mechanic)==="extra"&&(i.extra.hits=(i.extra.hits||0)+1,i.extra.hits%3===0&&o.hp>0)){const p=Math.max(1,Math.round(u*.75));q(t,i,o,p),e.push({type:"atk",who:"enemy",dmg:p,crit:!1,double:!0}),e.push({type:"dmg",who:"player",dmg:p,crit:!1,double:!0})}}return o.hp<=0&&(t.done=!0,t.result={win:!1},e.push({type:"lose"})),e}function ft(t,n){var e;return n.push({type:"kill",name:t.enemy.name}),t.waveIndex+=1,t.waveIndex>=t.waves.length?(t.done=!0,t.result={win:!0},n.push({type:"win"})):(t.enemy=t.waves[t.waveIndex],n.push({type:"wave",index:t.waveIndex,total:t.waves.length,enemy:t.enemy.name,isBoss:!!((e=t.enemy.extra)!=null&&e.isBoss)})),n}function ne(t,n,e){const s=k[n];let o=1+(e()<.78?1:0)+(e()<.32?1:0)+(s.isBoss?1:0);n<=2&&(o=Math.max(2,o));const i=Math.min(3,o),d=X.map(f=>f.id),u=[];for(let f=0;f<i;f++){let p=It(n,s.isBoss,e);t.maxCleared<0&&f===0&&n===0&&(p="liang");const m=j(e,d);u.push(Pt(n,m,p,e))}return u}function ie(t,n,e){var p;const s=n.stageIndex,o=k[s];if(!((p=n.result)!=null&&p.win))return t.losses+=1,{win:!1,gold:0,exp:0,drops:[],levels:0};const i=Math.round((10+s*4.5)*(o.isBoss?1.6:1)*(.9+e()*.2)),d=Math.round((22+s*7)*(o.isBoss?1.4:1)),u=ne(t,s,e);t.gold+=i;const f=Ft(t,d);return t.wins+=1,s>t.maxCleared&&(t.maxCleared=s),{win:!0,gold:i,exp:d,drops:u,levels:f,firstClear:n.firstClear}}function ae(t,n,e){const s=e?Ut(t,n):[],o=n.filter(i=>!s.includes(i));return Xt(t,o),{equipped:s,bagged:o}}function C(t,n){return n<=t.maxCleared+1}function oe(t){const e=k[t].isBoss?"boss":"named",s=U(t,e);return Math.round(s.atk*4+s.def*3.2+s.hp*.38+30)}const ht=()=>typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches,le=`
<svg viewBox="0 0 80 110" aria-hidden="true">
  <ellipse cx="40" cy="102" rx="22" ry="6" fill="rgba(0,0,0,.35)"/>
  <path d="M40 18c8 0 14 6 14 14s-6 14-14 14-14-6-14-14 6-14 14-14z" fill="#e8d2a0"/>
  <path d="M22 50c0-6 8-10 18-10s18 4 18 10l-2 36H24L22 50z" fill="#3a2e1c" stroke="#d4b45a" stroke-width="1.4"/>
  <path d="M58 48l18-10 3 5-16 14z" fill="#c9c4b8"/>
  <path d="M74 36l8-22 3 2-6 22z" fill="#d4b45a"/>
  <rect x="70" y="32" width="10" height="6" rx="1" fill="#8a6a28"/>
</svg>`,re=`
<svg viewBox="0 0 80 110" aria-hidden="true">
  <ellipse cx="40" cy="102" rx="22" ry="6" fill="rgba(0,0,0,.35)"/>
  <path d="M40 16c8 0 14 6 14 14 0 9-6 15-14 15S26 39 26 30 32 16 40 16z" fill="#c9b8a4"/>
  <path d="M24 18l-8-12 6-2 8 10z" fill="#8a3030"/>
  <path d="M56 18l8-12 6 2-8 10z" fill="#8a3030"/>
  <path d="M20 50c0-6 8-10 20-10s20 4 20 10l2 36H18L20 50z" fill="#4a2420" stroke="#c45c4a" stroke-width="1.4"/>
  <path d="M18 50L4 42l-2 5 16 12z" fill="#aab"/>
  <path d="M4 40L-4 18l-3 2 8 22z" fill="#c45c4a"/>
</svg>`;function R(t){return"r-"+t}function mt(t){const n=t||{},e=[];for(const s of["atk","def","hp","crit","aspd","ls"])if(n[s]){const o=s==="crit"||s==="ls"?"%":"",i=n[s]>0?"+":"";e.push(`${yt[s]}${i}${n[s]}${o}`)}return e.join("　")}function vt(t){return Math.max(0,Math.min(100,t.hp/t.maxHp*100))}function ce(t){t.innerHTML=`
  <div class="phone">
    <div class="wash"></div>
    <section class="screen title-wrap" id="sc-title"></section>
    <section class="screen" id="sc-hub"></section>
    <section class="screen" id="sc-stages"></section>
    <section class="screen screen-battle" id="sc-battle"></section>
    <section class="screen" id="sc-equip"></section>
    <section class="screen" id="sc-skills"></section>
    <section class="screen" id="sc-bag"></section>
    <div class="overlay" id="overlay"></div>
    <div class="toast" id="toast"></div>
  </div>`;const n=r=>t.querySelector(r),e={title:n("#sc-title"),hub:n("#sc-hub"),stages:n("#sc-stages"),battle:n("#sc-battle"),equip:n("#sc-equip"),skills:n("#sc-skills"),bag:n("#sc-bag"),overlay:n("#overlay"),toast:n("#toast")};let s=pt(),o=0,i=null,d=0,u=0,f=1,p=0;function m(r){e.toast.textContent=r,e.toast.classList.add("on"),clearTimeout(p),p=setTimeout(()=>e.toast.classList.remove("on"),1400)}function v(){Rt(s)}function b(r){var a,c;for(const h of Object.keys(e))(a=e[h].classList)!=null&&a.contains("screen")&&e[h].classList.remove("on");(c={title:e.title,hub:e.hub,stages:e.stages,battle:e.battle,equip:e.equip,skills:e.skills,bag:e.bag}[r])==null||c.classList.add("on"),e.overlay.classList.remove("on"),r==="title"&&H(),r==="hub"&&xt(),r==="stages"&&Z(),r==="equip"&&tt(),r==="skills"&&et(),r==="bag"&&T()}function H(){const r=!!s;e.title.innerHTML=`
      <div>
        <div class="brand">鑄鋒</div>
        <div class="subtitle">江湖刀兵 · 鑄刃為鋒</div>
        <svg class="swords" viewBox="0 0 180 64" fill="none">
          <path d="M20 44 L90 12 L96 18 L28 52 Z" fill="#d4b45a" opacity=".85"/>
          <path d="M160 44 L90 12 L84 18 L152 52 Z" fill="#c45c4a" opacity=".75"/>
          <rect x="78" y="28" width="24" height="8" rx="2" fill="#8a6a28"/>
        </svg>
      </div>
      <div class="title-actions">
        <button class="btn gold wide" data-act="new">${r?"重新開鑄":"開鑄"}</button>
        <button class="btn wide" data-act="cont" ${r?"":"disabled"}>繼續</button>
        <div class="hint">點關即戰 · 刀自己會砍</div>
      </div>`}function S(){return`<div class="res">金 <b>${s.gold}</b>　精鐵 <b>${s.iron}</b>　技能點 <b>${s.skillPoints}</b></div>`}function xt(){const r=Y(s),l=Math.min(k.length-1,s.maxCleared+1),a=k[l],c=G(s.level),h=Math.min(100,s.exp/c*100);e.hub.innerHTML=`
      <div class="topbar">
        <h2>鑄鋒</h2>
        ${S()}
      </div>
      <div class="lvline">
        <div class="lv">Lv.${s.level}</div>
        <div class="exp"><i style="width:${h}%"></i></div>
        <span style="font-size:11px;color:var(--muted)">${s.exp}/${c}</span>
      </div>
      <div class="power">
        <div class="l">戰力</div>
        <div class="n">${r.power}</div>
      </div>
      <div class="stats">
        ${["atk","def","hp","crit","aspd","ls"].map(y=>`
          <div class="stat"><div class="k">${yt[y]}</div><div class="v">${y==="crit"||y==="ls"?r[y]+"%":r[y]}</div></div>`).join("")}
      </div>
      <div class="stage-hint">下一關　${a.mapName} · ${a.name}</div>
      <div class="hub-grid">
        <button class="btn gold" data-act="stages">出戰</button>
        <button class="btn" data-act="equip">裝備</button>
        <button class="btn" data-act="skills">技能</button>
        <button class="btn" data-act="bag">背包</button>
      </div>`}function Z(){const r=new Set(k.filter((a,c)=>C(s,c)).map(a=>a.map));r.has(o)||(o=0);const l=k.filter(a=>a.map===o);e.stages.innerHTML=`
      <div class="topbar">
        <button class="btn sm ghost" data-act="hub">← 回城</button>
        <h2>出戰</h2>
        ${S()}
      </div>
      <div class="maps">
        ${D.map((a,c)=>`
          <button class="map-tab ${c===o?"on":""} ${r.has(c)?"":"lock"}"
            data-act="map" data-i="${c}">${a.name}</button>`).join("")}
      </div>
      <div class="scroll">
        ${l.map(a=>{const c=C(s,a.index),h=s.maxCleared>=a.index,y=oe(a.index);return`
            <button class="stage-row ${c?"":"lock"} ${a.isBoss?"boss":""} ${h?"cleared":""}"
              data-act="fight" data-i="${a.index}" ${c?"":"disabled"}>
              <div class="sn">${a.local}</div>
              <div class="sinfo">
                <div class="nm">${a.name}</div>
                <div class="sub">敵勢 ${y}${a.isBoss?"　"+a.mechanicText:""}</div>
              </div>
              ${a.isBoss?'<span class="stag">首領</span>':""}
              ${h?'<span class="stag">破</span>':""}
            </button>`}).join("")}
      </div>`}function Q(r,l=""){if(!r)return'<div class="item-card"><div class="meta"><div class="nm">空</div></div></div>';const a=r.rarity,c=F.find(h=>h.id===a);return`
      <div class="item-card card-${a} ${l}" data-id="${r.id}">
        <div class="dot b-${a}"></div>
        <div class="meta">
          <div class="nm ${R(a)}">${O(r)}</div>
          <div class="st">${mt(P(r))}</div>
        </div>
        <span class="tag ${R(a)}">${c.name}</span>
      </div>`}function tt(){const r=Y(s);e.equip.innerHTML=`
      <div class="topbar">
        <button class="btn sm ghost" data-act="hub">← 回城</button>
        <h2>裝備</h2>
        ${S()}
      </div>
      <div class="stage-hint">戰力 ${r.power}　點強化燒精鐵</div>
      <div class="scroll slots">
        ${X.map(l=>{const a=s.equipped[l.id],c=(a==null?void 0:a.plus)||0,h=a&&c<_?kt(c):null;return`
            <div class="slot card-${(a==null?void 0:a.rarity)||"fan"}">
              <div class="lab">${l.name}</div>
              <div class="bodyx">
                <div class="nm ${a?R(a.rarity):""}">${a?O(a):"空"}</div>
                <div class="st">${a?mt(P(a)):"尚未穿戴"}</div>
              </div>
              <button class="btn sm" data-act="up" data-slot="${l.id}" ${a&&h&&s.iron>=h&&c<_?"":"disabled"}>
                ${a?c>=_?"滿":`+1　${h}鐵`:"—"}
              </button>
            </div>`}).join("")}
      </div>`}function et(){e.skills.innerHTML=`
      <div class="topbar">
        <button class="btn sm ghost" data-act="hub">← 回城</button>
        <h2>技能</h2>
        <div class="res">點 <b>${s.skillPoints}</b></div>
      </div>
      <div class="scroll">
        ${J.map(r=>{const l=s.skills[r.id]||0,a=$t(s,r),c=l>=10,h=a&&!c&&s.skillPoints>0;return`
            <div class="skill-card ${a?"":"lock"}">
              <div class="skill-hd">
                <div class="nm">${r.name}</div>
                <div class="lv">${a?l?"Lv."+l:"未學":"Lv."+r.unlock+" 解鎖"}</div>
              </div>
              <div class="blurb">${r.blurb} · ${r.type==="active"?"主動":"被動"}</div>
              <div class="fx">${l?r.desc(l):"尚未點亮"}</div>
              <div class="fx" style="color:var(--gold)">${l<10&&a?"下一級："+r.next(l):""}</div>
              <button class="btn sm gold" data-act="skillup" data-id="${r.id}" ${h?"":"disabled"}>升級</button>
            </div>`}).join("")}
      </div>`}function T(){e.bag.innerHTML=`
      <div class="topbar">
        <button class="btn sm ghost" data-act="hub">← 回城</button>
        <h2>背包</h2>
        <div class="res">${s.inventory.length}/${N}　鐵 <b>${s.iron}</b></div>
      </div>
      <div class="scroll grid-items">
        ${s.inventory.length===0?'<div class="hint" style="text-align:center;padding:24px">空空如也。去砍人撿刀。</div>':s.inventory.map(r=>{const l=s.equipped[r.slot],a=!l||M(r)>M(l)+.5;return`
                <div>
                  ${Q(r,a?"better":"")}
                  <div class="row-btns">
                    <button class="btn sm gold" data-act="wear" data-id="${r.id}">${a?"穿上":"更換"}</button>
                    <button class="btn sm ghost" data-act="salvage" data-id="${r.id}">分解 ${L(r)}</button>
                  </div>
                </div>`}).join("")}
      </div>
      <div class="bottom-fixed">
        <button class="btn sm danger wide" data-act="junk">一鍵分解白綠</button>
        <button class="btn sm ghost" data-act="melt" ${s.gold>=10?"":"disabled"}>熔金</button>
      </div>`}function B(r){C(s,r)&&(f=1,i=Zt(s,r,E((Date.now()^r*997)>>>0)),wt(),b("battle"),u=performance.now(),cancelAnimationFrame(d),d=requestAnimationFrame(at))}function wt(){var c;const r=i,l=r.enemy,a=r.player;e.battle.innerHTML=`
      <div class="field" id="field">
        <div class="field-fog"></div>
        <div class="wave-tag" id="wave-tag">第 ${r.waveIndex+1}/${r.waves.length} 波　${l.name}</div>
        <div class="units">
          <div class="unit player" id="u-player">
            <div class="hpwrap">
              <div class="hptext"><span>${a.name}</span><span id="php">${a.hp}/${a.maxHp}</span></div>
              <div class="hpbar"><i id="phpb" style="width:100%"></i></div>
            </div>
            <div class="body">${le}</div>
            <div class="uname">鑄鋒客</div>
          </div>
          <div class="unit enemy" id="u-enemy">
            <div class="hpwrap">
              <div class="hptext"><span id="ename">${l.name}</span><span id="ehp">${l.hp}/${l.maxHp}</span></div>
              <div class="hpbar"><i id="ehpb" style="width:100%"></i></div>
            </div>
            <div class="body">${re}</div>
            <div class="uname ${(c=l.extra)!=null&&c.isBoss?"boss":""}" id="ename2">${l.name}</div>
          </div>
        </div>
        <div class="skill-flash" id="sflash"></div>
      </div>
      <div class="battle-ctrl">
        <button class="btn sm" id="btn-speed" data-act="speed">加速 ×2</button>
        <button class="btn sm danger" data-act="flee">放棄</button>
      </div>
      <div class="blog" id="blog"></div>`,e.battle._log=[]}function x(r,l){const a=e.battle.querySelector("#blog");if(!a)return;const c=e.battle._log||(e.battle._log=[]);c.push({text:r,hi:l}),c.length>5&&c.shift(),a.innerHTML=c.map(h=>`<div class="${h.hi?"hi":""}">${h.text}</div>`).join("")}function Mt(){const r=i.player,l=i.enemy,a=e.battle.querySelector("#php"),c=e.battle.querySelector("#ehp"),h=e.battle.querySelector("#phpb"),y=e.battle.querySelector("#ehpb");a&&(a.textContent=`${Math.max(0,Math.ceil(r.hp))}/${r.maxHp}`),c&&(c.textContent=`${Math.max(0,Math.ceil(l.hp))}/${l.maxHp}`),h&&(h.style.width=vt(r)+"%"),y&&(y.style.width=vt(l)+"%")}function st(r){const l=e.battle.querySelector("#sflash");l&&(l.textContent=r,l.classList.remove("show"),l.offsetWidth,l.classList.add("show"))}function nt(r,l){const a=e.battle.querySelector(r==="player"?"#u-player":"#u-enemy");a&&(a.classList.remove("strike","hurt"),a.offsetWidth,a.classList.add(l),setTimeout(()=>a.classList.remove(l),ht()?0:140))}function it(r,l,a){const c=e.battle.querySelector("#field");if(!c)return;const h=document.createElement("div");h.className=`floater ${r==="player"?"player-side":"enemy-side"} ${a||""}`,h.textContent=l,c.appendChild(h),setTimeout(()=>h.remove(),ht()?400:900)}function Lt(r){for(const l of r){if(l.type==="atk"&&nt(l.who,"strike"),l.type==="dmg"){const a=l.who;nt(a,"hurt");const c=(l.crit?"crit":"")+(l.double?" double":"");it(a,(l.crit?"暴 ":l.double?"連 ":"-")+l.dmg,c),l.skill?x(`${l.skill} ${l.crit?"暴擊 ":""}${l.dmg}`,!0):l.crit&&x(`暴擊 ${l.dmg}`,!0)}if(l.type==="heal"&&(it(l.who,"+"+l.amount,"heal"),l.via||x(`${l.who==="player"?"鑄鋒客":"敵"} 回復 ${l.amount}`)),l.type==="skill"&&(st(l.name),x(`施展 ${l.name}`,!0)),l.type==="mechanic"&&(st(l.name),x(l.text||l.name,!0)),l.type==="wave"){const a=e.battle.querySelector("#wave-tag");a&&(a.textContent=`第 ${l.index+1}/${l.total} 波　${l.enemy}`);const c=e.battle.querySelector("#ename"),h=e.battle.querySelector("#ename2");c&&(c.textContent=l.enemy),h&&(h.textContent=l.enemy,h.classList.toggle("boss",!!l.isBoss)),x(`${l.enemy} 上前`,!0)}l.type==="kill"&&x(`${l.name} 倒下`),l.type==="win"&&ot(!0),l.type==="lose"&&ot(!1)}i&&Mt()}function at(r){if(!i||i.done)return;const l=Math.min(50,r-u)*f;u=r;const a=se(i,l);a.length&&Lt(a),i&&!i.done&&(d=requestAnimationFrame(at))}function ot(r){cancelAnimationFrame(d);const l=E((Date.now()^2654435769)>>>0),a=ie(s,i,l);if(v(),r){const c=i.stageIndex+1,h=c<k.length&&C(s,c);e.overlay.className="overlay on",e.overlay.innerHTML=`
        <div class="sheet">
          <h3>鋒利了一分</h3>
          <div class="reward-line">金錢 +${a.gold}　經驗 +${a.exp}${a.levels?`　升級 ×${a.levels}`:""}</div>
          <div class="drops" id="drops">
            ${a.drops.map(y=>{const lt=s.equipped[y.slot],rt=!lt||M(y)>M(lt)+.5;return`<div data-drop="${y.id}">${Q(y,rt?"better":"")}
                ${rt?'<div class="hint" style="padding:0 10px 6px;color:var(--ok)">較現有更強</div>':""}</div>`}).join("")}
          </div>
          <div class="row-btns" style="flex-direction:column">
            <button class="btn gold wide" data-act="loot-auto">一鍵穿更好的</button>
            <button class="btn wide" data-act="loot-bag">全收進背包</button>
            ${h?`<button class="btn gold wide" data-act="next" data-i="${c}">下一關</button>`:""}
            <button class="btn ghost wide" data-act="hub">回城</button>
          </div>
        </div>`,e.overlay._drops=a.drops,e.overlay._taken=!1}else e.overlay.className="overlay on",e.overlay.innerHTML=`
        <div class="sheet lose">
          <h3>刀鈍了</h3>
          <div class="reward-line">人還在。熔鐵、升級、再砍一次。</div>
          <div class="row-btns" style="flex-direction:column">
            <button class="btn gold wide" data-act="retry" data-i="${i.stageIndex}">再戰本關</button>
            <button class="btn ghost wide" data-act="hub">回城</button>
          </div>
        </div>`;i=null}function A(r){const l=e.overlay._drops||[];if(e.overlay._taken)return l;const a=ae(s,l,r);return e.overlay._taken=!0,v(),r&&a.equipped.length&&m("已穿上更好的刃甲"),l}function St(r){const l=r.target.closest("[data-act]");if(!l)return;const a=l.dataset.act;if(a==="new"){if(s&&l.dataset.ok!=="1"){l.dataset.ok="1",l.textContent="確定抹檔開鑄";return}s=ut(),v(),b("hub"),m("爐火已燃")}else if(a==="cont")s||(s=pt()||ut()),b("hub");else if(a==="hub")e.overlay._drops&&!e.overlay._taken&&A(!1),cancelAnimationFrame(d),i=null,v(),b("hub");else if(a==="stages")b("stages");else if(a==="equip")b("equip");else if(a==="skills")b("skills");else if(a==="bag")b("bag");else if(a==="map"){const c=+l.dataset.i;k.some(y=>y.map===c&&C(s,y.index))&&(o=c,Z())}else if(a==="fight")B(+l.dataset.i);else if(a==="speed")f=f===1?2:1,l.textContent=f===2?"還原 ×1":"加速 ×2";else if(a==="flee")cancelAnimationFrame(d),i&&!i.done&&(i.done=!0,i.result={win:!1},s.losses+=1,v()),i=null,m("已抽身"),b("hub");else if(a==="up"){const c=Dt(s,l.dataset.slot);c.ok?(v(),tt(),m("刃甲更硬了 +"+c.plus)):m(c.reason)}else if(a==="skillup"){const c=Jt(s,l.dataset.id);c.ok?(v(),et(),m("技能 +1")):m(c.reason)}else if(a==="wear"){const c=Yt(s,l.dataset.id);c.ok&&(v(),T(),m("已裝備 "+O(c.item)))}else if(a==="salvage"){const c=Vt(s,l.dataset.id);c.ok&&(v(),T(),m("得精鐵 "+c.iron))}else if(a==="junk"){const c=Gt(s,h=>h.rarity==="fan"||h.rarity==="liang");v(),T(),m(c.n?`熔了 ${c.n} 件，精鐵 +${c.iron}`:"沒有白綠色")}else if(a==="melt"){const c=Wt(s,s.gold);c.ok&&(v(),T(),m(`熔金 ${c.gold} → 精鐵 ${c.iron}`))}else a==="loot-auto"?(A(!0),b("hub")):a==="loot-bag"?(A(!1),b("hub")):a==="next"?(A(!0),B(+l.dataset.i)):a==="retry"&&B(+l.dataset.i)}return t.addEventListener("click",St),b("title"),{getState:()=>s,show:b,startFight:B}}ce(document.getElementById("app"));
