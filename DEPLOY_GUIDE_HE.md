# הוראות פרסום מהירות - מדריך Zotero

## מה את צריכה לפני שמתחילים:
- חשבון GitHub (אם אין, צרי ב-https://github.com)
- Git מותקן במחשב (הורידי מ-https://git-scm.com)
- Node.js מותקן (הורידי מ-https://nodejs.org)

## שלב 1: העתקת הקבצים למחשב שלך

1. הורידי את כל התיקייה `zotero-guide-app` למחשב שלך
2. פתחי Terminal/Command Prompt
3. נווטי לתיקייה:
   ```bash
   cd path/to/zotero-guide-app
   ```

## שלב 2: התקנת חבילות

```bash
npm install
```

זה ייקח כמה דקות - זה מוריד את כל החבילות הדרושות.

## שלב 3: בדיקה מקומית (אופציונלי)

אם את רוצה לראות איך זה נראה לפני הפרסום:

```bash
npm run dev
```

פתחי בדפדפן: http://localhost:5173

## שלב 4: יצירת Repository ב-GitHub

1. כנסי ל-https://github.com
2. לחצי על הכפתור הירוק "+ New"
3. תני שם: `zotero-guide` (או כל שם שתרצי)
4. תשאירי Public
5. **אל תסמני** "Add a README file"
6. לחצי "Create repository"

GitHub יראה לך מסך עם הוראות - **תשאירי אותו פתוח**, נשתמש בזה בשלב הבא.

## שלב 5: חיבור הפרויקט ל-GitHub

**חשוב:** החליפי `YOUR_USERNAME` בשם המשתמש שלך ב-GitHub!

```bash
git init
git add .
git commit -m "Initial commit - Zotero Guide"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/zotero-guide.git
git push -u origin main
```

אם זו הפעם הראשונה, GitHub יבקש ממך להזדהות.

## שלב 6: הוספת gh-pages לפרסום

```bash
npm install --save-dev gh-pages
```

עכשיו פתחי את הקובץ `package.json` ותוסיפי שתי שורות בחלק של `"scripts"`:

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

שמרי את הקובץ.

## שלב 7: פרסום!

```bash
npm run deploy
```

זה ייקח כמה שניות. אחרי שזה מסיים, האתר שלך יהיה זמין ב:
`https://YOUR_USERNAME.github.io/zotero-guide/`

## שלב 8: חיבור הדומיין שלך

### אם את רוצה subdomain (כמו zotero.claudina.co.il):

1. היכנסי לניהול ה-DNS של הדומיין שלך
2. הוסיפי רישום CNAME:
   - Type: CNAME
   - Name: zotero (או כל שם שתבחרי)
   - Value: YOUR_USERNAME.github.io
   - TTL: 3600 (או אוטומטי)

3. חזרי ל-GitHub:
   - Repository > Settings > Pages
   - תחת "Custom domain" הקלידי: zotero.claudina.co.il
   - לחצי Save
   - חכי כמה דקות
   - סמני "Enforce HTTPS"

### אם את רוצה root domain (כמו claudina.co.il):

1. היכנסי לניהול ה-DNS
2. הוסיפי 4 רישומי A:
   ```
   Type: A, Name: @, Value: 185.199.108.153
   Type: A, Name: @, Value: 185.199.109.153
   Type: A, Name: @, Value: 185.199.110.153
   Type: A, Name: @, Value: 185.199.111.153
   ```

3. ב-GitHub Pages הגדירי את הדומיין כמו בסעיף הקודם.

## עדכונים עתידיים

כשאת עושה שינויים בקוד:

```bash
git add .
git commit -m "תיאור מה שינית"
git push
npm run deploy
```

או פשוט הריצי:
```bash
./deploy.sh
```

## פתרון בעיות נפוצות

### "git: command not found"
- התקיני Git מ-https://git-scm.com

### "npm: command not found"
- התקיני Node.js מ-https://nodejs.org

### "Permission denied"
ב-Mac/Linux:
```bash
sudo chmod +x deploy.sh
```

### האתר לא מופיע אחרי הפרסום
- חכי 5-10 דקות
- בדקי ב-Settings > Pages שה-deployment הצליח (צריך להיות ירוק)
- נסי לנקות cache של הדפדפן (Ctrl+Shift+R)

### הדומיין המותאם אישית לא עובד
- DNS לוקח זמן (עד 48 שעות, בדרך כלל 1-2 שעות)
- בדקי שהרישום ב-DNS נכון עם: https://dnschecker.org

## זקוקה לעזרה?
פתחי issue ב-GitHub או צרי קשר!
