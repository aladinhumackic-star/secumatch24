# 🛡️ SecuMatch24 – Deine Security-Plattform

Diese Anleitung ist für absolute Anfänger geschrieben. Folge jeden Schritt genau, und du hast deine Website in etwa 30 Minuten online!

---

## 📋 Was du brauchst (Checkliste)

- [ ] Einen Computer (Mac oder Windows)
- [ ] Internetverbindung
- [ ] Dein Vercel-Account (hast du schon ✓)
- [ ] Deine Domain secumatch24.de (hast du schon ✓)
- [ ] Ca. 30 Minuten Zeit

---

## 🚀 SCHNELLSTER WEG: Direkt über Vercel (empfohlen!)

**Das ist der einfachste Weg – kein Terminal, kein Code auf deinem Computer nötig.**

### Schritt 1: GitHub Account erstellen (5 Minuten)

1. Öffne https://github.com
2. Klicke auf **"Sign up"**
3. Gib deine E-Mail ein
4. Erstelle ein Passwort
5. Wähle einen Benutzernamen (z.B. "secumatch24")
6. Bestätige deine E-Mail
7. **Fertig!** ✓

---

### Schritt 2: Repository erstellen (3 Minuten)

1. Auf GitHub, klicke oben rechts auf das **"+"** Symbol
2. Wähle **"New repository"**
3. Name: `secumatch24`
4. Beschreibung: `Security-Vermittlungsplattform`
5. Wähle: **Public**
6. Haken bei: **"Add a README file"**
7. Klicke **"Create repository"**
8. **Fertig!** ✓

---

### Schritt 3: Dateien hochladen (5 Minuten)

1. Du bist jetzt in deinem neuen Repository
2. Klicke auf **"Add file"** → **"Upload files"**
3. Lade ALLE Dateien aus diesem Ordner hoch:
   - `package.json`
   - `next.config.js`
   - `tailwind.config.js`
   - `postcss.config.js`
   - `.gitignore`
4. Klicke unten auf **"Commit changes"**

5. Jetzt den `app` Ordner:
   - Klicke auf **"Add file"** → **"Create new file"**
   - Tippe: `app/globals.css`
   - Kopiere den Inhalt aus `app/globals.css` rein
   - Klicke **"Commit changes"**

6. Wiederhole für:
   - `app/layout.js`
   - `app/page.js`

**Tipp:** Du kannst auch mehrere Dateien auf einmal hochladen!

---

### Schritt 4: Mit Vercel verbinden (5 Minuten)

1. Gehe zu https://vercel.com
2. Logge dich ein (du hast schon einen Account)
3. Klicke auf **"Add New..."** → **"Project"**
4. Klicke auf **"Import Git Repository"**
5. Wenn du GitHub noch nicht verbunden hast:
   - Klicke auf **"Connect GitHub"**
   - Erlaube Vercel Zugriff
6. Wähle dein `secumatch24` Repository
7. Klicke auf **"Import"**
8. **Wichtig:** Lass alle Einstellungen so wie sie sind!
9. Klicke auf **"Deploy"**
10. Warte 2-3 Minuten...
11. 🎉 **DEINE SEITE IST ONLINE!**

Du siehst jetzt eine URL wie: `secumatch24-xyz.vercel.app`

---

### Schritt 5: Deine Domain verbinden (10 Minuten)

1. In Vercel, klicke auf dein Projekt
2. Gehe zu **"Settings"** → **"Domains"**
3. Gib ein: `secumatch24.de`
4. Klicke **"Add"**
5. Vercel zeigt dir DNS-Einstellungen an. Du siehst so etwas wie:

```
Type: A
Name: @
Value: 76.76.21.21
```

6. **Jetzt gehst du zu deinem Domain-Anbieter** (wo du secumatch24.de gekauft hast)
7. Suche nach "DNS-Einstellungen" oder "DNS verwalten"
8. Füge diese Einträge hinzu:

**Für die Hauptdomain (secumatch24.de):**
```
Typ: A
Host: @ (oder leer lassen)
Wert: 76.76.21.21
```

**Für www (www.secumatch24.de):**
```
Typ: CNAME
Host: www
Wert: cname.vercel-dns.com
```

9. Speichern
10. Warte 5-30 Minuten (manchmal bis zu 24 Stunden)
11. 🎉 **secumatch24.de zeigt deine Seite!**

---

## ✅ Geschafft!

Deine Website ist jetzt live unter **https://secumatch24.de**

---

## 🔧 Wenn etwas nicht funktioniert

### "Build failed" auf Vercel?
→ Screenshot machen und mir zeigen!

### Domain funktioniert nicht?
→ DNS braucht manchmal bis zu 24 Stunden. Warte und prüfe später nochmal.

### Seite sieht komisch aus?
→ Prüfe, ob alle Dateien im `app` Ordner sind

---

## 📝 Nächste Schritte: Formular-Daten empfangen

Aktuell werden die Formulardaten nur simuliert. Für echte Leads brauchst du:

### Option A: Tally (am einfachsten)
1. Gehe zu https://tally.so
2. Erstelle ein Formular
3. Kopiere den Embed-Code
4. Ersetze unser Formular damit

### Option B: Notion als Datenbank
1. Erstelle eine Notion-Datenbank
2. Nutze Notion API
3. (Ich helfe dir dabei wenn nötig)

---

## 💬 Hilfe nötig?

Mach einen Screenshot von dem Problem und zeig es mir. Ich helfe dir!

---

## 📁 Dateistruktur

```
secumatch24/
├── app/
│   ├── globals.css      ← Styles
│   ├── layout.js        ← HTML-Grundgerüst
│   └── page.js          ← Deine Landingpage
├── package.json         ← Projektinfo
├── next.config.js       ← Next.js Einstellungen
├── tailwind.config.js   ← Tailwind Einstellungen
├── postcss.config.js    ← CSS-Verarbeitung
└── .gitignore          ← Dateien die nicht hochgeladen werden
```

---

Viel Erfolg! 🚀
