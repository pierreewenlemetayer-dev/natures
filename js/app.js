(()=>{'use strict';
const data=window.NATURES_DATA||[];
const labels={'nom':'Nom','adjectif':'Adjectif','verbe':'Verbe','adverbe':'Adverbe','préposition':'Préposition','coordination':'Conjonction de coordination','subordination':'Conjonction de subordination','interjection':'Interjection','onomatopée':'Onomatopée'};
const types={'conjonction':['coordination','subordination'],'déterminant':['article défini','article indéfini','article partitif','article contracté','possessif','démonstratif','indéfini','interrogatif','exclamatif'],'pronom':['personnel','relatif','possessif','démonstratif','indéfini','interrogatif','adverbial']};
const main=x=>x.split(':')[0];const full=x=>x.includes(':')?(main(x)==='pronom'?'Pronom ':'Déterminant ')+x.split(':')[1]:labels[x]||x;
const $=id=>document.getElementById(id);let deck=[],index=-1,score=0,locked=true,answered=false;const history=[];let part=0;const completed=[];
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
function render(){$('print-results').hidden=true;clear();const item=deck[index];$('word').textContent=item.word;$('progress').textContent='Partie '+part+' · Question '+(index+1)+' / '+deck.length;$('score').textContent='Score : '+score;$('next').hidden=true;locked=false;answered=false;buttons[0]?.focus();}
function evaluate(choice){if(locked)return;locked=true;answered=true;const item=deck[index];const ok=item.answers.includes(choice);if(ok)score++;history[index]={choice,ok};buttons.forEach(b=>{b.disabled=true;if(item.answers.some(a=>b.dataset.class==='conjonction'?['coordination','subordination'].includes(a):main(a)===b.dataset.class))b.classList.add('correct');if((b.dataset.class==='conjonction'?['coordination','subordination'].includes(choice):b.dataset.class===main(choice))&&!ok)b.classList.add('wrong')});document.querySelectorAll('#subchoices button').forEach(b=>{b.disabled=true;if(item.answers.includes(b.dataset.answer))b.classList.add('correct');if(b.dataset.answer===choice&&!ok)b.classList.add('wrong')});$('score').textContent='Score : '+score;const fb=$('feedback');fb.textContent=ok?'Bonne réponse ! ':'Ce n’est pas la bonne réponse. ';const strong=document.createElement('strong');strong.textContent='Réponses acceptées : '+item.answers.map(full).join(' · ');fb.append(strong);$('next').hidden=false;$('next').textContent=index===deck.length-1?'Voir le résultat':'Suivant';$('next').focus();}
function choose(category){if(locked)return;if(types[category]){const panel=$('subchoices');panel.replaceChildren();for(const type of types[category]){const b=document.createElement('button');b.textContent=category==='conjonction'?'Conjonction de '+type:(category==='pronom'?'Pronom ':'')+(category==='déterminant'&&!type.startsWith('article')?'Déterminant ':'')+type;b.dataset.answer=category==='conjonction'?type:category+':'+type;b.addEventListener('click',()=>evaluate(b.dataset.answer));panel.append(b)}panel.hidden=false;panel.querySelector('button')?.focus();return;}evaluate(category);}

const printToggle=$('print-toggle'),printOptions=$('print-options');
printToggle.addEventListener('click',()=>{const show=printOptions.hidden;printOptions.hidden=!show;printToggle.setAttribute('aria-expanded',String(show));});
function escapeHTML(s){return String(s).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function openPrint(title,body){
 const html='<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>'+escapeHTML(title)+'</title><style>'+
 '@page{size:A4;margin:14mm}*{box-sizing:border-box}body{font:10pt Verdana,Arial,sans-serif;color:#222;margin:0}h1{font-size:20pt;color:#243f78;margin:0 0 3mm}h2{font-size:12pt;color:#243f78;margin:0 0 5mm}.meta{margin:0 0 4mm}.sheet{break-after:page;page-break-after:always}.sheet:last-of-type{break-after:auto;page-break-after:auto}ol{margin:0;padding-left:8mm}li{padding:3mm 0;border-bottom:1px solid #ddd;break-inside:avoid}.term{font-weight:bold;font-size:12pt}.writing{margin-top:3mm;color:#666}.correction{font-size:10pt;line-height:1.45}.correction li{padding:2mm 0}.answer{color:#243f78}.student{color:#555;font-size:9pt;margin-top:1mm}.part{break-inside:avoid;margin:0 0 4mm}.part h2{font-size:12pt;margin:0 0 2mm}.part ol{font-size:9pt}.part li{padding:1.1mm 0;line-height:1.3}.part .term{font-size:9pt}.part .answer{font-size:8.5pt}.part .student{font-size:8pt}.part .score{font-size:10pt;font-weight:bold;margin:0 0 2mm}footer{margin-top:5mm;font-size:8pt;color:#777}@media print{.sheet{min-height:260mm}}'+
 '</style></head><body>'+body+'</body></html>';
 const win=window.open('','_blank');
 if(!win){alert('Autorisez les fenêtres surgissantes pour imprimer ou enregistrer en PDF.');return;}
 win.document.open();win.document.write(html);win.document.close();win.focus();win.print();
}
function printExercise(corrected){
 let items;try{items=build();}catch(err){console.error(err);alert('Impossible de préparer un exercice.');return;}
 const heading='<h1>Natures</h1><h2>Identifiez la classe grammaticale des mots</h2>';
 const questions='<section class="sheet">'+heading+'<p class="meta">Nom : ........................................... Classe : ................ Date : ................</p><ol>'+items.map(item=>'<li><span class="term">'+escapeHTML(item.word)+'</span><div class="writing">Nature : ...................................................................................................</div></li>').join('')+'</ol><footer>© Pierre Lemétayer – 2026</footer></section>';
 const answers=corrected?'<section class="sheet">'+heading+'<h2>Corrigé</h2><ol class="correction">'+items.map(item=>'<li><span class="term">'+escapeHTML(item.word)+'</span><div class="answer">'+escapeHTML(item.answers.map(full).join(' · '))+'</div></li>').join('')+'</ol><footer>© Pierre Lemétayer – 2026</footer></section>':'';
 openPrint('Natures — Exercice'+(corrected?' et corrigé':''),questions+answers);
}
function printResults(){
 if(!completed.length)return;
 const heading='<h1>Natures</h1><h2>Résultats et corrigés</h2>';
 const pages=completed.map(p=>'<section class="part"><h2>Partie '+p.number+'</h2><p class="score">Score : '+p.score+' / '+p.items.length+'</p><ol>'+p.items.map((item,i)=>'<li><span class="term">'+escapeHTML(item.word)+'</span> — <span class="answer">'+escapeHTML(item.answers.map(full).join(' · '))+'</span><div class="student">Votre réponse : '+escapeHTML(full(p.answers[i].choice))+' — '+(p.answers[i].ok?'juste':'incorrecte')+'</div></li>').join('')+'</ol></section>').join('');
 openPrint('Natures — Mes résultats',heading+pages+'<footer>© Pierre Lemétayer – 2026</footer>');
}

$('print-exercise').addEventListener('click',()=>printExercise(false));
$('print-corrected').addEventListener('click',()=>printExercise(true));

$('print-results').addEventListener('click',printResults);
buttons.forEach(b=>b.addEventListener('click',()=>choose(b.dataset.class)));
$('next').addEventListener('click',()=>{if(index===-1||index>=deck.length){try{deck=build();part++;index=0;score=0;history.length=0;render();}catch(err){console.error(err);$('feedback').textContent='Impossible de préparer la partie. Réessaie.';}return;}if(!answered)return;if(index===deck.length-1){$('word').textContent=score+' / '+deck.length;$('feedback').textContent='Partie terminée !';buttons.forEach(b=>b.disabled=true);$('subchoices').hidden=true;$('progress').textContent='Partie '+part;$('print-results').hidden=false;completed.push({number:part,score,items:deck.map(item=>({...item,answers:[...item.answers]})),answers:history.map(x=>({...x}))});$('next').textContent='Recommencer';$('next').hidden=false;index=deck.length;return;}index++;render();});
$('home').addEventListener('click',e=>{if(index>=0&&index<deck.length&&!confirm('Une partie est en cours. Revenir à l’accueil ?'))e.preventDefault();});
})();