'use strict';
// Build-time only. Pass a local KaTeX module path, or install KaTeX in the dev environment.
const fs=require('node:fs');
const path=require('node:path');
const katex=require(process.argv[2]||'katex');
const filename=path.join(__dirname,'data.json');
const lessons=JSON.parse(fs.readFileSync(filename,'utf8'));
let count=0;
for(const q of lessons){
  for(const formula of q.explanation.formulas){
    try{
      formula.mathml=katex.renderToString(formula.tex,{output:'mathml',displayMode:true,throwOnError:true,strict:'error',trust:false});
      count++;
    }catch(error){throw new Error(q.id+': '+error.message);}
  }
}
// No file is written until every expression compiles.
fs.writeFileSync(filename,JSON.stringify(lessons,null,2)+'\n');
console.log(`Rendered ${count} LaTeX equations as native MathML.`);
