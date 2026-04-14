// ============================================================
// 125CPV Church Network - All Data
// ============================================================

// --- 2026 Plants ---
const churchData2026 = [
  { id: "chanbe", name: "Chanbe", leader: "Dev", believers: 16, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: null, yearFounded: 2026, notes: "" },
  { id: "bantiya", name: "Bantiya", leader: "Dev", believers: 14, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "chanbe", yearFounded: 2026, notes: "" },
  { id: "pandkher", name: "Pandkher", leader: "Dev", believers: 8, commandsObeyed: 5, hasElder: false, elderInside: false, location: "", parentId: "chanbe", yearFounded: 2026, notes: "" },
  { id: "khom", name: "Khom", leader: "Dev", believers: 11, commandsObeyed: 5, hasElder: true, elderInside: true, location: "", parentId: "bantiya", yearFounded: 2026, notes: "" },
  { id: "kudra-tola", name: "Kudra Tola", leader: "Dev", believers: 14, commandsObeyed: 6, hasElder: true, elderInside: true, location: "", parentId: "bantiya", yearFounded: 2026, notes: "" },
  { id: "khet-oli", name: "Khet Oli", leader: "Dev", believers: 7, commandsObeyed: 3, hasElder: true, elderInside: false, location: "", parentId: "kudra-tola", yearFounded: 2026, notes: "" },
  { id: "manua-tola", name: "Manua Tola", leader: "Asaram", believers: 10, commandsObeyed: 6, hasElder: true, elderInside: true, location: "", parentId: null, yearFounded: 2026, notes: "" },
  { id: "kakrat", name: "Kakrat", leader: "Asaram", believers: 12, commandsObeyed: 6, hasElder: true, elderInside: true, location: "", parentId: "manua-tola", yearFounded: 2026, notes: "" },
  { id: "bar-tolar", name: "Bar Tolar", leader: "Asaram", believers: 8, commandsObeyed: 6, hasElder: false, elderInside: false, location: "", parentId: "manua-tola", yearFounded: 2026, notes: "" },
  { id: "bandha-tola", name: "Bandha Tola", leader: "Kamli", believers: 12, commandsObeyed: 3, hasElder: false, elderInside: false, location: "Barra", parentId: null, yearFounded: 2026, notes: "" },
  { id: "chikhli", name: "Chikhli", leader: "Sanju", believers: 12, commandsObeyed: 3, hasElder: true, elderInside: true, location: "", parentId: "bandha-tola", yearFounded: 2026, notes: "" },
  { id: "dohar-tola", name: "Dohar Tola", leader: "Sanju", believers: 16, commandsObeyed: 5, hasElder: true, elderInside: true, location: "", parentId: "chikhli", yearFounded: 2026, notes: "" },
  { id: "bhora", name: "Bhora", leader: "Prabhat", believers: 12, commandsObeyed: 4, hasElder: true, elderInside: true, location: "", parentId: "dohar-tola", yearFounded: 2026, notes: "" },
  { id: "blpat", name: "Blpat", leader: "P. Gopal", believers: 16, commandsObeyed: 6, hasElder: true, elderInside: false, location: "", parentId: null, yearFounded: 2026, notes: "" },
  { id: "padma-niya-2026", name: "Padma Niya", leader: "Ramesh", believers: 9, commandsObeyed: 3, hasElder: true, elderInside: true, location: "", parentId: null, yearFounded: 2026, notes: "May be same as historical Padma Niya" },
  { id: "malach-vp", name: "Malach VP", leader: "Ramesh", believers: 15, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "padma-niya-2026", yearFounded: 2026, notes: "" },
  { id: "dangava", name: "Dangava", leader: "Jal", believers: 16, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: null, yearFounded: 2026, notes: "" },
  { id: "rpmth", name: "Rpmth", leader: "Jal", believers: 15, commandsObeyed: 5, hasElder: false, elderInside: false, location: "", parentId: "dangava", yearFounded: 2026, notes: "" },
  { id: "koeldra", name: "Koeldra", leader: "Soleman", believers: 15, commandsObeyed: 7, hasElder: false, elderInside: false, location: "", parentId: null, yearFounded: 2026, notes: "" },
  { id: "saratpur", name: "Saratpur", leader: "Soleman", believers: 13, commandsObeyed: 5, hasElder: true, elderInside: true, location: "", parentId: "koeldra", yearFounded: 2026, notes: "" },
  { id: "chandora", name: "Chandora", leader: "Soleman", believers: 10, commandsObeyed: 5, hasElder: false, elderInside: false, location: "", parentId: "koeldra", yearFounded: 2026, notes: "" },
  { id: "pipariya", name: "Pipariya", leader: "Umesh", believers: 10, commandsObeyed: 6, hasElder: false, elderInside: false, location: "", parentId: null, yearFounded: 2026, notes: "" },
  { id: "kelha", name: "Kelha", leader: "Umesh", believers: 11, commandsObeyed: 5, hasElder: false, elderInside: false, location: "", parentId: "pipariya", yearFounded: 2026, notes: "" },
  { id: "jaylal", name: "Jaylal", leader: "Sagar", believers: 14, commandsObeyed: 5, hasElder: true, elderInside: true, location: "", parentId: null, yearFounded: 2026, notes: "" },
  { id: "amara", name: "Amara", leader: "Sagar", believers: 18, commandsObeyed: 5, hasElder: true, elderInside: true, location: "", parentId: "jaylal", yearFounded: 2026, notes: "" },
];

// --- Full Network (Historical + all branches) ---
const churchDataFull = [
  // === HHRC FOUNDING LINEAGE ===
  { id: "hhrc", name: "HHRC", leader: "Monty", believers: 68, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: null, yearFounded: 2002, notes: "Heavenly Hawk Revival Church. 7 close disciples, 25 vision leaders, 10 additional leaders, est. 35+ elders." },
  { id: "hathrura", name: "Hathrura", leader: "", believers: 300, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "hhrc", yearFounded: 2003, notes: "" },
  { id: "salaiya", name: "Salaiya", leader: "", believers: 30, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "hathrura", yearFounded: 2010, notes: "" },
  { id: "majgava", name: "Majgava", leader: "", believers: 40, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "hathrura", yearFounded: 2010, notes: "" },
  { id: "odera", name: "Odera", leader: "", believers: 40, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "hathrura", yearFounded: 2007, notes: "Introduced 2/4 field training" },
  { id: "behar", name: "Behar", leader: "", believers: 30, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "odera", yearFounded: 2016, notes: "" },
  { id: "dona", name: "Dona", leader: "", believers: 40, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "behar", yearFounded: 2019, notes: "" },
  { id: "padma-niya-hist", name: "Padma Niya", leader: "", believers: 10, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "behar", yearFounded: 2017, notes: "May duplicate 2026 Padma Niya" },
  { id: "timni", name: "Timni", leader: "", believers: 20, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "behar", yearFounded: 2022, notes: "125CPV vision launched 2020 (Habakkuk 2:2-3)" },
  { id: "kule", name: "Kule", leader: "", believers: 25, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "timni", yearFounded: 2022, notes: "" },
  { id: "devri-1", name: "Devri", leader: "", believers: 8, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "timni", yearFounded: 2022, notes: "" },
  { id: "amgar-hist", name: "Amgar", leader: "", believers: 22, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "kule", yearFounded: 2023, notes: "" },
  { id: "domaniya", name: "Domaniya", leader: "", believers: 22, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "timni", yearFounded: 2023, notes: "" },
  { id: "devri-2", name: "Devri (2024)", leader: "", believers: 35, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "devri-1", yearFounded: 2024, notes: "Planted by first Devri" },
  { id: "tummi", name: "Tummi", leader: "", believers: 26, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "domaniya", yearFounded: 2024, notes: "" },
  { id: "udhiya", name: "Udhiya", leader: "Sagar", believers: 20, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "tummi", yearFounded: 2025, notes: "Sagar may be same leader as 2026 Sagar branch" },

  // === GOPAL JI / BASANIYA BRANCH ===
  { id: "basaniya", name: "Basaniya", leader: "Gopal Ji", believers: 40, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: null, yearFounded: 2015, notes: "Gopal Ji likely = P. Gopal in 2026 data" },
  { id: "khetgav", name: "Khetgav", leader: "Gopal Ji", believers: 32, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "basaniya", yearFounded: 2021, notes: "" },
  { id: "vicharpur", name: "Vicharpur", leader: "Gopal Ji", believers: 50, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "basaniya", yearFounded: 2022, notes: "" },
  { id: "belpad", name: "Belpad", leader: "", believers: 23, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "vicharpur", yearFounded: 2023, notes: "" },
  { id: "dodniya", name: "Dodniya", leader: "", believers: 22, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "vicharpur", yearFounded: 2024, notes: "" },
  { id: "mohan", name: "Mohan", leader: "", believers: 30, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "dodniya", yearFounded: 2024, notes: "" },
  { id: "cherpani", name: "Cherpani", leader: "", believers: 26, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "dodniya", yearFounded: 2024, notes: "" },
  { id: "bahpur", name: "Bahpur", leader: "", believers: 16, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "dodniya", yearFounded: 2024, notes: "" },
  { id: "jinjan", name: "Jinjan", leader: "", believers: 14, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "mohan", yearFounded: 2024, notes: "" },
  { id: "karopa", name: "Karopa", leader: "", believers: 28, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "cherpani", yearFounded: 2024, notes: "" },
  { id: "navgava", name: "Navgava", leader: "", believers: 21, commandsObeyed: 6, hasElder: true, elderInside: true, location: "", parentId: "jinjan", yearFounded: 2025, notes: "" },
  { id: "dabra-tola", name: "Dabra Tola", leader: "", believers: 23, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "bahpur", yearFounded: 2025, notes: "" },
  { id: "lethra", name: "Lethra", leader: "", believers: 26, commandsObeyed: 5, hasElder: true, elderInside: true, location: "", parentId: "karopa", yearFounded: 2025, notes: "" },
  { id: "karpa", name: "Karpa", leader: "", believers: 17, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "karopa", yearFounded: 2025, notes: "" },
  { id: "bartola", name: "Bartola", leader: "", believers: 17, commandsObeyed: 5, hasElder: true, elderInside: true, location: "", parentId: "dabra-tola", yearFounded: 2025, notes: "" },
  { id: "mhua-tola", name: "Mhua Tola", leader: "", believers: 20, commandsObeyed: 6, hasElder: false, elderInside: false, location: "", parentId: "dabra-tola", yearFounded: 2025, notes: "" },

  // === DINDORI BRANCH (under Gopal Ji, leader Siv Prasad) ===
  { id: "dindori", name: "Dindori", leader: "Siv Prasad", believers: 28, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "basaniya", yearFounded: 2021, notes: "P. Gopal area, leader Siv Prasad" },
  { id: "bhusa-mandi", name: "Bhusa Mandi", leader: "Siv Prasad", believers: 20, commandsObeyed: 7, hasElder: false, elderInside: false, location: "", parentId: "dindori", yearFounded: 2024, notes: "" },
  { id: "chapar-tola", name: "Chapar Tola", leader: "", believers: 25, commandsObeyed: 7, hasElder: false, elderInside: false, location: "", parentId: "dindori", yearFounded: 2025, notes: "" },
  { id: "banjara-tola", name: "Banjara Tola", leader: "", believers: 16, commandsObeyed: 6, hasElder: false, elderInside: false, location: "", parentId: "dindori", yearFounded: 2025, notes: "" },

  // === DEV / NANDNA BRANCH ===
  { id: "nandna", name: "Nandna", leader: "Dev", believers: 69, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: null, yearFounded: 2019, notes: "" },
  { id: "bharri", name: "Bharri", leader: "Dev", believers: 18, commandsObeyed: 4, hasElder: true, elderInside: true, location: "", parentId: "nandna", yearFounded: 2025, notes: "" },
  { id: "deori", name: "Deori", leader: "Dev", believers: 48, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "nandna", yearFounded: 2024, notes: "" },
  { id: "shamdegh", name: "Shamdegh", leader: "Dev", believers: 10, commandsObeyed: 3, hasElder: true, elderInside: true, location: "", parentId: "nandna", yearFounded: 2025, notes: "" },
  { id: "deori-2", name: "Deori 2", leader: "Dev", believers: 15, commandsObeyed: 7, hasElder: false, elderInside: false, location: "", parentId: "deori", yearFounded: 2025, notes: "" },
  { id: "dhangawa", name: "Dhangawa", leader: "Dev", believers: 20, commandsObeyed: 4, hasElder: true, elderInside: true, location: "", parentId: "deori", yearFounded: 2026, notes: "" },
  { id: "champa", name: "Champa", leader: "Dev", believers: 31, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "deori", yearFounded: 2024, notes: "" },
  { id: "navgai", name: "Navgai", leader: "Dev", believers: 25, commandsObeyed: 7, hasElder: false, elderInside: false, location: "", parentId: "deori-2", yearFounded: 2025, notes: "" },
  { id: "ghorve", name: "Ghorve", leader: "Dev", believers: 18, commandsObeyed: 4, hasElder: true, elderInside: true, location: "", parentId: "champa", yearFounded: 2025, notes: "" },

  // === BHARAT JON / U.P. BRANCH ===
  { id: "up", name: "U.P.", leader: "Bharat Jon", believers: 70, commandsObeyed: 7, hasElder: true, elderInside: true, location: "Uttar Pradesh", parentId: null, yearFounded: 2024, notes: "" },
  { id: "sudiyani", name: "Sudiyani", leader: "Bharat Jon", believers: 35, commandsObeyed: 6, hasElder: true, elderInside: true, location: "", parentId: "up", yearFounded: 2025, notes: "" },
  { id: "scratched", name: "(Needs ID)", leader: "Bharat Jon", believers: 15, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "up", yearFounded: 2025, notes: "Name was scratched out on whiteboard - needs identification from Monty" },
  { id: "gorakpur", name: "Gorakpur", leader: "Bharat Jon", believers: 30, commandsObeyed: 6, hasElder: true, elderInside: true, location: "", parentId: "up", yearFounded: 2025, notes: "" },
  { id: "shakhr-por", name: "Shakhr Por", leader: "", believers: 15, commandsObeyed: 4, hasElder: true, elderInside: true, location: "", parentId: "sudiyani", yearFounded: 2025, notes: "" },
  { id: "mahuadar", name: "Mahuadar", leader: "", believers: 20, commandsObeyed: 7, hasElder: true, elderInside: true, location: "", parentId: "scratched", yearFounded: 2025, notes: "" },
  { id: "tikariya", name: "Tikariya", leader: "", believers: 13, commandsObeyed: 5, hasElder: true, elderInside: true, location: "", parentId: "gorakpur", yearFounded: 2025, notes: "" },
  { id: "mohanpur", name: "Mohanpur", leader: "", believers: 15, commandsObeyed: 6, hasElder: false, elderInside: false, location: "", parentId: "mahuadar", yearFounded: 2026, notes: "" },
  { id: "bitavi-bazar", name: "Bitavi Bazar", leader: "", believers: 10, commandsObeyed: 5, hasElder: false, elderInside: false, location: "", parentId: "mahuadar", yearFounded: 2026, notes: "" },
  { id: "aarsada-hi", name: "Aarsada Hi", leader: "", believers: 10, commandsObeyed: 6, hasElder: false, elderInside: false, location: "", parentId: "mahuadar", yearFounded: 2026, notes: "" },
];

// --- Utilities ---
function loadSavedEdits(key, data) {
  const s = localStorage.getItem('church-edits-' + key);
  if (!s) return data;
  try {
    const e = JSON.parse(s);
    return data.map(c => e[c.id] ? { ...c, ...e[c.id] } : c);
  } catch (_) { return data; }
}

function saveChurchEdit(key, id, updates) {
  const k = 'church-edits-' + key;
  let e = {};
  try { e = JSON.parse(localStorage.getItem(k) || '{}'); } catch (_) {}
  e[id] = { ...(e[id] || {}), ...updates };
  localStorage.setItem(k, JSON.stringify(e));
}

function buildTree(data, label, sub) {
  const map = {}, roots = [];
  data.forEach(d => { map[d.id] = { ...d, children: [] }; });
  data.forEach(d => {
    if (d.parentId && map[d.parentId]) map[d.parentId].children.push(map[d.id]);
    else if (!d.parentId) roots.push(map[d.id]);
  });
  return { id: "root", name: label || "Network", leader: "", believers: 0, commandsObeyed: 0, hasElder: false, elderInside: false, location: sub || "", isRoot: true, children: roots, yearFounded: 0, notes: "" };
}

function assignGenerations(node, gen = 0) {
  node.generation = gen;
  if (node.children) node.children.forEach(c => assignGenerations(c, gen + 1));
}
