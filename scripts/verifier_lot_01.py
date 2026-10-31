#!/usr/bin/env python3
"""Contrôle de cohérence du lot 01 (80 mots), sans publication."""
import json
from collections import Counter
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
def read(path):
    return json.loads((ROOT / path).read_text(encoding="utf-8"))

def main():
    base = dict(read("data/corpus-pilote-arbitre-a-verifier.json"))
    initial = dict(read("data/lot-lexique4-01-a-verifier.json"))
    review = read("data/lot-lexique4-01-revue.json")
    assert len(base) == 188 and len(initial) == 80
    assert not (set(base) & set(initial)), "Des doublons existent avec le pilote"
    assert len(review) == 80 and {r["mot"] for r in review} == set(initial)
    assert len({r["mot"] for r in review}) == 80
    arbitrages = {"possible": ["adjectif"], "encore": ["adverbe"], "enfin": ["adverbe", "interjection"], "tard": ["adverbe", "nom"]}
    flagged = {"génial", "bizarre", "libre", "vraie", "exact", "triste", "loin", "presque"}
    for row in review:
        word = row["mot"]
        assert row["classes_proposees"] and len(set(row["classes_proposees"])) == len(row["classes_proposees"])
        if word in arbitrages:
            assert row["statut"] == "arbitrage_valide"
            assert row["classes_proposees"] == arbitrages[word]
        else:
            assert row["classes_proposees"] == initial[word]
            expected = "controle_complementaire" if word in flagged else "controle_initial_sans_alerte"
            assert row["statut"] == expected, word
    counts = Counter(row["statut"] for row in review)
    assert counts == {"arbitrage_valide": 4, "controle_complementaire": 8, "controle_initial_sans_alerte": 68}
    print(json.dumps({"base": len(base), "lot": len(initial), "statuts": dict(counts), "publication": False}, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
