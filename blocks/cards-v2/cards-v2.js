import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const link = block.querySelector('a');
  let data = [];

  function modifyHTML() {
    block.innerHTML = '';

    const ul = document.createElement('ul');

    data.forEach((item) => {
      const picture = createOptimizedPicture(item.Image, item.Title, false, [{ width: 800 }]);
      picture.lastElementChild.width = '800';
      picture.lastElementChild.height = '800';
      const createdCard = document.createElement('li');
      createdCard.innerHTML = `
        <a href="${item.URL}" class="cards-card-image" aria-label="${item['Anchor-Text']}">
          <div data-align="center">${picture.outerHTML}</div>
        </a>
        <div class="cards-card-body">
          <h5>${item.Title}</h5>
          <p>${item.Description}</p>
          <p class="button-container">
            <a href="${item.URL}" aria-label="${item['Anchor-Text']}" title="${item['Anchor-Text']}" class="button">${item['Anchor-Text']}</a>
          </p>
        </div>
      `;
      ul.append(createdCard);
    });

    block.append(ul);
  }

  async function initialize() {
    const url = `https://author-p142507-e1463170.adobeaemcloud.com${link.title}.json`
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'text/html',
      },
      method: 'get',
      credentials: 'include',
      mode: 'no-cors'  // This allows cross-origin requests
    });

    if (response.ok) {
      const jsonData = await response.json();
      data = jsonData?.data;
      modifyHTML();
    }
  }

  initialize();
}