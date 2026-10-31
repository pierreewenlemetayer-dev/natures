#!/usr/bin/env python3
"""Contrôles reproductibles des arbitrages Natures, sans publication.

Usage: python scripts/verifier_arbitrages.py [chemin/Lexique400.tsv]
La vérification lexicale est facultative ; elle n'ajoute aucune classification.
"""
import csv
import json
import re
import sys
from collections import defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DECISIONS = ROOT / "data/arbitrages-valides.json"
PILOT = ROOT / "js/data.js"
OPEN_POS = {"NOM": "nom", "ADJ": "adjectif", "ADV": "adverbe", "VER": "verbe", "AUX": "verbe"}
VALID = {"nom", "adjectif", "adverbe", "verbe", "préposition", "coordination", "subordination", "interjection", "onomatopée"}
VALID |= {f"déterminant:{x}" for x in ("article défini","article indéfini","article partitif","article contracté","possessif","démonstratif","indéfini","interrogatif","exclamatif")}
VALID |= {f"pronom:{x}" for x in ("personnel","relatif","possessif","démonstratif","indéfini","interrogatif","adverbial")}

def read_pilot():
    raw = PILOT.read_text(encoding="utf-8")
    match = re.search(r"window\.NATURES_DATA\s*=\s*(\[.*\])\s*;", raw, re.S)
    if not match:
        raise AssertionError("Format du corpus pilote inconnu")
    return dict(json.loads(match.group(1)))

def audit_tsv(path):
    candidates = defaultdict(set)
    counts = defaultdict(int)
    with open(path, encoding="utf-8", newline="") as handle:
        for row in csv.DictReader(handle, delimiter="\t"):
            counts["source"] += 1
            pos = row["5_Cgram"].strip()
            if pos not in OPEN_POS:
                continue
            word = row["1_Mot"].strip().lower()
            try:
                form_freq = float(row["11_FreqOrtho"])
                analysis_freq = float(row["10_FreqMot"])
            except (ValueError, TypeError):
                continue
            if form_freq < 1 or analysis_freq < 1:
                continue
            if not re.fullmatch(r"[^\W\d_]+(?:-[^\W\d_]+)*", word) or len(word) < 2:
                continue
            if pos in ("VER", "AUX") and "inf" not in row["9_InfoVER"].split(","):
                continue
            candidates[word].add(OPEN_POS[pos])
            counts["analyses"] += 1
    counts["formes"] = len(candidates)
    counts["ambiguës"] = sum(len(v) > 1 for v in candidates.values())
    return candidates, dict(counts)

def main():
    decisions = json.loads(DECISIONS.read_text(encoding="utf-8"))
    assert len(decisions) == 50, f"50 arbitrages attendus, {len(decisions)} trouvés"
    assert len(decisions) == len(set(decisions))
    for word, classes in decisions.items():
        assert classes and len(classes) == len(set(classes)), f"Doublon ou vide : {word}"
        assert set(classes) <= VALID, f"Classe non prise en charge : {word}"
    pilot = read_pilot()
    merged = dict(pilot)
    merged.update(decisions)  # remplacement intégral, jamais union pour ces 50 mots
    assert all(merged[w] == classes for w, classes in decisions.items())
    result = {"arbitrages": len(decisions), "pilote": len(pilot), "pilote_après_arbitrages": len(merged), "modifiés": sum(w in pilot and set(pilot[w]) != set(classes) for w, classes in decisions.items()), "ajoutés": sum(w not in pilot for w in decisions)}
    if len(sys.argv) > 1:
        candidates, stats = audit_tsv(sys.argv[1])
        result["lexique4"] = stats
        result["conflits_lexique4_sur_arbitrages"] = {w: sorted(classes) for w, classes in candidates.items() if w in decisions and not classes.issubset(set(decisions[w]))}
    print(json.dumps(result, ensure_ascii=False, indent=2))
    print("VALIDATION STRUCTURELLE OK — aucune publication.")

if __name__ == "__main__":
    main()
