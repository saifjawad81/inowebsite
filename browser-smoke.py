from pathlib import Path
import json, argparse
parser=argparse.ArgumentParser(description='Run a browser smoke test against a locally served website; no real inquiries are sent.')
parser.add_argument('--url', default='http://localhost:3000')
parser.add_argument('--output', default='.artifacts/qa')
args=parser.parse_args()
from playwright.sync_api import sync_playwright, expect

qa=Path(args.output);qa.mkdir(parents=True,exist_ok=True)
results=[];console_errors=[]
with sync_playwright() as p:
 browser=p.chromium.launch()
 for lang in ['en','ar']:
  for width in [1440,1024,768,390,320]:
   page=browser.new_page(viewport={'width':width,'height':900},reduced_motion='reduce')
   page.set_default_timeout(5000)
   page.on('pageerror',lambda error:console_errors.append(str(error)))
   page.goto(args.url, wait_until='domcontentloaded');page.wait_for_selector('h1')
   if lang=='ar':page.get_by_role('button',name='Switch to Arabic').click()
   page.wait_for_timeout(100)
   dims=page.evaluate('({width:innerWidth,content:document.documentElement.scrollWidth})')
   assert dims['content']<=width+1, (lang,width,dims)
   assert page.locator('.brand img').first.evaluate('(x)=>x.complete&&x.naturalWidth>0')
   if width in [1440,390]:
    page.screenshot(path=str(qa/f'{lang}-{width}-home.png'),full_page=False)
   print(lang,width,flush=True)
   results.append({'test':f'{lang} layout at {width}px','status':'PASS','horizontalOverflow':False})
   if width<1000:
    page.locator('.menu-toggle').click();expect(page.locator('#mobile-navigation')).to_be_visible();page.keyboard.press('Escape');expect(page.locator('#mobile-navigation')).to_be_hidden();assert page.locator('.menu-toggle').evaluate('(x)=>document.activeElement===x')
   page.close()
 page=browser.new_page(viewport={'width':1440,'height':1000},reduced_motion='reduce')
 page.on('pageerror',lambda error:console_errors.append(str(error)))
 page.goto(args.url, wait_until='domcontentloaded');page.wait_for_selector('h1')
 details=page.locator('#services details').first
 details.locator('summary').click();expect(details).to_have_attribute('open','');results.append({'test':'Solution expansion','status':'PASS'})
 assert page.locator('#rfp').get_by_text('Prepare & hand off', exact=True).is_visible(), 'Run in the default manual mode with VITE_RFP_ENDPOINT blank. No real online inquiry will be sent.'
 page.locator('#rfp button[type=submit]').click()
 page.locator('#rfp button[type=submit]').click()
 expect(page.locator('#location')).to_be_focused()
 page.locator('#location').select_option('basra');page.locator('#facility').select_option('industrial');page.locator('#timeline').select_option('quarter');page.locator('#notes').fill('Private test scope: 40 access points and 12 servers.')
 page.locator('#rfp button[type=submit]').click()
 page.locator('#name').fill('Test Engineer');page.locator('#company').fill('Test Organization');page.locator('#email').fill('qa@example.invalid');page.locator('#phone').fill('+964 780 000 0000');page.locator('#consent').check()
 page.get_by_role('button',name='Switch to Arabic').click();expect(page.locator('#name')).to_have_value('Test Engineer');expect(page.locator('#email')).to_have_value('qa@example.invalid');expect(page.locator('#consent')).to_be_checked()
 page.get_by_role('button',name='Switch to English').click()
 page.locator('#rfp button[type=submit]').click();expect(page.get_by_text('It has not been sent.',exact=False)).to_be_visible()
 assert 'qa%40example.invalid' in page.locator('a[href^="mailto:"]').first.get_attribute('href')
 with page.expect_download() as d:page.get_by_role('button',name='Download full brief').click()
 assert 'Private test scope' in Path(d.value.path()).read_text()
 page.get_by_role('button',name='Edit inquiry').click()
 page.locator('#services .solution-card').nth(1).get_by_role('button').click()
 expect(page.locator('#pillar-security')).to_be_checked()
 page.locator('#rfp button[type=submit]').click();expect(page.locator('#notes')).to_have_value('Private test scope: 40 access points and 12 servers.');expect(page.locator('#location')).to_have_value('basra')
 page.locator('#rfp button[type=submit]').click();expect(page.locator('#name')).to_have_value('Test Engineer')
 results.extend([{'test':name,'status':'PASS'} for name in ['Step validation and focus','Language preserves contact fields and consent','Manual preparation never reports sent','Email handoff includes encoded contact','Full-brief download includes notes','Pillar change preserves project and contact data']])
 assert not console_errors,console_errors
 results.append({'test':'Browser JavaScript exceptions','status':'PASS','count':0})
 page.close();browser.close()
(qa/'browser-results.json').write_text(json.dumps({'runtime':'Chromium against '+args.url,'tests':results},ensure_ascii=False,indent=2))
print(json.dumps(results,indent=2))
