'use strict';
let diagramSerial=0;
function svgFrame(body,label){const markerId='arrow-'+(++diagramSerial);body=body.replaceAll('url(#arrow)','url(#'+markerId+')');return `<svg viewBox="0 0 620 300" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg"><defs><marker id="${markerId}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0L10 5L0 10" fill="#587969"/></marker></defs>${body}</svg>`;}
function textSvg(x,y,s,size=15,fill='#274d3f'){return `<text x="${x}" y="${y}" text-anchor="middle" fill="${fill}" font-family="system-ui,sans-serif" font-size="${size}">${esc(s)}</text>`;}
function diagramFor(q){
 let content='';const id=q.id;
 if(id==='c2-have-we-met-before'){
  content=`<div class="diagram-cases"><button data-acquaintance-case="0" aria-pressed="true">${esc(t('情况一：其中两人认识','Case 1: an acquaintance pair'))}</button><button data-acquaintance-case="1" aria-pressed="false">${esc(t('情况二：三人互不认识','Case 2: three mutual strangers'))}</button></div><div class="case-diagram">${acquaintanceDiagram(0)}</div><p class="case-caption">${esc(t('先固定A，至少3人与A关系相同。若他们都认识A，分下面两种情况；陌生分支完全对称。','Fix A and choose three with the same relation to A. If they know A, inspect these two cases; the stranger branch is symmetric.'))}</p>`;
 }else if(id==='c2-matching-socks'){
  const sock=(x,y,color)=>`<path d="M${x} ${y}h39v67l25 22q10 18-14 27h-36q-20-4-14-22V${y}Z" fill="${color}" stroke="#244e3d" stroke-width="2"/>`;
  content=svgFrame(sock(85,45,'#b86c48')+sock(225,45,'#d0ad53')+sock(365,45,'#6c91aa')+sock(505,45,'#6c91aa')+textSvg(310,230,t('4只袜子 → 3种颜色 → 至少一对','4 socks → 3 colors → at least one pair'),22)+textSvg(310,269,'4 > 3',20),t('四只袜子与三种颜色的鸽巢示意','Four socks in three color categories'));
 }else if(id==='c2-handshakes'){
  const bins=Array.from({length:25},(_,i)=>{const x=29+i*23;return `<rect x="${x}" y="165" width="20" height="54" rx="4" fill="${i===12?'#aac4a1':'#e0e8d9'}"/>${textSvg(x+10,196,i+1,10)}`;}).join('');
  content=svgFrame(textSvg(310,48,t('26个人','26 people'),25)+Array.from({length:26},(_,i)=>`<circle cx="${24+i*23}" cy="91" r="8" fill="${i===25?'#bb7848':'#527b60'}"/>`).join('')+`<path d="M310 112v34" stroke="#587969" stroke-width="3" marker-end="url(#arrow)"/>`+bins+textSvg(310,263,t('只有25个握手次数，至少两人进入同一格','Only 25 degree values: at least one value repeats.'),16),t('26个人映射到25种握手次数','26 people mapped to 25 handshake counts'));
 }else if(id==='c4-unfair-coin'){
  content=svgFrame(textSvg(310,35,t('十次正面之后的相对证据','Relative evidence after ten heads'),18)+textSvg(100,103,t('双正面','Double-headed'),13)+`<rect x="210" y="72" width="300" height="44" rx="5" fill="#527b60"/>`+textSvg(355,100,'1024',20,'#fffef9')+textSvg(100,175,t('公平硬币','Fair coins'),13)+`<rect x="210" y="144" width="293" height="44" rx="5" fill="#b7c9a9"/>`+textSvg(354,173,'999',20)+textSvg(310,250,'P = 1024 / (1024 + 999) ≈ 0.5062',24),t('贝叶斯更新的加权证据对比','Bayesian weighted-likelihood comparison'));
 }else if(id==='c4-meeting-probability'||id==='c4-probability-of-triangle'){
  const stick=id==='c4-probability-of-triangle';const x=185,y=25,s=230;
  const shape=stick?`<path d="M185 140 L300 25 L300 140Z M300 140 L415 140 L300 255Z" fill="#91b28b"/>`:`<path d="M185 255L185 236L396 25L415 25L415 44L204 255Z" fill="#91b28b"/>`;
  content=svgFrame(`<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="#edf1e8"/>${shape}<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="none" stroke="#587969" stroke-width="2"/>`+textSvg(175,275,'0',12)+textSvg(421,275,stick?'1':'60',12)+textSvg(174,30,stick?'1':'60',12)+textSvg(445,275,'X',13)+textSvg(170,16,'Y',13)+textSvg(511,130,stick?'P = 1/4':'P = 23/144',18)+textSvg(310,294,t('绿色区域 = 满足条件的样本点','Green area = outcomes satisfying the condition'),12),t('几何概率的样本空间重绘','Redrawn geometric-probability sample space'));
 }else if(id==='c4-monty-hall-problem'){
  content=svgFrame([0,1,2].map((i)=>{let x=115+i*155;return `<rect x="${x}" y="45" width="110" height="170" rx="7" fill="${i===1?'#d7dfd0':'#315e49'}"/><circle cx="${x+87}" cy="136" r="4" fill="#dab87b"/>${textSvg(x+55,130,['1','×','3'][i],42,i===1?'#90a18a':'#fffef9')}${textSvg(x+55,247,[t('初选','Initial pick'),t('主持人排除','Host removes'),t('换到这里','Switch here')][i],13)}`;}).join('')+textSvg(170,282,'1/3',22)+textSvg(480,282,'2/3',22),t('三门问题中初选与换门概率','Initial choice and switch probabilities in Monty Hall'));
 }else if(id==='c6-bull-spread'||id==='c6-straddle'){
  const straddle=id==='c6-straddle';content=svgFrame(`<path d="M70 248H560M95 270V25" stroke="#789173" stroke-width="2"/><path d="${straddle?'M120 50L310 245L515 50':'M110 246H235L400 83H540'}" fill="none" stroke="#315e49" stroke-width="5" stroke-linejoin="round"/>`+textSvg(560,277,'S(T)',14)+textSvg(75,20,t('到期收益','Payoff'),12)+(straddle?textSvg(310,274,'K',15):textSvg(235,274,'K₁',15)+textSvg(400,274,'K₂',15))+textSvg(440,36,straddle?'abs(S(T)−K)':'K₂−K₁',18),t('重新绘制的期权到期收益图','Redrawn option terminal-payoff diagram'));
 }else if(id==='c5-dice-question'){
  content=svgFrame(`<circle cx="170" cy="150" r="59" fill="#e0e8d9"/><circle cx="440" cy="150" r="59" fill="#d0ddc9"/><path d="M230 130Q305 65 380 130" stroke="#527b60" fill="none" stroke-width="3" marker-end="url(#arrow)"/><path d="M380 175Q305 235 230 175" stroke="#527b60" fill="none" stroke-width="3" marker-end="url(#arrow)"/>`+textSvg(170,145,t('普通状态','Initial'),17)+textSvg(170,170,'u = 7/13',15)+textSvg(440,145,t('刚出7','Last sum: 7'),17)+textSvg(440,170,'v',18)+textSvg(305,79,'6/36',13)+textSvg(305,236,'29/36',13)+textSvg(170,38,t('出12 → A胜','12 → A wins'),13)+textSvg(440,38,t('再出7 → B胜','Another 7 → B wins'),13),t('先12与连续7的两状态转移图','Two-state graph for sum twelve versus consecutive sevens'));
 }else if(id==='c2-river-crossing'){
  content=`<div class="bridge-steps">${[['1 + 2 →',2],['← 1',1],['5 + 10 →',10],['← 2',2],['1 + 2 →',2]].map(([who,time],i)=>`<div><span>0${i+1}</span><strong>${who}</strong><b>${time}<small> min</small></b></div>`).join('')}</div><p class="diagram-total">2 + 1 + 10 + 2 + 2 = <b>17 min</b></p>`;
 }
 if(!content)return extendedDiagram(q);
 return `<section class="diagram-panel"><div class="box-label">${esc(t('图解 · 重新绘制','DIAGRAM · REDRAWN'))}</div>${content}</section>`;
}
