/**
 * =========================================================================
 * كود Google Apps Script لربط واعتماد فحص نظافة ومعايرة كافيه ومحمصة عماد أفندي
 * =========================================================================
 * 
 * طريقة التركيب في 30 ثانية:
 * 1. افتح شيت جوجل جديد (Google Sheet) وسمه مثلاً: "سجل نظافة ومعايرة محطات عماد أفندي".
 * 2. من القائمة العلوية اضغط على: Extensions (الإضافات) -> Apps Script.
 * 3. امسح أي كود موجود والصق هذا الكود كاملاً مكانه.
 * 4. اضغط على Deploy (نشر) -> New deployment (نشر جديد).
 * 5. اختر نوع النشر: Web app (تطبيق ويب).
 * 6. في خانة "Who has access" (من يمكنه الوصول): اختر "Anyone" (أي مستخدم) حتى يتمكن الموقع من إرسال البيانات.
 * 7. اضغط Deploy وانسخ الرابط (Web App URL).
 * 8. الصق الرابط في إعدادات الموقع أو في ملف security-config.js.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // إعداد الترويسة الأنيقة إذا كان الشيت جديداً وفارغاً
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "التاريخ والوقت",
        "المحطة",
        "المسؤول / الباريستا",
        "نسبة الإنجاز",
        "البنود المكتملة",
        "إجمالي البنود",
        "تفاصيل الفحص",
        "حالة الاعتماد"
      ]);
      
      // تنسيق الترويسة باللون الذهبي والأسود لعماد أفندي
      var headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setBackground("#11141c");
      headerRange.setFontColor("#ffd700");
      headerRange.setFontWeight("bold");
      headerRange.setHorizontalAlignment("center");
      headerRange.setFontSize(11);
      sheet.setFrozenRows(1);
    }
    
    var data = JSON.parse(e.postData.contents);
    
    var timestamp = data.timestamp || Utilities.formatDate(new Date(), "GMT+2", "yyyy-MM-dd HH:mm:ss");
    var stationName = data.stationName || "محطة غير محددة";
    var inspector = data.inspector || "باريستا الشفت";
    var percentage = data.percentage || "100%";
    var checkedCount = data.checkedCount || 0;
    var totalCount = data.totalCount || 0;
    var details = data.details || "";
    var status = "معتمد ✓";
    
    // إضافة صف السجل الجديد
    sheet.appendRow([
      timestamp,
      stationName,
      inspector,
      percentage,
      checkedCount,
      totalCount,
      details,
      status
    ]);
    
    // تنسيق الصف الأخير
    var lastRow = sheet.getLastRow();
    var rowRange = sheet.getRange(lastRow, 1, 1, 8);
    rowRange.setHorizontalAlignment("center");
    sheet.getRange(lastRow, 7).setHorizontalAlignment("right"); // التفاصيل بمحاذاة اليمين
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      message: "تم اعتماد الفحص وتسجيله بنجاح في شيت عماد أفندي",
      row: lastRow
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("نظام مزامنة شيت جوجل لمحطات عماد أفندي يعمل بنجاح بنسبة 100%.");
}
