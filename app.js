const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.header nav');
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));
const dialog = document.querySelector('#booking');
const service = document.querySelector('#service');
document.querySelectorAll('[data-book]').forEach(button => button.addEventListener('click', () => {
  service.value = button.dataset.service || 'Avaliação personalizada';
  dialog.showModal();
  document.body.classList.add('modal-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => document.body.classList.remove('modal-open'));
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
});
document.querySelector('#booking-form').addEventListener('submit', event => {
  event.preventDefault();
  const nameInput = document.querySelector('#name');
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.setCustomValidity('Por favor, informe seu nome.');
    nameInput.reportValidity();
    return;
  }
  const extra = document.querySelector('#message').value.trim();
  const message = `Olá, Camila! Me chamo ${name}. Gostaria de saber mais sobre ${service.value.toLowerCase()} e consultar os horários disponíveis.${extra ? `\n\n${extra}` : ''}`;
  const url = `https://wa.me/5592994758402?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});
document.querySelector('#name').addEventListener('input', event => event.target.setCustomValidity(''));
document.querySelector('#year').textContent = new Date().getFullYear();
