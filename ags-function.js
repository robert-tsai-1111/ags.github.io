/**
    * 計算當前日期後第 N 個工作日（跳過週六和週日）。
    * @param {number} workdays 要增加的工作日數量。
    * @returns {Date} 計算後的日期物件。
    */
function calculateFutureWorkday(workdays) {
    let date = new Date();
    let daysToAdd = 0;

    while (daysToAdd < workdays) {
        date.setDate(date.getDate() + 1); // 增加一天
        let dayOfWeek = date.getDay(); // 0 = 星期日, 6 = 星期六

        // 只有星期一到星期五 (1-5) 才算作工作日
        if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            daysToAdd++;
        }
    }
    return date;
}

/**
    * 格式化日期時間為 Google Calendar URL 所需的 YYYYMMDDThhmmss 格式。
    * @param {Date} dateObj - 日期物件。
    * @param {number} hour - 時 (CST/UTC+8)。
    * @param {number} minute - 分 (CST/UTC+8)。
    * @returns {string} 格式化後的 UTC 時間字串。
    */
function formatTimeForGoogleCalendar(dateObj, hour, minute) {
    // 臺北時區 (CST/UTC+8) 的時區偏移量是 -480 分鐘
    const CST_OFFSET = 480; 
    
    // 為了計算 UTC 時間，我們需要將日期物件的時間設定為目標 CST 時間，
    // 然後使用 toISOString() 取得 UTC 時間，最後格式化。
    
    let targetDate = new Date(dateObj);
    // 設定目標時間 12:00 CST (使用 setUTCHours 以避免本地時區影響，但需補償偏移)
    // 臺北時間 12:00 PM = UTC 4:00 AM
    // 臺北時間 12:30 PM = UTC 4:30 AM
    
    let utcHour = hour - 8; // 因為臺北是 UTC+8

    // 設定 UTC 時間（會自動處理日期跨越問題）
    targetDate.setUTCHours(utcHour, minute, 0, 0); 

    // 格式化為 YYYYMMDDThhmmssZ
    let year = targetDate.getUTCFullYear();
    let month = String(targetDate.getUTCMonth() + 1).padStart(2, '0');
    let day = String(targetDate.getUTCDate()).padStart(2, '0');
    let h = String(targetDate.getUTCHours()).padStart(2, '0');
    let m = String(targetDate.getUTCMinutes()).padStart(2, '0');
    let s = '00';

    return `${year}${month}${day}T${h}${m}${s}`;
}


function createMeetingLink() {
    // 1. 計算日期：兩個工作日之後的日期
    const futureDate = calculateFutureWorkday(2); 

    // 2. 設定時間：12:00 PM (開始) 和 12:30 PM (結束) CST
    const startTime = formatTimeForGoogleCalendar(futureDate, 12, 0); // 12:00 PM CST
    const endTime = formatTimeForGoogleCalendar(futureDate, 12, 30); // 12:30 PM CST

    // 3. 連結參數 (已 URL 編碼)
    const title = 'AGS Robert %E5%B0%88%E5%AE%B6%E6%9C%83%E8%AD%B0'; // AGS專家會議
    const attendee = 'robert.tsai.1111@gmail.com';
    const dates = `${startTime}/${endTime}`;
    const psText = "小提醒: 會議時間應為次工作日後的 12:00 PM - 12:30 PM (台北時間)";
    const details = encodeURIComponent(psText);

    // 4. 構建完整的 URL
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&add=${attendee}&details=${details}&sf=true&output=xml`;

    // 5. 開啟新視窗
    window.open(calendarUrl, '_blank');
}
