# Invoice Extractor: PDF Email to Google Sheet (n8n + Groq)

Watches Gmail for emails with a PDF invoice, extracts the text, asks Groq for structured fields (vendor, number, date, currency, subtotal, tax, total) and appends a row to Google Sheets. Rows that look wrong are marked `NEEDS REVIEW`.

## Flow
Gmail Trigger (PDF attachments) > Extract PDF Text > Normalize > Groq > Parse + Validate > Sheets append

## Setup
1. Import `workflow.json`. Add Gmail, Google Sheets and Groq credential (free API key).
2. Sheet columns: file, vendor, invoice_number, invoice_date, currency, subtotal, tax, total, status, note.
3. Test with a dummy invoice PDF you made yourself.

## Checks built in
- Missing total, or subtotal + tax not equal to total: status `NEEDS REVIEW` with a note.
- Unreadable model output: row logged as `NEEDS REVIEW`, nothing is lost.
- Prompt says never to guess numbers, unknown fields are null.

## Limits (honest)
- Text-based PDFs only. Scanned invoices need OCR, not included.
- The attachment property name (`attachment_0`) may differ by Gmail trigger settings, check it on first test.

## Status
Tested on n8n cloud (Nov 25 2026) in a throwaway copy with dummy invoice text: vendor, number, date, currency, subtotal 100, tax 14, total 114 extracted correctly and status OK. Gmail trigger, PDF extraction and Sheets append were replaced or disabled in the test, so they are untested. Model: openai/gpt-oss-20b on Groq (Llama models on Groq now require an enterprise plan). Credentials and IDs are blank placeholders.
