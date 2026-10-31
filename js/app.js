(()=>{'use strict';
const data=window.NATURES_DATA||[];
const labels={'nom':'Nom','adjectif':'Adjectif','verbe':'Verbe','adverbe':'Adverbe','préposition':'Préposition','coordination':'Conjonction de coordination','subordination':'Conjonction de subordination','interjection':'Interjection','onomatopée':'Onomatopée'};
const types={'déterminant':['article défini','article indéfini','article partitif','article contracté','possessif','démonstratif','indéfini','interrogatif','exclamatif'],'pronom':['personnel','relatif','possessif','démonstratif','indéfini','interrogatif','adverbial']};
const main=x=>x.split(':')[0];const full=x=>x.includes(':')?(main(x)==='pronom'?'Pronom ':'Déterminant ')+x.split(':')[1]:labels[x]||x;
const $=id=>document.getElementById(id);let deck=[],index=-1,score=0,locked=true,answered=false;
const buttons=[...document.querySelectorAll('[data-class]')];
const random=(a)=>{for(let i=a.length-1;i>0;i--){let j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
function build(){
 // Tirage équilibré par classe cible, indépendamment de l'ordre des analyses.
 const entries=data.map(([word,answers])=>({word,answers}));
 const used=new Set(), counts={}, selected=[];
 const add=(item,category)=>{
   if(!item||used.has(item.word)||(counts[category]||0)>=2)return false;
   selected.push({...item,category});used.add(item.word);counts[category]=(counts[category]||0)+1;return true;
 };
 const take=category=>{
   const candidates=random(entries.filter(x=>!used.has(x.word)&&x.answers.some(a=>main(a)===category)));
   return add(candidates[0],category);
 };
 const simpleNouns=random(entries.filter(x=>x.answers.length===1&&x.answers[0]==='nom'));
 add(simpleNouns[0],'nom');
 take('nom');
 // Chaque catégorie rare apparaît en moyenne dans une partie sur dix.
 if(Math.random()<0.10)take('interjection');
 if(Math.random()<0.10)take('onomatopée');
 const categories=['adjectif','verbe','adverbe','préposition','coordination','subordination','déterminant','pronom'];
 // Favoriser d'abord la diversité des classes, puis autoriser une seconde occurrence.
 for(const limit of [1,2]){
   for(const category of random([...categories])){
     if(selected.length>=10)break;
     if((counts[category]||0)<limit)take(category);
   }
 }
 if(selected.length!==10)throw Error('Corpus insuffisant pour constituer dix questions équilibrées');
 return random(selected);
}
function clear(){buttons.forEach(b=>{b.disabled=false;b.classList.remove('correct','wrong')});$('subchoices').hidden=true;$('subchoices').replaceChildren();$('feedback').textContent='';}
function render(){clear();const item=deck[index];$('word').textContent=item.word;$('progress').textContent='Question '+(index+1)+' / '+deck.length;$('score').textContent='Score : '+score;$('next').hidden=true;locked=false;answered=false;}
function evaluate(choice){if(locked)return;locked=true;answered=true;const item=deck[index];const ok=item.answers.includes(choice);if(ok)score++;buttons.forEach(b=>{b.disabled=true;if(item.answers.some(a=>main(a)===b.dataset.class))b.classList.add('correct');if(b.dataset.class===main(choice)&&!ok)b.classList.add('wrong')});document.querySelectorAll('#subchoices button').forEach(b=>{b.disabled=true;if(item.answers.includes(b.dataset.answer))b.classList.add('correct');if(b.dataset.answer===choice&&!ok)b.classList.add('wrong')});$('score').textContent='Score : '+score;const fb=$('feedback');fb.textContent=ok?'Bonne réponse ! ':'Ce n’est pas la bonne réponse. ';const strong=document.createElement('strong');strong.textContent='Réponses acceptées : '+item.answers.map(full).join(' · ');fb.append(strong);$('next').hidden=false;$('next').textContent=index===deck.length-1?'Voir le résultat':'Suivant';}
function choose(category){if(locked)return;if(types[category]){const panel=$('subchoices');panel.replaceChildren();for(const type of types[category]){const b=document.createElement('button');b.textContent=(category==='pronom'?'Pronom ':'')+(category==='déterminant'&&!type.startsWith('article')?'Déterminant ':'')+type;b.dataset.answer=category+':'+type;b.addEventListener('click',()=>evaluate(b.dataset.answer));panel.append(b)}panel.hidden=false;return;}evaluate(category);}
buttons.forEach(b=>b.addEventListener('click',()=>choose(b.dataset.class)));
$('next').addEventListener('click',()=>{if(index===-1||index>=deck.length){try{deck=build();index=0;score=0;render();}catch(err){console.error(err);$('feedback').textContent='Impossible de préparer la partie. Réessaie.';}return;}if(!answered)return;if(index===deck.length-1){$('word').textContent=score+' / '+deck.length;$('feedback').textContent='Partie terminée !';buttons.forEach(b=>b.disabled=true);$('subchoices').hidden=true;$('progress').textContent='Résultat';$('next').textContent='Recommencer';$('next').hidden=false;index=deck.length;return;}index++;render();});
$('home').addEventListener('click',e=>{if(index>=0&&index<deck.length&&!confirm('Une partie est en cours. Revenir à l’accueil ?'))e.preventDefault();});
})();