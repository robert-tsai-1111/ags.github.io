source /Users/robert/app/ags-estate/env.sh

echo "✅︎✅︎✅︎ ags_validation...START"
echo "pwd: " $PWD

KEY="新竹"
KEY_EN="Hsinchu"
echo "🟢 Validate ${KEY} ${KEY_EN}..."
echo "(資料日期)"
grep -oE ".{0,11}資料日期.{0,11}" *${KEY_EN}*.html
echo "(資料筆數)"
grep ${KEY} *${KEY_EN}*.html | wc -l

KEY="桃園"
KEY_EN="Taoyuan"
echo "🟢 Validate ${KEY} ${KEY_EN}..."
echo "(資料日期)"
grep -oE ".{0,11}資料日期.{0,11}" *${KEY_EN}*.html
echo "(資料筆數)"
grep $KEY *${KEY_EN}*.html | wc -l


KEY="新北"
KEY_EN="NewTaipei"
echo "🟢 Validate ${KEY} ${KEY_EN}..."
echo "(資料日期)"
grep -oE ".{0,11}資料日期.{0,11}" *${KEY_EN}*.html
echo "(資料筆數)"
grep $KEY *${KEY_EN}*.html | wc -l


KEY="台北"
KEY_EN="Taipei"
echo "🟢 Validate ${KEY} ${KEY_EN}..."
echo "(資料日期)"
grep -oE ".{0,11}資料日期.{0,11}" *${KEY_EN}*.html
echo "(資料筆數)"
grep $KEY *${KEY_EN}*.html | wc -l


KEY="苗栗"
KEY_EN="Miaoli"
echo "🟢 Validate ${KEY} ${KEY_EN}..."
echo "(資料日期)"
grep -oE ".{0,11}資料日期.{0,11}" *${KEY_EN}*.html
echo "(資料筆數)"
grep $KEY *${KEY_EN}*.html | wc -l

echo "✅︎✅︎✅︎ ags_validation...END"
echo ""
echo "AGS Icons ✅ ❤️️ 🔴 🟡 🟢 ⚠️ ❌ ❓ ❗ 🚫 ⛔ 🟦 🟥"
