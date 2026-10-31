'use strict';
function acquaintanceDiagram(mode=0){
 const pts=[[310,40],[160,158],[310,158],[460,158],[230,260],[390,260]];
 const chosen=mode===0?[0,1,2]:[1,2,3];
 const primary=mode===0?[[0,1],[0,2],[0,3],[1,2]]:[[0,1],[0,2],[0,3]];
 let svg=primary.map(([i,j])=>`<line x1="${pts[i][0]}" y1="${pts[i][1]}" x2="${pts[j][0]}" y2="${pts[j][1]}" stroke="#77966a" stroke-width="3"/>`).join('');
 if(mode===1)svg+=[[1,2],[2,3],[1,3]].map(([i,j])=>`<line x1="${pts[i][0]}" y1="${pts[i][1]}" x2="${pts[j][0]}" y2="${pts[j][1]}" stroke="#bc8158" stroke-dasharray="7 6" stroke-width="4"/>`).join('');
 svg+=pts.map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="23" fill="${chosen.includes(i)?mode===1?'#b87e55':'#315e48':'#e1e8d8'}"/>${textSvg(x,y+6,'ABCDEF'[i],17,chosen.includes(i)?'#fffef9':'#607456')}`).join('');
 return svgFrame(svg,t('六人聚会证明的两种情况','Two cases in the six-person proof'));
}
function extendedDiagram(q){
 let body='',caption=null;const id=q.id;
 if(id==='c2-screwy-pirates'){
  body=`<div class="pirate-table"><div>${esc(t('从少到多，向后推','Work backward from smaller groups'))}</div><table><thead><tr><th>${esc(t('人数','Pirates'))}</th><th>${esc(t('提案者保留','Proposer keeps'))}</th><th>${esc(t('买票对象','Votes to buy'))}</th></tr></thead><tbody><tr><td>2 · D,E</td><td>100</td><td>—</td></tr><tr><td>3 · C,D,E</td><td>99</td><td>E · 1</td></tr><tr><td>4 · B,C,D,E</td><td>99</td><td>D · 1</td></tr><tr class="highlight"><td>5 · A,B,C,D,E</td><td>98</td><td>C · 1 + E · 1</td></tr></tbody></table></div>`;
  caption={zh:'每一步都问：如果提案者出局，哪些人下一轮得0？只需给他们各1枚，严格改善其处境。',en:'At each stage ask who would get zero if the proposer died. One coin buys a strict improvement for those voters.'};
 }else if(id==='c2-tiger-and-sheep'){
  body=`<div class="parity-grid">${[[1,true],[2,false],[3,true],[4,false],[100,false]].map(([n,eat])=>`<div class="${eat?'eat':'safe'}"><b>${n}</b><span>${esc(t('只虎','tigers'))}</span><strong>${esc(eat?t('会吃','EAT'):t('不吃','ABSTAIN'))}</strong></div>`).join('')}</div>`;
  caption={zh:'一只虎吃羊后，问题变成“少一只虎，加一只羊”。生存优先，所以奇偶状态交替。',en:'Eating turns the eater into a sheep and reduces the tiger count by one. Survival-first reasoning alternates the outcome with parity.'};
 }else if(id==='c2-glass-balls'){
  body=svgFrame(`<path d="M310 70L160 145M310 70L460 145" stroke="#819b72" stroke-width="3"/><rect x="220" y="18" width="180" height="57" rx="8" fill="#d4e3c8"/>${textSvg(310,54,'n drops · 2 balls',19)}<rect x="60" y="145" width="210" height="68" rx="7" fill="#f0dfcf"/>${textSvg(165,171,t('碎了：剩1球','Break: one ball left'),16)}${textSvg(165,196,'k − 1 ≤ n − 1',18)}<rect x="350" y="145" width="210" height="68" rx="7" fill="#dce8d3"/>${textSvg(455,171,t('没碎：剩n−1次','Safe: n−1 drops left'),16)}${textSvg(455,196,'F(n−1)',18)}${textSvg(310,270,'F(n) ≤ n + F(n−1) = n(n+1)/2',22)}`,t('两个分支约束共同给出覆盖上界','The two branches bound the floor coverage'));
  caption={zh:'左侧强迫第一跳k≤n。右侧再递推剩余覆盖量。最后还要构造递减步长，证明这个上界确实能达到。',en:'The break branch forces k≤n; the safe branch bounds the remaining coverage. Decreasing steps then attain the bound.'};
 }else if(id==='c2-chameleon-colors'){
  body=`<div class="color-populations"><div class="red"><b>13</b><span>R</span></div><div class="green"><b>15</b><span>G</span></div><div class="blue"><b>17</b><span>B</span></div></div><div class="formula-strip">(−1, −1, +2) <span>→</span> Δ(R−G), Δ(G−B), Δ(R−B) ∈ {−3,0,3}</div><div class="contradiction-box">${esc(t('模3余数不变；全同色却要求某两色都为0，数量差也为0。矛盾。','Pairwise differences modulo three stay fixed; consensus requires two zero counts and a zero difference. Contradiction.'))}</div>`;
 }else if(id==='c2-coin-split-problem'){
  body=svgFrame(`<path d="M310 65L160 140M310 65L460 140M160 180L105 230M160 180L215 230M460 180L405 230M460 180L515 230" stroke="#91aa81" stroke-width="3"/>${[[310,38,'4'],[160,152,'2'],[460,152,'2'],[105,249,'1'],[215,249,'1'],[405,249,'1'],[515,249,'1']].map(([x,y,s])=>`<circle cx="${x}" cy="${y}" r="23" fill="#d8e6cd"/>${textSvg(x,y+6,s,20)}`).join('')}${textSvg(310,105,'2×2 = 4 pairs',16)}${textSvg(105,207,'+1',14)}${textSvg(515,207,'+1',14)}`,t('四枚硬币的拆分把六个无序对各计数一次','Splitting four coins counts each of the six unordered pairs once'));
  caption={zh:'先看4枚：首次2×2分开4对，再各拆一次新增1对，共6对。一般n枚时每对恰被首次分开一次，所以总和C(n,2)。',en:'For four coins, the first split separates four pairs and the two later splits one each. In general every pair is separated exactly once, giving C(n,2).'};
 }else if(id==='c4-boys-and-girls'){
  body=`<div class="family-grid">${[['BB',false],['BG',false],['GB',false],['GG',true]].map(([s,excluded])=>`<div class="${excluded?'excluded':s==='BB'?'highlight':''}"><b>${s}</b><span>${esc(excluded?t('已排除','excluded'):t('等可能','equal chance'))}</span></div>`).join('')}</div><div class="formula-strip">P(BB given ≥1 boy) = 1 / 3</div>`;
  caption={zh:'信息是“至少一男”时，只排除GG；若是独立随机抽一个孩子且看到男孩，观察机制不同，答案变成1/2。',en:'Knowing at least one boy excludes only GG. Sampling one child independently and observing a boy uses a different mechanism and yields one half.'};
 }else if(id==='c4-coupon-collection'){
  body=`<div class="coupon-stages">${[['0','1','1'],['1','(N−1)/N','N/(N−1)'],['k','(N−k)/N','N/(N−k)'],['N−1','1/N','N']].map(([k,p,v])=>`<div><small>${esc(t('已有种类','Types owned'))} ${k}</small><strong>p = ${p}</strong><span>E[wait] = ${v}</span></div>`).join('')}</div><div class="formula-strip">E[T] = N(1 + 1/2 + … + 1/N) = NHₙ</div>`;
 }else if(id==='c5-coin-sequence'){
  body=svgFrame(`<path d="M115 120H225M285 120H395M455 120H550" stroke="#70975c" stroke-width="4" marker-end="url(#arrow)"/><path d="M255 155Q180 245 85 155M425 155Q255 290 85 155" fill="none" stroke="#ba8b67" stroke-dasharray="6 5" stroke-width="3" marker-end="url(#arrow)"/>${[[85,'0'],[255,'H'],[425,'HH'],[575,'HHH']].map(([x,s])=>`<circle cx="${x}" cy="120" r="30" fill="${s==='HHH'?'#9fbe89':'#dce8d1'}"/>${textSvg(x,126,s,17)}`).join('')}${textSvg(170,85,'H · 1/2',13)}${textSvg(340,85,'H · 1/2',13)}${textSvg(515,85,'H · 1/2',13)}${textSvg(315,270,'T → 0 · 1/2',16)}`,t('等待三个连续正面的状态机','State machine for three consecutive heads'));
  caption={zh:'正面使匹配长度前进1；反面会把连续正面状态清零。不能把每三个独立投掷当作互不重叠的一轮。',en:'Heads advance the matched prefix; a tail resets the run. Fixed, non-overlapping three-toss blocks are not the waiting-time process.'};
 }else if(id==='c5-dynamic-dice-game'){
  const v={};for(let n=19;n>=0;n--)v[n]=n>=15?n:Math.max(n,[1,2,3,4,5].reduce((a,k)=>a+v[n+k],0)/6);
  body=`<div class="value-bars">${[0,5,10,14,15,19].map(n=>`<div><span>${v[n].toFixed(2)}</span><i style="height:${v[n]/19*130}px;background:${n>=15?'#668d4e':'#aec49d'}"></i><b>n=${n}</b></div>`).join('')}</div><div class="formula-strip">V(n) = max(n, [V(n+1)+…+V(n+5)]/6)</div>`;
  caption={zh:'浅色为继续区域，深色为可以停止的区域。15处停止与再掷一步等值；向下递推得到入场价值V(0)≈6.154。',en:'Light bars indicate continuation and dark bars the stopping region. At 15, stopping and one more roll tie. Backward recursion gives V(0)≈6.154.'};
 }else if(id==='c7-unique-elements'){
  body=`<div class="dedup-row">${[1,1,3,3,3,5,5,5,9,9,9,9].map((n,i,a)=>`<span class="${i===0||n!==a[i-1]?'keep':''}">${n}</span>`).join('')}</div><div class="down-arrow">↓</div><div class="dedup-row result">${[1,3,5,9].map(n=>`<span class="keep">${n}</span>`).join('')}</div>`;
  caption={zh:'已排序，所以每个数的所有重复项挤在一段。只保留每段第一个元素，扫描一遍即可。',en:'Sorting makes equal values consecutive. Emit the first element of each run in one pass.'};
 }else if(id==='c7-maximum-contiguous-subarray'){
  body=`<div class="subarray-row">${[-2,1,-3,4,-1,2,1,-5,4].map((n,i)=>`<div class="${i>=3&&i<=6?'keep':''}"><small>${i}</small><b>${n}</b></div>`).join('')}</div><div class="formula-strip">4 + (−1) + 2 + 1 = <b>6</b></div><div class="formula-strip">endᵢ = max(Aᵢ, endᵢ₋₁ + Aᵢ)</div>`;
  caption={zh:'每一步只问：从当前元素重新开始，还是接上前面的最优尾段？全局最优再取所有尾段的最大值。',en:'At each position, restart here or extend the best prior suffix. The global optimum is the largest ending-here value.'};
 }else if(id==='c6-put-call-parity'){
  body=`<div class="parity-portfolios"><div><span>C + K e⁻ʳᵀ</span><small>${esc(t('看涨 + 到期支付K的债券','Call + strike-paying bond'))}</small></div><b>=</b><div><span>P + S</span><small>${esc(t('看跌 + 股票','Put + stock'))}</small></div></div><div class="formula-strip">T: max(Sₜ, K) = max(Sₜ, K)</div>`;
  caption={zh:'两边到期逐状态收益相同。价格若不同，买便宜组合、卖贵组合就能套利。',en:'State-by-state terminal payoffs agree. Unequal prices would permit buying the cheaper portfolio and selling the dearer.'};
 }
 if(!body)return'';
 return `<section class="diagram-panel"><div class="box-label">${esc(t('关系图解 · 网页重绘','RELATIONSHIP DIAGRAM · REDRAWN'))}</div>${body}${caption?`<div class="diagram-caption">${bi(caption)}</div>`:''}</section>`;
}
function visualExplanation(q){return continuousExplanation(q);}
function setupReasoning(root=document){
 root.querySelectorAll('[data-acquaintance-case]').forEach(b=>b.onclick=()=>{const panel=b.closest('.diagram-panel');panel.querySelectorAll('[data-acquaintance-case]').forEach(x=>x.setAttribute('aria-pressed',x===b));const i=Number(b.dataset.acquaintanceCase);panel.querySelector('.case-diagram').innerHTML=acquaintanceDiagram(i);panel.querySelector('.case-caption').textContent=i===0?t('B、C认识：加上同时认识二人的A，形成认识三角。','B and C know each other: adding A forms an acquaintance triangle.'):t('B、C、D互不认识：这三人本身就构成陌生三角。','B, C and D are all strangers to each other: they form the required stranger triangle.');});
}
