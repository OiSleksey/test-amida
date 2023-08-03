const path = require('path');

module.exports = {
  entry: './src/index.js', // Вказуйте головний файл вашого проекту з імпортами
  output: {
    filename: 'script.min.js',
    path: path.resolve(__dirname, 'dist'),
  },
  mode: 'production', // або 'development' для режиму розробки
};
