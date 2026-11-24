const raw = $json.choices?.[0]?.message?.content ?? '';
const src = $('Normalize Invoice Text').item.json;
let o; try { o = JSON.parse(raw); } catch (e) { o = null; }
const num = v => (v === null || v === undefined || v === '' || isNaN(Number(v))) ? null : Number(v);
if (!o) return [{ json: { file: src.file, status: 'NEEDS REVIEW', note: 'AI output unreadable', vendor: '', invoice_number: '', invoice_date: '', currency: '', subtotal: null, tax: null, total: null } }];
const r = { file: src.file, vendor: o.vendor || '', invoice_number: o.invoice_number || '', invoice_date: o.invoice_date || '', currency: o.currency || '', subtotal: num(o.subtotal), tax: num(o.tax), total: num(o.total) };
let status = 'OK', note = '';
if (r.total === null) { status = 'NEEDS REVIEW'; note = 'no total found'; }
else if (r.subtotal !== null && r.tax !== null && Math.abs(r.subtotal + r.tax - r.total) > 0.02) { status = 'NEEDS REVIEW'; note = 'subtotal + tax does not equal total'; }
return [{ json: { ...r, status, note } }];
