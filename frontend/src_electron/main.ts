import { BrowserWindow, app } from 'electron';
const BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : 'https://shooot.co.kr';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 800,
    minWidth: 1024,
    minHeight: 600,
    resizable: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.loadURL(BASE_URL);
  mainWindow.webContents.setZoomFactor(0.5);
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
