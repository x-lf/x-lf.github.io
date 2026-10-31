'use strict';
function dualText(text){const [zh,...en]=text.split(' / ');return t(zh,en.join(' / ')||zh);}
function explanationProse(value){return `<div class="derivation-prose bilingual">${language!=='en'?value.zh.split('\n\n').map(p=>`<p class="zh" lang="zh-CN">${richString(p)}</p>`).join(''):''}${language!=='zh'?value.en.split('\n\n').map(p=>`<p class="en" lang="en">${richString(p)}</p>`).join(''):''}</div>`;}
function explanationTable(table){if(!table)return'';return `<section class="worked-table"><h3>${esc(dualText(table.title))}</h3><div class="explanation-table-scroll" role="region" tabindex="0" aria-label="${esc(dualText(table.title))}"><table><thead><tr>${table.headers.map(h=>`<th scope="col">${esc(dualText(h))}</th>`).join('')}</tr></thead><tbody>${table.rows.map(row=>`<tr>${row.map(v=>`<td>${richString(dualText(v))}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>`;}
function explanationChart(plot){
 if(!plot)return'';
 const points=plot.series.flatMap(s=>s.points),xs=points.map(p=>p[0]),ys=points.map(p=>p[1]);
 const xmin=Math.min(...xs),xmax=Math.max(...xs),ymin=0,peak=Math.max(...ys);
 const raw=peak/4,base=10**Math.floor(Math.log10(raw)),step=[1,2,2.5,5,10].find(n=>n>=raw/base)*base,ymax=Math.ceil(peak/step)*step;
 const X=x=>80+(x-xmin)/(xmax-xmin)*470,Y=y=>270-(y-ymin)/(ymax-ymin)*215;
 const fmt=x=>Number(x.toPrecision(3)).toString();
 let svg=`<title>${esc(dualText(plot.title))}</title><desc>${esc(dualText(plot.caption))}</desc>`;
 for(let j=0;j<=4;j++){const y=ymax*j/4,x=xmin+(xmax-xmin)*j/4;svg+=`<path d="M80 ${Y(y)}H550" stroke="#d8dfd0" fill="none"/><text x="69" y="${Y(y)+4}" text-anchor="end" font-size="12">${fmt(y)}</text><text x="${X(x)}" y="290" text-anchor="middle" font-size="12">${fmt(x)}</text>`;}
 svg+='<path d="M80 55V270H550" stroke="#587969" fill="none"/>';
 for(const s of plot.series){svg+=`<path d="${s.points.map(([x,y],i)=>`${i?'L':'M'}${X(x).toFixed(2)} ${Y(y).toFixed(2)}`).join(' ')}" fill="none" stroke="#315e49" stroke-width="3"/>`;}
 svg+=`<text x="315" y="325" text-anchor="middle" font-size="13">${esc(dualText(plot.xLabel))}</text><text x="25" y="165" transform="rotate(-90 25 165)" text-anchor="middle" font-size="13">${esc(dualText(plot.yLabel))}</text>`;
 return `<figure class="worked-chart"><h3>${esc(dualText(plot.title))}</h3><div class="plot-scroll"><svg viewBox="0 0 620 350" role="img" aria-label="${esc(dualText(plot.title))}" xmlns="http://www.w3.org/2000/svg" fill="#274d3f" font-family="system-ui,sans-serif">${svg}</svg></div><figcaption>${esc(dualText(plot.caption))}</figcaption></figure>`;
}
function continuousExplanation(q){
 const e=q.explanation,illustration=diagramFor(q);
 return `<div class="worked-explanation"><section class="worked-prose"><h3>${esc(t('思路与完整推导','Reasoning and derivation'))}</h3>${explanationProse(q.solution)}</section>${e.formulas.length?`<section class="worked-formulas"><h3>${esc(t('关键公式','Key equations'))}</h3>${e.formulas.map(f=>`<div class="equation-row">${f.mathml}</div>`).join('')}${e.notation?`<p class="notation-note">${esc(dualText(e.notation))}</p>`:''}</section>`:''}${explanationTable(e.table)}${explanationChart(e.plot)}${illustration}${q.id==='c2-glass-balls'?eggExtra():''}</div>`;
}
