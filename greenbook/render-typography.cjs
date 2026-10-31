'use strict';
// Build-time only: typeset authored question/choice/prose strings without changing canonical text.
const fs=require('node:fs'),path=require('node:path'),katex=require(process.argv[2]||'katex');
const qs=JSON.parse(fs.readFileSync(path.join(__dirname,'data.json'),'utf8'));
const out={},whole={},snippets=new Map();
const esc=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const math=tex=>katex.renderToString(tex,{output:'mathml',displayMode:false,throwOnError:true,strict:'error',trust:false});
function O(i,...tex){if(tex.length!==4)throw Error(i);qs[i].quiz.options.forEach((s,j)=>{const parts=s.split(/\s+\/\s*/);for(const p of [parts[0],parts.slice(1).join(' / ')||parts[0]])if(!tex[j].includes('\\text'))whole[p.trim()]=tex[j];});}
function M(raw,tex){snippets.set(raw,tex);}
O(10,'\\sqrt2','2','1','2^{1/4}');
O(17,'\\frac{T-R}{8}','\\frac T8','\\frac{T-8R}{8}','\\frac{T-R}{7}');
O(38,'\\frac{(\\ln x)^{\\ln x}}{x}[\\ln(\\ln x)+1]','\\frac{(\\ln x)^{\\ln x}}{x}','\\frac{(\\ln x)^{\\ln x-1}}{x}','\\frac{(\\ln x)^{\\ln x}\\ln x}{x}');
O(39,'e^\\pi>\\pi^e','e^\\pi<\\pi^e','e^\\pi=\\pi^e','\\text{Neither is real-defined}');
O(40,'(+\\infty,0)','(0,0)','(+\\infty,-\\infty)','(1,-\\infty)');
O(41,'x\\ln x-x+C','\\frac1x+C','x\\ln x+C','\\frac{(\\ln x)^2}{2}+C');
O(42,'\\frac{16}{3}','\\frac{4\\pi}{3}','\\frac83','2\\pi');
O(43,'\\sqrt{\\frac2\\pi}','\\frac1{\\sqrt{2\\pi}}','0','1');
O(44,'\\sqrt{\\frac\\pi2}','\\sqrt{2\\pi}','\\sqrt\\pi','\\frac\\pi2');
O(45,'e^{-\\pi/2}','e^{\\pi/2}','-1','i');
O(47,'\\frac{12}{\\sqrt{29}}','\\frac{12}{29}','\\frac{\\sqrt{29}}{12}','\\frac{12}{2+3+4}');
O(48,'e^{-3x^2}','e^{3x^2}','1-6x','e^{-6x}');
O(49,'\\frac{1+\\ln x}{x}','\\frac{1-\\ln x}{x}','\\frac1{x^2}','x(1+\\ln x)');
O(50,'e^{-x/2}[C_1\\cos(\\sqrt3x/2)+C_2\\sin(\\sqrt3x/2)]','e^{x/2}[C_1\\cos(\\sqrt3x/2)+C_2\\sin(\\sqrt3x/2)]','(C_1+C_2x)e^{-x/2}','C_1e^{-x}+C_2e^x');
O(51,'(1,x-1)','(1,x)','(x,1)','(0,x-1)');
O(52,'[0.28,1]','[0.64,1]','[-1,1]','[-0.28,0.28]');
O(53,'R\\beta=Q^Ty','R^T\\beta=Q^Ty','R\\beta=X^Ty','\\beta=Qy');
O(55,'[0.28,1]','[0,1]','[-0.8,0.8]','\\{0.64\\}');
O(56,'\\rho Z_1+\\sqrt{1-\\rho^2}Z_2','\\rho Z_1+(1-\\rho)Z_2','Z_1+\\rho Z_2','\\sqrt{1-\\rho^2}Z_1+\\rho Z_2');
O(58,'\\frac12','\\frac{n+1}{2n+1}','\\frac{n+1}{n+2}','1');
O(61,'\\frac{N}{2^{N-1}}','\\frac1{2^N}','\\frac1{2^{N-1}}','1-\\frac1{2^N}');
O(63,'\\frac{13\\cdot48}{\\binom{52}{5}}','\\frac{13\\cdot4}{\\binom{52}{5}}','\\frac{13\\binom43\\cdot48}{\\binom{52}{5}}','\\frac{13\\cdot48}{52^5}');
O(66,'\\frac{2^{n-1}}{2^n-1}','\\frac1{2^n}','\\frac1{2^n-1}','\\frac12\\quad\\text{for every }n');
O(67,'\\frac{11}{30}','\\left(\\frac45\\right)^5','\\frac15','\\frac1e');
O(71,'\\frac{P(E\\mid H_k)P(H_k)}{\\sum_iP(E\\mid H_i)P(H_i)}','\\frac{P(E\\mid H_k)P(E)}{P(H_k)}','\\frac{P(E\\mid H_k)}{\\sum_iP(E\\mid H_i)}','\\frac{P(E\\mid H_k)P(H_k)}{P(H_k)}');
O(72,'(\\frac13,\\frac12)','(\\frac12,\\frac12)','(\\frac13,\\frac13)','(\\frac12,\\frac13)');
O(74,'\\frac{1024}{2023}','\\frac1{1000}','1','\\frac{999}{1024}');
O(80,'\\sqrt2-1','1','\\frac12','2-\\sqrt2');
O(84,'\\frac{39}{51}\\frac{26}{50}\\frac{13}{49}','(\\frac14)^4','\\frac4{52}','(\\frac{13}{52})^4');
O(86,'\\frac1{99}','\\frac1{100}','\\frac{\\binom{100}{50}}{2^{100}}','\\frac1{50}');
O(88,'(2,0,\\frac12)','(\\frac12,\\frac12,\\frac14)','(2,2,\\frac12)','(1,0,\\frac14)');
O(94,'\\sum_{k=1}^{100}\\frac1{2k-1}','\\sum_{k=1}^{100}\\frac1k','\\frac{100}{2}','1');
O(95,'\\frac{S_A\\rho\\sigma_A}{S_B\\sigma_B}','\\frac{\\rho\\sigma_A}{\\sigma_B}','\\frac{S_B\\rho\\sigma_B}{S_A\\sigma_A}','\\frac{S_A\\sigma_A^2}{S_B\\sigma_B^2}');
O(97,'\\frac{53}{5}=10.6','13','\\frac{48}{5}=9.6','\\frac{52}{5}=10.4');
O(98,'\\frac1{n!}','\\frac1n','(\\frac1n)^n','\\frac1{2^{n-1}}');
O(99,'(NH_N,\\ N[1-(1-1/N)^n])','(N,\\ N[1-(1-1/N)^n])','(NH_N,\\ N(1-1/N)^n)','(NH_N,n)');
O(100,'[0.5,0.8];\\ [-\\sqrt{3/7},\\sqrt{3/7}]','[0.5,0.8];\\ [-1,1]','[0,0.8];\\ [-\\sqrt{3/7},\\sqrt{3/7}]','\\{0.65\\};\\ \\{0\\}');
O(101,'(\\frac n{n+1},\\frac1{n+1})','(\\frac1{n+1},\\frac n{n+1})','(\\frac12,\\frac12)','(\\frac n{n+1},\\frac1n)');
O(108,'(n-1)^2','n(n-1)','n-1','\\frac{n(n-1)}2');
O(112,'\\frac1{n+1}','\\frac12','\\frac1{\\binom{2n}{n}}','\\frac1n');
O(113,'2^{n+1}-2','2^n','n2^n','2^n-1');
O(120,'(1,+\\infty)','(1,1)','(2,1)','(+\\infty,+\\infty)');
O(121,'3W_t\\,dt+3W_t^2\\,dW_t','3W_t^2\\,dW_t','6W_t\\,dt+3W_t^2\\,dW_t','3t\\,dt+3W_t\\,dW_t');
O(123,'C-P=S-Ke^{-rT}','C-P=S-K','C+P=S-Ke^{-rT}','C-P=Se^{-rT}-K');
O(125,'V_t+rSV_S+\\frac{\\sigma^2S^2}{2}V_{SS}-rV=0','V_t+\\mu SV_S+\\frac{\\sigma^2S^2}{2}V_{SS}-rV=0','V_t+rSV_S+\\sigma S V_{SS}-rV=0','V_t+rSV_S+\\frac{\\sigma^2S^2}{2}V_{SS}+rV=0');
O(126,'S\\Phi(d_1)-Ke^{-rT}\\Phi(d_2)','S\\Phi(d_2)-Ke^{-rT}\\Phi(d_1)','S\\Phi(d_1)-K\\Phi(d_2)','e^{-rT}[S\\Phi(d_1)-K\\Phi(d_2)]');
O(127,'\\Phi(d_1)','\\Phi(d_2)','\\frac{\\phi(d_1)}{S\\sigma\\sqrt T}','S\\phi(d_1)\\sqrt T');
O(129,'+\\infty','0','\\frac12','1');
O(131,'f_Q(K)=e^{rT}\\frac{\\partial^2 C}{\\partial K^2}','f_Q(K)=-e^{rT}\\frac{\\partial C}{\\partial K}','f_Q(K)=e^{-rT}\\frac{\\partial^2 C}{\\partial K^2}','f_Q(K)=\\frac{\\partial C}{\\partial S}');
O(133,'|S_T-K|-Q','(S_T-K)^+-Q','|S_T-K|','Q-|S_T-K|');
O(134,'e^{-rT}\\Phi(d_2)','\\Phi(d_2)','e^{-rT}\\Phi(d_2+\\sigma\\sqrt T)','S\\Phi(d_2+\\sigma\\sqrt T)');
O(135,'\\sqrt{0.07}\\approx26.46\\%','10\\%','\\sqrt{0.13}\\approx36.06\\%','50\\%');
O(136,'(\\frac67,\\frac17)','(\\frac12,\\frac12)','(\\frac35,\\frac25)','(1,0)');
O(141,'\\Theta(n\\log n)','\\Theta(n)','\\Theta(\\log n)','\\Theta(n^2)');
O(145,'\\frac{S_i-A_i+A_{i+m}}m','\\frac{S_i+A_{i+m}}m','\\frac{S_i-A_i+A_{i+m-1}}m','\\frac{S_i-A_{i-1}+A_{i+m}}m');
O(156,'\\frac{\\operatorname{Cov}(X,Y)}{\\operatorname{Var}(X)}','\\frac{\\operatorname{Cov}(X,Y)}{\\operatorname{Var}(Y)}','-\\frac{\\operatorname{Cov}(X,Y)}{\\operatorname{Var}(X)}','\\operatorname{Corr}(X,Y)');
O(157,'\\Delta t\\leq\\frac{(\\Delta x)^2}{2\\kappa}','\\Delta t\\leq\\frac{\\Delta x}{2\\kappa}','\\Delta t\\geq\\frac{(\\Delta x)^2}{2\\kappa}','\\text{All positive time steps are stable}');
O(163,'\\frac{\\sigma^2}n','\\frac{\\sigma^2}{\\sqrt n}','\\sigma^2','n\\sigma^2');
O(164,'e^{-\\lambda t}','e^{-\\lambda(s+t)}','1-e^{-\\lambda t}','e^{-\\lambda s}');
O(172,'0','s','t-s','t');
O(173,'W_t^3-3tW_t','W_t^3-t','W_t^3-3t','W_t^3+3tW_t');
O(177,'\\Theta=-\\frac{\\partial V}{\\partial\\tau}','\\Theta=\\frac{\\partial V}{\\partial\\tau}','\\Theta=0','\\Theta=\\tau\\frac{\\partial V}{\\partial\\tau}');
O(182,'\\mathbf1_{\\{S_T>K\\}}','(S_T-K)^+','S_T\\mathbf1_{\\{S_T>K\\}}','K\\mathbf1_{\\{S_T>K\\}}');

O(64,'f_n=f_{n-1}+f_{n-2},\\ f_0=f_1=1','f_n=2f_{n-1},\\ f_0=f_1=1','f_n=f_{n-1}+f_{n-2},\\ f_0=0,f_1=1','f_n=n,\\ f_0=0,f_1=1');
O(85,'\\begin{cases}\\frac{1-(q/p)^i}{1-(q/p)^N},&p\\ne1/2\\\\ i/N,&p=1/2\\end{cases}','i/N\\quad\\text{for every }p','\\frac{1-(q/p)^N}{1-(q/p)^i}','p^N\\quad\\text{for every }p');
O(114,'V_t(s)=\\max_a\\mathbb E[r_t+V_{t+1}(S^{\\prime})\\mid s,a]','V_t(s)=\\max_a\\mathbb E[r_t\\mid s,a]','\\mathbb E[\\max_a r_t+V_{t+1}(S^{\\prime})]','V_t(s)=\\min_a\\mathbb E[r_t+V_{t+1}(S^{\\prime})\\mid s,a]');
O(116,'V=\\frac{V_w+V_l}{2},\\ h=\\frac{V_w-V_l}{2}','V=\\frac{V_w-V_l}{2},\\ h=\\frac{V_w+V_l}{2}','V=V_w+V_l,\\ h=V_w-V_l','V=\\frac{V_w+V_l}{2},\\ h=V_w-V_l');
O(118,'\\begin{gathered}V=\\max\\{b-r,\\frac{bV(b-1,r)+rV(b,r-1)}{b+r}\\}\\\\V(0,r)=0,\\ V(b,0)=b\\end{gathered}','\\begin{gathered}V=\\max\\{r-b,\\frac{bV(b-1,r)+rV(b,r-1)}{b+r}\\}\\\\V(0,r)=0,\\ V(b,0)=b\\end{gathered}','\\begin{gathered}V=\\max\\{0,\\frac{bV(b-1,r)+rV(b,r-1)}{b+r}\\}\\\\V(0,r)=V(b,0)=0\\end{gathered}','\\begin{gathered}V=\\max\\{b-r,\\frac{rV(b-1,r)+bV(b,r-1)}{b+r}\\}\\\\V(0,r)=0,\\ V(b,0)=b\\end{gathered}');

// Longest exact snippets win, so an exponent or fraction is not partially reinterpreted.
M('y=(ln x)^(ln x)','y=(\\ln x)^{\\ln x}');M('y = (ln x)^(ln x)','y=(\\ln x)^{\\ln x}');
M('(ln x)^(ln x)','(\\ln x)^{\\ln x}');M('ln y=(ln x)ln(ln x)','\\ln y=\\ln x\\,\\ln(\\ln x)');M('[ln(ln x)+1]/x','\\frac{\\ln(\\ln x)+1}{x}');
M('e^π','e^\\pi');M('π^e','\\pi^e');M('e^x/x²','\\frac{e^x}{x^2}');M('x²ln x','x^2\\ln x');
M('∫₀^∞ exp(−x²/2) dx','\\int_0^\\infty e^{-x^2/2}\\,dx');M('∫₀^∞ exp(−x²/2) dx','\\int_0^\\infty e^{-x^2/2}\\,dx');M('∫ln x dx','\\int\\ln x\\,dx');M('∫ln x dx','\\int\\ln x\\,dx');
M('[[2,1],[1,2]]','\\begin{pmatrix}2&1\\\\1&2\\end{pmatrix}');M('[[1,2],[2,1]]','\\begin{pmatrix}1&2\\\\2&1\\end{pmatrix}');M('[[1,0.8,0.8],[0.8,1,c],[0.8,c,1]]','\\begin{pmatrix}1&0.8&0.8\\\\0.8&1&c\\\\0.8&c&1\\end{pmatrix}');
M('y′+6xy=0',"y'+6xy=0");M('y′+y/x=1/x²',"y'+\\frac yx=\\frac1{x^2}");M('y″+y′+y=0',"y''+y'+y=0");M('y″+y′+y=1',"y''+y'+y=1");M('y″+y′+y=x',"y''+y'+y=x");
M('Corr(X,Y)=Corr(X,Z)=0.8','\\operatorname{Corr}(X,Y)=\\operatorname{Corr}(X,Z)=0.8');M('Corr(Y,Z)','\\operatorname{Corr}(Y,Z)');
M('E[X | X>0]','\\mathbb E[X\\mid X>0]');M('E[X|A]','\\mathbb E[X\\mid A]');M('N(0,1)','N(0,1)');M('U(0,1)','U(0,1)');
M('(1+√2)^3000','(1+\\sqrt2)^{3000}');M('(1−√2)^3000','(1-\\sqrt2)^{3000}');M('x^(x^(x^…))','x^{x^{x^{\\cdot^{\\cdot^{\\cdot}}}}}');
M('i^i','i^i');M('Log(i)=iπ/2','\\operatorname{Log}(i)=i\\pi/2');M('y′',"y'");M('y″',"y''");M('e^(−x/2)','e^{-x/2}');M('e^(−rT)','e^{-rT}');M('e^(rT)','e^{rT}');M('e^(−3x²)','e^{-3x^2}');M('e^(−π/2)','e^{-\\pi/2}');
M('√(π/2)','\\sqrt{\\pi/2}');M('√(2/π)','\\sqrt{2/\\pi}');M('1/√(2π)','\\frac1{\\sqrt{2\\pi}}');M('12/√29','\\frac{12}{\\sqrt{29}}');M('√(1−ρ²)','\\sqrt{1-\\rho^2}');M('σ√T','\\sigma\\sqrt T');
M('Φ(d₁)','\\Phi(d_1)');M('Φ(d₂)','\\Phi(d_2)');M('φ(d₁)','\\phi(d_1)');M('φ(d₂)','\\phi(d_2)');M('∂C/∂S','\\frac{\\partial C}{\\partial S}');M('∂V/∂t','\\frac{\\partial V}{\\partial t}');M('∂V/∂τ','\\frac{\\partial V}{\\partial\\tau}');
M('∫₀^∞','\\int_0^\\infty');M('∫[0,∞]','\\int_0^\\infty');M('∫[−∞,∞]','\\int_{-\\infty}^{\\infty}');M('∫[-1,1]','\\int_{-1}^{1}');M('x²','x^2');M('x³','x^3');M('W_t³','W_t^3');M('W_t²','W_t^2');
M('σ_A','\\sigma_A');M('σ_B','\\sigma_B');M('S_A','S_A');M('S_B','S_B');M('S_T','S_T');M('X₁','X_1');M('X₂','X_2');M('Z₁','Z_1');M('Z₂','Z_2');M('X̄','\\overline X');
M('σ²S²V_SS/2','\\frac{\\sigma^2S^2}{2}V_{SS}');M('Δt≤(Δx)²/(2κ)','\\Delta t\\leq\\frac{(\\Delta x)^2}{2\\kappa}');
M('Sᵀ','S^T');M('XᵀX','X^TX');M('QᵀQ=I','Q^TQ=I');M('Rβ=Qᵀy','R\\beta=Q^Ty');M('‖y−Xβ‖²','\\lVert y-X\\beta\\rVert^2');

M('d₁=[ln(S/K)+(r+σ²/2)T]/(σ√T)','d_1=\\frac{\\ln(S/K)+(r+\\sigma^2/2)T}{\\sigma\\sqrt T}');
M('d₂=[ln(S/K)+(r−σ²/2)T]/(σ√T)','d_2=\\frac{\\ln(S/K)+(r-\\sigma^2/2)T}{\\sigma\\sqrt T}');
M('Γ=φ(d₁)/(Sσ√T)','\\Gamma=\\frac{\\phi(d_1)}{S\\sigma\\sqrt T}');
M('∂d₁/∂S=∂d₂/∂S=1/(Sσ√T)','\\frac{\\partial d_1}{\\partial S}=\\frac{\\partial d_2}{\\partial S}=\\frac1{S\\sigma\\sqrt T}');
M('dr=a(b−r)dt+σdW','dr=a(b-r)\\,dt+\\sigma\\,dW');M('dr=a(b−r)dt+σ√r dW','dr=a(b-r)\\,dt+\\sigma\\sqrt r\\,dW');
M('T(n)=2T(n/2)+Θ(n)','T(n)=2T(n/2)+\\Theta(n)');M('u_t=κu_xx','u_t=\\kappa u_{xx}');
M('p(x)=a₀+a₁x+…+a_nx^n','p(x)=a_0+a_1x+\\cdots+a_nx^n');

require('./typography-rules.cjs')({M,O});

const pattern=[...snippets.keys()].sort((a,b)=>b.length-a.length).map(s=>s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|');
const regex=new RegExp(pattern,'g');
// Slashes carry meaning: only reviewed arithmetic fractions may become stacked fractions.
// Binary alternatives, dates, units, code and source OCR never enter this numeric rule.
const reviewedFractions=new Set('2/9 3/4 6/36 1/2 1/3 1/4 1/5 1/6 1/7 1/8 1/10 1/12 1/13 1/17 1/18 1/36 1/50 1/99 1/100 1/1000 2/3 2/5 2/7 3/5 3/6 3/51 3/100 4/7 4/9 4/52 5/6 5/9 5/54 6/7 6/13 7/8 7/12 7/13 8/17 8/3 9/2 10/30 10/40 10/60 11/30 11/144 12/29 13/49 13/52 14/3 16/3 16/17 16/625 17/4 20/30 20/60 20/216 23/144 26/50 30/40 30/60 39/51 44/120 48/5 52/5 53/5 99/100 100/2 100/5 100/25 104/2 499/500 500/501 609/625 609/2500 999/1000 999/1024 1024/2023 0.0099/0.0594 3/0.2'.split(' '));
let mathSpans=0;
function inline(text,allowFractions=true){
 if(Object.hasOwn(whole,text)){mathSpans++;return math(whole[text]);}
 const simple=chunk=>{if(!allowFractions)return esc(chunk);let pos=0,html='';for(const m of chunk.matchAll(/(?<![\w/.√])([0-9]+(?:\.[0-9]+)?)\/([0-9]+(?:\.[0-9]+)?)(?![\w/^!²³⁴⁵⁶⁷⁸⁹₀₁₂₃₄₅₆₇₈₉]|\.\d)/g)){
  if(!reviewedFractions.has(m[0]))continue;
  html+=esc(chunk.slice(pos,m.index))+math(`\\frac{${m[1]}}{${m[2]}}`);mathSpans++;pos=m.index+m[0].length;
 }return html+esc(chunk.slice(pos));};
 let pos=0,html='';regex.lastIndex=0;for(const m of text.matchAll(regex)){if(m[0].includes('/')&&/[A-Za-z0-9]$/.test(m[0])&&/^[A-Za-z0-9_^!²³⁴⁵⁶⁷⁸⁹]/.test(text.slice(m.index+m[0].length)))continue;html+=simple(text.slice(pos,m.index))+math(snippets.get(m[0]));mathSpans++;pos=m.index+m[0].length;}return html+simple(text.slice(pos));
}
for(let i=0;i<qs.length;i++){
 const q=qs[i],texts=[];
 for(const value of [q.prompt,q.quiz.prompt,q.hint,q.solution])for(const lang of ['zh','en'])texts.push(value[lang],...value[lang].split('\n\n'));
 if(q.explanation.table)for(const item of [q.explanation.table.title,...q.explanation.table.headers,...q.explanation.table.rows.flat()])texts.push(...item.split(/\s+\/\s*/));
 const sourceTexts=(q.originalQuestion?.parts||[]).flatMap(part=>part.text.split('\n\n'));
 for(const s of q.quiz.options){const parts=s.split(/\s+\/\s*/);for(const value of [parts[0].trim(),(parts.slice(1).join(' / ')||parts[0]).trim()]){
  if([142,143,151,152].includes(i)){out[value]=`<code class="choice-code">${esc(value)}</code>`;}else texts.push(value);
 }}
 for(const text of texts){if(Object.hasOwn(out,text))continue;const html=inline(text,q.id!=='c2-birthday-problem');if(html!==esc(text))out[text]=html;}
 // Preserve source transcription: do not guess which OCR slashes are division.
 for(const text of sourceTexts){if(Object.hasOwn(out,text))continue;const html=inline(text,false);if(html!==esc(text))out[text]=html;}
}
// Raw prose snippets are escaped; the only injected markup comes from the strict trusted renderer or code wrappers.
fs.writeFileSync(path.join(__dirname,'typography.json'),JSON.stringify(out,null,2)+'\n');
console.log(`Typeset ${Object.keys(out).length} authored strings (${mathSpans} inline math spans).`);
