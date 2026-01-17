# מדריך Zotero חכם

אפליקציה אינטראקטיבית בעברית שמסייעת לסטודנטים וחוקרים בישראל להזין מקורות ל-Zotero בצורה נכונה.

## התקנה מקומית

```bash
npm install
npm run dev
```

## בנייה לפרסום

```bash
npm run build
```

## פרסום ב-GitHub Pages

### שלב 1: יצירת Repository חדש ב-GitHub

1. היכנסי ל-https://github.com
2. לחצי על "New repository"
3. תני שם ל-repository (למשל: `zotero-guide`)
4. סמני את ה-repository כ-Public
5. לחצי "Create repository"

### שלב 2: העלאת הקבצים

```bash
# התחל git repository
git init

# הוסף את כל הקבצים
git add .

# תעשי commit ראשון
git commit -m "Initial commit"

# חבר ל-repository ב-GitHub (החליפי YOUR_USERNAME ו-YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# העלי את הקבצים
git branch -M main
git push -u origin main
```

### שלב 3: בניית האתר

```bash
# בני את האפליקציה
npm run build
```

### שלב 4: פרסום ב-GitHub Pages

אופציה 1 - באמצעות gh-pages package (מומלץ):

```bash
# התקני את gh-pages
npm install --save-dev gh-pages

# הוסיפי את השורות הבאות ל-package.json בחלק scripts:
# "predeploy": "npm run build",
# "deploy": "gh-pages -d dist"

# פרסמי
npm run deploy
```

אופציה 2 - ידנית:

1. לכי ל-Settings של ה-repository ב-GitHub
2. לחצי על "Pages" בתפריט הצדדי
3. תחת "Source" בחרי "Deploy from a branch"
4. בחרי את ה-branch `gh-pages` (אם השתמשת ב-gh-pages package) או `main`
5. בחרי את התיקייה `/ (root)` או `/dist` (תלוי בהגדרה)
6. לחצי "Save"

### שלב 5: חיבור דומיין משלך

1. לכי ל-Settings > Pages ב-repository
2. תחת "Custom domain", הקלידי את הדומיין שלך (למשל: `zotero.claudina.co.il`)
3. לחצי "Save"
4. ב-DNS של הדומיין שלך, הוסיפי את הרישומים הבאים:

**אם זה subdomain (כמו zotero.claudina.co.il):**
```
Type: CNAME
Name: zotero
Value: YOUR_USERNAME.github.io
```

**אם זה root domain (כמו claudina.co.il):**
```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

5. חכי כמה דקות עד שה-DNS מתעדכן
6. סמני "Enforce HTTPS" ב-GitHub Pages settings

## עדכון האתר

כשאת עושה שינויים:

```bash
git add .
git commit -m "תיאור השינוי"
git push
npm run deploy
```

## מבנה הפרויקט

```
zotero-guide-app/
├── index.html          # HTML ראשי
├── package.json        # תלויות והגדרות
├── vite.config.js      # הגדרות Vite
├── tailwind.config.js  # הגדרות Tailwind
├── src/
│   ├── main.jsx       # נקודת כניסה
│   ├── App.jsx        # הקומפוננטה הראשית
│   └── index.css      # עיצוב גלובלי
└── dist/              # קבצים לאחר build (נוצר אוטומטית)
```

## טכנולוגיות

- React 18
- Vite
- Tailwind CSS
- Lucide React Icons
