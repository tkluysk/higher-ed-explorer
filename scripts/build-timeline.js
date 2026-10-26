/* Timeline page generator — see SKILL.md.
 *
 * Replace load() with your own record source and set the four constants below. Everything else
 * is reusable as-is. Output is one self-contained HTML string: no assets, no build, no runtime deps.
 */
/* Copied from the `timeline` skill (claude-profile-switcher shared/skills/timeline/reference/timeline.js).
   Run: node scripts/build-timeline.js   (writes timeline.html, then checks it with check.py if present).
   Records live in data/milestones.json. Dates for 2027–28 are projected from the 2026 cycle (marked est.). */
const TITLE = 'Road to uni — 2028 start';
const SUBTITLE = 'Application, housing and enrolment milestones for a Semester 1 2028 start';
const FOOTER = 'Built from <code>data/milestones.json</code>. Dates marked est. are projected from the 2026 VTAC and university cycles; confirm each as it is published. Sources: the Swinburne (28 Sep 2026) and UniMelb (2 Oct 2026) interviews, vtac.edu.au, NZQA, university pages and the UniMelb Calculus and Probability Online page.';
/* The headline countdown comes from whichever record carries target: true — see load(). */

/* REPLACE: return an array of records. See the comment in timelinePage(). */
function load() {
  return JSON.parse(require('fs').readFileSync(require('path').join(__dirname, '..', 'data', 'milestones.json'), 'utf8'));
}

/* A self-contained timeline page. Dates are rendered with countdowns computed in the viewer's
   browser at view time — nothing on it can freeze.

   Two views of one dataset, stacked. A horizontal minimap at the top puts every milestone on a TIME axis, so the
   shape of the programme — the gaps, the clusters, how close Dimensions is — is visible at a glance. Below it the
   vertical list carries the detail, two columns against a centre spine: side: plan on the left (what is committed
   and when), side: achieved on the right (what is built). A record with no side is a plan milestone.
   The minimap is sticky and tracks the list as it scrolls. */
function timelinePage() {
  /* ---- REPLACE THIS with however your project loads records. ----------------------------------
     Each record needs: date (ISO YYYY-MM-DD) and title. Optional: body, owner, stream (a LANE key),
     done (boolean), side ('plan' | 'achieved'), seq (tiebreak for same-day ordering). */
  const items = load()
    .filter(i => i.date).sort((a, b) => a.date.localeCompare(b.date) || (a.seq || 0) - (b.seq || 0));
  const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;');
  /* Bodies are authored as markdown in the YAML. Only three inline forms are honoured — link, bold, italic —
     and the text is escaped first, so a body cannot inject markup. Relative links are dropped to their text:
     they point at repo files the reader cannot open. */
  const md = s => esc(s)
    .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, (_, t, u) => `<a href="${u}" target="_blank" rel="noopener">${t}</a>`)
    .replace(/\[([^\]]+)\]\([^)\s]*\)/g, '$1')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
  /* REPLACE: one entry per workstream — key, label, colour. */
  const LANE = {
    apply: ['Application', '#2a78d6'], housing: ['Housing', '#eb6834'], prep: ['Preparation', '#1baf7a'],
    visit: ['Visits & info', '#4a3aa7'], fees: ['Enrolment & fees', '#c98500'],
  };
  const NONE = ['', '#6b7280'];                       // unknown stream degrades, never throws
  const lane = k => LANE[k] || NONE;
  const lanes = [...new Set(items.map(i => i.stream).filter(k => k && LANE[k]))];
  const stamp = new Date().toLocaleDateString('en-CA', { timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone });
  /* The one milestone everything is paced against. Taken from the record (target: true), never
     hard-coded — the countdown used to name a literal date, which would have gone quietly wrong
     the day the date moved. */
  const target = items.find(i => i.target) || null;

  /* ---- minimap geometry, computed from the data ----------------------------------------------
     The axis spans first milestone to last. Positions are percentages so the rail is resolution-
     independent and needs no measurement at render time. Everything here is derived: the old
     hand-maintained board drifted because each tick's left% was authored by hand (Tom, 2026-09-02). */
  const ds = items.map(i => Date.parse(i.date + 'T00:00:00Z')).sort((a, b) => a - b);
  const t0 = ds[0];
  /* A far-future milestone (GTC is 3.5 months past Dimensions) would squeeze the 90-day sprint
     into a third of the rail and leave the rest empty. So the axis is scaled to the body of the
     programme and anything beyond it pins to the right edge behind a break marker: the outlier
     stays visible without setting the scale for everything that matters. A gap counts as a break
     when it exceeds a third of the span it would create. */
  const inlier = ds.reduce((keep, d, n) => n && (d - ds[n - 1]) > (d - t0) / 3 ? keep : d, ds[0]);
  const BREAK = inlier < ds[ds.length - 1];
  const t1 = inlier, span = Math.max(t1 - t0, 864e5);
  const AX = BREAK ? 94 : 100;   // leave the last 6% for the pinned outliers
  const pct = ms => ms > t1 ? 100 : ((ms - t0) / span * AX);
  /* Same-day milestones must not be nudged sideways — the axis is time, so a nudge would lie.
     They fan VERTICALLY instead: --i is the index within that day's cluster. */
  const seen = Object.create(null);
  const ticks = items.map(i => {
    const ms = Date.parse(i.date + 'T00:00:00Z'), p = pct(ms);
    const k = i.date, n = (seen[k] = (seen[k] || 0) + 1) - 1;
    const [name, col] = lane(i.stream);
    const done = i.done ? ' is-done' : '';
    /* The target is a line across the rail, not a dot among dots: it is the thing every other
       tick is positioned relative to, so it has to be findable without reading any labels. */
    if (i.target) return `<span class="tgt" style="left:${p.toFixed(3)}%" data-d="${i.date}" data-p="${p.toFixed(3)}" title="${esc(i.title)} — ${i.date}"><b></b></span>`;
    return `<span class="tk${done}" style="left:${p.toFixed(3)}%;--i:${n};--c:${col}" data-d="${i.date}" data-p="${p.toFixed(3)}" title="${esc(i.title)} — ${i.date}"></span>`;
  }).join('');
  /* Month gridlines: a tick position is unreadable without something to read it against. */
  const months = [], labels = [];
  for (let d = new Date(t0); d.getTime() <= t1; d.setUTCMonth(d.getUTCMonth() + 1)) {   // labels stop at the break
    const m = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), 1);
    if (m > t0 && m < t1) months.push(`<span class="gl" style="left:${pct(m).toFixed(3)}%"></span>`);
    /* Local change: when the first milestone falls late in a month, its label and the next
       month's overlap — keep the later one. */
    const lp = pct(Math.max(m, t0));
    if (labels.length && lp - labels[labels.length - 1].p < 3) labels.pop();
    labels.push({ p: lp, html: `<span class="ml" style="left:${lp.toFixed(3)}%">${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][d.getUTCMonth()]}</span>` });
  }
  months.push(...labels.map(l => l.html));

  const li = i => { const [name, col] = lane(i.stream);
    const won = i.side === 'achieved';
    return `<li class="ev ${won ? 'right' : 'left'}${i.done ? ' done' : ' open'}${i.target ? ' target' : ''}" data-s="${i.stream || ''}" data-p="${pct(Date.parse(i.date + 'T00:00:00Z')).toFixed(3)}" style="--c:${col}">
      <div class="card">${i.target ? '<div class="tflag">The deadline</div>' : ''}<div class="top">${name ? `<span class="lane">${name}</span>` : ''}${i.owner ? `<span class="own">${esc(i.owner)}</span>` : ''}</div>
        <h3>${esc(i.title)}</h3>${i.body ? `<p>${md(i.body)}</p>` : ''}</div>
      <div class="dot"></div>
      <div class="when"><time datetime="${i.date}">${i.date}</time><span class="rel" data-d="${i.date}"></span></div></li>`; };
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>${TITLE}</title><style>
:root{--ink:#161a22;--ink2:#4a5566;--ink3:#8792a3;--rule:#e4e7ec;--rule2:#eef0f3;--bg:#fff;--soft:#f7f8fa;--crit:#c2410c;--tgt:#b31166}
@media(prefers-color-scheme:dark){:root{--ink:#e8ebf0;--ink2:#a3aebf;--ink3:#76818f;--rule:#242a35;--rule2:#1b2029;--bg:#0e1117;--soft:#161b24;--crit:#fb923c;--tgt:#f472b6}}
*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--ink);font:15px/1.55 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
main{max-width:1120px;margin:0 auto;padding:0 22px 70px}
.hd{position:sticky;top:48px;z-index:5;background:var(--bg);padding:26px 0 0}
h1{font-size:27px;margin:0 0 4px;letter-spacing:-.02em}.sub{color:var(--ink3);font-size:13px;margin-bottom:14px}.sub a,footer a{color:var(--ink2)}
.bar{display:flex;gap:14px;flex-wrap:wrap;padding:12px 0;border-top:1px solid var(--rule);font-size:12px;color:var(--ink2)}
.key{display:flex;align-items:center;gap:6px}.key i{width:9px;height:9px;border-radius:50%;display:inline-block}
.cd{margin-left:auto;font-weight:720;font-size:13px;color:var(--bg);background:var(--tgt);
     padding:3px 10px;border-radius:999px;letter-spacing:.01em}
.cd:empty{display:none}
/* ---- the minimap ------------------------------------------------------------------------
   Month labels sit ABOVE the rail, never inside it: in the rail they competed with the ticks
   for the same strip of pixels and a label landed on top of a dot. */
.mm{padding:2px 0 10px}
.axis{position:relative;height:13px}
.ml{position:absolute;top:0;font-size:9.5px;letter-spacing:.06em;text-transform:uppercase;color:var(--ink3);transform:translateX(2px)}
.rail{position:relative;height:26px;background:var(--soft);border-radius:4px;overflow:hidden}
/* ⚠️ Explicit layers. Children were otherwise painted in source order, and the elapsed band
   covered every tick before today — a milestone simply vanished from the rail. */
.elapsed{position:absolute;top:0;bottom:0;left:0;background:color-mix(in srgb,var(--ink) 5%,transparent);z-index:0;pointer-events:none}
.gl{position:absolute;top:0;bottom:0;width:1px;background:var(--rule2);z-index:0}
.scroller{position:absolute;top:0;bottom:0;background:color-mix(in srgb,var(--ink) 8%,transparent);border-left:1.5px solid var(--ink);border-right:1.5px solid var(--ink);z-index:3;pointer-events:none;transition:left .12s linear,width .12s linear}
.nowl{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background:var(--crit);z-index:4;pointer-events:none}
/* Same-day milestones fan upward by --i rather than shifting along the axis, so horizontal
   position stays honest and a busy day reads as a taller column. */
.tk{position:absolute;width:7px;height:7px;border-radius:50%;margin-left:-3.5px;background:var(--c);z-index:2;cursor:pointer;
    top:calc(15px - (var(--i,0) * 6px));transition:transform .15s}
.tk:hover{transform:scale(2);z-index:5}
/* The axis break: a hatched seam, so the jump in scale is visible rather than implied. */
.brk{position:absolute;top:0;bottom:0;width:7px;margin-left:-3.5px;z-index:1;
     background:repeating-linear-gradient(135deg,transparent 0 2px,var(--rule) 2px 3px)}
.tk.is-done{background:var(--bg);box-shadow:inset 0 0 0 2px var(--c);opacity:.55}
.tk.on{transform:scale(1.7)}
/* The target milestone on the rail: a full-height marker with a flag head, so the deadline is
   the one thing you can find on the minimap without hovering anything. */
.tgt{position:absolute;top:0;bottom:0;width:2px;margin-left:-1px;background:var(--tgt);z-index:4;cursor:pointer}
.tgt b{position:absolute;top:0;left:-4px;width:10px;height:10px;border-radius:2px;background:var(--tgt);
       box-shadow:0 0 0 2px var(--bg)}
ul{list-style:none;padding:0;margin:0;position:relative}
/* One unbroken line down the centre column, behind every dot. Drawn on the list, not per row:
   a row's dot cell is only as tall as the dot, so per-row segments leave gaps between rows.
   The grid is symmetric (1fr 150px 1fr), so the spine column's centre is the list's 50%. */
ul::before{content:"";position:absolute;top:18px;bottom:0;left:50%;width:2px;transform:translateX(-50%);background:var(--rule)}
.heads{display:grid;grid-template-columns:1fr 150px 1fr;gap:0 10px;padding:4px 0 8px;border-top:1px solid var(--rule);border-bottom:1px solid var(--rule);font-size:11px;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:var(--ink3)}
.heads b:first-child{text-align:right}.heads b:last-child{text-align:left}.heads span{text-align:center}
/* The spine is the centre column; a row places its card in one outer column and leaves the other empty. */
.ev{display:grid;grid-template-columns:1fr 150px 1fr;gap:0 10px;align-items:start}
.ev .card{grid-column:1;text-align:right;padding:10px 0 16px;min-width:0}
.ev .dot{grid-column:2;position:relative;z-index:1}
.ev .when{grid-column:3;padding-top:12px;text-align:left}
.ev.right .card{grid-column:3;text-align:left}
.ev.right .when{grid-column:1;text-align:right}
.when time{display:block;font-family:ui-monospace,Menlo,monospace;font-size:11.5px;color:var(--ink3)}
.rel{font-size:11.5px;font-weight:650;color:var(--c)}
.dot::after{content:"";position:absolute;left:50%;top:16px;width:11px;height:11px;border-radius:50%;transform:translate(-50%,-50%);background:var(--c);box-shadow:0 0 0 3px var(--bg)}
.ev.done .dot::after{background:var(--bg);border:2px solid var(--c)}
/* An achievement is a square on the spine — it reads as a different kind of event, not a date that passed. */
.ev.right .dot::after{border-radius:2px;width:10px;height:10px;background:var(--c);border:0}
.top{display:flex;gap:8px;align-items:center;flex-wrap:wrap;margin-bottom:3px;justify-content:flex-end}
.ev.right .top{justify-content:flex-start}
.lane{font-size:10px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--c);border:1px solid var(--c);border-radius:3px;padding:1px 6px}
.own{font-size:11.5px;color:var(--ink3)}
h3{font-size:15.5px;margin:0;font-weight:640;letter-spacing:-.01em}
.card p{margin:4px 0 0;color:var(--ink2);font-size:13.5px}
.card a{color:var(--c)}
.ev.done.left h3,.ev.done.left .card p{color:var(--ink3)}.ev.done.left h3{font-weight:600}
/* A gate whose date has passed without being met: the dot stays solid and the date turns red,
   so a slipped commitment cannot be mistaken for a milestone that was hit. */
.ev.open.overdue .rel{color:var(--crit)}
/* The target row: a heavier rule and a label, so it reads as the thing the list is counting
   down to rather than one more dated row. */
.ev.target h3{font-size:18px;font-weight:720}
.ev.target .card{border-top:2px solid var(--tgt);padding-top:10px}
.tflag{font-size:10px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--tgt);margin-bottom:4px}
.ev.target .dot::after{width:15px;height:15px;background:var(--tgt);box-shadow:0 0 0 3px var(--bg),0 0 0 5px color-mix(in srgb,var(--tgt) 35%,transparent)}
.ev.target .rel{color:var(--tgt);font-weight:720}
footer{margin-top:30px;padding-top:14px;border-top:1px solid var(--rule);color:var(--ink3);font-size:12px}
/* One column on a phone: everything left-aligns against a spine at the far left. */
@media(max-width:720px){
 main{padding:0 16px 60px}h1{font-size:23px}
 .heads{grid-template-columns:20px 1fr;gap:0 10px}.heads b:first-child,.heads span{display:none}.heads b:last-child{grid-column:2;text-align:left}
 ul::before{left:10px}
 .ev{grid-template-columns:20px 1fr;gap:0 10px}
 .ev .dot,.ev.right .dot{grid-column:1}
 .ev .when,.ev.right .when{grid-column:2;text-align:left;padding-top:12px}
 .ev .card,.ev.right .card{grid-column:2;text-align:left;padding:2px 0 16px}
 .top,.ev.right .top{justify-content:flex-start}
}
</style></head><body><nav id="site-nav"></nav><main>
<div class="hd"><h1>${TITLE}</h1>
<div class="sub">${SUBTITLE} · generated ${stamp}</div>
<div class="mm">
  <div class="axis">${months.join('')}</div>
  <div class="rail" id="rail"><div class="elapsed" id="elapsed"></div>${BREAK ? `<span class="brk" style="left:${AX}%" title="axis break — later milestones pinned right"></span>` : ''}${ticks}<div class="scroller" id="scroller"></div><div class="nowl" id="nowl"></div></div>
</div>
<div class="bar">${lanes.map(l => `<span class="key"><i style="background:${lane(l)[1]}"></i>${lane(l)[0]}</span>`).join('')}<span class="cd" id="cd"></span></div>
<div class="heads"><b>To do</b><span></span><b>Done</b></div></div>
<ul id="tl">${items.map(li).join('')}</ul>
<footer>${FOOTER}</footer></main>
<script src="js/nav.js"></script>
<script>
const today=new Date(new Date().toDateString());const day=iso=>{const[y,m,d]=iso.split('-').map(Number);return new Date(y,m-1,d)};
for(const el of document.querySelectorAll('.rel')){const n=Math.round((day(el.dataset.d)-today)/864e5);
 el.textContent=n===0?'today':n>0?'in '+n+' day'+(n===1?'':'s'):(-n)+' day'+(n===-1?'':'s')+' ago';
 const ev=el.closest('.ev');if(n<0&&!ev.classList.contains('open'))ev.classList.add('done');
 if(n<0&&ev.classList.contains('open')){el.textContent+=' — not yet met';ev.classList.add('overdue');}}
(function(){
 const T0=${t0},SPAN=${span},T1=${t1},AX=${AX};
 const pc=ms=>ms>T1?AX:Math.max(0,Math.min(AX,(ms-T0)/SPAN*AX));
 /* "Now" and the elapsed band are computed in the READER's clock, like every other date here,
    so the page cannot freeze at the moment it was published. */
 const now=pc(Date.now());
 document.getElementById('nowl').style.left=now+'%';
 document.getElementById('elapsed').style.width=now+'%';
 /* The countdown's label is the target's own title, shortened at the first dash — titles here are
    "Trimble Dimensions — the joint session", and the countdown wants the name, not the gloss. */
 const TG=${target ? JSON.stringify({ date: target.date, label: target.title.split(/\s+[—–-]\s+/)[0].trim() }) : 'null'};
 if(TG){const n=Math.round((day(TG.date)-today)/864e5);
  document.getElementById('cd').textContent=n>0?n+' days to '+TG.label:n===0?TG.label+' is today':TG.label+' has passed';}
 /* Map the visible slice of the vertical list onto the horizontal axis. The axis is TIME and the
    list is SEQUENCE, so interpolate through the events actually on screen rather than using raw
    scroll fraction, which drifts wherever milestones bunch up. */
 const evs=[].slice.call(document.querySelectorAll('.ev'));
 const tks=[].slice.call(document.querySelectorAll('.tk'));
 const scr=document.getElementById('scroller'),hd=document.querySelector('.hd');
 function sync(){
  const top=window.scrollY+hd.getBoundingClientRect().bottom,bot=window.scrollY+innerHeight;
  let lo=null,hi=null;
  for(const e of evs){const r=e.getBoundingClientRect(),a=r.top+scrollY,b=r.bottom+scrollY;
   if(b>top&&a<bot){const v=parseFloat(e.dataset.p);if(lo===null||v<lo)lo=v;if(hi===null||v>hi)hi=v;}}
  if(lo===null)return;
  const w=Math.max(hi-lo,1.2);
  scr.style.left=lo+'%';scr.style.width=w+'%';
  for(const t of tks){const v=parseFloat(t.dataset.p);t.classList.toggle('on',v>=lo-0.4&&v<=hi+0.4);}
 }
 /* Clicking a tick jumps to its milestone — the minimap is the index, not just a picture. */
 for(const t of tks)t.onclick=()=>{const e=evs.find(e=>e.dataset.p===t.dataset.p);
  if(e)scrollTo({top:e.getBoundingClientRect().top+scrollY-hd.getBoundingClientRect().height-12,behavior:'smooth'});};
 let raf=null;const on=()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=null;sync();});};
 addEventListener('scroll',on,{passive:true});addEventListener('resize',on);sync();
})();
</script></body></html>`;
}

module.exports = { timelinePage };
if (require.main === module) {
  const out = require('path').join(__dirname, '..', 'timeline.html');
  require('fs').writeFileSync(out, timelinePage());
  console.log('wrote ' + out);
}
