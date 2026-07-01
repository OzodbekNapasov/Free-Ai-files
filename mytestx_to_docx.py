#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
MyTestX (.mtf / .xml) ---> Word (.docx) konvertori.

Bu skript MyTestX dasturining XML formatidagi test faylini o'qib,
savollar va javob variantlarini chop etishga (printer uchun) tayyor
.docx hujjatga aylantiradi.

XUSUSIYATLARI:
  - Hech qanday qo'shimcha kutubxona talab qilmaydi (faqat Python 3 standart kutubxonasi).
  - Savollar tartib raqami bilan, variantlar A) B) C) D) ko'rinishida chiqadi.
  - Ikki xil hujjat tayyorlay oladi:
        1) Talaba uchun  - javoblar belgilanmagan
        2) O'qituvchi uchun (kalit) - to'g'ri javoblar qalin (bold) va (✓) bilan belgilangan

ISHLATISH:
  python mytestx_to_docx.py test.xml
  python mytestx_to_docx.py test.xml -o savollar.docx
  python mytestx_to_docx.py test.xml --answers           # javoblari belgilangan (kalit)
  python mytestx_to_docx.py test.xml -t "Teri kasalliklari testi"
"""

import argparse
import os
import sys
import zipfile
import xml.etree.ElementTree as ET

# --------------------------------------------------------------------------- #
#  XML matnini xavfsiz holatga keltirish (escape)
# --------------------------------------------------------------------------- #
def xml_escape(text):
    if text is None:
        return ""
    return (
        text.replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
        .replace('"', "&quot;")
    )


# --------------------------------------------------------------------------- #
#  MyTestX faylini o'qish va savollarni ajratib olish
# --------------------------------------------------------------------------- #
def parse_mytest(path):
    """
    Fayldan savollar ro'yxatini qaytaradi.
    Har bir savol: {"text": str, "variants": [(matn, is_correct), ...]}
    """
    tree = ET.parse(path)
    root = tree.getroot()

    questions = []
    # Strukturadan qat'iy nazar barcha Task elementlarini topamiz
    for task in root.iter("Task"):
        q_el = task.find("QuestionText")
        if q_el is None:
            continue
        # Savol matni PlainText ichida bo'ladi
        q_text_el = q_el.find("PlainText")
        q_text = (q_text_el.text or "").strip() if q_text_el is not None else ""

        variants = []
        variants_container = task.find("Variants")
        if variants_container is not None:
            for var in variants_container.findall("VariantText"):
                v_text_el = var.find("PlainText")
                v_text = (v_text_el.text or "").strip() if v_text_el is not None else ""
                is_correct = var.get("CorrectAnswer", "False").strip().lower() == "true"
                if v_text:
                    variants.append((v_text, is_correct))

        if q_text:
            questions.append({"text": q_text, "variants": variants})

    return questions


# --------------------------------------------------------------------------- #
#  DOCX yaratish uchun yordamchi funksiyalar (tashqi kutubxonasiz)
# --------------------------------------------------------------------------- #
def make_run(text, bold=False, size_pt=12):
    """Bitta matn bo'lagi (run) uchun XML qaytaradi. size_pt - shrift o'lchami."""
    half_points = int(size_pt * 2)  # Word o'lchamni yarim-punktda saqlaydi
    rpr = "<w:rPr>"
    if bold:
        rpr += "<w:b/>"
    rpr += f'<w:sz w:val="{half_points}"/><w:szCs w:val="{half_points}"/>'
    rpr += "</w:rPr>"
    return (
        f"<w:r>{rpr}"
        f'<w:t xml:space="preserve">{xml_escape(text)}</w:t>'
        f"</w:r>"
    )


def make_paragraph(runs_xml, bold_all=False, size_pt=12, space_after=120, keep_with_next=False):
    """Bir paragraf XML. runs_xml - tayyor run(lar). space_after - punktdan keyingi bo'shliq (twips)."""
    ppr = "<w:pPr>"
    ppr += f'<w:spacing w:after="{space_after}"/>'
    if keep_with_next:
        ppr += "<w:keepNext/>"
    ppr += "</w:pPr>"
    return f"<w:p>{ppr}{runs_xml}</w:p>"


def build_document_xml(questions, title=None, show_answers=False):
    """Barcha savollardan word/document.xml mazmunini quradi."""
    body_parts = []

    # Sarlavha
    if title:
        title_run = make_run(title, bold=True, size_pt=16)
        body_parts.append(
            f'<w:p><w:pPr><w:jc w:val="center"/><w:spacing w:after="240"/></w:pPr>{title_run}</w:p>'
        )

    letters = "ABCDEFGHIJKLMNOP"

    for idx, q in enumerate(questions, start=1):
        # Savol matni (qalin, savol bilan birinchi variant bir sahifada qolsin)
        q_run = make_run(f"{idx}. {q['text']}", bold=True, size_pt=13)
        body_parts.append(
            make_paragraph(q_run, size_pt=13, space_after=60, keep_with_next=True)
        )

        # Variantlar
        for v_idx, (v_text, is_correct) in enumerate(q["variants"]):
            label = letters[v_idx] if v_idx < len(letters) else str(v_idx + 1)
            mark = " (\u2713)" if (show_answers and is_correct) else ""
            bold = show_answers and is_correct
            run = make_run(f"   {label}) {v_text}{mark}", bold=bold, size_pt=12)
            # Oxirgi variantdan keyin biroz kattaroq bo'shliq
            last = v_idx == len(q["variants"]) - 1
            body_parts.append(
                make_paragraph(run, size_pt=12, space_after=160 if last else 40)
            )

    body = "".join(body_parts)

    document_xml = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<w:document '
        'xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">'
        f"<w:body>{body}"
        # Sahifa o'lchami (A4) va chetlardan bo'shliqlar
        '<w:sectPr>'
        '<w:pgSz w:w="11906" w:h="16838"/>'
        '<w:pgMar w:top="1134" w:bottom="1134" w:left="1134" w:right="1134" '
        'w:header="720" w:footer="720" w:gutter="0"/>'
        "</w:sectPr>"
        "</w:body></w:document>"
    )
    return document_xml


def write_docx(document_xml, out_path):
    """Minimal, lekin to'g'ri tuzilgan .docx (ZIP) faylini yozadi."""
    content_types = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">'
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>'
        '<Default Extension="xml" ContentType="application/xml"/>'
        '<Override PartName="/word/document.xml" '
        'ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>'
        "</Types>"
    )

    rels = (
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>'
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">'
        '<Relationship Id="rId1" '
        'Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" '
        'Target="word/document.xml"/>'
        "</Relationships>"
    )

    with zipfile.ZipFile(out_path, "w", zipfile.ZIP_DEFLATED) as z:
        z.writestr("[Content_Types].xml", content_types)
        z.writestr("_rels/.rels", rels)
        z.writestr("word/document.xml", document_xml)


# --------------------------------------------------------------------------- #
#  Asosiy oqim
# --------------------------------------------------------------------------- #
def main():
    parser = argparse.ArgumentParser(
        description="MyTestX XML faylini chop etishga tayyor .docx ga aylantiradi."
    )
    parser.add_argument("input", help="MyTestX XML fayl yo'li")
    parser.add_argument(
        "-o", "--output", help="Natija .docx fayl nomi (kiritilmasa avtomatik)"
    )
    parser.add_argument(
        "-t", "--title", help="Hujjat sarlavhasi (ixtiyoriy)", default=None
    )
    parser.add_argument(
        "--answers",
        action="store_true",
        help="To'g'ri javoblarni belgilab chiqadi (o'qituvchi kaliti)",
    )
    args = parser.parse_args()

    if not os.path.isfile(args.input):
        print(f"Xato: '{args.input}' fayli topilmadi.", file=sys.stderr)
        sys.exit(1)

    try:
        questions = parse_mytest(args.input)
    except ET.ParseError as e:
        print(f"XML o'qishda xato: {e}", file=sys.stderr)
        sys.exit(1)

    if not questions:
        print("Ogohlantirish: faylda hech qanday savol topilmadi.", file=sys.stderr)
        sys.exit(1)

    # Chiqish fayl nomi
    if args.output:
        out_path = args.output
    else:
        base = os.path.splitext(os.path.basename(args.input))[0]
        suffix = "_kalit" if args.answers else "_savollar"
        out_path = f"{base}{suffix}.docx"

    document_xml = build_document_xml(
        questions, title=args.title, show_answers=args.answers
    )
    write_docx(document_xml, out_path)

    total_variants = sum(len(q["variants"]) for q in questions)
    print(f"Tayyor! '{out_path}' yaratildi.")
    print(f"  Savollar soni : {len(questions)}")
    print(f"  Variantlar    : {total_variants}")
    if args.answers:
        print("  Rejim         : O'qituvchi kaliti (to'g'ri javoblar belgilangan)")
    else:
        print("  Rejim         : Talaba varianti (javoblar belgilanmagan)")


if __name__ == "__main__":
    main()
