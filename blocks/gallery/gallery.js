export default function decorate(block) {
  const galleryItems = [...block.children];

  galleryItems.forEach((child) => {
    child.classList.add('gallery-item');
  });
}