(()=>{'use strict';
const data=window.NATURES_DATA||[];
const labels={'nom':'Nom','adjectif':'Adjectif','verbe':'Verbe','adverbe':'Adverbe','préposition':'Préposition','coordination':'Conjonction de coordination','subordination':'Conjonction de subordination','interjection':'Interjection','onomatopée':'Onomatopée'};
const types={'conjonction':['coordination','subordination'],'déterminant':['article défini','article indéfini','article partitif','article contracté','possessif','démonstratif','indéfini','interrogatif','exclamatif'],'pronom':['personnel','relatif','possessif','démonstratif','indéfini','interrogatif','adverbial']};
const main=x=>x.split(':')[0];const full=x=>x.includes(':')?(main(x)==='pronom'?'Pronom ':'Déterminant ')+x.split(':')[1]:labels[x]||x;
const $=id=>document.getElementById(id);let deck=[],index=-1,score=0,locked=true,answered=false;const history=[];
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
 // Garantir au moins deux questions ciblant les classes fermées.
 const closed=['préposition','coordination','subordination','déterminant','pronom'];
 for(const category of random([...closed])){
   if(selected.filter(x=>closed.includes(x.category)).length>=2)break;
   take(category);
 }
 if(selected.filter(x=>closed.includes(x.category)).length<2)throw Error('Corpus insuffisant pour deux questions de classes fermées');
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
function render(){$('print-toggle').textContent='Imprimer / PDF';clear();const item=deck[index];$('word').textContent=item.word;$('progress').textContent='Question '+(index+1)+' / '+deck.length;$('score').textContent='Score : '+score;$('next').hidden=true;locked=false;answered=false;buttons[0]?.focus();}
function evaluate(choice){if(locked)return;locked=true;answered=true;const item=deck[index];const ok=item.answers.includes(choice);if(ok)score++;history[index]={choice,ok};buttons.forEach(b=>{b.disabled=true;if(item.answers.some(a=>b.dataset.class==='conjonction'?['coordination','subordination'].includes(a):main(a)===b.dataset.class))b.classList.add('correct');if((b.dataset.class==='conjonction'?['coordination','subordination'].includes(choice):b.dataset.class===main(choice))&&!ok)b.classList.add('wrong')});document.querySelectorAll('#subchoices button').forEach(b=>{b.disabled=true;if(item.answers.includes(b.dataset.answer))b.classList.add('correct');if(b.dataset.answer===choice&&!ok)b.classList.add('wrong')});$('score').textContent='Score : '+score;const fb=$('feedback');fb.textContent=ok?'Bonne réponse ! ':'Ce n’est pas la bonne réponse. ';const strong=document.createElement('strong');strong.textContent='Réponses acceptées : '+item.answers.map(full).join(' · ');fb.append(strong);$('next').hidden=false;$('next').textContent=index===deck.length-1?'Voir le résultat':'Suivant';$('next').focus();}
function choose(category){if(locked)return;if(types[category]){const panel=$('subchoices');panel.replaceChildren();for(const type of types[category]){const b=document.createElement('button');b.textContent=category==='conjonction'?'Conjonction de '+type:(category==='pronom'?'Pronom ':'')+(category==='déterminant'&&!type.startsWith('article')?'Déterminant ':'')+type;b.dataset.answer=category==='conjonction'?type:category+':'+type;b.addEventListener('click',()=>evaluate(b.dataset.answer));panel.append(b)}panel.hidden=false;panel.querySelector('button')?.focus();return;}evaluate(category);}

const printToggle=$('print-toggle'),printOptions=$('print-options');
printToggle.addEventListener('click',()=>{const show=printOptions.hidden;printOptions.hidden=!show;printToggle.setAttribute('aria-expanded',String(show));});
function printable(corrected){
 if(!deck.length){alert('Commencez une partie pour préparer le PDF.');return;}
 const finished=index>=deck.length;
 const esc=s=>String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
 const rows=deck.map((item,i)=>'<li><span class="term">'+esc(item.word)+'</span>'+(
 corrected?'<div class="answer">Réponse'+(item.answers.length>1?'s':'')+' acceptée'+(item.answers.length>1?'s':'')+' : '+esc(item.answers.map(full).join(' · '))+'</div>':
 '<div class="writing">Nature : ...................................................................</div>')+
 (corrected&&finished&&history[i]?'<div class="student">Votre réponse : '+esc(full(history[i].choice))+' — '+(history[i].ok?'juste':'incorrecte')+'</div>':'')+'</li>').join('');
 const html='<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Natures — '+(corrected?'Exercice corrigé':'Exercice')+'</title><style>@page{size:A4;margin:18mm}body{font-family:Verdana,Arial,sans-serif;color:#222;font-size:11pt}h1{color:#a12758;margin-bottom:4px}h2{font-size:13pt;font-weight:normal;margin-top:0}ol{padding-left:27px}li{padding:10px 0;border-bottom:1px solid #ddd;break-inside:avoid}.term{font-size:14pt;font-weight:bold}.answer,.writing,.student{margin-top:6px;font-size:10pt}.answer{color:#214c72}.student{color:#555}.score{font-weight:bold;margin:14px 0}footer{margin-top:24px;font-size:9pt;color:#777}</style></head><body><h1>Natures</h1><h2>Identifiez la classe grammaticale des mots</h2>'+
 (finished&&corrected?'<p class="score">Résultat : '+score+' / '+deck.length+'</p>':'')+
 '<ol>'+rows+'</ol><footer>© Pierre Lemétayer – 2026</footer></body></html>';
 const win=window.open('','_blank');
 if(!win){alert('Autorisez les fenêtres surgissantes pour imprimer ou enregistrer en PDF.');return;}
 win.document.open();win.document.write(html);win.document.close();win.focus();win.print();
}
$('print-exercise').addEventListener('click',()=>printable(false));
$('print-corrected').addEventListener('click',()=>printable(true));

buttons.forEach(b=>b.addEventListener('click',()=>choose(b.dataset.class)));
$('next').addEventListener('click',()=>{if(index===-1||index>=deck.length){try{deck=build();index=0;score=0;history.length=0;render();}catch(err){console.error(err);$('feedback').textContent='Impossible de préparer la partie. Réessaie.';}return;}if(!answered)return;if(index===deck.length-1){$('word').textContent=score+' / '+deck.length;$('feedback').textContent='Partie terminée !';buttons.forEach(b=>b.disabled=true);$('subchoices').hidden=true;$('progress').textContent='Résultat';$('print-toggle').textContent='Imprimer / PDF — résultat et corrigé';$('next').textContent='Recommencer';$('next').hidden=false;index=deck.length;return;}index++;render();});
$('home').addEventListener('click',e=>{if(index>=0&&index<deck.length&&!confirm('Une partie est en cours. Revenir à l’accueil ?'))e.preventDefault();});
})();