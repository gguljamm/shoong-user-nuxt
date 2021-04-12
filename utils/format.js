function zeros(n) {
  let zero = '';
  let newN = n;
  newN = n.toString();
  if (newN.length < 2) {
    for (let i = 0; i < 2 - newN.length; i += 1) {
      zero += '0';
    }
  }
  return zero + newN;
}
function formatDate(time) {
  // const month = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
  const dow = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const date = new Date(time);
  return `${date.getMonth() + 1}.${date.getDate()}.${dow[date.getDay()]}`;
}
function formatTime(time) {
  const date = new Date(time);
  let hour = date.getHours();
  let tag = 'AM';
  if (hour >= 12) {
    tag = 'PM';
  }
  if (hour >= 13) {
    hour -= 12;
  }
  return `${hour}:${this.zeros(date.getMinutes())} ${tag}`;
}

export default {
  zeros,
  formatDate,
  formatTime,
};
