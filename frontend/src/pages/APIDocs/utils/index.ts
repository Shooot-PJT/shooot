import colorPalette from '../../../styles/colorPalette';

export const getRandomColor = () => {
  const colors = [
    colorPalette.amber[100],
    colorPalette.blue[100],
    colorPalette.brown[100],
    colorPalette.deepOrange[100],
    colorPalette.green[100],
    colorPalette.pink[100],
    colorPalette.purple[100],
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

export const getUrlFromParamsAndPath = () => {
  const params = [
    { key: 'query', value: '영화' },
    { key: 'category', value: '액션' },
  ];
  const pathVariables = [
    { key: 'id', value: '123' },
    { key: 'lang', value: 'kr' },
  ];

  const paramsString = params.map((p) => `${p.key}=${p.value}`).join('&');
  const pathString = pathVariables.map((p) => p.value).join('/');

  return `https://www.example.com/${pathString}?${paramsString}`;
};
