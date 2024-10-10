// import { createOptimizedPicture } from '../../scripts/aem.js';

// export default function decorate(block) {
//   const hasNonLinkElements = block.querySelector('p');
//   const ul = document.createElement('ul');

//   [...block.children].forEach((row) => {
//     const linkElement = row.querySelector('a');
//     const pictureElement = row.querySelector('picture');
    
//     // Only process the row if both a link and a picture are present
//     if (linkElement && pictureElement) {
//       const link = linkElement.href;
//       const title = linkElement.title;
//       const li = document.createElement('li');

//       // Move all child elements of the row into the li
//       while (row.firstElementChild) li.append(row.firstElementChild);

//       [...li.children].forEach((div) => {
//         if (div.children.length === 1 && div.querySelector('picture')) {
//           if (link) {
//             const a = document.createElement('a');
//             a.href = link;
//             a.setAttribute('aria-label', title);
//             a.append(div.cloneNode(true));
//             div.replaceWith(a);
//             a.className = 'cards-card-image';
//           } else {
//             div.className = 'cards-card-image';
//           }
//         } else {
//           div.className = 'cards-card-body';
//           if (!hasNonLinkElements) {
//             const a = div.querySelector('a');
//             if (a) a.classList.add('single');
//           }
//         }
//       });

//       ul.append(li);
//     }
//   });

//   ul.querySelectorAll('img').forEach((img) => 
//     img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  
//   block.textContent = '';
//   block.append(ul);
// }

import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });
  block.textContent = '';
  block.append(ul);
}