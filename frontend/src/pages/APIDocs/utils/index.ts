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
