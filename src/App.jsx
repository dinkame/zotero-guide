import React, { useState } from 'react';
import { BookOpen, Globe, List, ArrowRight, ArrowLeft, CheckCircle, AlertCircle, FileText } from 'lucide-react';

export default function ZoteroGuide() {
  const [currentStep, setCurrentStep] = useState('start');
  const [history, setHistory] = useState(['start']);

  const goToStep = (step) => {
    setHistory([...history, step]);
    setCurrentStep(step);
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentStep(newHistory[newHistory.length - 1]);
    }
  };

  const resetGuide = () => {
    setCurrentStep('start');
    setHistory(['start']);
  };

  const steps = {
    start: {
      title: 'איסוף חכם: הכנסת מקורות ל-Zotero',
      subtitle: 'מציע מגוון דרכים להוסיף פריטים לספרייה שלכם, תוך מיגבוא אוטומטי ועד הזנה ידנית. הבחירה בשיטה הנכונה תלויה בעיקר בסוג המקור ובשפתו',
      question: 'מהו סוג המקור שברצונך להוסיף?',
      options: [
        { id: 'english', label: 'ספר או מאמר באנגלית', icon: BookOpen },
        { id: 'hebrew', label: 'ספר או מאמר בעברית', icon: BookOpen },
        { id: 'web', label: 'מקור אינטרנט אחר', icon: Globe },
        { id: 'list', label: 'רשימה מוכנה / סילבוס', icon: List }
      ]
    },
    english: {
      title: 'מקור באנגלית',
      instruction: [
        { step: '1', text: 'העתק את המזהה הייחודי של המקור', detail: 'מאמר - DOI | ספר - ISBN' },
        { step: '2', text: 'פתח את Zotero ולחץ על האייקון "שרביט הקסם" 🪄' },
        { step: '3', text: 'הדבק את הקוד ולחץ Enter' }
      ],
      next: 'qc'
    },
    hebrew: {
      title: 'מקור בעברית',
      subtitle: 'בואו נבדוק את האפשרויות הזמינות',
      instruction: [
        { step: '1', text: 'חפש את המקור בקטלוג הספרייה (אוניברסיטה / לאומית)' },
        { step: '2', text: 'בדוק האם קיים קובץ BibTeX להורדה' }
      ],
      options: [
        { id: 'bib-yes', label: 'כן, מצאתי קובץ BibTeX' },
        { id: 'bib-no', label: 'לא, אין קובץ כזה' }
      ]
    },
    'bib-yes': {
      title: 'מצוין! יש קובץ BibTeX',
      instruction: [
        { step: '1', text: 'הורד את קובץ ה-BibTeX מהספרייה' },
        { step: '2', text: 'פתח את Zotero' },
        { step: '3', text: 'גרור את הקובץ לחלון Zotero או השתמש ב-File > Import' }
      ],
      next: 'translated'
    },
    'bib-no': {
      title: 'אין בעיה, יש פתרון!',
      instruction: [
        { step: '1', text: 'פנה ל"סוכן החכם של דינה"', detail: 'שלח את הפרטים הבסיסיים של המקור' },
        { step: '2', text: 'העתק את ה-Metadata שהסוכן יחזיר לך' },
        { step: '3', text: 'ב-Zotero: לחץ ימני בספרייה > Paste Special (או Ctrl+Shift+V)' }
      ],
      next: 'translated'
    },
    translated: {
      title: 'האם המקור הוא תרגום?',
      subtitle: 'חשוב להבחין בין מקורות שנכתבו במקור בעברית לבין תרגומים',
      question: 'האם המקור בעברית שהוספת הוא תרגום משפה אחרת?',
      examples: [
        '✓ תרגום: ספר של פרויד שתורגם לעברית',
        '✓ תרגום: מאמר של יונג שפורסם בתרגום עברי',
        '✗ לא תרגום: מאמר של עפרת שהוא כתב בעברית',
        '✗ לא תרגום: ספר של גרוסמן שנכתב במקור בעברית'
      ],
      options: [
        { id: 'is-translation', label: 'כן, זה תרגום לעברית' },
        { id: 'not-translation', label: 'לא, נכתב במקור בעברית' }
      ]
    },
    'is-translation': {
      title: 'הוספת מידע על המקור המקורי',
      subtitle: 'למקורות מתורגמים חובה להוסיף מידע במחוץ Extra',
      instruction: [
        { step: '1', text: 'פתח את המקור ב-Zotero' },
        { step: '2', text: 'מצא את השדה "Extra" (בלוח הימני)' },
        { step: '3', text: 'הוסף את השורות הבאות (כל שורה בנפרד):', bold: true }
      ],
      codeExample: {
        title: 'העתק והדבק את הפורמט הזה:',
        lines: [
          'Original Author: [שם משפחה, שם פרטי]',
          'Original Title: [כותרת בשפת המקור]',
          'Original Date: [שנה]',
          'Original Publisher: [הוצאה מקורית]'
        ]
      },
      realExample: {
        title: 'דוגמה אמיתית:',
        lines: [
          'Original Author: Freud, Sigmund',
          'Original Title: The Ego and the Id',
          'Original Date: 1923',
          'Original Publisher: International Psycho-Analytical Press'
        ]
      },
      warning: 'לפחות Original Date הוא שדה חובה! ללא זה הציטוט לא יהיה תקין לפי APA 7',
      next: 'qc'
    },
    'not-translation': {
      title: 'מצוין!',
      instruction: [
        { step: '✓', text: 'מקור שנכתב במקור בעברית לא דורש הוספת שדות Extra מיוחדים' },
        { step: '→', text: 'אפשר להמשיך לבקרת איכות' }
      ],
      next: 'qc'
    },
    web: {
      title: 'מקור אינטרנט',
      instruction: [
        { step: '1', text: 'וודא שהתקנת את Zotero Connector בדפדפן שלך' },
        { step: '2', text: 'גלוש לעמוד האינטרנט עם המקור' },
        { step: '3', text: 'לחץ על האייקון של Zotero Connector בסרגל הדפדפן 📎' },
        { step: '4', text: 'המקור יישמר אוטומטית ב-Zotero' }
      ],
      next: 'qc'
    },
    list: {
      title: 'ייבוא רשימה מלאה',
      instruction: [
        { step: '1', text: 'העתק את כל הרשימה / הסילבוס' },
        { step: '2', text: 'שלח את הרשימה ל"סוכן החכם של דינה"' },
        { step: '3', text: 'קבל קוד לייבוא המוני' },
        { step: '4', text: 'בצע את הייבוא ל-Zotero' }
      ],
      next: 'qc'
    },
    qc: {
      title: 'בקרת איכות — שלב חובה!',
      subtitle: 'לפני שמסיימים, חשוב מאוד לוודא שהמידע תקין',
      instruction: [
        { step: '✓', text: 'בדוק בלוח הצדדי של Zotero:' },
        { step: '', text: 'שם המחבר מופיע נכון ומלא' },
        { step: '', text: 'שנת הפרסום נכונה' },
        { step: '', text: 'כותרת המקור מדויקת' },
        { step: '', text: 'פרטים נוספים רלוונטיים (שם כתב עת, עורך, וכו׳)' },
        { step: '', text: 'אם זה תרגום - וודא ששדה Extra מכיל את Original Date לפחות!' }
      ],
      warning: 'אם משהו לא תקין — תקן ידנית לפני שממשיכים!',
      complete: true
    }
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gray-800 p-6 md:p-12" dir="rtl">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-right mb-12">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {currentStepData.title}
            </h1>
            {currentStep !== 'start' && (
              <button
                onClick={resetGuide}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors text-sm font-medium"
              >
                שלב נ׳
              </button>
            )}
          </div>
          {currentStepData.subtitle && (
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl">
              {currentStepData.subtitle}
            </p>
          )}
        </div>

        {/* Progress indicator */}
        {history.length > 1 && (
          <div className="flex items-center gap-2 mb-8">
            {history.map((_, index) => (
              <div
                key={index}
                className={`h-1 rounded-full transition-all ${
                  index === history.length - 1 ? 'w-12 bg-purple-500' : 'w-8 bg-gray-600'
                }`}
              />
            ))}
          </div>
        )}

        {/* Question */}
        {currentStepData.question && (
          <p className="text-2xl text-white font-medium mb-8">
            {currentStepData.question}
          </p>
        )}

        {/* Examples */}
        {currentStepData.examples && (
          <div className="bg-gray-700 rounded-lg p-6 mb-8">
            <p className="text-purple-400 font-semibold mb-4">דוגמאות להבהרה:</p>
            <div className="space-y-2">
              {currentStepData.examples.map((example, index) => (
                <p key={index} className="text-gray-300 text-lg">
                  {example}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Options as cards */}
        {currentStepData.options && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {currentStepData.options.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => goToStep(option.id)}
                  className="group relative bg-gray-700 hover:bg-gray-650 border-r-4 border-purple-500 rounded-lg p-6 text-right transition-all"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {Icon && (
                        <div className="bg-gray-600 p-3 rounded-lg">
                          <Icon size={24} className="text-purple-400" />
                        </div>
                      )}
                      <span className="text-xl text-white font-medium">{option.label}</span>
                    </div>
                    <ArrowRight className="text-purple-400 opacity-50 group-hover:opacity-100 transition-opacity" size={24} />
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Instructions */}
        {currentStepData.instruction && (
          <div className="bg-gray-700 border-r-4 border-purple-500 rounded-lg p-8 mb-8">
            <div className="space-y-6">
              {currentStepData.instruction.map((item, index) => (
                <div key={index} className="flex gap-4 items-start">
                  {item.step && (
                    <div className="flex-shrink-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        item.step === '✓' || item.step === '→' ? 'bg-purple-600 text-white' : 
                        item.step === '⚠️' ? 'bg-amber-600 text-white' :
                        'bg-gray-600 text-white'
                      }`}>
                        {item.step}
                      </div>
                    </div>
                  )}
                  <div className="flex-1">
                    <p className={`text-white leading-relaxed ${item.bold ? 'text-xl font-bold' : 'text-lg'}`}>
                      {item.text}
                    </p>
                    {item.detail && (
                      <p className="text-purple-400 font-medium mt-2">{item.detail}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Code Example */}
        {currentStepData.codeExample && (
          <div className="bg-gray-900 border-2 border-purple-500 rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-purple-400" size={24} />
              <p className="text-purple-400 font-bold text-lg">{currentStepData.codeExample.title}</p>
            </div>
            <div className="bg-gray-950 rounded p-4 font-mono text-sm">
              {currentStepData.codeExample.lines.map((line, index) => (
                <div key={index} className="text-green-400 mb-1">
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Real Example */}
        {currentStepData.realExample && (
          <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-purple-400 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="text-purple-400" size={24} />
              <p className="text-purple-300 font-bold text-lg">{currentStepData.realExample.title}</p>
            </div>
            <div className="bg-gray-950 rounded p-4 font-mono text-sm">
              {currentStepData.realExample.lines.map((line, index) => (
                <div key={index} className="text-cyan-300 mb-1">
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warning */}
        {currentStepData.warning && (
          <div className="bg-amber-900/30 border-r-4 border-amber-500 rounded-lg p-6 mb-8 flex items-start gap-4">
            <AlertCircle className="text-amber-400 flex-shrink-0 mt-1" size={24} />
            <p className="text-amber-200 text-lg font-medium">{currentStepData.warning}</p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-4 items-center mt-8">
          {history.length > 1 && !currentStepData.complete && (
            <button
              onClick={goBack}
              className="flex items-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-650 text-white rounded-lg transition-colors font-medium"
            >
              <ArrowLeft size={20} />
              חזרה
            </button>
          )}

          {currentStepData.next && (
            <button
              onClick={() => goToStep(currentStepData.next)}
              className="flex items-center gap-2 px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-semibold"
            >
              המשך
              <ArrowRight size={20} />
            </button>
          )}

          {currentStepData.complete && (
            <button
              onClick={resetGuide}
              className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-semibold"
            >
              <CheckCircle size={20} />
              סיימתי! התחל מחדש
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
