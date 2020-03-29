const convertTime = (now) => {
  const date = `${now.getFullYear()}-${(now.getMonth() + 1)}-${now.getDate()}`;
  const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
  const currentTime = `${date} ${time}`;
  
  return currentTime;
};

module.exports = convertTime;