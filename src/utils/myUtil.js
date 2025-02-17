/**
 * 检查金额是否最多两位小数，如果超出两位小数，那么返回false，否则返回true
 * @param {number} inputNumber
 * @returns
 */
export function checkTwoPointNum(inputNumber) {
	var partten = /^-?\d+\.?\d{0,2}$/;
	return partten.test(inputNumber)
}

/**
 * 元转分
 * @param {number} yuan
 * @returns
 */
export function regYuanToFen(yuan) {
  var digit = 100;
	var m = 0,
		s1 = yuan.toString(),
		s2 = digit.toString();
	try {
		m += s1.split(".")[1].length
	} catch (e) {}
	try {
		m += s2.split(".")[1].length
	} catch (e) {}
	return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}

function toDecimal2(x) {
	var f = parseFloat(x);
	if (isNaN(f)) {
		return false;
	}
	var f = Math.round(x * 100) / 100;
	var s = f.toString();
	var rs = s.indexOf('.');
	if (rs < 0) {
		rs = s.length;
		s += '.';
	}
	while (s.length <= rs + 2) {
		s += '0';
	}
	return s;
};
/**
 * 分转元
 * @param {number} fen
 * @returns
 */
export function regFenToYuan(fen) {
	var num = fen;
	num = fen * 0.01;
	num += '';
	var reg = num.indexOf('.') > -1 ? /(\d{1,3})(?=(?:\d{3})+\.)/g : /(\d{1,3})(?=(?:\d{3})+$)/g;
	num = num.replace(reg, '$1');
	num = toDecimal2(num)
	return num
};


// 复制字符串
export function copyText(text) {
  var textarea = document.createElement('textarea')//创建input对象
  var currentFocus = document.activeElement//当前获得焦点的元素
  document.body.appendChild(textarea)//添加元素
  textarea.value = text
  textarea.focus()
  if (textarea.setSelectionRange) {
    textarea.setSelectionRange(0, textarea.value.length)
  }//获取光标起始位置到结束位置
  else {
    textarea.select()
  }
  let flag = ''
  try {
    flag = document.execCommand('copy')//执行复制
  } catch (eo) {
    flag = false
  }
  document.body.removeChild(textarea)//删除元素
  currentFocus.focus()
  return flag
};
