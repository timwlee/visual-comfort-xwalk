export default function decorate(block) {
  const container = block.firstElementChild;
  container.classList.add('gallery-container');

  [...container.children].forEach((child) => {
    child.classList.add('gallery-item');
  });
}