#!/usr/bin/env python3
"""Préparation AUDITABLE du corpus Natures à partir de Lexique400.tsv.

Usage : python scripts/preparer_corpus.py /chemin/Lexique400.tsv
Ce script produit un inventaire de candidats, PAS un corpus publiable.
La validation des catégories ambiguës et des sous-types reste indispensable.
"""
import csv
import json
import re
import sys
from collections import Counter, defaultdict
from pathlib import Path

FREQUENCY_MIN = 1.0  # seuil de la bande « peu courant » de Lexi Lab
POS = {"NOM": "nom", "ADJ": "adjectif", "ADV": "adverbe", "VER": "verbe"}
SIMPLE_WORD = re.compile(r"^[^\W\d_]+(?:-[^\W\d_]+)*$", re.UNICODE)

def extract(path):
    candidates = defaultdict(set)
    stats = Counter()
    with open(path, encoding="utf-8", newline="") as stream:
        for row in csv.DictReader(stream, delimiter="\t"):
            stats["lignes_source"] += 1
            word = row["1_Mot"].strip().lower()
            pos = row["5_Cgram"].strip()
            if pos not in POS:
                stats["classe_non_couverte"] += 1
                continue
            try:
                freq = float(row["11_FreqOrtho"])
            except (ValueError, TypeError):
                stats["frequence_invalide"] += 1
                continue
            if freq < FREQUENCY_MIN:
                stats["sous_seuil"] += 1
                continue
            if not SIMPLE_WORD.fullmatch(word):
                stats["forme_exclue"] += 1
                continue
            if pos == "VER" and row["9_InfoVER"].strip() != "inf":
                stats["verbe_non_infinitif"] += 1
                continue
            candidates[word].add(POS[pos])
            stats["lignes_retenues"] += 1
    return candidates, stats

def main():
    if len(sys.argv) != 2:
        raise SystemExit("Usage : python scripts/preparer_corpus.py Lexique400.tsv")
    words, stats = extract(sys.argv[1])
    out = Path("corpus-a-verifier.json")
    out.write_text(json.dumps(
        [{"mot": word, "classes_candidates": sorted(classes)}
         for word, classes in sorted(words.items())],
        ensure_ascii=False, indent=2), encoding="utf-8")
    stats["formes_distinctes_candidates"] = len(words)
    stats["formes_ambiguës_candidates"] = sum(len(v)>1 for v in words.values())
    print(json.dumps(stats, ensure_ascii=False, indent=2))
    print(f"Inventaire à vérifier : {out} (ne pas publier directement)")

if __name__ == "__main__":
    main()
