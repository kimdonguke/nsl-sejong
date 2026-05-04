"""One-shot script: classify each conference entry as 국외/국내 by matching
the `conference` field against a list of organizer keywords.
Run: python scripts/categorize_conferences.py
"""
from pathlib import Path
import re

YAML_PATH = Path("data/publications/conferences.yml")

INTL_KEYS = [
    "institute of navigation",
    "institute of navagation",  # typo variant present in data
    "(ion)",
    "apisat",
    "icmic",
    "american astronautical",
    "rtcm",
    "european navigation",
    "ieee",
    "isgnss",
    "plans",
]
DOM_KEYS = [
    "항법시스템학회",
    "한국위성항법시스템",
    "한국항공우주학회",
    "한국항공우주공학회",
    "항공우주학회",
    "한국항행학회",
    "한국통신학회",
    "통신학회",
    "항공우주시스템공학회",
    "한국항해항만학회",
    "대한토목학회",
    "ksce",
    "한국국방기술학회",
    "koni",
]


def classify(conference: str) -> str | None:
    low = conference.lower()
    for k in INTL_KEYS:
        if k in low:
            return "국외"
    for k in DOM_KEYS:
        if k.lower() in low:
            return "국내"
    return None


def main() -> None:
    text = YAML_PATH.read_text(encoding="utf-8")
    pattern = re.compile(r"(- topic:.*?\n  scope:) null", flags=re.DOTALL)
    unclassified: list[str] = []

    def repl(match: re.Match[str]) -> str:
        block = match.group(0)
        # Capture conference value including continuation lines (indented more
        # than the key) up to the next field on its own indented line.
        conf_match = re.search(
            r"^  conference:[ \t]*([\s\S]*?)(?=\n  (?:date|scope):)",
            block,
            flags=re.MULTILINE,
        )
        if not conf_match:
            return block
        conf = " ".join(conf_match.group(1).split()).strip("'\"")
        scope = classify(conf)
        if scope is None:
            unclassified.append(conf)
            return block
        return f'{match.group(1)} "{scope}"'

    new_text = pattern.sub(repl, text)
    YAML_PATH.write_text(new_text, encoding="utf-8")

    intl = new_text.count('scope: "국외"')
    dom = new_text.count('scope: "국내"')
    null = new_text.count("scope: null")
    print(f"국외: {intl}  국내: {dom}  미분류(null 유지): {null}")
    if unclassified:
        print("\n미분류 conference 목록:")
        for c in sorted(set(unclassified)):
            print(f"  - {c}")


if __name__ == "__main__":
    main()
