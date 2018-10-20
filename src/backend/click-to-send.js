
module.exports = async function clickToSend() {
  const findElement = selector => document.querySelector(selector);

  const awaitFor = (selector) => {
    return new Promise((resolve, reject) => {
      const hasInput = findElement('[contenteditable]');
      const popMgs = findElement('[data-animate-modal-popup]');
      const invalidMgs = popMgs ? popMgs.textContent.includes('invalid') : false;

      if (invalidMgs) {
        return reject();
      } else if (hasInput) {
        return resolve();
      }
      setTimeout(() => {
        awaitFor(selector).then(resolve);
      }, 100);
    });
  }

  let type;
  try {
    await awaitFor();

    type = 'ws-success';
    const x =  document.querySelectorAll('footer button span[data-icon=\"send\"]')[0].parentNode;
	x.addEventListener('click', function(){
		setTimeout(() => {
			window.chrome.runtime.sendMessage({ type });
			window.close();
		}, 500);
	});
	x.click(); 
  } catch (e) {
    type = 'ws-invalid';
  }
}