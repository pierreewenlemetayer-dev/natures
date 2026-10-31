#!/usr/bin/env node
/* Test hors navigateur de la logique de tirage du jeu avec le corpus élargi.
   Usage : node scripts/test_moteur_corpus_01.js
   Aucune écriture dans les fichiers de production. */
const fs = require('node:fs');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const corpus = JSON.parse(fs.readFileSync(path.join(root,'data/corpus-elargi-01-a-tester.json'),'utf8'));
const app = fs.readFileSync(path.join(root,'js/app.js'),'utf8');
const names = ['nom','adjectif','verbe','adverbe','préposition','coordination','subordination','déterminant','pronom','interjection','onomatopée'];
const main = x => x.split(':')[0];
const closed = new Set(['préposition','coordination','subordination','déterminant','pronom']);
const source = app.match(/function build\(\)\{[\s\S]*?\n\}/);
assert(source, 'Fonction build() introuvable');
const sample = vm.runInNewContext(
  `(function(data, random){const main=x=>x.split(':')[0];${source[0]};return build();})`,
  {Math,Error,Set}
);
let trials=2000;
const seen = new Set();
const classes = Object.fromEntries(names.map(x=>[x,0]));
for(let i=0;i<trials;i++){
  const deck = sample(corpus, a => {
    for(let k=a.length-1;k>0;k--){const j=Math.floor(Math.random()*(k+1));[a[k],a[j]]=[a[j],a[k]]}
    return a;
  });
  assert.equal(deck.length,10);
  assert.equal(new Set(deck.map(x=>x.word)).size,10,'Mot répété dans une partie');
  const counts={};
  for(const item of deck){
    assert(names.includes(item.category),'Classe cible inconnue');
    assert(item.answers.some(x=>main(x)===item.category),'Classe cible non acceptée');
    counts[item.category]=(counts[item.category]||0)+1;
    seen.add(item.word);
    classes[item.category]++;
  }
  assert(Object.values(counts).every(x=>x<=2),'Plus de deux questions de même classe');
  assert.equal(counts.nom,2,'Deux noms attendus');
  assert(deck.filter(x=>closed.has(x.category)).length>=2,'Au moins deux classes fermées attendues');
  assert(deck.some(x=>x.category==='nom'&&x.answers.length===1&&x.answers[0]==='nom'),'Nom non ambigu absent');
}
const report={corpus:corpus.length,parties_testees:trials,mots_vus:seen.size,repartition_cibles:classes,publication:false};
console.log(JSON.stringify(report,null,2));
