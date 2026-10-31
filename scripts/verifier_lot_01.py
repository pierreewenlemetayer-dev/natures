#!/usr/bin/env python3
"""Contrôle des 80 candidats : les arbitrages de revue priment sur les propositions initiales."""
import json
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
def read(p): return json.loads((ROOT/p).read_text(encoding="utf-8"))
def main():
    base=dict(read("data/corpus-pilote-arbitre-a-verifier.json"))
    initial=dict(read("data/lot-lexique4-01-a-verifier.json"))
    review=read("data/lot-lexique4-01-revue.json")
    assert len(base)==188 and len(initial)==80
    assert not set(base)&set(initial)
    assert len(review)==80 and {r["mot"] for r in review}==set(initial)
    assert len({r["mot"] for r in review})==80
    validated={"possible":["adjectif"],"encore":["adverbe"],"enfin":["adverbe","interjection"],"tard":["adverbe","nom"]}
    for row in review:
        word=row["mot"]
        assert row["classes_proposees"] and len(set(row["classes_proposees"]))==len(row["classes_proposees"])
        if word in validated:
            assert row["statut"]=="arbitrage_valide" and row["classes_proposees"]==validated[word]
        else:
            assert row["statut"]=="préselection_a_confirmer"
            assert row["classes_proposees"]==initial[word]
    print(json.dumps({"base":188,"lot":80,"arbitrages_valides":4,"restent_a_confirmer":76,"site_public_modifie":False},ensure_ascii=False))
if __name__=="__main__": main()
