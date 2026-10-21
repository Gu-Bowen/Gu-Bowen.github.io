#!/usr/bin/env python3
"""Idempotently apply Bowen Gu academic homepage updates (Oct 2026).
Run this script from the root of the V5.5/V5.4 maintainable site repository.
It preserves all existing data entries and only inserts the new items if missing.
"""
from pathlib import Path
import json, re, shutil, sys

ROOT = Path.cwd()
DATA = ROOT / 'data'
REQUIRED = ['publications.js', 'service.js', 'activities.js', 'news.js']
missing = [x for x in REQUIRED if not (DATA / x).exists()]
if missing:
    print('ERROR: Expected data files were not found under ./data/: ' + ', '.join(missing))
    print('Open a terminal in the root of your maintainable website repository, then run this script again.')
    sys.exit(1)

def load_js(name, var):
    path = DATA / name
    text = path.read_text(encoding='utf-8')
    m = re.match(r'\s*window\.' + re.escape(var) + r'\s*=\s*(.*?);?\s*$', text, re.S)
    if not m:
        raise ValueError(f'Could not parse {name}: expected window.{var} = JSON;')
    raw = m.group(1).strip()
    if raw.endswith(';'):
        raw = raw[:-1].rstrip()
    return path, text, json.loads(raw)

def save_js(path, original, var, data):
    backup = path.with_suffix(path.suffix + '.bak')
    if not backup.exists():
        shutil.copy2(path, backup)
    path.write_text(f'window.{var} = ' + json.dumps(data, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')

changed = []
# 1) New IoTJ paper, corresponding author B. Gu.
path, old, pubs = load_js('publications.js', 'PUBLICATIONS')
new_pub = {
    'year': '2026',
    'title': 'Task Offloading via Hybrid Active-Passive Cooperation: Riding on Active Relaying for Backscatter Communication Enhancement',
    'authorsHtml': 'H. Qin, <strong>B. Gu*</strong>, D. Li, H. Xie, L. Wang, and X. Tao',
    'venueHtml': '<em>IEEE Internet of Things Journal</em>, accepted October 2026. DOI: 10.1109/JIOT.2026.3743282.',
    'label': 'SELECTED',
    'links': [{'label': 'DOI', 'url': 'https://doi.org/10.1109/JIOT.2026.3743282'}],
    'topics': ['backscatter', 'active-passive', 'mec']
}
if not any('Task Offloading via Hybrid Active-Passive Cooperation' in item.get('title', '') for item in pubs.get('journals', [])):
    pubs.setdefault('journals', []).append(new_pub)
    pubs['journals'].sort(key=lambda x: int(re.search(r'\d{4}', str(x.get('year','0'))).group()) if re.search(r'\d{4}', str(x.get('year','0'))) else 0, reverse=True)
    save_js(path, old, 'PUBLICATIONS', pubs); changed.append('data/publications.js')

# 2) New Youth Editorial Board appointment, 2027-2029.
path, old, service = load_js('service.js', 'SERVICE')
new_editorial = {
    'date': '2027–2029',
    'venue': 'Journal on Communications',
    'zhVenue': '《通信学报》',
    'roleEn': 'Youth Editorial Board Member',
    'roleZh': '青年编委'
}
if not any(x.get('zhVenue') == '《通信学报》' and x.get('date') == '2027–2029' for x in service.get('editorial', [])):
    service.setdefault('editorial', []).append(new_editorial)
    service['editorial'].sort(key=lambda x: (x.get('date',''), x.get('venue','')), reverse=True)
    save_js(path, old, 'SERVICE', service); changed.append('data/service.js')

# 3 & 4) Two upcoming conference activities.
path, old, activities = load_js('activities.js', 'ACTIVITIES')
new_activities = [
    {
        'date': '2026.11.06–11.08', 'year': 2026,
        'cityEn': 'Fuzhou', 'cityZh': '福州',
        'eventEn': '2026 Conference on Frontier Technologies of Information and Communications',
        'eventZh': '2026 信息与通信前沿技术大会',
        'type': 'conference', 'roleEn': 'Conference Participation', 'roleZh': '参会',
        'talkTitle': '', 'url': ''
    },
    {
        'date': '2026.10.31–11.02', 'year': 2026,
        'cityEn': 'Wuxi', 'cityZh': '无锡',
        'eventEn': '2026 Internet of Things Technology and Applications Conference',
        'eventZh': '2026 年物联网技术与应用大会',
        'type': 'conference', 'roleEn': 'Conference Participation', 'roleZh': '参会',
        'talkTitle': '', 'url': ''
    }
]
existing_keys = {(x.get('date'), x.get('eventZh')) for x in activities}
added = False
for item in new_activities:
    if (item['date'], item['eventZh']) not in existing_keys:
        activities.append(item); added = True
if added:
    def datekey(x):
        nums = [int(n) for n in re.findall(r'\d+', x.get('date',''))]
        return tuple(nums[:5])
    activities.sort(key=datekey, reverse=True)
    save_js(path, old, 'ACTIVITIES', activities); changed.append('data/activities.js')

# News: new paper, new editorial appointment, and upcoming conference activities.
path, old, news = load_js('news.js', 'NEWS')
new_news = [
    {
        'date': 'OCT 2026',
        'enHtml': '<strong>Paper accepted.</strong> “Task Offloading via Hybrid Active-Passive Cooperation: Riding on Active Relaying for Backscatter Communication Enhancement” was accepted by <em>IEEE Internet of Things Journal</em>. B. Gu is the corresponding author.',
        'zhHtml': '<strong>论文录用。</strong> “Task Offloading via Hybrid Active-Passive Cooperation: Riding on Active Relaying for Backscatter Communication Enhancement” 被 <em>IEEE Internet of Things Journal</em> 录用，B. Gu 为通信作者。'
    },
    {
        'date': '2027–2029',
        'enHtml': '<strong>Editorial appointment.</strong> Appointed to the Youth Editorial Board of <em>Journal on Communications</em> for 2027–2029.',
        'zhHtml': '<strong>青年编委。</strong> 担任《通信学报》2027–2029 年青年编委。'
    },
    {
        'date': 'NOV 2026',
        'enHtml': '<strong>Upcoming academic activities.</strong> Scheduled to attend the 2026 Conference on Frontier Technologies of Information and Communications in Fuzhou (Nov. 6–8) and the 2026 Internet of Things Technology and Applications Conference in Wuxi (Oct. 31–Nov. 2).',
        'zhHtml': '<strong>近期学术活动。</strong> 计划于 10 月 31 日至 11 月 2 日赴无锡参加 2026 年物联网技术与应用大会，并于 11 月 6 日至 8 日赴福州参加 2026 信息与通信前沿技术大会。'
    }
]
news_added_items = [item for item in new_news if not any(x.get('enHtml') == item['enHtml'] for x in news)]
if news_added_items:
    news = news_added_items + news
    news = news[:8]
    save_js(path, old, 'NEWS', news); changed.append('data/news.js')

print('Update completed. Modified:')
for f in changed:
    print(' - ' + f)
if not changed:
    print(' - No changes needed; all updates were already present.')
print('\nBackup files with .bak suffix were created before the first modification.')
