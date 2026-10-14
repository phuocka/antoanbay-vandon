(() => {
  const name = document.querySelector('header .agency-name');
  if (!name) return;
  const brand = name.parentElement;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const fit = () => {
    const style = getComputedStyle(name);
    const brandStyle = getComputedStyle(brand);
    const siblings = [...brand.children].filter(el => el !== name && getComputedStyle(el).display !== 'none');
    const available = brand.clientWidth - siblings.reduce((sum, el) => sum + el.getBoundingClientRect().width, 0) - siblings.length * (parseFloat(brandStyle.columnGap) || 0);
    const small = name.querySelector('small');
    const lines = [name.firstChild.textContent.trim(), small ? small.textContent.trim() : ''].filter(Boolean);
    if (!lines.length) return;
    ctx.font = `700 100px ${style.fontFamily}`;
    const width = Math.max(...lines.map(line => ctx.measureText(line).width));
    if (available > 0 && width > 0) name.style.fontSize = `${Math.floor((available - 1) * 10000 / width) / 100}px`;
  };
  let frame;
  const queue = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(fit); };
  new ResizeObserver(queue).observe(brand);
  document.fonts.ready.then(queue);
  document.fonts.addEventListener('loadingdone', queue);
  queue();
})();
