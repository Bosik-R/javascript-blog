'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

const opt = {
  articleSelector: '.post',
  titleSelector : '.post-title',
  titleListSelector: '.titles',
  articeleTagsSelector: '.post-tags .list',
  tagsListenerSelector: 'a[href^="#tag-"]',
  articleAuthorSelector: '.post-author',
  authorListenerSelector: 'a[href^="#author-"]',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.list.authors',
};

const titleClickHandler = function(event){
  console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* [DONE] add class 'active' to the clicked link */
  event.preventDefault();
  const clickedElement = this;
  console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.posts .active');

  for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* [DONE] get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  console.log('href: ' + articleSelector);

  /* [DONE] find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  console.log('targetArticle: ', targetArticle);

  /* [DONE] add class 'active' to the correct article */
  targetArticle.classList.add('active');
};

function generateTitleLinks(customSelector = ''){
  console.log('function starts');

  /* [DONE] remove contents of titleList */
  let titleList = document.querySelector(opt.titleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */
  const articles = document.querySelectorAll(opt.articleSelector + customSelector);
  console.log('Articles: ', articles);

  let html = '';

  for (let article of articles){

    /* [DONE] get the article id */
    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* [DONE] find the title element, get the title from the title element */
    const articleTitle = article.querySelector(opt.titleSelector).innerHTML;

    /* [DONE] create HTML of the link */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    console.log(linkHTML);

    /* [DONE] insert link into titleList */
    html = html + linkHTML;
    console.log('HTML: ' + html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('Article links column left; ', links);

  for (let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(opt.articleSelector);

  /* START LOOP: for every article: */
  for (let article of articles){

    /* find tags wrapper */
    const tagsList = article.querySelector(opt.articeleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const tagsArray =articleTags.split(' ');
    console.log(tagsArray);

    /* START LOOP: for each tag */
    for (let tag of tagsArray){
      console.log('Tag: ' + tag);

      /* generate HTML of the link */
      const linkHTMLData = {id: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      console.log(linkHTML);

      html = linkHTML + html;

    }

    tagsList.innerHTML = html;

  }
}

generateTags();

function tagClickHandler(event){

  event.preventDefault();

  const clickedElement = this;
  console.log('clickedElement Tags:', clickedElement);

  const href = clickedElement.getAttribute('href');
  console.log('clickedElement href: ' + href);

  const tag = href.replace('#tag-','');
  console.log('Tag: ' + tag);

  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTags: ', activeTags);

  for (let activeTag of activeTags){

    activeTag.classList.remove('active');

  }

  const tagsEqual = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagsEqual: ', tagsEqual);

  for (let tagEqual of tagsEqual){

    tagEqual.classList.add('.active');

  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function generateAuthors(){

  const articles = document.querySelectorAll(opt.articleSelector);
  console.log('wrappers: ', articles);

  for (let article of articles){

    const articleAuthor = article.querySelector(opt.articleAuthorSelector);

    const author = article.getAttribute('data-author');
    console.log('data-author: ' + author);

    const linkHTMLData = {id: author};
    const authorLink = templates.authorLink(linkHTMLData);
    console.log('authorLink: ' + authorLink);

    articleAuthor.innerHTML = authorLink;
  }
}

generateAuthors();

function authorClickHandler(event){

  event.preventDefault();

  const clickedElement = this;
  console.log('clickedElement Tags:', clickedElement);

  const href = clickedElement.getAttribute('href');
  console.log('clickedElementAuthor href: ' + href);

  const author = href.replace('#author-','');
  console.log('Author from href: ' + author);

  const authorsActive = document.querySelectorAll(opt.articleAuthorSelector, '.active');
  console.log('authorsActive: ', authorsActive);

  for (let authorActive of authorsActive){
    authorActive.classList.remove('.active');
  }

  const authorsEqual = document.querySelectorAll('a[href="' + href + '"]');
  console.log('authorEqual: ', authorsEqual);

  for (let authorEqual of authorsEqual){
    authorEqual.classList.add('.active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function calculateTagsParams(tags){

  const params = {max: 0, min: 999999};
  for (let tag in tags){
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if(tags[tag] > params.max){
      params.max = tags[tag];
      console.log('params.max: ' + params.max);
    }

    if(tags[tag] < params.min){
      params.min = tags[tag];
      console.log('params.min: ' + params.min);
    }
  }

  return params;
}

function calculateTagsClass (count, params){

  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opt.cloudClassCount - 1) + 1);
  return opt.cloudClassPrefix + classNumber;
}

function generateTagsSidebar(){

  let allTags = {};
  const articles = document.querySelectorAll(opt.articleSelector);

  for (let article of articles){
    const tagsAttribute = article.getAttribute('data-tags');
    const tags= tagsAttribute.split(' ');

    for (let tag of tags){
      if(!allTags[tag]){
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
  }
  console.log('allTags of object: ', allTags);

  const tagList = document.querySelector('.list.tags');

  const allTagsData = {tags:[]};

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams: ', tagsParams);

  for (let tag in allTags){

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagsClass(allTags[tag], tagsParams),
    });
    console.log('tag as an object',allTagsData);
  }

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log('allTagsData: ', allTagsData);
  console.log('tagList: ', tagList);
}

generateTagsSidebar();

function generateAuthorsSidebar(){

  let allAuthors = {};

  const articles = document.querySelectorAll(opt.articleSelector);

  for (let article of articles){
    const author = article.getAttribute('data-author');

    if(!allAuthors[author]){
      allAuthors[author] = 1;
    } else {
      allAuthors[author]++;
    }
  }
  console.log('allAutors of object: ', allAuthors);

  const authorsList = document.querySelector(opt.authorsListSelector);
  const allAuthorsData = {author:[]};
  console.log('allAuthorsData pierwsze {author:[]}: ', allAuthorsData);

  for (let author in allAuthors){
    allAuthorsData.author.push({
      author: author,
      count: allAuthors[author],
    });
  }

  authorsList.innerHTML = templates.authorCloudLink(allAuthorsData);
  console.log('authorsList: ', authorsList);
}

generateAuthorsSidebar();

function addClickListenersToTags(){

  const tagLinks = document.querySelectorAll(opt.tagsListenerSelector);
  console.log('tagListenner links: ', tagLinks);

  for (let link of tagLinks){
    link.addEventListener('click', tagClickHandler);
  }
}
addClickListenersToTags();

function addClickListenersToAuthors(){

  const authorLink = document.querySelectorAll(opt.authorListenerSelector);
  console.log('links: ', authorLink);

  for (let link of authorLink){
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();
