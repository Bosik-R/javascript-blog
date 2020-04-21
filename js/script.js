'use strict';
/*document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});*/

const titleClickHandler = function(event){
  console.log('Link was clicked!');
  console.log(event);

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


const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticeleTagsSelector = '.post-tags .list',
  optTagsListenerSelector = '.list-horizontal a',
  optArticleAuthorSelector = '.post-author',
  optAuthorListenerSelector = '.post-author a',
  optTagsListSelector = '.tags.list',
  optTagsArrayListennerSelector = '.list.tags a';

function generateTitleLinks(customSelector = ''){
  console.log('function starts');

  /* [DONE] remove contents of titleList */

  let titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* [DONE] for each article */

  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  console.log('Articles: ', articles);

  let html = '';

  for(let article of articles){

    /* [DONE] get the article id */

    const articleId = article.getAttribute('id');
    console.log(articleId);

    /* [DONE] find the title element */
    /* [DONE] get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* [DONE] create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    console.log(linkHTML);

    /* [DONE] insert link into titleList */

    html = html + linkHTML;
    console.log('HTML: ' + html);
  }

  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  console.log('Article links column left; ', links);

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for(let article of articles){

    /* find tags wrapper */
    const tagsList = article.querySelector(optArticeleTagsSelector);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    console.log(articleTags);

    /* split tags into array */
    const tagsArray =articleTags.split(' ');
    console.log(tagsArray);

    /* START LOOP: for each tag */
    for(let tag of tagsArray){
      console.log('Tag: ' + tag);

      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag  + '</span></a></li>';
      console.log(linkHTML);

      /* add generated code to html variable */
      html = linkHTML + html;

    } /* END LOOP: for each tag */

    /* insert HTML of all the links into the tags wrapper */
    tagsList.innerHTML = html;

  }/* END LOOP: for every article: */
}

generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('clickedElement Tags:', clickedElement);

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log('clickedElement href: ' + href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-','');
  console.log('Tag: ' + tag);

  /* find all tag links with class active */
  const activeTags = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log('activeTags: ', activeTags);

  /* START LOOP: for each active tag link */
  for(let activeTag of activeTags){

    /* remove class active */
    activeTag.classList.remove('active');

  }/* END LOOP: for each active tag link */

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagsEqual = document.querySelectorAll('a[href="' + href + '"]');
  console.log('tagsEqual: ', tagsEqual);

  /* START LOOP: for each found tag link */
  for(let tagEqual of tagsEqual){

    /* add class active */
    tagEqual.classList.add('.active');

  }/* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  /* find all links to tags */
  const tagLinks = document.querySelectorAll(optTagsListenerSelector);
  console.log('Tag links: ', tagLinks);

  /* START LOOP: for each link */
  for(let link of tagLinks){

    /* add tagClickHandler as event listener for that link */
    link.addEventListener('click', tagClickHandler);

  }/* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors(){

  /* find all Articles  */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log('wrappers: ', articles);

  /* START LOOP: for every Article */
  for(let article of articles){

    /* find wrapper for author link */
    const articleAuthor = article.querySelector(optArticleAuthorSelector);

    /* get Author from the data-author attribute */
    const author = article.getAttribute('data-author');
    console.log('data-author: ' + author);

    /* create a link with Autor */
    const authorLink = '<a href="#author-' + author + '"><span>' + 'by ' + author  + '</span></a>';
    console.log('authorLink: ' + authorLink);

    /* put the link into HTML */
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

  const authorsActive = document.querySelectorAll(optArticleAuthorSelector, '.active');
  console.log('authorsActive: ', authorsActive);

  for(let authorActive of authorsActive){
    authorActive.classList.remove('.active');
  }

  const authorsEqual = document.querySelectorAll('a[href="' + href + '"]');
  console.log('authorEqual: ', authorsEqual);

  for(let authorEqual of authorsEqual){
    authorEqual.classList.add('.active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors(){

  const authorLink = document.querySelectorAll(optAuthorListenerSelector);
  console.log('links: ', authorLink);

  for(let link of authorLink){
    link.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();

function generateTagsArray(){
  /* [NEW] create a new variable allTags with an empty array */
  let allTags = [];
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = document.querySelector(optTagsListSelector);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const tagsAttribute = article.getAttribute('data-tags');
    /* split tags into array */
    const tagsArray = tagsAttribute.split(' ');
    /* START LOOP: for each tag */
    for(let tag of tagsArray){
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
      /* add generated code to html variable */
      html = html + linkHTML;
      console.log('html tags right: ', html);
      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to allTags array */
        allTags.push(linkHTML);
      }
    }/* END LOOP: for each tag */
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
  }/* END LOOP: for every article: */
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
}
generateTagsArray();

function addClickListenersToTagsArray(){

  const tagLinks = document.querySelectorAll(optTagsArrayListennerSelector);
  console.log('Tag links: ', tagLinks);

  for(let link of tagLinks){
    link.addEventListener('click', tagClickHandler);
  }
}

addClickListenersToTagsArray();
