/**
 * Mock data for the frontend-only build. This stands in for live Supabase data
 * and mirrors the reference prototype. Replace with `useProject` / Supabase
 * queries once the backend is connected.
 */

export const client = {
  firstName: 'Eleanor',
  fullName: 'Eleanor & James Whitlock',
  address: 'The Old Rectory, Surrey',
}

export const project = {
  reference: 'LQ-2618',
  stage: 5,
  stageLabel: 'In Manufacture',
  installDate: '14 Jul 2026',
  contractTotal: '£28,560',
  paidToDate: '£14,280',
  outstanding: '£14,280',
}

export const team = [
  { name: 'Marcus Reed', role: 'Lead Designer', meta: 'Mon–Fri' },
  { name: 'Priya Anand', role: 'Project Coordinator', meta: 'Your main contact' },
]

export const stages = [
  { label: 'Enquiry & showroom visit', when: '12 Mar', status: 'done' },
  { label: 'Design & proposal', when: '29 Mar', status: 'done' },
  { label: 'Agreement & sign-off', when: '8 Apr', status: 'done' },
  { label: 'Survey & final measure', when: '24 Apr', status: 'done' },
  {
    label: 'Manufacture & procurement',
    when: 'In progress',
    status: 'current',
    sub: 'Cabinetry being made · worktop ordered',
  },
  { label: 'Delivery & installation', when: 'Est. 14 Jul', status: '' },
  { label: 'Handover & sign-off', when: '', status: '' },
  { label: 'Aftercare', when: '6-week & 6-month check-ins', status: '' },
]

export const appliances = [
  { k: 'Range cooker', v: 'Lacanche Cluny 1400', s: 'Dual fuel · Delft blue' },
  { k: 'Refrigeration', v: 'Sub-Zero ICBID-36', s: 'Integrated column' },
  { k: 'Dishwasher', v: 'Miele G7000 Integrated', s: 'Fully concealed' },
  { k: 'Extraction', v: 'Elica Nikolatesla', s: 'Induction-integrated' },
  { k: 'Tap', v: 'Quooker Flex PRO3', s: 'Boiling · chilled · sparkling' },
]

export const finishes = [
  { k: 'Cabinetry', v: 'In-frame Shaker', s: 'Hand-painted' },
  { k: 'Paint colour', v: 'Farrow & Ball', s: 'Railings No.31' },
  { k: 'Worktop', v: 'Calacatta quartz', s: '20mm · honed' },
  { k: 'Handles', v: 'Armac Martin', s: 'Aged brass' },
  { k: 'Flooring', v: 'Reclaimed oak', s: 'Wide plank' },
]

export const documents = [
  { title: 'Sales Contract — LQ-2618', sub: 'Signed 8 Apr 2026 · e-signature', status: 'signed', action: 'View' },
  { title: 'Final Design Drawings', sub: 'Rev C · approved 24 Apr', action: 'View' },
  { title: 'Itemised Specification', sub: 'PDF · 4 pages', action: 'View' },
  { title: 'Site Survey Report', sub: 'Completed 24 Apr', action: 'View' },
  { title: 'Appliance Warranties', sub: 'Issued on handover', status: 'upcoming' },
]

export const payments = [
  { label: 'Deposit', amount: '£8,568', sub: 'On contract signing · 8 Apr', status: 'paid' },
  { label: 'Stage payment — post-survey', amount: '£5,712', sub: 'Paid 26 Apr', status: 'paid' },
  { label: 'Pre-delivery balance', amount: '£11,424', sub: 'Due 7 Jul', status: 'due' },
  { label: 'Final balance on completion', amount: '£2,856', sub: 'Due on sign-off', status: 'upcoming' },
]

export const affiliates = [
  { category: 'Seating', name: 'Carver Dining Chairs', price: 'Soho Home · from £390' },
  { category: 'Lighting', name: 'Brass Pendant Trio', price: 'Pooky · £165 each' },
  { category: 'Tableware', name: 'Stoneware Dinner Set', price: 'The White Company · £120' },
  { category: 'Textiles', name: 'Linen Roman Blind', price: 'Blinds Direct · made to measure' },
  { category: 'Styling', name: 'Walnut Chopping Boards', price: 'Divertimenti · from £45' },
  { category: 'Storage', name: 'Glass Pantry Jars', price: 'Kilner · set of 6' },
]

export const messages = [
  {
    who: 'Marcus Reed · Designer',
    avatar: 'M',
    text: 'Your cabinetry has entered manufacture this week — everything on track for July.',
    time: 'Today, 11:24',
  },
  {
    who: 'Priya Anand · Coordinator',
    avatar: 'P',
    text: 'Hi Eleanor, just confirming the templater will need access on the morning of the 7th. Does that work for you?',
    time: 'Yesterday, 16:02',
  },
  {
    who: 'Eleanor Whitlock',
    avatar: 'E',
    text: "Perfect, we'll both be home that morning. Thank you!",
    time: 'Yesterday, 17:40',
  },
]

/** The 8 fixed project stages (from SPEC). */
export const STAGES = [
  { n: 1, label: 'Enquiry & Showroom Visit' },
  { n: 2, label: 'Design & Proposal' },
  { n: 3, label: 'Agreement & Sign-off' },
  { n: 4, label: 'Survey & Final Measure' },
  { n: 5, label: 'Manufacture & Procurement' },
  { n: 6, label: 'Delivery & Installation' },
  { n: 7, label: 'Handover & Sign-off' },
  { n: 8, label: 'Aftercare' },
]
