const easeInOutSine = progress => {
  return Math.sin((Math.PI / 2) * progress);
};

module.exports = function(
  object,
  propertyName,
  finalValue,
  duration,
  onStep,
  callback
) {
  let startTime = Date.now();
  let endTime = startTime + duration;
  let initialValue = object[propertyName];
  let valueDelta = finalValue - initialValue;
  step();

  function step() {
    let progress = Math.min((duration - (endTime - Date.now())) / duration, 1);

    progress = easeInOutSine(progress);

    object[propertyName] = initialValue + valueDelta * progress;

    if (onStep) {
      onStep(object[propertyName]);
    }

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else if (callback) {
      callback();
    }
  }
};
