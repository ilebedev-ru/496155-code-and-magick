'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.fillText('Ура вы победили!', 120, 40);

  function getMaxTime(allTimes) {

    var max = -1;

    for (var i = 0; i < allTimes.length; i++) {
      var time = allTimes[i];
      if (time > max) {
        max = time;
      }
    }
    return max;
  }

  var max = getMaxTime(times);

  // функция поиска индекса определенного значения в массиве
  function findIndex(array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i] === value) { return i;
      }
    return -1;
    }
  }

  var maxIndex = findIndex(times, max);

  var columnWidth = 40;
  var maxColumnHeigth = 150;
  var step = maxColumnHeigth / (max - 0);
  var indent = 50;

  var yourIndex = findIndex(names, 'Вы');

  // ctx.fillRect(x, y, width, height);

  ctx.fillText('Худшее время: ' + max + ' мс у игрока ' + names[maxIndex], 120, 60, 420);

  for (var i = 0; i < times.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], 120 + (indent * i) + (columnWidth * i), 250 - times[i] * step, columnWidth);
    if (i === yourIndex) {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'rgb(80, 66, 244)';
    }
    ctx.fillRect(120 + (indent * i) + (columnWidth * i), 270 - times[i] * step, columnWidth, times[i] * step);
  };
};
