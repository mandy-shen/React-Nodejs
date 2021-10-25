"use strict";

(function iife() {
  const items = [
    {
      name: 'cookie',
      quantity: 6,
    },
    {
      name: 'candy',
      quantity: 5,
    },
    {
      name: 'ice cream',
      quantity: 4,
    },
  ];

  const listEl = document.querySelector('#item-app .items');
  const inputEl = document.querySelector('#item-app #add-input');
  const buttonEl = document.querySelector('#item-app #add-btn');

  disableButtonIfNoInput();
  addItem();
  delItem();
  addItemQuantity();
  delItemQuantity();

  render(items);

  function render(items) {
    const html = items.map( (item, index) => {
      return `
        <li>
            <button class="delete" data-index="${index}">X</button>
            <span class="item" data-index="${index}">${item.name}</span>:
            <span class="quantity" data-index="${index}">${item.quantity}</span>
            <button class="increase" data-index="${index}">+</button>
            <button class="decrease" data-index="${index}" ${item.quantity===0 ? "disabled" : ""}>-</button>
        </li>
      `;

    }).join('');

    listEl.innerHTML = html;
    buttonEl.disabled = !inputEl.value;
  }

  function disableButtonIfNoInput() {
    inputEl.addEventListener('input', () => {
      buttonEl.disabled = !inputEl.value;
    });
  }

  function addItem() {
    buttonEl.addEventListener('click', () => {
      const newItem = {
        name: inputEl.value,
        quantity: 0,
      };

      items.push(newItem);
      inputEl.value = '';

      render(items);
    });
  }

  function delItem() {
    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('delete'))
        return;

      const index = e.target.dataset.index;
      items.splice(index, 1);
      
      render(items);
    });
  }

  function addItemQuantity() {
    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('increase'))
        return;

      const index = e.target.dataset.index;
      items[index].quantity++;

      render(items);
    });
  }

  function delItemQuantity() {
    listEl.addEventListener('click', (e) => {
      if(!e.target.classList.contains('decrease'))
        return;

      const index = e.target.dataset.index;
      items[index].quantity--;

      render(items);
    });
  }

})();


