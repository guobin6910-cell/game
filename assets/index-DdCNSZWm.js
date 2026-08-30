(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))t(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&t(d)}).observe(document,{childList:!0,subtree:!0});function n(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(a){if(a.ep)return;a.ep=!0;const i=n(a);fetch(a.href,i)}})();const je="zhufeng-v1",ae=[{id:"weapon",name:"武器"},{id:"armor",name:"護甲"},{id:"helm",name:"頭盔"},{id:"boots",name:"靴"},{id:"acc",name:"飾品"}],X=[{id:"fan",name:"凡",color:"#8e8a84",rank:0},{id:"liang",name:"良",color:"#5dcc6a",rank:1},{id:"jing",name:"精",color:"#5ba3e0",rank:2},{id:"ji",name:"極",color:"#c084fc",rank:3},{id:"shen",name:"神",color:"#f5c542",rank:4}],Be={atk:"攻擊",def:"防禦",hp:"氣血",crit:"暴擊",aspd:"攻速",ls:"吸血"},q={atk:15,def:6,hp:125,crit:6,aspd:1,ls:0},D={atk:2.2,def:1.15,hp:16,crit:.15},oe=[{id:"kaishan",name:"開山",type:"active",unlock:1,cd:5200,blurb:"額外一記重斬",desc(e){return`冷卻 5.2 秒，追加一擊造成攻擊力 ${80+e*12}% 傷害`},next(e){return`傷害 ${80+(e+1)*12}%`}},{id:"tiegu",name:"鐵骨",type:"passive",unlock:2,blurb:"氣血與防禦提升",desc(e){const s=Math.round((4+e*2.5)*10)/10,n=Math.round((3+e*2)*10)/10;return`氣血 +${s}%　防禦 +${n}%`},next(e){return`氣血 +${(4+(e+1)*2.5).toFixed(1)}%　防禦 +${(3+(e+1)*2).toFixed(1)}%`}},{id:"lianzhan",name:"連斬",type:"passive",unlock:4,blurb:"普攻有機率再砍一刀",desc(e){return`普攻 ${6+e*2}% 機率追加 70% 傷害`},next(e){return`機率 ${6+(e+1)*2}%`}},{id:"huichun",name:"回春",type:"active",unlock:6,cd:9e3,blurb:"戰鬥中自動回血",desc(e){return`冷卻 9 秒，回復最大氣血 ${10+e*2}%`},next(e){return`回復 ${10+(e+1)*2}%`}},{id:"pojia",name:"破甲",type:"active",unlock:8,cd:8e3,blurb:"削敵防，克首領",desc(e){return`冷卻 8 秒，使敵人防禦降低 ${10+e*3}%，持續 6 秒`},next(e){return`削防 ${10+(e+1)*3}%`}},{id:"jianyi",name:"劍意",type:"passive",unlock:10,blurb:"暴擊提升",desc(e){return`暴擊 +${3+e*1.6}%　暴擊傷害 +${8+e*2}%`},next(e){return`暴擊 +${(3+(e+1)*1.6).toFixed(1)}%`}}],Y=[{id:"guandao",name:"官道",flavor:"驛路煙塵，刀光如線"},{id:"huangci",name:"荒祠",flavor:"殘香冷月，鬼刃出鞘"},{id:"zhandao",name:"棧道",flavor:"雲深鐵索，一鋒當關"},{id:"kuangkeng",name:"礦坑",flavor:"玄鐵地脈，錘聲不絕"},{id:"guancheng",name:"關城",flavor:"金戈鑄兵，關前問鋒"}],ke=[["官道口","驛亭","荒塚坡","盜魁寨","斷橋","密林岔","哨崗","官道霸主"],["山門","殘碑","香案","祠中鬼影","後殿","枯井","鐘樓","荒祠主祭"],["崖口","鐵索","雲棧","棧道匪首","險峰","風口","斷崖","棧道劍魔"],["坑口","礦道","廢井","礦奴頭目","深層","晶洞","熔爐","礦脈魔君"],["關外","吊橋","箭樓","守關校尉","內城","校場","帥帳","關城霸王"]],Ke=[["enrage","extra","heal","enrage","extra"],["heal","enrage","extra","heal","enrage"]],Je=[["山賊","逃兵","刀客","伏路人","瘦狼","路匪"],["祠巫","紙人","陰卒","香客鬼","青燈影","掃殿僧"],["崖匪","索客","雲盜","風狼","棧卒","斷路人"],["礦奴","錘手","坑鬼","鐵鼠","爐工","挖角賊"],["關卒","弓手","刀衛","巡城兵","旗手","門吏"]],Ve=[["瘦刀張","夜路七","疤臉王","獨眼侯","斷指劉"],["白面祭酒","燈下鬼","三更鐘","香灰娘","無頭祝"],["鐵索爺","雲裡刀","風口二","崖邊鬼","索命客"],["錘霸","赤爐王","鐵屑鬼","深坑老","玄鐵奴"],["校刀尉","金甲卒","門前虎","箭樓鷹","關西刀"]],Ze={enrage:"狂怒：時限一至，攻勢暴漲",heal:"回春：時不時舔傷回血",extra:"連擊：每三刀必出第二刀"},x=[];for(let e=0;e<5;e++)for(let s=0;s<8;s++){const n=e*8+s,t=s===3||s===7,a=t?Ke[s===3?0:1][e]:null;x.push({index:n,map:e,local:s+1,name:ke[e][s],mapName:Y[e].name,label:`${Y[e].name} ${s+1}-${ke[e][s]}`,isBoss:t,mechanic:a,mechanicText:a?Ze[a]:"",trashNames:Je[e],namedPool:Ve[e],waves:t||s<3&&e===0?3:4})}const We={weapon:["鐵刀","樸刀","雁翎刀","環首刀","斬馬刀","玄鐵劍","龍泉","赤霄","霜刃","鑄鋒"],armor:["布衣","皮甲","鐵札","鎖子甲","魚鱗甲","玄甲","赤銅鎧","龍紋甲"],helm:["布巾","皮盔","鐵盔","兜鍪","鳳翅盔","獅吼盔","玄鐵盔"],boots:["草鞋","布靴","皮靴","鐵履","踏雲靴","追風靴","玄鐵靴"],acc:["銅環","玉佩","虎符","血珀","龍紋佩","鑄心鏡","刀穗"]},$e={fan:["粗打","焦黑","裂紋","尋常"],liang:["精鍛","開刃","勻火","穩鋒"],jing:["百煉","寒光","透骨","鳴鋒"],ji:["千錘","吞虹","裂金","霸鋒"],shen:["天鑄","焚世","無雙","帝鋒"]},Xe=[8,16,28,46,70,105,150,215],O=8,z=80,Ye={fan:2,liang:6,jing:16,ji:42,shen:96},Qe={fan:1,liang:1.38,jing:1.85,ji:2.55,shen:3.55};function Q(e){return Math.round(42+e*34+e*e*2.2)}function et(e,s,n){const t=e+(s?3:0),a=n();let i;t<=2?i=[.72,.25,.03,0,0]:t<=7?i=[.42,.42,.16,0,0]:t<=15?i=[.12,.4,.38,.1,0]:t<=23?i=[0,.18,.42,.32,.08]:t<=31?i=[0,.05,.28,.45,.22]:i=[0,0,.12,.38,.5];let d=0;const u=["fan","liang","jing","ji","shen"];for(let h=0;h<5;h++)if(d+=i[h],a<=d)return u[h];return u[4]}function T(e){let s=e>>>0||1;return()=>(s=Math.imul(s,1664525)+1013904223>>>0,s/4294967296)}function H(e,s){return s[Math.floor(e()*s.length)%s.length]}function S(e){return Math.round(e*10)/10}let le=1;function Ee(e=1){le=e}function ee(){return"zf"+le++}function tt(e){return X.find(s=>s.id===e)||X[0]}function y(e,s){return s*(.88+e()*.24)}function nt(e,s,n,t,a={}){const i=Qe[n]||1,d=Math.max(0,e),u=1+d,h={},p=(k,_)=>{const g=k==="aspd"||k==="crit"||k==="ls"?S(_):Math.max(1,Math.round(_));h[k]=(h[k]||0)+g};s==="weapon"?(p("atk",y(t,(9+d*1.22)*i)),t()<.55?p("crit",y(t,(2.2+d*.18)*i)):p("aspd",y(t,(.04+d*.004)*Math.min(i,2.2))),t()<.35&&p("ls",y(t,(1.2+d*.12)*i*.6))):s==="armor"?(p("hp",y(t,(22+d*4.4)*i)),p("def",y(t,(4+d*.85)*i)),t()<.3&&p("hp",y(t,(8+d*1.2)*i))):s==="helm"?(p("def",y(t,(3.2+d*.72)*i)),p("hp",y(t,(12+d*2.6)*i)),t()<.45&&p("crit",y(t,(1.8+d*.14)*i))):s==="boots"?(p("aspd",y(t,(.05+d*.005)*Math.min(i,2.4))),p("hp",y(t,(10+d*2.2)*i)),t()<.5&&p("def",y(t,(2+d*.45)*i))):(p("crit",y(t,(3+d*.22)*i)),t()<.5?p("ls",y(t,(2+d*.16)*i)):p("atk",y(t,(3.5+d*.7)*i)),t()<.35&&p("aspd",y(t,.03*Math.min(i,2))));const v=H(t,$e[n]||$e.fan),$=a.name||H(t,We[s]);return{id:ee(),slot:s,rarity:n,name:`${v}${$}`,stats:h,plus:0,ilvl:u}}function st(e=T(1)){const s={id:ee(),slot:"weapon",rarity:"fan",name:"凡鐵刀",stats:{atk:10},plus:0,ilvl:1,bound:!0},n={id:ee(),slot:"armor",rarity:"fan",name:"布衣",stats:{hp:24,def:4},plus:0,ilvl:1,bound:!0};return{weapon:s,armor:n}}function U(e){if(!e)return{};const s=e.plus||0,n=1+s*.09,t={};for(const[a,i]of Object.entries(e.stats||{}))a==="aspd"?t[a]=S(i*(1+s*.05)):a==="crit"||a==="ls"?t[a]=S(i*n):t[a]=Math.round(i*n);return t}function A(e){if(!e)return 0;const s=U(e),n=tt(e.rarity).rank;return(s.atk||0)*4.2+(s.def||0)*3.1+(s.hp||0)*.42+(s.crit||0)*8+(s.aspd||0)*55+(s.ls||0)*10+n*6+(e.plus||0)*8}function J(e){return e?e.plus?`${e.name} +${e.plus}`:e.name:"空"}function j(e){if(!e)return 0;const s=Ye[e.rarity]||2;return s+(e.plus||0)*Math.max(2,Math.round(s*.4))}function xe(e=T(Date.now())){Ee(1);const s=st(e);return{version:1,name:"鑄鋒客",level:1,exp:0,gold:0,iron:14,skillPoints:0,skills:Object.fromEntries(oe.map(n=>[n.id,0])),equipped:{weapon:s.weapon,armor:s.armor,helm:null,boots:null,acc:null},inventory:[],maxCleared:-1,wins:0,losses:0,nextId:10,idle:!0,idleStage:0,idleAt:Date.now(),autoEquip:!0}}function it(e){e.nextId&&Ee(e.nextId)}function at(e){e.nextId=le}function we(e=globalThis.localStorage){try{const s=e==null?void 0:e.getItem(je);if(!s)return null;const n=JSON.parse(s);return!n||n.version!==1?null:(it(n),N(n),n)}catch{return null}}function ot(e,s=globalThis.localStorage){at(e);try{s==null||s.setItem(je,JSON.stringify(e))}catch{}}function te(e){const s=e.level||1,n={atk:q.atk+(s-1)*D.atk,def:q.def+(s-1)*D.def,hp:q.hp+(s-1)*D.hp,crit:q.crit+(s-1)*D.crit,aspd:q.aspd,ls:q.ls};for(const i of ae){const d=e.equipped[i.id];if(!d)continue;const u=U(d);for(const[h,p]of Object.entries(u))n[h]=(n[h]||0)+p}const t=e.skills.tiegu||0;t>0&&(n.hp*=1+(.04+t*.025),n.def*=1+(.03+t*.02));const a=e.skills.jianyi||0;return a>0&&(n.crit+=3+a*1.6),n.atk=Math.round(n.atk),n.def=Math.round(n.def),n.hp=Math.round(n.hp),n.crit=Math.min(75,S(n.crit)),n.aspd=S(Math.min(2.2,Math.max(.7,n.aspd))),n.ls=Math.min(35,S(n.ls)),n.critDmg=1.55+(a>0?.08+a*.02:0),n.power=Math.round(n.atk*4+n.def*3.2+n.hp*.38+n.crit*7+n.aspd*40+n.ls*9),n}function lt(e,s){e.exp+=s;let n=0;for(;e.exp>=Q(e.level);)e.exp-=Q(e.level),e.level+=1,e.skillPoints+=1,n+=1;return n}function Ie(e){return Xe[e]||9999}function rt(e,s){const n=e.equipped[s];if(!n)return{ok:!1,reason:"無裝備"};if((n.plus||0)>=O)return{ok:!1,reason:"已滿級"};const t=Ie(n.plus||0);return e.iron<t?{ok:!1,reason:"精鐵不足"}:(e.iron-=t,n.plus=(n.plus||0)+1,{ok:!0,cost:t,plus:n.plus})}function He(e,s){const n=[];let t=0,a=0;for(const i of e.inventory)s(i)?(t+=j(i),a+=1):n.push(i);return e.inventory=n,e.iron+=t,{n:a,iron:t}}function ct(e,s){const n=e.inventory.find(a=>a.id===s);if(!n)return{ok:!1};e.inventory=e.inventory.filter(a=>a.id!==s);const t=j(n);return e.iron+=t,{ok:!0,iron:t}}function dt(e,s){const n=e.inventory.findIndex(i=>i.id===s);if(n<0)return{ok:!1};const t=e.inventory[n];e.inventory.splice(n,1);const a=e.equipped[t.slot];return e.equipped[t.slot]=t,a&&(e.inventory.length>=z?e.iron+=j(a):e.inventory.push(a)),{ok:!0,item:t}}function ut(e,s){const n=[];for(const t of s){const a=e.equipped[t.slot];(!a||A(t)>A(a)+.5)&&(a?(pt(e,t),n.push(t)):(e.equipped[t.slot]=t,n.push(t)))}return n}function pt(e,s){const n=e.equipped[s.slot];return e.equipped[s.slot]=s,n&&(e.inventory.length>=z?e.iron+=j(n):e.inventory.push(n)),!0}function ft(e,s){for(const n of s)e.inventory.length>=z?e.iron+=j(n):e.inventory.push(n)}function Ne(e,s){return e.level>=s.unlock}function ht(e,s){const n=oe.find(a=>a.id===s);if(!n)return{ok:!1,reason:"無此技能"};if(!Ne(e,n))return{ok:!1,reason:"等級不足"};const t=e.skills[s]||0;return t>=10?{ok:!1,reason:"已滿級"}:e.skillPoints<1?{ok:!1,reason:"技能點不足"}:(e.skillPoints-=1,e.skills[s]=t+1,{ok:!0,level:t+1})}function mt(e,s){const n=Math.min(s,e.gold);if(n<10)return{ok:!1};const t=n-n%10,a=t/10;return e.gold-=t,e.iron+=a,{ok:!0,iron:a,gold:t}}function ne(e,s){const n=e,t=1+Math.floor(n/8)*.32,a=s==="boss"?3.2:s==="named"?1.72:1,i=s==="boss"?1.38:s==="named"?1.14:1,d=s==="boss"?1.25:1;return{hp:Math.round((132+n*15.5+n*n*.55)*a*(1+Math.floor(n/8)*.1)),atk:S((7.3+n*2.05+n*n*.045)*i*t),def:S((1.4+n*.7)*d*t),crit:s==="boss"?8:4,aspd:s==="boss"?.78:s==="named"?.82:.74,ls:0}}function V(e,s,n={}){return{name:e,stats:{...s},hp:s.hp,maxHp:s.hp,atkCd:n.atkReady?180:420,shred:0,shredT:0,extra:n}}function _e(e,s,n=T(Date.now())){const t=x[s];if(!t)throw new Error("no stage");const a=te(e),i=V(e.name||"鑄鋒客",a,{atkReady:!0});i.skillCd={kaishan:400,huichun:2500,pojia:1800};const d=Math.max(1,t.waves-1),u=[];for(let v=0;v<d;v++){const $=ne(s,"trash");u.push(V(H(n,t.trashNames),$))}const h=t.isBoss?"boss":"named",p=V(t.isBoss?t.name:H(n,t.namedPool),ne(s,h),{isBoss:t.isBoss,mechanic:t.mechanic});return u.push(p),{stageIndex:s,stage:t,player:i,waves:u,waveIndex:0,enemy:u[0],t:0,done:!1,result:null,skillLv:{...e.skills},rng:n,drops:null,gold:0,exp:0,firstClear:e.maxCleared<s}}function vt(e){const s=e.shred||0;return Math.max(0,e.stats.def*(1-s))}function se(e,s,n,t,a){const i=vt(s);let d=Math.max(1,e-i*.48);const u=a()*100<n;return u&&(d*=t||1.55),d=Math.max(1,Math.round(d*(.94+a()*.12))),{dmg:d,crit:u}}function I(e,s,n,t,a={}){if(n.hp=Math.max(0,n.hp-t),a.ls&&s===e.player){const i=Math.round(t*(s.stats.ls||0)/100);if(i>0)return s.hp=Math.min(s.maxHp,s.hp+i),i}return 0}function gt(e,s){const n=e.player,t=e.skillLv.kaishan||0,a=e.skillLv.huichun||0,i=e.skillLv.pojia||0,d=e.rng;if(t>0&&n.skillCd.kaishan<=0&&e.enemy.hp>0){n.skillCd.kaishan=5200;const u=.8+t*.12,{dmg:h,crit:p}=se(n.stats.atk*u,e.enemy,n.stats.crit,n.stats.critDmg,d),v=I(e,n,e.enemy,h,{ls:!0});s.push({type:"skill",who:"player",id:"kaishan",name:"開山"}),s.push({type:"dmg",who:"enemy",dmg:h,crit:p,skill:"開山"}),v&&s.push({type:"heal",who:"player",amount:v,via:"ls"});return}if(i>0&&n.skillCd.pojia<=0&&e.enemy.hp>0){n.skillCd.pojia=8e3;const u=(10+i*3)/100;e.enemy.shred=Math.max(e.enemy.shred||0,u),e.enemy.shredT=6e3,s.push({type:"skill",who:"player",id:"pojia",name:"破甲"}),s.push({type:"shred",value:u});return}if(a>0&&n.skillCd.huichun<=0&&n.hp<n.maxHp*.92){n.skillCd.huichun=9e3;const u=Math.round(n.maxHp*(.1+a*.02));n.hp=Math.min(n.maxHp,n.hp+u),s.push({type:"skill",who:"player",id:"huichun",name:"回春"}),s.push({type:"heal",who:"player",amount:u})}}function bt(e,s,n){var i;const t=e.enemy,a=(i=t.extra)==null?void 0:i.mechanic;if(a&&(t.extra.mT=(t.extra.mT||0)+n,a==="enrage"&&!t.extra.enraged&&t.extra.mT>=1e4&&(t.extra.enraged=!0,t.stats.atk=S(t.stats.atk*1.42),s.push({type:"mechanic",name:"狂怒",text:"敵鋒暴漲！"})),a==="heal"&&t.extra.mT>=8e3)){t.extra.mT=0;const d=Math.round(t.maxHp*.1);t.hp=Math.min(t.maxHp,t.hp+d),s.push({type:"mechanic",name:"回血",text:"敵舔傷回血"}),s.push({type:"heal",who:"enemy",amount:d})}}function Pe(e,s){var d;if(e.done)return[];const n=[],t=e.rng;e.t+=s;const a=e.player,i=e.enemy;if(a.atkCd-=s,i.atkCd-=s,a.skillCd)for(const u of Object.keys(a.skillCd))a.skillCd[u]-=s;if(i.shredT>0&&(i.shredT-=s,i.shredT<=0&&(i.shred=0)),bt(e,n,s),gt(e,n),i.hp<=0)return Me(e,n);if(a.atkCd<=0&&i.hp>0&&a.hp>0){a.atkCd=1e3/(a.stats.aspd||1);const{dmg:u,crit:h}=se(a.stats.atk,i,a.stats.crit,a.stats.critDmg,t),p=I(e,a,i,u,{ls:!0});n.push({type:"atk",who:"player",dmg:u,crit:h}),n.push({type:"dmg",who:"enemy",dmg:u,crit:h}),p&&n.push({type:"heal",who:"player",amount:p,via:"ls"});const v=e.skillLv.lianzhan||0;if(v>0&&i.hp>0&&t()*100<6+v*2){const $=Math.max(1,Math.round(u*.7));I(e,a,i,$,{ls:!0}),n.push({type:"atk",who:"player",dmg:$,crit:!1,double:!0}),n.push({type:"dmg",who:"enemy",dmg:$,crit:!1,double:!0})}}if(i.hp<=0)return Me(e,n);if(i.atkCd<=0&&a.hp>0&&i.hp>0){i.atkCd=1e3/(i.stats.aspd||.75);const{dmg:u,crit:h}=se(i.stats.atk,a,i.stats.crit||4,1.45,t);if(I(e,i,a,u),n.push({type:"atk",who:"enemy",dmg:u,crit:h}),n.push({type:"dmg",who:"player",dmg:u,crit:h}),((d=i.extra)==null?void 0:d.mechanic)==="extra"&&(i.extra.hits=(i.extra.hits||0)+1,i.extra.hits%3===0&&a.hp>0)){const p=Math.max(1,Math.round(u*.75));I(e,i,a,p),n.push({type:"atk",who:"enemy",dmg:p,crit:!1,double:!0}),n.push({type:"dmg",who:"player",dmg:p,crit:!1,double:!0})}}return a.hp<=0&&(e.done=!0,e.result={win:!1},n.push({type:"lose"})),n}function Me(e,s){var n;return s.push({type:"kill",name:e.enemy.name}),e.waveIndex+=1,e.waveIndex>=e.waves.length?(e.done=!0,e.result={win:!0},s.push({type:"win"})):(e.enemy=e.waves[e.waveIndex],s.push({type:"wave",index:e.waveIndex,total:e.waves.length,enemy:e.enemy.name,isBoss:!!((n=e.enemy.extra)!=null&&n.isBoss)})),s}function yt(e,s=18e4){const n=[];let t=0;for(;!e.done&&e.t<s&&t++<2e4;){const a=Pe(e,50);a.length&&n.push(...a)}return e.done||(e.done=!0,e.result={win:!1,timeout:!0}),n}function kt(e,s,n){const t=x[s];let a=1+(n()<.78?1:0)+(n()<.32?1:0)+(t.isBoss?1:0);s<=2&&(a=Math.max(2,a));const i=Math.min(3,a),d=ae.map(h=>h.id),u=[];for(let h=0;h<i;h++){let p=et(s,t.isBoss,n);e.maxCleared<0&&h===0&&s===0&&(p="liang");const v=H(n,d);u.push(nt(s,v,p,n))}return u}function Re(e,s,n){var p;const t=s.stageIndex,a=x[t];if(!((p=s.result)!=null&&p.win))return e.losses+=1,{win:!1,gold:0,exp:0,drops:[],levels:0};const i=Math.round((10+t*4.5)*(a.isBoss?1.6:1)*(.9+n()*.2)),d=Math.round((22+t*7)*(a.isBoss?1.4:1)),u=kt(e,t,n);e.gold+=i;const h=lt(e,d);return e.wins+=1,t>e.maxCleared&&(e.maxCleared=t),{win:!0,gold:i,exp:d,drops:u,levels:h,firstClear:s.firstClear}}function ie(e,s,n){const t=n?ut(e,s):[],a=s.filter(i=>!t.includes(i));return ft(e,a),{equipped:t,bagged:a}}function E(e,s){return s<=e.maxCleared+1}function $t(e){const n=x[e].isBoss?"boss":"named",t=ne(e,n);return Math.round(t.atk*4+t.def*3.2+t.hp*.38+30)}function N(e){if(!e)return e;typeof e.idle!="boolean"&&(e.idle=!0),typeof e.autoEquip!="boolean"&&(e.autoEquip=!0);const s=x.length-1;return typeof e.idleStage!="number"||Number.isNaN(e.idleStage)?e.idleStage=Math.min(Math.max(0,(e.maxCleared??-1)+1),s):e.idleStage=Math.max(0,Math.min(s,e.idleStage)),(typeof e.idleAt!="number"||Number.isNaN(e.idleAt))&&(e.idleAt=Date.now()),e}function F(e){N(e);const s=x.length-1,n=Math.min((e.maxCleared??-1)+1,s);let t=e.idleStage;return t>n&&(t=n),t<0&&(t=0),t>s&&(t=s),e.idleStage=t,t}function G(e,s,n){const t=x.length-1;return s?e.idleStage=Math.min(n+1,t):e.idleStage=Math.max(0,n-1),e.idleAt=Date.now(),e.idleStage}function De(e,s=60){var n;return(((n=e.inventory)==null?void 0:n.length)||0)>s?He(e,t=>t.rarity==="fan"||t.rarity==="liang"):{n:0,iron:0}}function xt(e,s=Date.now(),n=s){N(e);const t=e.idleStage;if(!e.idle)return e.idleAt=s,{fights:0,wins:0,losses:0,net:0,elapsed:0};const a=Math.min(20*60*1e3,Math.max(0,s-(e.idleAt||s)));if(a<2e3)return e.idleAt=s,{fights:0,wins:0,losses:0,net:0,elapsed:a};F(e);let i=0,d=0,u=0,h=0,p=n>>>0||1;for(;i<40&&h<a;){const v=F(e);p=Math.imul(p,1664525)+1013904223>>>0;const $=_e(e,v,T(p));yt($),h+=$.t||0,i+=1,p=Math.imul(p,1664525)+1013904223>>>0;const k=Re(e,$,T(p));k.win?(d+=1,ie(e,k.drops,e.autoEquip!==!1),De(e,60),G(e,!0,v)):(u+=1,G(e,!1,v))}return e.idleAt=s,{fights:i,wins:d,losses:u,net:e.idleStage-t,elapsed:a}}const Se=""+new URL("cover-BC9nP8k8.jpg",import.meta.url).href,Le=""+new URL("player-OqQ7v-aW.jpg",import.meta.url).href,wt=""+new URL("enemy-bandit-BJiCZAUs.jpg",import.meta.url).href,Mt=""+new URL("enemy-wraith-mpqswkJh.jpg",import.meta.url).href,St=""+new URL("enemy-ambush-Ds7Ku3iw.jpg",import.meta.url).href,Lt=""+new URL("enemy-miner-D-A0CDet.jpg",import.meta.url).href,Ct=""+new URL("enemy-captain-CPc5_NG1.jpg",import.meta.url).href,Tt=""+new URL("bg-guandao-n6PeQ_f5.jpg",import.meta.url).href,qt=""+new URL("bg-huangci-DG2AsNjf.jpg",import.meta.url).href,At=""+new URL("bg-zhandao-5eTcq8gy.jpg",import.meta.url).href,jt=""+new URL("bg-kuangkeng-CBX0u5xm.jpg",import.meta.url).href,Bt=""+new URL("bg-guancheng-CtBuonkZ.jpg",import.meta.url).href,Ce=[wt,Mt,St,Lt,Ct],Z=[Tt,qt,At,jt,Bt],Te=()=>typeof matchMedia=="function"&&matchMedia("(prefers-reduced-motion: reduce)").matches;function W(e){return"r-"+e}function qe(e){const s=e||{},n=[];for(const t of["atk","def","hp","crit","aspd","ls"])if(s[t]){const a=t==="crit"||t==="ls"?"%":"",i=s[t]>0?"+":"";n.push(`${Be[t]}${i}${s[t]}${a}`)}return n.join("　")}function Ae(e){return Math.max(0,Math.min(100,e.hp/e.maxHp*100))}function Et(e){e.innerHTML=`
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
  </div>`;const s=r=>e.querySelector(r),n={title:s("#sc-title"),hub:s("#sc-hub"),stages:s("#sc-stages"),battle:s("#sc-battle"),equip:s("#sc-equip"),skills:s("#sc-skills"),bag:s("#sc-bag"),overlay:s("#overlay"),toast:s("#toast")};let t=we(),a=0,i=null,d=0,u=0,h=1,p=0,v=0;function $(r,o){return Ce[r.map]||Ce[0]}function k(){clearTimeout(v),v=0}function _(){if(!t||(N(t),!t.idle))return!1;const r=xt(t);return b(),r.fights>0&&(r.net>0?g(`放置：過了 ${r.net} 關`):g("放置：退回刷裝")),!0}function g(r){n.toast.textContent=r,n.toast.classList.add("on"),clearTimeout(p),p=setTimeout(()=>n.toast.classList.remove("on"),1400)}function b(){ot(t)}function w(r){var l,c;for(const f of Object.keys(n))(l=n[f].classList)!=null&&l.contains("screen")&&n[f].classList.remove("on");(c={title:n.title,hub:n.hub,stages:n.stages,battle:n.battle,equip:n.equip,skills:n.skills,bag:n.bag}[r])==null||c.classList.add("on"),n.overlay.classList.remove("on"),r==="title"&&Oe(),r==="hub"&&re(),r==="stages"&&ce(),r==="equip"&&ue(),r==="skills"&&pe(),r==="bag"&&B()}function Oe(){const r=!!t;n.title.innerHTML=`
      <div class="title-bg" style="background-image:url(${Se})"></div>
      <div class="title-copy">
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
      </div>`}function K(){return`<div class="res">金 <b>${t.gold}</b>　精鐵 <b>${t.iron}</b>　技能點 <b>${t.skillPoints}</b></div>`}function re(){const r=te(t),o=Math.min(x.length-1,t.maxCleared+1),l=x[o],c=Q(t.level),f=Math.min(100,t.exp/c*100);n.hub.innerHTML=`
      <div class="topbar">
        <h2>鑄鋒</h2>
        ${K()}
      </div>
      <div class="lvline">
        <div class="lv">Lv.${t.level}</div>
        <div class="exp"><i style="width:${f}%"></i></div>
        <span style="font-size:11px;color:var(--muted)">${t.exp}/${c}</span>
      </div>
      <div class="power">
        <img class="hub-portrait" src="${Le}" alt="">
        <div class="power-num">
          <div class="l">戰力</div>
          <div class="n">${r.power}</div>
        </div>
      </div>
      <div class="stats">
        ${["atk","def","hp","crit","aspd","ls"].map(m=>`
          <div class="stat"><div class="k">${Be[m]}</div><div class="v">${m==="crit"||m==="ls"?r[m]+"%":r[m]}</div></div>`).join("")}
      </div>
      <div class="stage-hint">下一關　${l.mapName} · ${l.name}</div>
      <button class="btn ${t.idle?"gold":""} wide idle-toggle" data-act="idle-toggle">放置 ${t.idle?"開":"關"}</button>
      <div class="hub-grid">
        <button class="btn gold" data-act="stages">出戰</button>
        <button class="btn" data-act="equip">裝備</button>
        <button class="btn" data-act="skills">技能</button>
        <button class="btn" data-act="bag">背包</button>
      </div>`,n.hub.style.backgroundImage=`linear-gradient(180deg, rgba(11,9,7,.78), rgba(11,9,7,.92)), url(${Se})`,n.hub.style.backgroundSize="cover",n.hub.style.backgroundPosition="center"}function ce(){const r=new Set(x.filter((l,c)=>E(t,c)).map(l=>l.map));r.has(a)||(a=0);const o=x.filter(l=>l.map===a);n.stages.innerHTML=`
      <div class="topbar">
        <button class="btn sm ghost" data-act="hub">← 回城</button>
        <h2>出戰</h2>
        ${K()}
      </div>
      <div class="maps">
        ${Y.map((l,c)=>`
          <button class="map-tab ${c===a?"on":""} ${r.has(c)?"":"lock"}"
            data-act="map" data-i="${c}"
            style="background-image:linear-gradient(rgba(10,8,6,.58),rgba(10,8,6,.62)),url(${Z[c]});background-size:cover;background-position:center">${l.name}</button>`).join("")}
      </div>
      <div class="scroll">
        ${o.map(l=>{const c=E(t,l.index),f=t.maxCleared>=l.index,m=$t(l.index);return`
            <button class="stage-row ${c?"":"lock"} ${l.isBoss?"boss":""} ${f?"cleared":""}"
              data-act="fight" data-i="${l.index}" ${c?"":"disabled"}>
              <div class="sn">${l.local}</div>
              <div class="sinfo">
                <div class="nm">${l.name}</div>
                <div class="sub">敵勢 ${m}${l.isBoss?"　"+l.mechanicText:""}</div>
              </div>
              ${l.isBoss?'<span class="stag">首領</span>':""}
              ${f?'<span class="stag">破</span>':""}
            </button>`}).join("")}
      </div>`}function de(r,o=""){if(!r)return'<div class="item-card"><div class="meta"><div class="nm">空</div></div></div>';const l=r.rarity,c=X.find(f=>f.id===l);return`
      <div class="item-card card-${l} ${o}" data-id="${r.id}">
        <div class="dot b-${l}"></div>
        <div class="meta">
          <div class="nm ${W(l)}">${J(r)}</div>
          <div class="st">${qe(U(r))}</div>
        </div>
        <span class="tag ${W(l)}">${c.name}</span>
      </div>`}function ue(){const r=te(t);n.equip.innerHTML=`
      <div class="topbar">
        <button class="btn sm ghost" data-act="hub">← 回城</button>
        <h2>裝備</h2>
        ${K()}
      </div>
      <div class="stage-hint">戰力 ${r.power}　點強化燒精鐵</div>
      <div class="scroll slots">
        ${ae.map(o=>{const l=t.equipped[o.id],c=(l==null?void 0:l.plus)||0,f=l&&c<O?Ie(c):null;return`
            <div class="slot card-${(l==null?void 0:l.rarity)||"fan"}">
              <div class="lab">${o.name}</div>
              <div class="bodyx">
                <div class="nm ${l?W(l.rarity):""}">${l?J(l):"空"}</div>
                <div class="st">${l?qe(U(l)):"尚未穿戴"}</div>
              </div>
              <button class="btn sm" data-act="up" data-slot="${o.id}" ${l&&f&&t.iron>=f&&c<O?"":"disabled"}>
                ${l?c>=O?"滿":`+1　${f}鐵`:"—"}
              </button>
            </div>`}).join("")}
      </div>`}function pe(){n.skills.innerHTML=`
      <div class="topbar">
        <button class="btn sm ghost" data-act="hub">← 回城</button>
        <h2>技能</h2>
        <div class="res">點 <b>${t.skillPoints}</b></div>
      </div>
      <div class="scroll">
        ${oe.map(r=>{const o=t.skills[r.id]||0,l=Ne(t,r),c=o>=10,f=l&&!c&&t.skillPoints>0;return`
            <div class="skill-card ${l?"":"lock"}">
              <div class="skill-hd">
                <div class="nm">${r.name}</div>
                <div class="lv">${l?o?"Lv."+o:"未學":"Lv."+r.unlock+" 解鎖"}</div>
              </div>
              <div class="blurb">${r.blurb} · ${r.type==="active"?"主動":"被動"}</div>
              <div class="fx">${o?r.desc(o):"尚未點亮"}</div>
              <div class="fx" style="color:var(--gold)">${o<10&&l?"下一級："+r.next(o):""}</div>
              <button class="btn sm gold" data-act="skillup" data-id="${r.id}" ${f?"":"disabled"}>升級</button>
            </div>`}).join("")}
      </div>`}function B(){n.bag.innerHTML=`
      <div class="topbar">
        <button class="btn sm ghost" data-act="hub">← 回城</button>
        <h2>背包</h2>
        <div class="res">${t.inventory.length}/${z}　鐵 <b>${t.iron}</b></div>
      </div>
      <div class="scroll grid-items">
        ${t.inventory.length===0?'<div class="hint" style="text-align:center;padding:24px">空空如也。去砍人撿刀。</div>':t.inventory.map(r=>{const o=t.equipped[r.slot],l=!o||A(r)>A(o)+.5;return`
                <div>
                  ${de(r,l?"better":"")}
                  <div class="row-btns">
                    <button class="btn sm gold" data-act="wear" data-id="${r.id}">${l?"穿上":"更換"}</button>
                    <button class="btn sm ghost" data-act="salvage" data-id="${r.id}">分解 ${j(r)}</button>
                  </div>
                </div>`}).join("")}
      </div>
      <div class="bottom-fixed">
        <button class="btn sm danger wide" data-act="junk">一鍵分解白綠</button>
        <button class="btn sm ghost" data-act="melt" ${t.gold>=10?"":"disabled"}>熔金</button>
      </div>`}function M(r){E(t,r)&&(k(),t.idle?(t.idleStage=r,t.idleAt=Date.now(),h=2,b()):h=1,i=_e(t,r,T((Date.now()^r*997)>>>0)),Ue(),w("battle"),u=performance.now(),cancelAnimationFrame(d),d=requestAnimationFrame(ve))}function Ue(){var R,C;const r=i,o=r.enemy,l=r.player,c=Z[r.stage.map]||Z[0],f=$(r.stage,(R=o.extra)==null?void 0:R.isBoss),m=(C=o.extra)!=null&&C.isBoss?"boss":"";n.battle.innerHTML=`
      <div class="field" id="field" style="background-image:linear-gradient(180deg,rgba(8,6,4,.22),rgba(8,6,4,.5)),url(${c});background-size:cover;background-position:center">
        <div class="field-fog"></div>
        ${t.idle?'<div class="idle-badge" id="idle-badge">放置中</div>':""}
        <div class="wave-tag" id="wave-tag">第 ${r.waveIndex+1}/${r.waves.length} 波　${o.name}</div>
        <div class="units">
          <div class="unit player" id="u-player">
            <div class="hpwrap">
              <div class="hptext"><span>${l.name}</span><span id="php">${l.hp}/${l.maxHp}</span></div>
              <div class="hpbar"><i id="phpb" style="width:100%"></i></div>
            </div>
            <div class="body"><img class="sprite" src="${Le}" alt=""></div>
            <div class="uname">鑄鋒客</div>
          </div>
          <div class="unit enemy" id="u-enemy">
            <div class="hpwrap">
              <div class="hptext"><span id="ename">${o.name}</span><span id="ehp">${o.hp}/${o.maxHp}</span></div>
              <div class="hpbar"><i id="ehpb" style="width:100%"></i></div>
            </div>
            <div class="body"><img class="sprite ${m}" id="e-sprite" src="${f}" alt=""></div>
            <div class="uname ${m}" id="ename2">${o.name}</div>
          </div>
        </div>
        <div class="skill-flash" id="sflash"></div>
      </div>
      <div class="battle-ctrl">
        <button class="btn sm" id="btn-speed" data-act="speed">${h===2?"還原 ×1":"加速 ×2"}</button>
        <button class="btn sm danger" data-act="flee">${t.idle?"停止放置":"放棄"}</button>
      </div>
      <div class="blog" id="blog"></div>`,n.battle._log=[]}function L(r,o){const l=n.battle.querySelector("#blog");if(!l)return;const c=n.battle._log||(n.battle._log=[]);c.push({text:r,hi:o}),c.length>5&&c.shift(),l.innerHTML=c.map(f=>`<div class="${f.hi?"hi":""}">${f.text}</div>`).join("")}function Fe(){const r=i.player,o=i.enemy,l=n.battle.querySelector("#php"),c=n.battle.querySelector("#ehp"),f=n.battle.querySelector("#phpb"),m=n.battle.querySelector("#ehpb");l&&(l.textContent=`${Math.max(0,Math.ceil(r.hp))}/${r.maxHp}`),c&&(c.textContent=`${Math.max(0,Math.ceil(o.hp))}/${o.maxHp}`),f&&(f.style.width=Ae(r)+"%"),m&&(m.style.width=Ae(o)+"%")}function fe(r){const o=n.battle.querySelector("#sflash");o&&(o.textContent=r,o.classList.remove("show"),o.offsetWidth,o.classList.add("show"))}function he(r,o){const l=n.battle.querySelector(r==="player"?"#u-player":"#u-enemy");l&&(l.classList.remove("strike","hurt"),l.offsetWidth,l.classList.add(o),setTimeout(()=>l.classList.remove(o),Te()?0:140))}function me(r,o,l){const c=n.battle.querySelector("#field");if(!c)return;const f=document.createElement("div");f.className=`floater ${r==="player"?"player-side":"enemy-side"} ${l||""}`,f.textContent=o,c.appendChild(f),setTimeout(()=>f.remove(),Te()?400:900)}function Ge(r){for(const o of r){if(o.type==="atk"&&he(o.who,"strike"),o.type==="dmg"){const l=o.who;he(l,"hurt");const c=(o.crit?"crit":"")+(o.double?" double":"");me(l,(o.crit?"暴 ":o.double?"連 ":"-")+o.dmg,c),o.skill?L(`${o.skill} ${o.crit?"暴擊 ":""}${o.dmg}`,!0):o.crit&&L(`暴擊 ${o.dmg}`,!0)}if(o.type==="heal"&&(me(o.who,"+"+o.amount,"heal"),o.via||L(`${o.who==="player"?"鑄鋒客":"敵"} 回復 ${o.amount}`)),o.type==="skill"&&(fe(o.name),L(`施展 ${o.name}`,!0)),o.type==="mechanic"&&(fe(o.name),L(o.text||o.name,!0)),o.type==="wave"){const l=n.battle.querySelector("#wave-tag");l&&(l.textContent=`第 ${o.index+1}/${o.total} 波　${o.enemy}`);const c=n.battle.querySelector("#ename"),f=n.battle.querySelector("#ename2");c&&(c.textContent=o.enemy),f&&(f.textContent=o.enemy,f.classList.toggle("boss",!!o.isBoss));const m=n.battle.querySelector("#e-sprite");m&&i&&(m.src=$(i.stage,o.isBoss),m.classList.toggle("boss",!!o.isBoss)),L(`${o.enemy} 上前`,!0)}o.type==="kill"&&L(`${o.name} 倒下`),o.type==="win"&&ge(!0),o.type==="lose"&&ge(!1)}i&&Fe()}function ve(r){if(!i||i.done)return;const o=Math.min(50,r-u)*h;u=r;const l=Pe(i,o);l.length&&Ge(l),i&&!i.done&&(d=requestAnimationFrame(ve))}function ge(r){cancelAnimationFrame(d);const o=i.stageIndex,l=i.stage,c=T((Date.now()^2654435769)>>>0),f=Re(t,i,c);if(b(),t.idle){n.overlay.classList.remove("on"),n.overlay.innerHTML="",n.overlay._drops=null,n.overlay._taken=!1,r?(ie(t,f.drops,!0),De(t,60),G(t,!0,o),b(),g(`${l.mapName} · ${l.name}　破`),i=null,k(),v=setTimeout(()=>M(t.idleStage),900)):(G(t,!1,o),b(),g("敗退，回到上一關"),i=null,k(),v=setTimeout(()=>M(t.idleStage),700));return}if(r){const m=i.stageIndex+1,R=m<x.length&&E(t,m);n.overlay.className="overlay on",n.overlay.innerHTML=`
        <div class="sheet">
          <h3>鋒利了一分</h3>
          <div class="reward-line">金錢 +${f.gold}　經驗 +${f.exp}${f.levels?`　升級 ×${f.levels}`:""}</div>
          <div class="drops" id="drops">
            ${f.drops.map(C=>{const be=t.equipped[C.slot],ye=!be||A(C)>A(be)+.5;return`<div data-drop="${C.id}">${de(C,ye?"better":"")}
                ${ye?'<div class="hint" style="padding:0 10px 6px;color:var(--ok)">較現有更強</div>':""}</div>`}).join("")}
          </div>
          <div class="row-btns" style="flex-direction:column">
            <button class="btn gold wide" data-act="loot-auto">一鍵穿更好的</button>
            <button class="btn wide" data-act="loot-bag">全收進背包</button>
            ${R?`<button class="btn gold wide" data-act="next" data-i="${m}">下一關</button>`:""}
            <button class="btn ghost wide" data-act="hub">回城</button>
          </div>
        </div>`,n.overlay._drops=f.drops,n.overlay._taken=!1}else n.overlay.className="overlay on",n.overlay.innerHTML=`
        <div class="sheet lose">
          <h3>刀鈍了</h3>
          <div class="reward-line">人還在。熔鐵、升級、再砍一次。</div>
          <div class="row-btns" style="flex-direction:column">
            <button class="btn gold wide" data-act="retry" data-i="${i.stageIndex}">再戰本關</button>
            <button class="btn ghost wide" data-act="hub">回城</button>
          </div>
        </div>`;i=null}function P(r){const o=n.overlay._drops||[];if(n.overlay._taken)return o;const l=ie(t,o,r);return n.overlay._taken=!0,b(),r&&l.equipped.length&&g("已穿上更好的刃甲"),o}function ze(r){const o=r.target.closest("[data-act]");if(!o)return;const l=o.dataset.act;if(l==="new"){if(t&&o.dataset.ok!=="1"){o.dataset.ok="1",o.textContent="確定抹檔開鑄";return}k(),t=xe(),b(),g("爐火已燃"),t.idle?M(0):w("hub")}else if(l==="cont")t||(t=we()||xe()),N(t),_()?M(F(t)):w("hub");else if(l==="hub")n.overlay._drops&&!n.overlay._taken&&P(!1),k(),cancelAnimationFrame(d),i=null,t!=null&&t.idle&&(t.idle=!1,t.idleAt=Date.now()),b(),w("hub");else if(l==="stages")w("stages");else if(l==="equip")w("equip");else if(l==="skills")w("skills");else if(l==="bag")w("bag");else if(l==="map"){const c=+o.dataset.i;x.some(m=>m.map===c&&E(t,m.index))&&(a=c,ce())}else if(l==="fight")t.idle&&(t.idleStage=+o.dataset.i,b()),M(+o.dataset.i);else if(l==="idle-toggle")t.idle?(t.idle=!1,t.idleAt=Date.now(),b(),re(),g("放置已關")):(t.idle=!0,t.idleAt=Date.now(),F(t),b(),M(t.idleStage));else if(l==="speed")h=h===1?2:1,o.textContent=h===2?"還原 ×1":"加速 ×2";else if(l==="flee")k(),cancelAnimationFrame(d),i&&!i.done&&(i.done=!0,i.result={win:!1},t.losses+=1),t.idle=!1,t.idleAt=Date.now(),b(),i=null,g("已抽身"),w("hub");else if(l==="up"){const c=rt(t,o.dataset.slot);c.ok?(b(),ue(),g("刃甲更硬了 +"+c.plus)):g(c.reason)}else if(l==="skillup"){const c=ht(t,o.dataset.id);c.ok?(b(),pe(),g("技能 +1")):g(c.reason)}else if(l==="wear"){const c=dt(t,o.dataset.id);c.ok&&(b(),B(),g("已裝備 "+J(c.item)))}else if(l==="salvage"){const c=ct(t,o.dataset.id);c.ok&&(b(),B(),g("得精鐵 "+c.iron))}else if(l==="junk"){const c=He(t,f=>f.rarity==="fan"||f.rarity==="liang");b(),B(),g(c.n?`熔了 ${c.n} 件，精鐵 +${c.iron}`:"沒有白綠色")}else if(l==="melt"){const c=mt(t,t.gold);c.ok&&(b(),B(),g(`熔金 ${c.gold} → 精鐵 ${c.iron}`))}else l==="loot-auto"?(P(!0),w("hub")):l==="loot-bag"?(P(!1),w("hub")):l==="next"?(P(!0),M(+o.dataset.i)):l==="retry"&&M(+o.dataset.i)}return e.addEventListener("click",ze),w("title"),{getState:()=>t,show:w,startFight:M}}Et(document.getElementById("app"));
