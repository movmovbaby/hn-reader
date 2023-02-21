const dateFormat = (time) => {
  const hh = new Date(time * 1000).toLocaleTimeString('ru-RU').slice(0, -3);
  const dd = new Date(time * 1000).toLocaleDateString('ru-RU');
  return `${hh} ${dd}`;
};

export default dateFormat;
