#!/usr/bin/env python3
"""Fusion prudente des analyses validées et du corpus pilote, hors production.

Usage : python scripts/fusionner_arbitrages.py
Produit corpus-pilote-arbitre-a-verifier.json, sans toucher à js/data.js.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "js/data.js"
DECISIONS = ROOT / "data/arbitrages-valides.json"
OUTPUT = ROOT / "corpus-pilote-arbitre-a-verifier.json"

def main():
    raw = SOURCE.read_text(encoding="utf-8")
    match = re.search(r"window\.NATURES_DATA\s*=\s*(\[.*\])\s*;", raw, re.S)
    if not match:
        raise ValueError("Format du corpus pilote non reconnu")
    entries = json.loads(match.group(1))
    words = {}
    for word, classes in entries:
        if word in words:
            raise ValueError(f"Doublon pilote : {word}")
        words[word] = classes
    overrides = json.loads(DECISIONS.read_text(encoding="utf-8"))
    changed = []
    added = []
    for word, classes in overrides.items():
        if word in words:
            if set(words[word]) != set(classes):
                changed.append(word)
        else:
            added.append(word)
        words[word] = classes
    OUTPUT.write_text(json.dumps([[w, c] for w, c in sorted(words.items())], ensure_ascii=False, indent=2)+"\n", encoding="utf-8")
    print(json.dumps({"pilot_initial":len(entries),"arbitrages":len(overrides),"corriges":len(changed),"ajoutes":len(added),"total_a_verifier":len(words),"mots_corriges":changed,"mots_ajoutes":added},ensure_ascii=False,indent=2))
    print("Résultat de contrôle uniquement : ",OUTPUT)

if __name__ == "__main__":
    main()
