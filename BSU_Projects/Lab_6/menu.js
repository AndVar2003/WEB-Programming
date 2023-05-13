const menuA = 
[

    {
      name: 'Газета', submenu: [
        {
          name: 'СБ', submenu: [
            { name: 'Издание от 01.04.2023', url: 'http://www.av.by' },
            { name: 'Издание от 05.04.2023', url: 'http://www.av.by' }
          ]
        },
        { name: 'БелГазета', url: 'http://www.av.by' },
        {
          name: 'КП', submenu: [
            { name: 'Издание от 01.04.2023', url: 'http://www.av.by' },
            { name: 'Издание от 05.04.2023', url: 'http://www.av.by' },
            { name: 'Издание от 07.04.2023', url: 'http://www.av.by' },
            { name: 'Издание от 08.04.2023', url: 'http://www.av.by' }
          ]
        }
      ]
    },
    { name: 'Календарь', url: 'http://www.av.by' },
    {
      name: 'Журнал', submenu: [
        { name: 'Научный', url: 'http://www.av.by' },
        { name: 'Спортивный', url: 'http://www.av.by' }
      ]
    }
  ];
  
  const showMenu = (items, parent) =>
   {
    const listElement = document.createElement('ul');
    items.forEach((item) => {
      const itemElement = makeMenuItem(item);
      listElement.appendChild(itemElement);
    });
    parent.appendChild(listElement);
  }
  
  const makeMenuItem = (item) => {
    const listItemElem = document.createElement('li');
    if (item.submenu) {
      listItemElem.append(item.name);
      listItemElem.onclick = (event) => {
        if (event.target !== event.currentTarget) return;
        if (hideMenu(listItemElem)) {
          listItemElem.classList.remove('opened');
          return;
        }
        showMenu(item.submenu, listItemElem);
        listItemElem.classList.add('opened');
      };
      listItemElem.classList.add('has-submenu');
    }
    if (item.url) {
      const anchor = makeAnchor(item.name, item.url);
      listItemElem.appendChild(anchor);
    }
  
    listItemElem.classList.add(['menu-item']);
  
    return listItemElem;
  }
  
  const makeAnchor = (name, url) => {
    const listItemAnchor = document.createElement('a');
    listItemAnchor.textContent = name;
    listItemAnchor.href = url;
    return listItemAnchor;
  }
  
  const hideMenu = (parent) => 
  {
    const listElement = parent.querySelector('ul');
    if (listElement) {
      listElement.remove();
      return true;
    }
    return false;
  }
  
  const menuContainer = document.getElementById('tree-menu');
  
  showMenu(menuA, menuContainer);