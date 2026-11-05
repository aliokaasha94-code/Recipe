/**
 * =========================================================================
 * كود Google Apps Script المطور (V2) - كافيه ومحمصة عماد أفندي
 * 1. تقسيم اليوم، التاريخ، الوقت، والشفت تلقائياً (صباحي / مسائي / إغلاق).
 * 2. تنسيق أنيق بأعمدة واضحة ومقروءة بنظرة واحدة دون نصوص متكدسة بالعرض.
 * 3. واجهة API (doGet) لتغذية لوحة تحكم المدير (Manager Dashboard) بالبيانات الحية.
 * =========================================================================
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    setupSheetHeader(sheet);
    
    var data = JSON.parse(e.postData.contents);
    var now = new Date();
    
    // 1. حساب اليوم، التاريخ، الوقت، والشفت بتوقيت مصر (GMT+2)
    var daysAr = ["الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"];
    var dayName = data.dayName || daysAr[now.getDay()];
    var dateStr = data.dateStr || Utilities.formatDate(now, "GMT+2", "yyyy-MM-dd");
    var timeStr = data.timeStr || Utilities.formatDate(now, "GMT+2", "hh:mm a");
    
    // تحديد الشفت بناءً على توقيت مصر (نظام الـ 24 ساعة - 3 شيفتات)
    var hour = parseInt(Utilities.formatDate(now, "GMT+2", "HH"), 10);
    var shiftName = data.shiftName;
    if (!shiftName) {
      if (hour >= 8 && hour < 16) {
        shiftName = "الشيفت الأول: صباحي ☀️ (8ص - 5م)";
      } else if (hour >= 16 && hour < 24) {
        shiftName = "الشيفت الثاني: مسائي 🌙 (4م - 1ص)";
      } else {
        shiftName = "الشيفت الثالث: ليلي ☕ (12ص - 9ص)";
      }
    }
    
    var stationName = data.stationName || "محطة غير محددة";
    var inspector = data.inspector || "باريستا الشفت";
    var percentage = data.percentage || "100% ✓";
    var status = "معتمد بالكامل ✓";
    
    // تنسيق البنود رأسياً بأرقام واضحة بدلاً من النص المتكدس بالعرض
    var summaryFormatted = "";
    if (data.items && Array.isArray(data.items) && data.items.length > 0) {
      summaryFormatted = data.items.map(function(item, idx) {
        return (idx + 1) + ". " + item;
      }).join("\n");
    } else if (data.details) {
      summaryFormatted = data.details.split(" • ").join("\n");
    } else {
      summaryFormatted = "تم فحص واعتماد كافة البنود 100%";
    }
    
    // إضافة السجل الجديد في الشيت
    sheet.appendRow([
      dayName,
      dateStr,
      timeStr,
      shiftName,
      stationName,
      inspector,
      percentage,
      status,
      summaryFormatted
    ]);
    
    var lastRow = sheet.getLastRow();
    
    // تنسيق الصف الجديد
    var rowRange = sheet.getRange(lastRow, 1, 1, 9);
    rowRange.setVerticalAlignment("middle");
    rowRange.setFontFamily("Cairo");
    rowRange.setFontSize(10);
    
    // محاذاة الأعمدة (توسيط لكل الأعمدة عدا ملخص البنود جهة اليمين)
    sheet.getRange(lastRow, 1, 1, 8).setHorizontalAlignment("center");
    var summaryCell = sheet.getRange(lastRow, 9);
    summaryCell.setHorizontalAlignment("right");
    summaryCell.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    
    // تمييز حالة الشفت والاعتماد باللون الأخضر الأنيق
    sheet.getRange(lastRow, 7).setFontColor("#22c55e").setFontWeight("bold"); // 100% أخضر
    sheet.getRange(lastRow, 8).setFontColor("#d4af37").setFontWeight("bold"); // معتمد ذهبي
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "تم تسجيل الفحص بنجاح في شيت عماد أفندي",
      row: lastRow,
      shift: shiftName
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * دالة قراءة السجلات الحية للداش بورد (API Endpoint)
 */
function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var lastRow = sheet.getLastRow();
    
    if (lastRow <= 1) {
      return ContentService.createTextOutput(JSON.stringify({
        status: "success",
        total: 0,
        records: []
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    var startRow = Math.max(2, lastRow - 99); // آخر 100 سجل
    var numRows = lastRow - startRow + 1;
    var data = sheet.getRange(startRow, 1, numRows, 9).getValues();
    
    var records = [];
    for (var i = data.length - 1; i >= 0; i--) { // الأحدث أولاً
      var row = data[i];
      if (!row[1] && !row[4]) continue; // تخطي الصفوف الفارغة
      records.push({
        day: row[0],
        date: row[1] instanceof Date ? Utilities.formatDate(row[1], "GMT+2", "yyyy-MM-dd") : row[1],
        time: row[2] instanceof Date ? Utilities.formatDate(row[2], "GMT+2", "hh:mm a") : row[2],
        shift: row[3],
        station: row[4],
        inspector: row[5],
        percentage: row[6],
        status: row[7],
        summary: row[8]
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      total: records.length,
      records: records
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * تهيئة وتنسيق ترويسة الشيت الفاخرة لعماد أفندي
 */
function setupSheetHeader(sheet) {
  var headers = [
    "اليوم",
    "التاريخ",
    "الوقت",
    "الشفت",
    "المحطة",
    "المسؤول / الباريستا",
    "نسبة الإنجاز",
    "حالة الاعتماد",
    "ملخص البنود المعتمدة"
  ];
  
  var currentFirstCell = sheet.getRange(1, 1).getValue();
  if (currentFirstCell !== "اليوم") {
    sheet.getRange(1, 1, 1, 9).setValues([headers]);
    
    var headerRange = sheet.getRange(1, 1, 1, 9);
    headerRange.setBackground("#0d1117");
    headerRange.setFontColor("#ffd700");
    headerRange.setFontWeight("bold");
    headerRange.setFontFamily("Cairo");
    headerRange.setFontSize(11);
    headerRange.setHorizontalAlignment("center");
    headerRange.setVerticalAlignment("middle");
    headerRange.setWrapStrategy(SpreadsheetApp.WrapStrategy.WRAP);
    sheet.setRowHeight(1, 40);
    sheet.setFrozenRows(1);
    
    // ضبط عروض الأعمدة لسهولة القراءة بنظرة واحدة
    sheet.setColumnWidth(1, 85);  // اليوم
    sheet.setColumnWidth(2, 105); // التاريخ
    sheet.setColumnWidth(3, 95);  // الوقت
    sheet.setColumnWidth(4, 130); // الشفت
    sheet.setColumnWidth(5, 180); // المحطة
    sheet.setColumnWidth(6, 150); // الباريستا
    sheet.setColumnWidth(7, 105); // نسبة الإنجاز
    sheet.setColumnWidth(8, 115); // حالة الاعتماد
    sheet.setColumnWidth(9, 360); // ملخص البنود
  }
}
