#!/usr/bin/env python3
"""Vérification du corpus élargi 01 ; ne modifie aucun fichier public."""
import json
from collections import Counter
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def read(path): return json.loads((ROOT/path).read_text(encoding="utf-8"))
def main():
    base=dict(read("data/corpus-pilote-arbitre-a-verifier.json"))
    review=read("data/lot-lexique4-01-revue.json")
    expanded=read("data/corpus-elargi-01-a-tester.json")
    decisions=read("data/arbitrages-valides.json")
    assert len(base)==188 and len(review)==80 and len(expanded)==268 and len(decisions)==50
    words=dict(expanded)
    assert len(words)==268, "Formes dupliquées"
    assert all(isinstance(w,str) and w and isinstance(c,list) and c and len(c)==len(set(c)) for w,c in expanded)
    assert all(words[w]==c for w,c in decisions.items()), "Arbitrages du corpus pilote non respectés"
    assert all(words[w]==c for w,c in base.items()), "Corpus pilote altéré"
    assert words["son"] == ["déterminant:possessif", "nom"], "Deux natures de son manquantes"
    assert all(words[r["mot"]]==r["classes_proposees"] for r in review), "Lot 01 altéré"
    assert not set(base).intersection(r["mot"] for r in review)
    assert Counter(r["statut"] for r in review)=={"arbitrage_valide":12,"revue_grammaticale_interne":68}
    print(json.dumps({"corpus_elargi":len(words),"arbitrages_pilote":len(decisions),"arbitrages_lot01":12,"lot01_revue_interne":68,"publication":False},ensure_ascii=False,indent=2))
if __name__=="__main__": main()
