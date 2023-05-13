const homePageHtml = `
  <div>
    <h2>Интернет-магазин Книжный Клуб</h2>
    <p>Книжный Клуб — компания с добрым сердцем и широкой душой!</p>
    <p>Вот уже более 13 лет мы занимаемся любимым делом — предлагаем нашим покупателям лучшие книги и товары.</p>
    <h3>С момента основания компании и до настоящего времени наши приоритеты остаются неизменными:</h3>
    <ul class="features">
      <li>честные цены и выгодные предложения</li>
      <li>максимально широкий выбор и качество книг и товаров</li>
      <li>щедрость, ведь мы очень любим дарить подарки, и отзывчивость</li>
      <li>а самое главное — довольные покупатели и счастливые сотрудники</li>
    </ul>
    <p>Мы действительно любим то, что мы делаем. Мы – творческие и разносторонние, старательные и амбициозные. У нас особенное, трепетное отношение к книгам и товарам, которые мы предлагаем покупателям. Ведь, согласитесь, нет ничего лучше аромата новой книги или предвкушения сюрприза перед распаковкой заказа! Спасибо, что доверяете нам!</p>
  </div>
`;

const subjectPageHtml = `
  <div>
    <h2>Visitors</h2>
    <table>
      <thead>
        <tr>
          <th>Login</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody id="table-body">
      </tbody>
    </table>
    <a href="/data" class='download-button' >Download</a>
  </div>
`;

const loadData = (data) => {
  for (key in data) {
    const row = $('<tr>');
    const loginCell = $('<td>').text(key);
    const nameCell = $('<td>').text(data[key]);
    row.append(loginCell);
    row.append(nameCell);
    $('#table-body').append(row);
  }
}

const subjectPageOnLoad = () => {
  $.ajax({
    url: '/data/visitors.json',
    dataType: 'json',
    success: loadData,
    error: function (jqXHR, textStatus, errorThrown) {
      console.error(textStatus, errorThrown);
    }
  });
}

const changePage = (page) => {
  $('#current-page').html(page.html);
  if (page.onload) {
    page.onload();
  }
}

const storeCurrentPage = () => {
  localStorage.setItem('currentPage', window.location.hash);
}

const loadCurrentPage = () => {
  return localStorage.getItem('currentPage');
}

const changeUrlHash = (hash) => {
  location.hash = hash;
}

const hashChangeHandler = () => {
  let UrlHash = window.location.hash;
  if (!UrlHash) {
    UrlHash = loadCurrentPage();
    if (!UrlHash) {
      UrlHash = "#Home";
    }
  }
  const pageKey = UrlHash.substring(1);
  changePage(pagesHash[pageKey]);
  storeCurrentPage();
}

const makePagesNavItems = (pages) => {
  for (const key in pages) {
    const page = pages[key];
    const item = $('<li>');
    const anchor = $(`<a href=#${key}>${page.name}</a>`);
    item.append(anchor);
    $('#pages-list').append(item);
  }
}

const pagesHash = {
  "Home": {
    name: "Home",
    html: homePageHtml
  },
  "Subject": {
    name: "Visitors",
    html: subjectPageHtml,
    onload: subjectPageOnLoad
  }
}

window.onhashchange = hashChangeHandler;
makePagesNavItems(pagesHash);
hashChangeHandler();
