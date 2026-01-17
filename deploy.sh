#!/bin/bash

echo "🚀 מתחיל תהליך פרסום..."

# Build the app
echo "📦 בונה את האפליקציה..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ בנייה הושלמה בהצלחה!"
    
    # Deploy to GitHub Pages
    echo "🌐 מפרסם ל-GitHub Pages..."
    npm run deploy
    
    if [ $? -eq 0 ]; then
        echo "🎉 הפרסום הושלם בהצלחה!"
        echo "האתר יהיה זמין בעוד כמה דקות"
    else
        echo "❌ הפרסום נכשל"
        exit 1
    fi
else
    echo "❌ הבנייה נכשלה"
    exit 1
fi
